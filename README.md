# Inventory Assignment

This project implements a simple inventory system with search functionality, as required in the Zeerostock assignment.

## Tech Stack
- Frontend: Next.js
- Backend: Node.js + Express
- Database: MongoDB (Atlas)

---

# Part A: Inventory Search API + UI

## Search Logic
The search feature is implemented using a static JSON dataset containing product records.

The API:

Supports the following query parameters:

- `q` → partial match on product name (case-insensitive)
- `category` → exact category match
- `minPrice` → minimum price filter
- `maxPrice` → maximum price filter

### Behavior
- Case-insensitive product name search.
- Multiple filters can be combined.
- If no filters are provided, all products are returned.

### Edge Cases Handled
- Empty search query → returns all products.
- Invalid price ranges → handled gracefully.
- No matches → frontend displays “No results found”.

### Performance Improvement (for large datasets)
For large datasets:
- Move search logic to the database.
- Add indexes on `product_name`, `category`, and `price`.
- Use full-text search for faster name matching.

---

# Part B: Inventory Database + APIs

## Database Schema

### Suppliers Collection
| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Supplier ID |
| name | String | Supplier name |
| city | String | Supplier city |

### Inventory Collection
| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Inventory ID |
| supplier_id | ObjectId | Reference to supplier |
| product_name | String | Product name |
| quantity | Number | Available quantity |
| price | Number | Product price |

### Relationship
- One supplier can have multiple inventory items.

---

## Backend APIs

### Supplier
Creates a new supplier.

### Inventory
Creates a new inventory item.

Rules:
- Inventory must belong to a valid supplier.
- Quantity must be ≥ 0.
- Price must be > 0.

Returns all inventory items with supplier details.

---

## Special Query

Returns:
- Inventory grouped by supplier.
- Sorted by total inventory value.

### Total Value Formula
total value = quantity × price


---

## Why MongoDB (NoSQL)
MongoDB was chosen because:
- Flexible document-based schema.
- Easy to represent supplier–inventory relationships.
- Faster setup for small to medium-scale systems.
- No rigid schema migrations required.

---

## Indexing / Optimization Suggestion
For performance improvement:
- Add index on `supplier_id` in inventory collection.
- Add index on `product_name` and `price`.

Example:
db.inventory.createIndex({ supplier_id: 1 })
db.inventory.createIndex({ product_name: 1, price: 1 })


---

# How to Run the Project

## Backend
cd backend
npm install
node app.js

Backend runs on:
http://localhost:5000


---

## Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:3000

