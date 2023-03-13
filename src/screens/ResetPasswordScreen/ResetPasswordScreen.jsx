import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import './ResetPasswordScreen.css'

function ResetPasswordScreen() {
    
    const [errorMessage, setErrorMessage] = useState("");
    let [searchParams] = useSearchParams();


    async function handleSubmit (e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());
        if (jsonData.pincode1 !== jsonData.pincode2){
            setErrorMessage("The 2 passwords are not the same :(!");
            return
        }else{
            setErrorMessage("");
        }
        const token = searchParams.get('t');
        jsonData.token = token;
        const resp = await fetcher.post("reset", jsonData);
        console.log(resp)
        if (resp.result){
            Navigate("/");
        }
    }

    return ( <>

        <h5>Saisir votre nouveau mot de passe</h5>
        <form onSubmit={handleSubmit}>

            <div className="mb-1"> 
                <label htmlFor="pincode" className="form-label">
                    Saisir votre nouveau mot de passe :
                </label>
                <input
                    id="pincode1"
                    name="pincode1"
                    type="text"
                    className="form-control"                
                />
            </div>

            <div className="mb-3"> 
                <label htmlFor="pincode" className="form-label">
                    Saisir à nouveau votre nouveau mot de passe :
                </label>
                <input
                    id="pincode2"
                    name="pincode2"
                    type="text"
                    className="form-control"                
                />
            </div>

            <div className="d-flex">
                <div className="text-danger">{errorMessage}</div>
                <button type="submit" className="btn btn-primary ms-auto">
                    Valider 
                </button>               

            </div>
        </form>

    </> );
}

export default ResetPasswordScreen;