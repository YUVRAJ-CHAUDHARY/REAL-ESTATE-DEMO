# Vedanta Residency — Real Estate Web App

A Node.js + Express based real estate website built for showcasing and managing residential properties in Muzaffarnagar, Uttar Pradesh. Uses EJS templating with a clean MongoDB Atlas backend.

## Features

- Responsive frontend with EJS templates
- MongoDB Atlas integration for cloud database storage
- Property listing, adding, and detail view
- User registration and login with localStorage session
- Dashboard showing live property and enquiry counts
- Image upload support via Multer
- Static file routing for CSS, JS, and uploaded images

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with featured properties |
| `/login` | Login page |
| `/register` | Registration page |
| `/dashboard` | User dashboard with live stats |
| `/addProperty` | Add a new property |
| `/propertyDetail` | Detailed view of a property |

## Tech Stack

- **Frontend:** EJS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **File Uploads:** Multer
- **Dev Tools:** Nodemon, dotenv

## Environment Setup

This project uses a `.env` file for configuration. Create a `.env` file in the root of the project — same level as `app.js`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
DB_NAME=vedanta_residency
PORT=3000
```

To get your MongoDB Atlas connection string:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster → Connect → Drivers
3. Copy the connection string and replace `<password>` with your actual password

A few things to keep in mind with the `.env` file:
- No spaces around `=` — write `KEY=value` not `KEY = value`
- No quotes around values
- No semicolons at the end

> Never push your `.env` file to GitHub. Always add it to `.gitignore`.

## Getting Started
```bash
# Install dependencies
npm install

# Create uploads folder (required for image uploads)
mkdir public/uploads

# Run in development
npm run dev

# Run in production
npm start
```

