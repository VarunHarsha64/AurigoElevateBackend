const express = require('express');
const router = express.Router();
const { 
  createTenderMatch, 
  getTenderMatches 
} = require('../controllers/tenderMatchController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes require authMiddleware
router.post('/', authMiddleware, createTenderMatch);
router.get('/', getTenderMatches);

module.exports = router;
