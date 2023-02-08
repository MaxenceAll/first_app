import "./PincodeInput.css";

function PincodeInput() {
  const user = { email: "maxence.allart@gmail.com", pincode: 1234 };


  const handleInput = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      e.target.value = "";
      return;
    }
    if (value.length) {
      e.target.disabled = true;
      if (e.target.previousSibling) {
        e.target.previousSibling.type = "password";
      }
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      } else {
        const squares = document.querySelectorAll(".square");
        let pin = "";
        squares.forEach((input) => (pin += input.value));
        console.log(pin);

        if (+pin === +user.pincode) {
          squares.forEach((input) => {
            input.classList.replace("border-dark", "border-success");
            input.classList.replace("border-danger", "border-success");
            input.classList.replace("text-danger", "text-success");
            input.classList.replace("text-dark", "text-success");
          });
          setTimeout(() => {
            e.target.type = "password";
          }, 750);

          document.querySelector(".validateIcon").innerHTML = "✅😜";
          //TODO Changer de screen ...
        } else {
          squares.forEach((input) => {
            input.classList.replace("border-dark", "border-danger");
            input.classList.replace("border-success", "border-danger");
            input.classList.replace("text-success", "text-danger");
            input.classList.replace("text-dark", "text-danger");
          });
          document.querySelector(".validateIcon").innerHTML = "❌😭";
          setTimeout(() => {
            handleClick();
          }, 1750);
        }
      }
    }
  };

  const handleClick = (e) => {
    document.querySelectorAll(".square").forEach((input) => {
      input.value = "";
      input.disabled = false;
      input.type = "text";
      input.classList.replace("border-danger", "border-dark");
      input.classList.replace("border-success", "border-dark");
      input.classList.replace("text-success", "text-dark");
      input.classList.replace("text-danger", "text-dark");
    });
    document.querySelector(".square").focus();
    document.querySelector(".validateIcon").innerHTML = " ";
  };
  
  return (
    <>
        <h4>🔑 Saisir votre code</h4>
        
      <div className="d-flex justify-content-center">

        <input
            id="pin1"
            type="text"
            className="square form-control border border-dark text-dark me-1"
            onInput={handleInput}
            onClick={handleClick}
        >
        </input>
        


        <input
          id="pin2"
          type="text"
          className="square form-control border border-dark text-dark me-1"
          onInput={handleInput}
          onClick={handleClick}
        >

        </input>


        <input
          id="pin3"
          type="text"
          className="square form-control border border-dark text-dark me-1"
          onInput={handleInput}
          onClick={handleClick}
        >

        </input>


        <input
          id="pin4"
          type="text"
          className="square form-control border border-dark text-dark"
          onInput={handleInput}
          onClick={handleClick}
        >

        </input>

        

      </div>

      <span className="validateIcon">   </span>
    </>
  );
}

export default PincodeInput;