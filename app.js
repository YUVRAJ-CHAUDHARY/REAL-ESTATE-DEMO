require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// uploads folder auto create
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

let db;

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("DB connection failed:", err));

// ─── Swagger Setup ─────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vedanta Residency API',
      version: '1.0.0',
      description: 'Real Estate API for Vedanta Residency, Muzaffarnagar'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://real-estate-demo-1-kbow.onrender.com', description: 'Production' }
    ],
    tags: [
      { name: 'Auth', description: 'User authentication' },
      { name: 'Properties', description: 'Property management' },
      { name: 'Enquiries', description: 'Customer enquiries' },
      { name: 'Dashboard', description: 'Dashboard stats' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./app.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── Multer Setup ──────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ─── Auth Middleware ───────────────────────────────────
// yeh function check karta hai ki request mein valid JWT token hai ya nahi
// agar token nahi hai ya galat hai toh 401/403 return karta hai
// agar sahi hai toh req.user mein user info daal deta hai aur next() call karta hai
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" se sirf TOKEN nikalna

  if (!token)
    return res.status(401).json({ success: false, message: 'Access denied, token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ab req.user mein userId, name, email available hai
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
}

// ─── Page Routes ───────────────────────────────────────
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/addProperty', (req, res) => res.render('addProperty'));

app.get('/propertyDetail', async (req, res) => {
  try {
    const property = await db.collection('properties').findOne({ _id: new ObjectId(req.query.id) });
    res.render('propertyDetail', { property });
  } catch {
    res.render('propertyDetail', { property: null });
  }
});

// ─── Auth Routes ───────────────────────────────────────

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: All fields required or email already registered
 */
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const exists = await db.collection('users').findOne({ email });
    if (exists) return res.json({ success: false, message: 'Email already registered' });

    // bcrypt se password hash karo — plain text kabhi save mat karo
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name, email,
      password: hashedPassword,
      createdAt: new Date()
    });

    // JWT token banao — 7 din ke liye valid rahega
    const token = jwt.sign(
      { userId: result.insertedId, name, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ success: true, token, userId: result.insertedId, name });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // bcrypt se compare karo — DB mein hashed password hai
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ success: true, token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Property Routes ───────────────────────────────────

/**
 * @swagger
 * /property/add:
 *   post:
 *     summary: Add a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, price, city]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [residential, commercial, plot]
 *               price:
 *                 type: number
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               bedrooms:
 *                 type: number
 *               bathrooms:
 *                 type: number
 *               area:
 *                 type: number
 *               ownerName:
 *                 type: string
 *               ownerPhone:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, sold, rented]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Property added successfully
 *       401:
 *         description: Token missing
 */
app.post('/property/add', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    const { title, description, type, price, area, bedrooms, bathrooms, city, address, status, ownerName, ownerPhone } = req.body;

    if (!title || !price || !city)
      return res.status(400).json({ success: false, message: 'Title, price and city are required' });

    const images = req.files?.map(f => '/uploads/' + f.filename) || [];

    const result = await db.collection('properties').insertOne({
      title,
      description: description || '',
      type: type || 'residential',
      price: Number(price),
      area: area ? Number(area) : null,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      city,
      address: address || '',
      status: status || 'available',
      ownerName: ownerName || '',
      ownerPhone: ownerPhone || '',
      images,
      createdAt: new Date()
    });

    res.json({ success: true, propertyId: result.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /property/all:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all properties
 */
app.get('/property/all', async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = new RegExp(req.query.city, 'i');
    if (req.query.type) filter.type = req.query.type;

    const data = await db.collection('properties').find(filter).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /property/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property details
 *       404:
 *         description: Property not found
 */
app.get('/property/:id', async (req, res) => {
  try {
    const data = await db.collection('properties').findOne({ _id: new ObjectId(req.params.id) });
    if (!data) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /property/{id}:
 *   put:
 *     summary: Update property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property updated
 *       401:
 *         description: Token missing
 */
app.put('/property/:id', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.files?.length) updates.images = req.files.map(f => '/uploads/' + f.filename);

    await db.collection('properties').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /property/{id}:
 *   delete:
 *     summary: Delete property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted
 *       401:
 *         description: Token missing
 */
app.delete('/property/:id', authMiddleware, async (req, res) => {
  try {
    await db.collection('properties').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Enquiry Routes ────────────────────────────────────

/**
 * @swagger
 * /enquiry/add:
 *   post:
 *     summary: Submit an enquiry
 *     tags: [Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               message:
 *                 type: string
 *                 example: I am interested in this property
 *     responses:
 *       200:
 *         description: Enquiry submitted
 */
app.post('/enquiry/add', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone)
      return res.status(400).json({ success: false, message: 'Name and phone required' });

    const result = await db.collection('enquiries').insertOne({ name, phone, message, createdAt: new Date() });
    res.json({ success: true, enquiryId: result.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /enquiry/all:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Enquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all enquiries
 *       401:
 *         description: Token missing
 */
app.get('/enquiry/all', authMiddleware, async (req, res) => {
  try {
    const data = await db.collection('enquiries').find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Dashboard Stats ───────────────────────────────────

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 */
app.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const propertyCount = await db.collection('properties').countDocuments();
    const enquiryCount = await db.collection('enquiries').countDocuments();
    const availableCount = await db.collection('properties').countDocuments({ status: 'available' });
    const soldCount = await db.collection('properties').countDocuments({ status: 'sold' });

    res.json({
      success: true,
      propertyCount,
      enquiryCount,
      availableCount,
      soldCount,
      userName: req.user.name // JWT token se seedha naam le rahe hain
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
