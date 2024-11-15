import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

    const [global, setGlobal] = useState();
    const [refCount, setRefCount] = useState(0);
    console.log("Global Data is ", global)

    return (
        <>
            <GlobalContext.Provider value={{ global, setGlobal, refCount, setRefCount }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}
