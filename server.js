import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(__dirname, 'data');
const usersFile = path.join(dataDirectory, 'users.json');
const app = express();
const sessions = new Map();
const port = Number(process.env.PORT || 4000);
const supabaseEnabled = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
const supabase = supabaseEnabled
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => ({
  salt,
  hash: crypto.scryptSync(password, salt, 64).toString('hex')
});

const passwordMatches = (password, stored) => {
  const candidate = crypto.scryptSync(password, stored.salt, 64);
  const expected = Buffer.from(stored.hash, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
};

const publicUser = ({ salt, hash, ...user }) => user;

async function readUsers() {
  try {
    return JSON.parse(await fs.readFile(usersFile, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.mkdir(dataDirectory, { recursive: true });
    const demoUsers = [
      { fullName: 'Aarav Sharma', email: 'student@aiforce.edu', role: 'Student', studentId: 'AF-DEMO-STUDENT', ...hashPassword('Student@123') },
      { fullName: 'Prof. Rajesh Verma (Admin)', email: 'admin@aiforce.edu', role: 'Admin', studentId: 'AF-DEMO-ADMIN', ...hashPassword('Admin@123') },
      { fullName: 'Dr. Anya Sharma', email: 'faculty@aiforce.edu', role: 'Faculty', studentId: 'AF-DEMO-FACULTY', ...hashPassword('Faculty@123') }
    ];
    await writeUsers(demoUsers);
    return demoUsers;
  }
}

async function writeUsers(users) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (supabaseEnabled) {
    if (!token) return res.status(401).json({ message: 'Authentication required.' });
    supabase.auth.getUser(token).then(({ data, error }) => {
      if (error || !data.user) return res.status(401).json({ message: 'Authentication required.' });
      req.user = supabaseUser(data.user);
      next();
    }).catch(next);
    return;
  }
  const user = token ? sessions.get(token) : null;
  if (!user) return res.status(401).json({ message: 'Authentication required.' });
  req.user = user;
  next();
}

function supabaseUser(user) {
  return {
    id: user.id,
    fullName: user.user_metadata?.fullName || user.email,
    email: user.email,
    mobile: user.user_metadata?.mobile || '',
    studentId: user.user_metadata?.studentId || '',
    department: user.user_metadata?.department || '',
    role: user.user_metadata?.role || 'Student',
    bio: user.user_metadata?.bio || ''
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'AI FORCE API', authProvider: supabaseEnabled ? 'supabase' : 'local' });
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { fullName, email, mobile = '', studentId, department = '', role = 'Student', password } = req.body;
    if (typeof fullName !== 'string' || typeof email !== 'string' || typeof studentId !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Full name, email, ID, and password are required.' });
    }
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    if (!['Student', 'Faculty', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid portal role.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (supabaseEnabled) {
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { fullName: fullName.trim(), mobile: mobile.trim(), studentId: studentId.trim(), department, role,
            bio: `Enrolled in Capacity Connect LMS under ${department} competency stream.` }
        }
      });
      if (error) return res.status(400).json({ message: error.message });
      if (!data.session) return res.status(202).json({ message: 'Check your email to confirm your account.' });
      return res.status(201).json({ token: data.session.access_token, user: supabaseUser(data.user) });
    }

    const users = await readUsers();
    if (users.some(user => user.email === normalizedEmail)) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const newUser = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      mobile: mobile.trim(),
      studentId: studentId.trim(),
      department,
      role,
      bio: `Enrolled in Capacity Connect LMS under ${department} competency stream.`,
      enrolledCourseIds: ['c1', 'c2'],
      completedCourseIds: [],
      hoursLearned: 0,
      overallProgress: 0,
      certificates: [],
      ...hashPassword(password)
    };
    users.push(newUser);
    await writeUsers(users);
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, publicUser(newUser));
    res.status(201).json({ token, user: publicUser(newUser) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    if (supabaseEnabled) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (error || !data.session) return res.status(401).json({ message: 'Invalid email or password.' });
      return res.json({ token: data.session.access_token, user: supabaseUser(data.user) });
    }

    const users = await readUsers();
    const user = users.find(candidate => candidate.email === email.trim().toLowerCase());
    if (!user || !passwordMatches(password, user)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, publicUser(user));
    res.json({ token, user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.use(express.static(__dirname));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

app.listen(port, () => {
  console.log(`AI FORCE API listening on http://localhost:${port}`);
});
