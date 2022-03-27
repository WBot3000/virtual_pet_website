import { useState, useEffect } from 'react';

function PetBox(props) {

    const [pet, setPet] = useState(undefined);
    const [money, setMoney] = useState(0);

    useEffect(() => {
        setPet(props.pet);
        setMoney(props.money);
    }, [pet, money]);

    const petName = pet === undefined ? "Name Here" : pet.name;
    const petHunger = pet === undefined ? 100 : pet.hunger;
    const petHappiness = pet === undefined ? 100 : pet.happiness;
    const petCleanliness = pet === undefined ? 100 : pet.cleanliness

    return (
        <div id='petbox'>
            <p id='pet_name'>{petName}</p>
            <img src={require('../assets/lilcat.png')} alt='Your Pet' id='pet_img'/>
            <div>
                <p>Stats</p>
                <ul id='stats_list'>
                    <li>Hunger: {petHunger}</li>
                    <li>Happiness: {petHappiness}</li>
                    <li>Cleanliness: {petCleanliness}</li>
                </ul>
                <p>Petbucks: ${money}</p>
            </div>
        </div>
    );
}

export default PetBox;