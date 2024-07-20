const express = require('express');
const mongojs = require("mongojs");
//const { validateForm } = require('./static/register');
//const { validateForm } = require('./static/validation');
  
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
      confirmPassword: req.body.confirmPassword,
      created_at: Date.now(),
      modified_at: Date.now(),
  };
 
  if (!validateForm(newSubmit.first_name, newSubmit.last_name, newSubmit.email, newSubmit.password, newSubmit.confirmPassword)) {
    // If validation fails, do not proceed
    res.status(400).json({ error: 'SERVER SIDE: Register error' });
    return;
}

// if(!newSubmit.first_name || newSubmit.first_name.trim().length===0){
//   res.status(400).json({ error: 'SERVER SIDE: Register error' });
//   return;
// }

  tasks_coll.insert(newSubmit, (err, doc) => {
      if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.status(201).json({ message: 'Register successfully!', task: doc });
      }
  });
});


// DELETE request to delete a user by email and password
app.delete('/submit', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email and password
  tasks_coll.remove({ email: email, password: password }, { justOne: true }, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (doc.deletedCount === 0) {
      res.status(404).json({ error: 'User not found or incorrect password' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});




const validateForm = (firstName, lastName, email, password, confirmPassword) => {
  // Check if any field is empty
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return false;   
  }

  // Check if password is at least 8 characters long
  if (password.length < 8) {
      return false;
  }

  // Check if password matches confirm password
  if (password !== confirmPassword) {
      return false;
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) { // Using test() method
      return false
  }

  // If all validations pass, return true
  return true;
}


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});