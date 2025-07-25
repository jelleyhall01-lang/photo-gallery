const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// File upload settings
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// App setup
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Homepage with gallery
app.get('/', (req, res) => {
  const imageFiles = fs.readdirSync('./public/uploads');
  res.render('index', { images: imageFiles });
});

// Handle image uploads
app.post('/upload', upload.single('photo'), (req, res) => {
  res.redirect('/');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
