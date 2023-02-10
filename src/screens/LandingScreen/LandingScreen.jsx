import PincodeInput from "../../components/PincodeInput/PincodeInput";
import { useState } from "react";

function LandingScreen(props) {

    const { setScreen } = props;

    return ( 
    <div className="text-center pt-2">
        <PincodeInput  setScreen={setScreen} />
    </div> );
}

export default LandingScreen;