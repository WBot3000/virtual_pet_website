import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import GamesList from "../components/GamesList";

function GameListPage() {
    return <>
        <Navigation/>
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <GamesList/>
    </>
}

export default GameListPage;