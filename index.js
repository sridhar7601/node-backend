const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line to import the cors package


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

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
const password = encodeURIComponent(process.emv.MONGO_PASSWORD.trim())
mongoose.connect('MONGODB_URI =`mongodb+srv://sridhar:${password}@cluster0.03add.mongodb.net/presidio-v1?retryWrites=true&w=majority&appName=Cluster0`
', {

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
