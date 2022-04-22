import Navigation from "../components/Navigation";
import PetBox from "../components/PetBox";
import Inventory from "../components/Inventory";

function InventoryPage() {
    return <>
        <Navigation/>
        <PetBox pet={{name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}} money={42}/>
        <Inventory items={[{id: "123", name: "Item1"}, {id: "456", name: "Item2"}, {id:"789", name: "Item3"}, {id:"000", name: "Item4"}, {id:"101", name: "Item5"}]}/>
    </>
}

export default InventoryPage;