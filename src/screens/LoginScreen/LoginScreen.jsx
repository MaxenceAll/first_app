import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import useCookie from "../../hooks/useCookie";

function LoginScreen(props) 
{
    // const[auth, setAuth] = useLocalStorage("auth",null);
    const {auth, setAuth} = useContext(AuthContext);
    const [authCookie, setAuthCookie] = useCookie("auth");


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());
        const body = JSON.stringify(jsonData);
        fetch("http://localhost:1337/login" , {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body,
        })
            .then (resp=>resp.json())
            .then(json=> {
                console.log(json);
                console.log("jsondata: "+JSON.stringify(json.data));
                setAuth(json.data);
                setAuthCookie(json.token ?? null, {"max-age":`${60*60*24}`});
            })
                
            .catch(error => console.error(error))
    };

    const handleLogout = (e) => {
        setAuth(null);
        setAuthCookie(null);
    }

    return ( 
    <>
    {auth && (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    )}
    {!auth && (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input 
                    id="email" 
                    type="email" 
                    name="email"
                    className="form-control" 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <input 
                    id="pincode"
                    name="pincode"
                    type="text" 
                    className="form-control" 
                />
            </div>

            


            <button type="submit" className="btn btn-primary mx-2">
                Login
            </button>

            <button className="btn btn-primary mx-2" onClick={handleLogout}> 
                Logout
            </button>

        </form>
    )}
    </>);
}

export default LoginScreen;