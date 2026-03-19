require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

let db;

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("DB connection failed:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// page routes
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

// property routes
app.post('/property/add', upload.array('images', 10), async (req, res) => {
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

app.get('/property/:id', async (req, res) => {
  try {
    const data = await db.collection('properties').findOne({ _id: new ObjectId(req.params.id) });
    if (!data) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/property/:id', upload.array('images', 10), async (req, res) => {
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

app.delete('/property/:id', async (req, res) => {
  try {
    await db.collection('properties').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// auth routes
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const exists = await db.collection('users').findOne({ email });
    if (exists) return res.json({ success: false, message: 'Email already registered' });

    const result = await db.collection('users').insertOne({ name, email, password, createdAt: new Date() });
    res.json({ success: true, userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await db.collection('users').findOne({ email, password });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({ success: true, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// enquiry routes
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

app.get('/enquiry/all', async (req, res) => {
  try {
    const data = await db.collection('enquiries').find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.get('/dashboard/stats', async (req, res) => {
  try {
    const propertyCount = await db.collection('properties').countDocuments();
    const enquiryCount = await db.collection('enquiries').countDocuments();
    const lastUser = await db.collection('users').findOne({}, { sort: { createdAt: -1 } });

    res.json({
      success: true,
      propertyCount,
      enquiryCount,
      userName: lastUser?.name || 'User'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
