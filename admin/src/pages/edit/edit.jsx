import React, { useEffect, useState } from 'react'
import './edit.css' 
import axios from "axios"
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({url}) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [oldImage, setOldImage] = useState("");
    
    const [data, setData] = useState({
        name:"",
        description:"",
        category:"Salad",
        micro: "",
        mini: "",
        midi: "",
        standard: "",
        foil: "", // <--- NEW STATE
        price: ""
    })

    const singlePriceCategories = ["Meals", "Pastries"];
    
    const fetchFoodData = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            const food = response.data.data.find((item) => item._id === id);
            if (food) {
                setData({
                    name: food.name,
                    description: food.description,
                    category: food.category,
                    micro: food.sizes ? food.sizes.micro : 0,
                    mini: food.sizes ? food.sizes.mini : 0, 
                    midi: food.sizes ? food.sizes.midi : 0,
                    standard: food.sizes ? food.sizes.standard : 0,
                    foil: food.sizes ? food.sizes.foil : 0, // <--- LOAD FOIL
                    price: food.price 
                });
                setOldImage(food.image);
            }
        }
    }

    useEffect(() => {
        fetchFoodData();
    }, [])

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        
        if (singlePriceCategories.includes(data.category)) {
            formData.append("price", Number(data.price));
            formData.append("micro", 0);
            formData.append("mini", 0);
            formData.append("midi", 0);
            formData.append("standard", 0);
            formData.append("foil", 0);

        } else {
            formData.append("micro", Number(data.micro));
            formData.append("mini", Number(data.mini));
            formData.append("midi", Number(data.midi));
            
            if (data.category === "Cakes") {
                formData.append("standard", Number(data.standard));
                formData.append("foil", Number(data.foil)); // <--- SAVE FOIL
            } else {
                formData.append("standard", 0);
                formData.append("foil", 0);
            }

            formData.append("price", Number(data.mini));
        }
        
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post(`${url}/api/food/update`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list'); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error updating food");
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Update Image</p>
            <label htmlFor="image" style={{cursor:'pointer', position:'relative', width:'150px'}}>
                {image ? (
                    <img src={URL.createObjectURL(image)} alt="" style={{width:'150px', borderRadius:'10px'}}/>
                ) : (
                    <img 
                        src={ oldImage.includes("http") ? oldImage : `${url}/images/${oldImage}` } 
                        alt="" 
                        style={{width:'150px', borderRadius:'10px'}}
                    />
                )}
                <div style={{position:'absolute', bottom:0, width:'100%', background:'rgba(0,0,0,0.5)', color:'white', textAlign:'center', fontSize:'12px', borderRadius:'0 0 10px 10px'}}>Change</div>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </div>

        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Banana-Bread">Banana Bread</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Meals">Meals</option>
                    <option value="Pastries">Pastries</option>
                </select>
            </div>
        </div>

        {singlePriceCategories.includes(data.category) ? (
            <div className="add-price flex-col" style={{marginTop:'20px'}}>
                <p>Price (₦)</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='2000' required />
            </div>
        ) : (
            <div style={{display:'flex', gap:'20px', marginTop:'20px', flexWrap:'wrap'}}>
                <div className="add-price flex-col">
                    <p>Micro Price (₦)</p>
                    <input onChange={onChangeHandler} value={data.micro} type="Number" name='micro' placeholder='500' required />
                </div>
                <div className="add-price flex-col">
                    <p>Mini Price (₦)</p>
                    <input onChange={onChangeHandler} value={data.mini} type="Number" name='mini' placeholder='1000' required />
                </div>
                <div className="add-price flex-col">
                    <p>Midi Price (₦)</p>
                    <input onChange={onChangeHandler} value={data.midi} type="Number" name='midi' placeholder='2000' required />
                </div>

                {data.category === "Cakes" && (
                    <>
                        <div className="add-price flex-col">
                            <p>Standard Price (₦)</p>
                            <input onChange={onChangeHandler} value={data.standard} type="Number" name='standard' placeholder='3000' required />
                        </div>
                        <div className="add-price flex-col">
                            <p>Foil Price (₦)</p> {/* <--- EDIT FOIL INPUT */}
                            <input onChange={onChangeHandler} value={data.foil} type="Number" name='foil' placeholder='3500' required />
                        </div>
                    </>
                )}
            </div>
        )}

        <button type='submit' className='add-btn' style={{backgroundColor:'#4CAF50'}}>UPDATE PRODUCT</button>
      </form>
    </div>
  )
}
export default Edit