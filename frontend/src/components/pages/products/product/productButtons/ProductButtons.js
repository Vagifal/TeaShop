import React from 'react'
import { Link } from 'react-router-dom'
import './ProductButtons.css'

function ProductButtons({ product }) {
    return (
        <div className="product-buttons">
            <Link id="button-buy" to="#!">Buy</Link>
            <Link id="button-view" to={`/detail/${product._id}`}>View</Link>
        </div>
    )
}

export default ProductButtons