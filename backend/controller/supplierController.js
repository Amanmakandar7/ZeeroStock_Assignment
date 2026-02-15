const Supplier = require('../models/supplier');

exports.createSupplier = async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: 'Name and city are required' });
    }

    const supplier = new Supplier({ name, city });
    await supplier.save();

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
