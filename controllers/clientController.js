const Client = require('../models/clientSchema.js');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, contact, productRequests } = req.body;
    const newClient = new Client({
      userId: req.body.id, // Associate client with the authenticated user
      name,
      contact,
      productRequests,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get the authenticated user's clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.body.id }); // Use userId from JWT
    if (!clients || clients.length === 0) {
      return res.status(404).json({ success: false, message: 'No clients found' });
    }
    res.status(200).json({ success: true, data: clients });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ msg: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update the authenticated user's client
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedClient) return res.status(404).json({ msg: 'Client not found' });
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Delete the authenticated user's client
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findOneAndDelete({ userId: req.user.id });
    if (!deletedClient) return res.status(404).json({ msg: 'Client not found' });
    res.json({ msg: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
