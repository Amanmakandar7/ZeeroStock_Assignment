const Inventory = require('../models/inventory');
const Supplier = require('../models/supplier');

exports.createInventory = async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    // check supplier exists
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ message: 'Invalid supplier ID' });
    }

    // validate values
    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity must be >= 0' });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be > 0' });
    }

    const inventory = new Inventory({
      supplier_id,
      product_name,
      quantity,
      price,
    });

    await inventory.save();
    res.status(201).json(inventory);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /inventory
exports.getInventory = async (req, res) => {
  try {
    const data = await Inventory.find().populate('supplier_id');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /inventory/grouped
exports.getGroupedInventory = async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $group: {
          _id: "$supplier_id",
          totalValue: {
            $sum: { $multiply: ["$quantity", "$price"] }
          }
        }
      },
      {
        $sort: { totalValue: -1 }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
