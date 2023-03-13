import PincodeInput from "../../components/PincodeInput/PincodeInput";
import LoginScreen from "../LoginScreen/LoginScreen";

function LandingScreen(props) {

    const { setScreen } = props;

    return ( 
    <div className="text-center pt-2">
        <LoginScreen />
        {/* <PincodeInput  setScreen={setScreen} /> */}
    </div> );
}

export default LandingScreen;