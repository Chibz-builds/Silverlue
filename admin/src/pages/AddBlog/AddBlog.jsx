import React, { useState } from 'react'
import './AddBlog.css' // Create this css file or reuse add.css
import axios from "axios"
import { toast } from 'react-toastify'

const AddBlog = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        content: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/blog/add`, formData);
        
        if (response.data.success) {
            setData({ title: "", content: "" })
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
                    <p>Upload Blog Cover</p>
                    <label htmlFor="image" style={{cursor:'pointer', border:'2px dashed #ccc', width:'100%', maxWidth:'300px', height:'150px', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', backgroundColor:'#f8f9fa'}}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}}/>
                        ) : (
                            <p style={{color:'#ccc'}}>Click to Upload</p>
                        )}
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Blog Title</p>
                    <input onChange={onChangeHandler} value={data.title} type="text" name='title' placeholder='e.g., The Secret to Our Banana Bread' required />
                </div>

                <div className="add-product-description flex-col">
                    <p>Blog Content</p>
                    <textarea onChange={onChangeHandler} value={data.content} name="content" rows="10" placeholder='Write your article here...' required></textarea>
                </div>

                <button type='submit' className='add-btn'>PUBLISH BLOG</button>
            </form>
        </div>
    )
}

export default AddBlog