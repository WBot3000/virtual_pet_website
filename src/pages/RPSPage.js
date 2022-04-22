import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import RPS from "../components/RPS";

function RPSPage() {
    return <>
        <Navigation />
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <RPS/>
    </>
}

export default RPSPage;