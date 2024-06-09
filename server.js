const express = require('express');
const mongojs = require("mongojs");
  
// the shared mongodb server:
const db = mongojs(
  'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024',
  ['tasks']
);

//Edit this line to point to your specific collection!
const tasks_coll = db.collection('mitzinet_itamar&ofir'); 
// tasks_coll that how we call to the collection!

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Serve static files from the 'static' directory
app.use(express.static('static'));


// GET route to fetch all submit from the “submits.json” file
app.get('/submits', (req, res) => {
  tasks_coll.find({},(err,docs)=>{
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(docs);
    }
  })
});

// post another user to the mongo! we decided the name will be '/submit.
app.post('/submit', (req, res) => {
  // important! the fields we make here will be importent to the ajax also!
  // 'newSubmit' represent am obj of a new registar
  const newSubmit = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created_at: Date.now(),
      modified_at: Date.now(),
  };

  tasks_coll.insert(newSubmit, (err, doc) => {
      if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.status(201).json({ message: 'Register successfully!', task: doc });
      }
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});