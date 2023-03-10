import React, { useContext, useState } from 'react'
import { MainState } from '../../../MainState';
import Product from './product/Product';
import './Products.css';

const Products = () => {
    const state = useContext(MainState)
    const [products, setProducts] = state.productsAPI.products

    return (
        <div className="products">
            {
                products.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    )
};

export default Products;