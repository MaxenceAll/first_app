import { createContext, useState , useMemo, useEffect } from 'react';

import fetcher from '../helpers/fetcher';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    const [auth, setAuth] = useState(null);
    const authMemo = useMemo( ()=> ({ auth, setAuth }), [auth]);


    useEffect(()=>{
        const doFetch = async() => {
            const resp = await fetcher.get("auth");
            console.log(resp);
            setAuth(resp.data);
        }
        doFetch();
       
    },[]);

    return(

        <AuthContext.Provider value={authMemo}>
            {children}
        </AuthContext.Provider>

    );

};

export { AuthContext, AuthProvider };