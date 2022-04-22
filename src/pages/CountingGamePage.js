import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import CountingGame from "../components/CountingGame";

function CountingGamePage() {
    return <>
        <Navigation />
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <CountingGame/>
    </>
}

export default CountingGamePage;