const Property = require('../models/Property');
const socketInstance = require('../routes/socketio.js')

// Add a new property
exports.addProperty = async (req, res) => {
  try {
    const { userId, state, city, area, bedrooms, bathrooms, furnished, description, cost, petsAllowed } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Create new property with seller ID
    const newProperty = new Property({
      seller: userId,
      state,
      city,
      area,
      bedrooms,
      bathrooms,
      furnished,
      description,
      cost,
      petsAllowed
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('seller', 'firstName lastName email');
    res.json(properties);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get properties by seller
exports.getMyProperties = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const properties = await Property.find({ seller: sellerId });
    res.json(properties);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const property = await Property.findOneAndUpdate(
      { _id: id },
      updatedFields,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findOneAndDelete({ _id: id });
    if (!property) {
      return res.status(404).send('Property not found');
    }
    res.send('Property deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update the like count of a property
exports.updateLikeCount = async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.body; // 'increment' should be true to increase likes, false to decrease

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.likes = increment ? property.likes + 1 : property.likes - 1;
    await property.save();
//Socket
const socket = await socketInstance.socketConnection();
socket.broadCastEvent("like", { likes: property.likes,property :property._id  });
    res.json({ likes: property.likes});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
