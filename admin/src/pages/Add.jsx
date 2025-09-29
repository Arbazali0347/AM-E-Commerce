import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
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
    const [freeDelivery, setFreeDelivery] = useState(false);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description);
            formData.append("price", price);
            formData.append("oldPrice", oldPrice);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("freeDelivery", freeDelivery);
            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

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
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                    </label>
                </div>
            </div>
            {/* Name product */}
            <div className='w-full'>
                <p className="mb-2">Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required></input>
            </div>
            {/* description */}
            <div className='w-full'>
                <p className="mb-2">Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write content here" required></textarea>
            </div>

            {/* category price subcategory */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className="mb-2">Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2" name="" id="">
                        <option>Home Cleaner</option>
                        <option>Saving</option>
                        <option>BulkDealing</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">SubCategory</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2" name="" id="">
                        <option>500ml</option>
                        <option>1000ml</option>
                        <option>5Liter</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="Number" placeholder="25" ></input>
                </div>
                <div>
                    <p className="mb-2">Old Price</p>
                    <input onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} className="w-full px-3 py-2 sm:w-[120px]" type="Number" placeholder="25" ></input>
                </div>
            </div>
            {/* best saller */}
            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"></input>
                <label className="cursor-pointer" id="bestseller">Add to bestseller</label>
            </div>

            {/* free delivery */}
            <div className='flex gap-2 mt-2'>
                <input
                    onChange={() => setFreeDelivery(prev => !prev)}
                    checked={freeDelivery}
                    type="checkbox"
                    id="freeDelivery"
                ></input>
                <label className="cursor-pointer" id="freeDelivery">
                    Free Delivery
                </label>
            </div>
            <button type="submit" className="cursor-pointer w-28 py-3 mt-4 bg-black text-white">{loading ? "Loading..." : "ADD"}</button>
        </form>
    )
}

export default Add