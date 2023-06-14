
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create the Express app
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Smruti:Smruti@cluster.gepqs5x.mongodb.net/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the schema for storing user data
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      phone_number: {
        type: String
      }
});

// Create the model for user 

const User = mongoose.model('User', userSchema);

// Middleware for parsing request bodies
app.use(bodyParser.json());

// Endpoint 1: Simple request response endpoint
app.get('/api/welcome', (req, res) => {
  res.status(200).json({ success: true, message: 'API successfully called' });
});

// Endpoint 2: Sign up endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required', error: error.message });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists', error: error.message});
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ name, email, password_hashed: hashedPassword});
    if (phone_number) {
        newUser.phone_number = phone_number;
      }

    await newUser.save();

    res.json({ success: true, message: 'Signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false, message: 'Failed to sign up', error: error.message });
  }
});

// Endpoint 3: Sign in endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Make a request to the external API
    const apiResponse = await axios.get('https://api.catboys.com/catboy');
    const message = apiResponse.data.message;

    res.json({ success: true, message });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Failed to log in' });
  }
});


// Endpoint 4: Edit or add phone number
app.put('/api/edit/phonenumber', async (req, res) => {
    try {
      const { phone_number } = req.body;
      const { userId } = req.headers;
  
      // Find the user and update the phone number
      const user = await User.findByIdAndUpdate(userId, { phone_number }, { new: true });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, message: 'Phone number changed/added successfully' });
    } catch (error) {
      console.error('Error updating phone number:', error);
      res.status(500).json({ success: false, message: 'Failed to update phone number' });
    }
  });
  
// Questionnaire endpoint: Submit a test
app.post('/submit-test', async (req, res) => {
    try {
      const { userId, testId, questionId, answers } = req.body;
  
      // Checking if the user has already taken the test
      const existingResponse = await Response.findOne({ userId, testId });
      if (existingResponse) {
        return res.status(400).json({ success: false, message: 'User has already taken the test' });
      }
  
      // Calculating the score based on the user's answers and the correct answers
      const score = calculateScore(testId, answers);
  
      // Store the user's responses in the database
      const newResponse = new Response({ userId, testId, questionId, answers });
      await newResponse.save();
  
      // Returning the response with the score
      res.json({ success: true, userId, testId, score });
    } catch (error) {
      console.error('Error submitting test:', error);
      res.status(500).json({ success: false, message: 'Failed to submit test' });
    }
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
