import React, { useState } from 'react'
import './add.css'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        category:"Banana-Bread", 
        micro:"",
        mini:"",
        midi:"",
        standard:"", 
        foil:"", 
        price:""
    })

    // Categories that use a SINGLE price box
    const singlePriceCategories = ["Meals", "Pastries"];

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("image",image)
        
        // LOGIC: Package the prices based on category
        if (singlePriceCategories.includes(data.category)) {
            // OPTION 1: Single Price Items
            formData.append("price", Number(data.price));
            formData.append("micro", 0);
            formData.append("mini", 0);
            formData.append("midi", 0);
            formData.append("standard", 0); 
            formData.append("foil", 0);

        } else {
            // OPTION 2: Size Items (Banana Bread / Cakes)
            formData.append("micro", Number(data.micro));
            formData.append("mini", Number(data.mini));
            formData.append("midi", Number(data.midi));
            
            // PECULIAR RULE: Only send Standard/Foil for "Cakes"
            if (data.category === "Cakes") {
                formData.append("standard", Number(data.standard));
                formData.append("foil", Number(data.foil));
            } else {
                formData.append("standard", 0);
                formData.append("foil", 0);
            }
            
            // Use 'Mini' as the display price for the card
            formData.append("price", Number(data.mini));
        }
        
        const response = await axios.post(`${url}/api/food/add`, formData);
        
        if (response.data.success) {
            setData({
                name:"", description:"", category:"Banana-Bread", 
                micro:"", mini:"", midi:"", standard:"", foil:"", price:""
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image" style={{cursor:'pointer', border:'2px dashed #ccc', width:'150px', height:'120px', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', backgroundColor:'#f8f9fa'}}>
                {image ? (
                    <img src={URL.createObjectURL(image)} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}}/>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                )}
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
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
                <select onChange={onChangeHandler} name="category" value={data.category}>
                    <option value="Banana-Bread">Banana Bread</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Meals">Meals</option>
                    <option value="Pastries">Pastries</option>
                </select>
            </div>
        </div>

        {/* CONDITIONAL RENDERING */}
        {singlePriceCategories.includes(data.category) ? (
            // --- UI FOR MEALS/PASTRIES ---
            <div className="add-price flex-col" style={{marginTop:'20px'}}>
                <p>Price (₦)</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='2000' required />
            </div>
        ) : (
            // --- UI FOR SIZES ---
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

                {/* --- SHOW STANDARD & FOIL ONLY FOR CAKES --- */}
                {data.category === "Cakes" && (
                    <>
                        <div className="add-price flex-col">
                            <p>Standard Price (₦)</p>
                            <input onChange={onChangeHandler} value={data.standard} type="Number" name='standard' placeholder='3000' required />
                        </div>
                        <div className="add-price flex-col">
                            <p>Foil Price (₦)</p> 
                            <input onChange={onChangeHandler} value={data.foil} type="Number" name='foil' placeholder='3500' required />
                        </div>
                    </>
                )}
            </div>
        )}

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}
export default Add