import {useEffect, useState} from 'react';
import axios from 'axios';

function RPS(props) {
    // const [gameStart, setGameStart] = useState(false);
    // const [maxWager, setMaxWager] = useState(0);
    // const [wager, setWager] = useState(0);
    const [playerSelect, setPlayerSelect] = useState("none_selected");
    const [cpuSelect, setCPUSelect] = useState("none_selected");
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const [resultMessage, setResultMessage] = useState("You guys tied!");

    async function addPetBucks(value){
        try{
          await axios.patch(`http://localhost:3001/AddPetBucks/${props.userId}`,{money:value});
        }catch(error){
          console.log(error.response.data.message);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        if(playerSelect == "none_selected") {
            console.log("Please select a valid option");
        }
        else {
            let rpsArr = ["rock", "paper", "scissors"];
            let cpuChoice = rpsArr[Math.floor(Math.random() * rpsArr.length)];
            setCPUSelect(cpuChoice);
            //console.log(`You chose ${playerSelect}. CPU chose ${cpuSelect}`);
            if(playerSelect == cpuChoice) {
                setResultMessage("You guys tied!");
            }
            else if((playerSelect == "rock" && cpuChoice == "scissors") || (playerSelect == "paper" && cpuChoice == "rock") || (playerSelect == "scissors" && cpuChoice == "paper")) {
                setResultMessage("You won! You received PetBucks");
                addPetBucks(10);
            }
            else {
                setResultMessage("You lost...");
            }
            setAlreadyPlayed(true);
        }
    }
    // if(!gameStart) {
    //     return <>
    //         <p>Welcome to Rock Paper Scissors! How much will you wager today?</p>
    //         <form>
    //             <Label>
    //                 Amount
    //                 <input type={"number"} />
    //             </Label>
    //         </form>
    //     </>
    // }

    return <>
        <h2>Rock, Paper, Scissors</h2>
        <p>Select Rock, Paper, or Scissors</p>
        <p>Your Choice:</p>
        <img src={require(`../assets/rps_pics/${playerSelect}.png`)} alt={`Your selection, which is ${playerSelect}`}/>
        <p>Opponent's Choice:</p>
        <img src={require(`../assets/rps_pics/${cpuSelect}.png`)} alt={`The opponent's selection, which is ${cpuSelect}`}/>
        {!alreadyPlayed &&
            <form onSubmit={handleSubmit}>
                <label>
                    Choose Here:
                    <br/>
                    <select value={playerSelect} onChange={e => setPlayerSelect(e.target.value)}>
                        <option value="none_selected">Pick One!</option>
                        <option value="rock">Rock</option>
                        <option value="paper">Paper</option>
                        <option value="scissors">Scissors</option>
                    </select>
                </label>
                <br/>
                <label>
                    Go!
                    <br/>
                    <input type="submit" value="Rock Paper Scissors And..."/>
                </label>
            </form>
        }
        {alreadyPlayed &&
            <>
                <p>{`You chose ${playerSelect}. CPU chose ${cpuSelect}`}</p>
                <p>{resultMessage}</p>
            </>
        }
    </>
}

export default RPS;