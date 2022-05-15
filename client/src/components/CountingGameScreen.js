import {useState, useEffect} from 'react';

function CountingGameScreen(props) {
    const [objArray, setObjArray] = useState([]);

    useEffect(() => {
        setObjArray(props.objects);
    });

    return <div id="counting_game_screen">
        {objArray.map((obj,index) => {
            return <img src={require(`../assets/counting_pics/${obj.shape}_${obj.color}.png`)} alt={`${obj.color} ${obj.shape}`} key={index}/>
        })}
    </div>
}

export default CountingGameScreen;