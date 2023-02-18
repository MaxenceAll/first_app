import { createContext, useState , useMemo, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    const [auth, setAuth] = useState(null);
    const authMemo = useMemo( ()=> ({ auth, setAuth }), [auth]);


    useEffect(()=>{

        fetch("http://localhost:1337/auth", {credentials: "include"})
            .then ((resp) => resp.json())
            .then ((json) => {
                console.log(json);
                setAuth(json.data);
            })
            .catch((error) => console.log(error));
    },[]);

    return(

        <AuthContext.Provider value={authMemo}>
            {children}
        </AuthContext.Provider>

    );

};

export { AuthContext, AuthProvider };