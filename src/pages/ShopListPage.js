import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import ShopsList from "../components/ShopsList";

function ShopListPage() {
    return <>
        <Navigation/>
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <ShopsList/>
    </>
}

export default ShopListPage;