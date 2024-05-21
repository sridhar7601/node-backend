const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line to import the cors package
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const { createServer } = require('http');
const socketInstance = require('./routes/socketio.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const httpServer = createServer(app);
httpServer.listen(process.env.SOCKET_PORT || 4040);
socketInstance.connectSocket(httpServer);

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200

}
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Connect to MongoDB
// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim())
mongoose.connect(`mongodb+srv://sridhar:sridhar@cluster0.03add.mongodb.net/presidio-v1?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
