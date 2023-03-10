import React from 'react'
import './Product.css';
import ProductButtons from './productButtons/ProductButtons'

const Product = ({ product }) => {
    return (
        <div className="product">
            <img src={product.image.url} alt={product.title} />

            <div className="product-info">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <ProductButtons product={product} />
        </div>
    )
};

export default Product;