import {useState, useEffect} from "react";
import axios from 'axios';

function RiddleMeThis() {
    const riddles = [`"I have two coins that add up to 30 cents. One of them is not a nickel. What are the two coins?" (Just write the two coins, with just a space in between them)`,
    `What walks on four legs in the morning, two legs in the afternoon, and three legs in the evening?`,
    `The more you have of it, the less you see. What am I referencing?`]
    const correctAnswers = [["nickel quarter", "quarter nickel"],
            ["man", "person", "a man", "a person"],
            ["darkness", "the dark"]];
    const correctBlurb = ["One coin isn't a nickel, but the other one is!", `This riddle is called "The Riddle of the Sphinx".`, "You can't see when it's dark... unless you eat lots of carrots..."]

    const [riddleIdx, setRiddleIdx] = useState(Math.floor(Math.random() * riddles.length));
    const [ans, setAns] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [correct, setCorrect] = useState(null);

    useEffect(() => {
        setAns(correctAnswers[riddleIdx]);
    }, [riddleIdx]);

    async function addPetBucks(value){
        try{
          await axios.patch(`http://localhost:3001/AddPetBucks/${props.userId}`,{money:value});
        }catch(error){
          console.log(error.response.data.message);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        let fixedAnswer = userAnswer.trim().toLowerCase();
        for(let i = 0; i < ans.length; i++) {
            if(fixedAnswer == ans[i]) {
                setCorrect(true);
                addPetBucks(30);
                return;
            }
        }
        setCorrect(false);
    }

    return <>
        <h2>Riddle Me This</h2>
        <p>Welcome, fellow visitor of Virtual Pet. I am the Master of Riddles, and I have a riddle to give you. Answer it, and you can win Petbucks!</p>
        <h3>Here is my riddle:</h3>
        <p>{riddles[riddleIdx]}</p>
        {!correct &&
            <form onSubmit={handleSubmit}>
                <label>
                    Answer:<br/>
                    <input type="text" onChange={(e) => setUserAnswer(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Submit
                    <input type="submit" name="Submit Answer"/>
                </label>
            </form>
        }
        {correct === false &&
            <p>That's not it! Try again!</p>
        }
        {correct === true &&
            <p>You got it! {correctBlurb[riddleIdx]} Great job! You won PetBucks</p>
        }
    </>
}

export default RiddleMeThis;