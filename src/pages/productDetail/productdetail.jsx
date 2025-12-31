import React, { useContext, useState, useEffect } from 'react'
import './ProductDetail.css'
import { StoreContext } from '../../context/StoreContext'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, url, addToCart } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // 1. LOAD PRODUCT & SET DEFAULT SIZE
  useEffect(() => {
    if (food_list.length > 0) {
        const foundProduct = food_list.find(item => item._id === id);
        setProduct(foundProduct);

        // If the product has sizes, automatically select the first available one
        if (foundProduct && foundProduct.sizes) {
            const sizeOrder = ['micro', 'mini', 'midi', 'standard', 'foil'];
            // Find the first size that has a price > 0
            const defaultSize = sizeOrder.find(size => foundProduct.sizes[size] > 0);
            if (defaultSize) {
                setSelectedSize(defaultSize);
            }
        }
    }
  }, [id, food_list]);

  if (!product) {
    return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Loading...</div>;
  }

  // 2. DYNAMIC PRICE CALCULATOR
  const getPrice = () => {
      // If it's a sized product, show the price of the selected size
      if (selectedSize && product.sizes && product.sizes[selectedSize]) {
          return product.sizes[selectedSize];
      }
      // If it's a single-price product (Meals/Pastries), show the base price
      return product.price; 
  }

  const currentPrice = getPrice();

  // Helper to define all possible buttons
  const allSizes = [
      { key: 'micro', label: 'Micro' },
      { key: 'mini', label: 'Mini' },
      { key: 'midi', label: 'Midi' },
      { key: 'standard', label: 'Standard' },
      { key: 'foil', label: 'Foil' }
  ];

  return (
    <div className='product-detail' style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        paddingTop: '20px',
        paddingLeft: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%' 
    }}>
        
      {/* BACK ARROW */}
      <div 
        onClick={() => navigate(-1)} 
        style={{
            alignSelf: 'flex-start',
            display:'inline-flex', 
            alignItems:'center', 
            gap:'10px', 
            cursor:'pointer', 
            marginBottom: '20px', 
            fontSize:'16px',
            fontWeight:'600',
            color:'#ccc'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'tomato'}
        onMouseOut={(e) => e.currentTarget.style.color = '#ccc'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Menu
      </div>

      <div className="product-detail-container" style={{ alignSelf: 'center' }}>
        
        {/* IMAGE */}
        <div className="product-image-container">
          <img 
            src={product.image.startsWith('http') ? product.image : `${url}/images/${product.image}`} 
            alt={product.name} 
            className="product-detail-image" 
          />
        </div>

        {/* DETAILS */}
        <div className="product-info-container">
          <h1 className="product-title">{product.name}</h1>
          
          <p className="product-price">₦{currentPrice}</p>
          
          <p className="product-description">{product.description}</p>

          {/* 3. CONDITIONAL SIZE RENDERING */}
          {/* Only show this section if the product actually HAS sizes saved in the DB */}
          {product.sizes && (
            <div className="size-selection">
                <p>Size:</p>
                <div className="size-options">
                    {allSizes.map((sizeObj) => {
                        // CHECK: Only show button if price > 0
                        if (product.sizes[sizeObj.key] > 0) {
                            return (
                                <button 
                                    key={sizeObj.key}
                                    className={`size-btn ${selectedSize === sizeObj.key ? 'active' : ''}`} 
                                    onClick={() => setSelectedSize(sizeObj.key)}
                                >
                                    {sizeObj.label} (₦{product.sizes[sizeObj.key]})
                                </button>
                            )
                        }
                        return null; // Hide button if price is 0
                    })}
                </div>
            </div>
          )}

          <div className="quantity-cart-section">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
            
            <button 
                className="add-to-cart-btn" 
                onClick={() => addToCart(product._id, selectedSize, quantity)}
            >
                Add To Cart
            </button>
          </div>

           <div className="additional-info">
             <p><strong>Category:</strong> {product.category}</p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail