const express = require('express');
const { addProperty, getProperties, getMyProperties, updateProperty, deleteProperty,updateLikeCount } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const router = express.Router();

// Add property route
router.post('/', auth, addProperty);

// Get all properties route
router.get('/', getProperties);

// Get properties by seller route
router.get('/my-properties/:sellerId', auth, getMyProperties);

// Update property route
router.put('/:id', auth, updateProperty);

// Delete property route
router.delete('/:id', auth, deleteProperty);

router.post('/:id/like', auth, updateLikeCount);


module.exports = router;
