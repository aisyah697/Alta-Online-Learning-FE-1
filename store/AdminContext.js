import React, { createContext, useState } from 'react';

export const AdminStoreContext = createContext(null);

export default ({children}) => {
    const [login, setLogin] = useState([])
    const [token, setToken] = useState([])
    const [admin, setAdmin] = useState([])
    const [list, setList] = useState([])

    const store = {
        login_: [login, setLogin],
        token_: [token, setToken],
        admin_: [admin, setAdmin],
        list_: [list, setList]
    }

    return <AdminStoreContext.Provider value={store}>{children}</AdminStoreContext.Provider>
}