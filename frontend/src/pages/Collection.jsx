import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
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
    <div className="pt-10 border-t">
      {/* ✅ Filter Title */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm mb-10">
        {/* Category */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-gray-700 text-sm">Category:</span>
          {["HomeCare", "SavingBundles"].map((cat, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                value={cat}
                onClick={toggleCategory}
                className="w-4 h-4 text-blue-600 rounded"
              />
              {cat.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        {/* SubCategory */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-gray-700 text-sm">Variations:</span>
          {["500ml", "1000ml", "5Litrs"].map((sub, i) => (
            <label
              key={i}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                value={sub}
                onClick={toggleSubCategory}
                className="w-4 h-4 text-blue-600 rounded"
              />
              {sub}
            </label>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700 text-sm">Sort:</span>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border px-3 py-1 text-sm rounded-md shadow-sm"
          >
            <option value="relavent">Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Bulk Dealing Shortcut */}
        <Link
          to="/bulk-dealing"
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
        >
          Bulk Dealing
        </Link>
      </div>

      {/* ✅ All Collections Title */}
      <div className="mb-6">
        <Title text1={"ALL"} text2={"COLLECTIONS"} />
      </div>

      {/* ✅ Product Grid (same size as before) */}
      {/* ✅ Product Grid (6 per row on large screen) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            id={item._id}
            price={item.price}
            oldPrice={item.oldPrice}
            image={item.image}
            freeDelivery={item.freeDelivery}
          />
        ))}
      </div>

    </div>

  );
};

export default Collection;
