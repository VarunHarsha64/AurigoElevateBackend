const TenderMatch = require('../models/TenderMatch');

// Create a tender match
exports.createTenderMatch = async (req, res) => {
  try {
    const { clientId, vendorId, matchedProducts } = req.body;
    const newTenderMatch = new TenderMatch({ clientId, vendorId, matchedProducts });

    await newTenderMatch.save();
    res.status(201).json(newTenderMatch);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get all tender matches
exports.getTenderMatches = async (req, res) => {
  try {
    const tenderMatches = await TenderMatch.find().populate('clientId vendorId');
    res.json(tenderMatches);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
