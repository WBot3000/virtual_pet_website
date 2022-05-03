function PetBox() {

    const data = {pet: {name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100}, money: 42}

    return (
        <div id='petbox'>
            <p id='pet_name'>{data.pet.name}</p>
            <img src={require('../assets/lilcat.png')} alt='Your Pet' id='pet_img'/>
            <div>
                <p>Stats</p>
                <ul id='stats_list'>
                    <li>Hunger: {data.pet.hunger}</li>
                    <li>Happiness: {data.pet.happiness}</li>
                    <li>Cleanliness: {data.pet.cleanliness}</li>
                </ul>
                <p>Petbucks: ${data.money}</p>
            </div>
        </div>
    );
}

export default PetBox;