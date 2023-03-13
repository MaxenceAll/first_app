import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import useCookie from "../../hooks/useCookie";
import fetcher from "../../helpers/fetcher";
import { Modal } from "bootstrap";

import './LoginScreen.css'

function LoginScreen(props) {
  // const[auth, setAuth] = useLocalStorage("auth",null);
  const { auth, setAuth } = useContext(AuthContext);
  const [authCookie, setAuthCookie] = useCookie("auth");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    // const body = JSON.stringify(jsonData);
    const resp = await fetcher.post("login", jsonData);
    // console.log(resp);
    setAuth(resp.data);
    setAuthCookie(resp.token ?? null, { "max-age": `${60 * 60 * 24}` });
  };

  const handleLogout = (e) => {
    setAuth(null);
    setAuthCookie(null);
  };

  const handleFogottenPassword = (e) => {
    const modal = new Modal ("#lostPasswordModal")
    modal.show();
  };

  const handleRenewPassword = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const resp = await fetcher.post("renew", jsonData);
    console.log(resp)
    document.querySelector('button:[data-bs-dismiss="modal"]').click();
  }

  return (
    <>
      {auth && (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      )}
      {!auth && (
        <>
          <form className="loginform--container" onSubmit={handleSubmit}>
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

            <div className="mb-4 text-center text-decoration-underline">
              <span role="button" onClick={handleFogottenPassword}>
                Mot de passe oublié ?
              </span>
            </div>

            <button type="submit" className="btn btn-primary mx-2">
              Login
            </button>

            <button className="btn btn-primary mx-2" onClick={handleLogout}>
              Logout
            </button>
          </form>

          <div className="modal" tabIndex="-1" id="lostPasswordModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title">
                    Renouveler votre mot de passe ?
                  </h6>
                </div>
                <div className="modal-body">
                  <i>Envoyer les instructions sur l'adresse mail suivante ?</i>{" "}
                  <form onSubmit={handleRenewPassword}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="votre adresse email"
                      required
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Non
                      </button>
                      <button type="submit" className="btn btn-success">
                        Oui
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginScreen;
