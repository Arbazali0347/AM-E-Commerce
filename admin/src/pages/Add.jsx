import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false)
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [oldPrice, setOldPrice] = useState("")
  const [category, setCategory] = useState("HomeCare")
  const [subCategory, setSubCategory] = useState("500ml")
  const [bestseller, setBestseller] = useState(false)
  const [freeDelivery, setFreeDelivery] = useState(false)

  // 🆕 Flavors as array
  const [flavors, setFlavors] = useState([])

  const flavorOptions = ["Dove velvet", "lux fusion", "aqua wave"]

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("oldPrice", oldPrice)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("freeDelivery", freeDelivery)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      // 🆕 Flavors append as JSON array
      if (flavors.length > 0) {
        flavors.forEach((flavor) => {
          formData.append("flavors", flavor);
        });
      }

      const { data } = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setOldPrice("")
        setFlavors([])  // 🧼 Reset flavors
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      {/* Image */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className='flex gap-2'>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className='w-20 h-20 object-cover border'
                src={
                  !eval(`image${num}`)
                    ? assets.upload_area
                    : URL.createObjectURL(eval(`image${num}`))
                }
                alt=""
              />
              <input
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                type="file"
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write content here"
          required
        ></textarea>
      </div>

      {/* 🆕 Flavors Selection */}
      <div className='w-full'>
        <p className="mb-2">Select Flavors</p>
        <div className="flex flex-wrap gap-3">
          {flavorOptions.map((flavor, index) => (
            <label
              key={index}
              className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={flavors.includes(flavor)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFlavors([...flavors, flavor])
                  } else {
                    setFlavors(flavors.filter((f) => f !== flavor))
                  }
                }}
              />
              {flavor}
            </label>
          ))}
        </div>
      </div>

      {/* Category / SubCategory / Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className="mb-2">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>HomeCare</option>
            <option>SavingBundles</option>
          </select>
        </div>
        <div>
          <p className="mb-2">SubCategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>500ml</option>
            <option>1000ml</option>
            <option>5Liter</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px] border rounded" type="Number" placeholder="25" />
        </div>
        <div>
          <p className="mb-2">Old Price</p>
          <input onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} className="w-full px-3 py-2 sm:w-[120px] border rounded" type="Number" placeholder="25" />
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>

      {/* Free Delivery */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setFreeDelivery(prev => !prev)} checked={freeDelivery} type="checkbox" id="freeDelivery" />
        <label className="cursor-pointer" htmlFor="freeDelivery">Free Delivery</label>
      </div>

      <button type="submit" className="cursor-pointer w-28 py-3 mt-4 bg-black text-white rounded">
        {loading ? "Loading..." : "ADD"}
      </button>
    </form>
  )
}

export default Add