const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Make sure this line comes early:
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Multer config (upload folder)
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  fs.readdir('./public/uploads/', (err, files) => {
    if (err) throw err;
    res.render('index', { photos: files });
  });
});

app.post('/upload', upload.single('photo'), (req, res) => {
  res.redirect('/');
});

// ✅ Here's the delete route that uses form data:
app.post('/delete', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'uploads', req.body.filename);
  fs.unlink(filePath, (err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
