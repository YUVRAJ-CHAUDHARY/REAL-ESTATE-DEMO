const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');

const app = express();

const MONGO_URI = "mongodb://yuvichaudhary07_db_user:Yuvi4321@ac-mbwhwxb-shard-00-00.5p3dm9k.mongodb.net:27017,ac-mbwhwxb-shard-00-01.5p3dm9k.mongodb.net:27017,ac-mbwhwxb-shard-00-02.5p3dm9k.mongodb.net:27017/?ssl=true&replicaSet=atlas-cezae3-shard-0&authSource=admin&appName=Vedanta";
const DB_NAME = "vedanta_residency";

let db;

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log("MongoDB Connected");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(err => console.error("DB Error:", err));

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

app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/addProperty', (req, res) => res.render('addProperty'));

app.get('/propertyDetail', async (req, res) => {
  try {
    const property = await db.collection('properties').findOne({
      _id: new ObjectId(req.query.id)
    });
    res.render('propertyDetail', { property });
  } catch {
    res.render('propertyDetail', { property: null });
  }
});

app.post('/property/add', upload.array('images', 10), async (req, res) => {
  try {
    const { title, description, type, price, area, bedrooms, bathrooms, city, address, status, ownerName, ownerPhone } = req.body;

    if (!title || !price || !city) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const images = req.files ? req.files.map(f => '/uploads/' + f.filename) : [];

    const newProperty = {
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
    };

    const result = await db.collection('properties').insertOne(newProperty);
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

    const data = await db.collection('properties')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, data });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.get('/property/:id', async (req, res) => {
  try {
    const data = await db.collection('properties').findOne({
      _id: new ObjectId(req.params.id)
    });
    res.json({ success: true, data });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.put('/property/:id', upload.array('images', 10), async (req, res) => {
  try {
    const updates = req.body;

    if (req.files?.length) {
      updates.images = req.files.map(f => '/uploads/' + f.filename);
    }

    await db.collection('properties').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );

    res.json({ success: true });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.delete('/property/:id', async (req, res) => {
  try {
    await db.collection('properties').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    res.json({ success: true });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await db.collection('users').findOne({ email });
    if (exist) return res.json({ success: false, message: "Email exists" });

    const result = await db.collection('users').insertOne({
      name, email, password, createdAt: new Date()
    });

    res.json({ success: true, userId: result.insertedId });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email, password });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, user });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.post('/enquiry/add', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    const result = await db.collection('enquiries').insertOne({
      name, phone, message, createdAt: new Date()
    });

    res.json({ success: true, enquiryId: result.insertedId });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.get('/enquiry/all', async (req, res) => {
  try {
    const data = await db.collection('enquiries').find().toArray();
    res.json({ success: true, data });

  } catch {
    res.status(500).json({ success: false });
  }
});