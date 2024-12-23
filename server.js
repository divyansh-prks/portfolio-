require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 4001;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON
app.use(bodyParser.json());

// MongoDB Atlas URI (replace with your own)
const uri = process.env.DB_URI;

// Connect to MongoDB
let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('contact_form_db'); // Use the database you created
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => console.error(error));

// POST route to handle form data
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the data
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Insert data into MongoDB
  try {
    const collection = db.collection('contacts'); // Use the 'contacts' collection
    const result = await collection.insertOne({ name, email, message, createdAt: new Date() });

    res.status(200).json({ success: true, message: 'Message saved to MongoDB', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save message', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
