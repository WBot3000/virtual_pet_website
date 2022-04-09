import {useEffect, useState} from 'react';

function RPS(props) {
    // const [gameStart, setGameStart] = useState(false);
    // const [maxWager, setMaxWager] = useState(0);
    // const [wager, setWager] = useState(0);
    const [playerSelect, setPlayerSelect] = useState("none_selected");
    const [cpuSelect, setCPUSelect] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        if(playerSelect == "none_selected") {
            console.log("Please select a valid option");
        }
        else {
            let rpsArr = ["rock", "paper", "scissors"];
            let cpuChoice = rpsArr[Math.floor(Math.random() * rpsArr.length)];
            console.log(`You chose ${playerSelect}. CPU chose ${cpuChoice}`);
            if(playerSelect == cpuChoice) {
                console.log("You guys tied!");
            }
            else if((playerSelect == "rock" && cpuChoice == "scissors") || (playerSelect == "paper" && cpuChoice == "rock") || (playerSelect == "scissors" && cpuChoice == "paper")) {
                console.log("You won!");
            }
            else {
                console.log("You lost...");
            }
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
        <p>Select Rock, Paper, or Scissors</p>
        {playerSelect && <img src={require(`../assets/rps_pics/${playerSelect}.png`)} alt={`${playerSelect}`}/>}
        <form onSubmit={handleSubmit}>
            <label>
                Choose Here:
                <select value={playerSelect} onChange={e => setPlayerSelect(e.target.value)}>
                    <option value="none_selected">Pick One!</option>
                    <option value="rock">Rock</option>
                    <option value="paper">Paper</option>
                    <option value="scissors">Scissors</option>
                </select>
            </label>
            <label>
                Go!
                <input type="submit" value="Rock Paper Scissors And..."/>
            </label>
        </form>
    </>
}

export default RPS;