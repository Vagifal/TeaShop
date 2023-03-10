import React, { createContext, useState } from 'react'
import ProductAPI from './API/ProductAPI'

export const MainState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
    }

    return (
        <MainState.Provider value={state}>
            {children}
        </MainState.Provider>
    )
}