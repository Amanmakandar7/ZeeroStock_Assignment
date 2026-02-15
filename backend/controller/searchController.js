const products = require('../data/product.json');

exports.searchProducts = (req, res) => {
  let results = [...products];

  const { q, category, minPrice, maxPrice } = req.query;

  // filter by name
  if (q) {
    results = results.filter(product =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // filter by category
  if (category) {
    results = results.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // filter by min price
  if (minPrice) {
    results = results.filter(product =>
      product.price >= Number(minPrice)
    );
  }

  // filter by max price
  if (maxPrice) {
    results = results.filter(product =>
      product.price <= Number(maxPrice)
    );
  }

  res.json(results);
};
