import React, { createContext } from 'react'

export const MainState = createContext()

export const DataProvider = ({ children }) => {
    return (
        <MainState.Provider value={"value"}>
            {children}
        </MainState.Provider>
    )
}