import PincodeInput from "../../components/PincodeInput/PincodeInput";
import { useState } from "react";

function LandingScreen(props) {

    const { setScreen } = props;

    return ( 
    <div className="">
        <PincodeInput  setScreen={setScreen} />
    </div> );
}

export default LandingScreen;