"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await fetch(
      `http://localhost:5000/search?${params.toString()}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-start justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Inventory Search
        </h1>

        {/* Search Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5 border border-gray-100">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Search product..."
              className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Min Price
              </label>
              <input
                type="number"
                placeholder="0"
                className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Max Price
              </label>
              <input
                type="number"
                placeholder="10000"
                className="mt-1 border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-sm"
          >
            Search Products
          </button>
        </div>

        {/* Results Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          {results.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No results found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3 font-medium text-blue-600">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
