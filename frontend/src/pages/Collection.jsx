import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* ✅ Filter Section (always visible on mobile + desktop) */}
      <div className="w-full sm:w-60">
        {/* Category Filter */}
        <div className="rounded-2xl shadow-md border border-gray-200 px-5 py-4 mt-4">
          <p className="mb-3 text-sm font-semibold text-gray-700">Category</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {["HomeCare", "SavingBundles", "BulkDealing"].map((cat, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={cat}
                  onClick={toggleCategory}
                  className="w-4 h-4 rounded-md text-blue-600 focus:ring-2 focus:ring-blue-400"
                />
                {cat.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className="rounded-2xl shadow-md border border-gray-200 px-5 py-4 mt-6">
          <p className="mb-3 text-sm font-semibold text-gray-700">Variations</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {["500ml", "1000ml", "5Litrs"].map((sub, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={sub}
                  onClick={toggleSubCategory}
                  className="w-4 h-4 rounded-md text-blue-600 focus:ring-2 focus:ring-blue-400"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>

        {/* Bulk Dealing Card */}
        <div className="rounded-2xl shadow-md border border-gray-200 px-5 py-4 mt-6">
          <Link
            to="/bulk-dealing"
            className="block p-4 border rounded hover:shadow"
          >
            <h3 className="font-semibold">Bulk Dealing</h3>
            <p className="text-sm text-gray-600">
              Orders 30kg+ or brand/wholesale enquiries
            </p>
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
              freeDelivery={item.freeDelivery}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
