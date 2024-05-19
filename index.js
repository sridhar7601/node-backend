const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line to import the cors package


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200

}
app.use(cors(corsOptions));

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/properties', propertyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
