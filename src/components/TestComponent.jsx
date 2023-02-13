import React, { useState, useEffect } from 'react';
import PincodeInput from "@laurent-debug/react-pincode-input/dist/PincodeInput";




function TestComponent() {
  const [count, setCount] = useState(0);
  

  // Équivalent à componentDidMount plus componentDidUpdate :
  useEffect(() => {
    // Mettre à jour le titre du document en utilisant l'API du navigateur
    document.title = `Vous avez cliqué ${count} fois`;
  });

  const onCompleted = (pincode) => {
    console.log(pincode);
  };

  return (
    <div>
      <h1>Bonjour {localStorage.getItem('userMail')}</h1>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>

      <h5 className="text-center pt-2">Saisir votre code secret</h5>
      <PincodeInput  onCompleted={onCompleted}  digitsNumber={4}/>
    </div>
  );
}

export default TestComponent;