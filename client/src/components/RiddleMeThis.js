import {useState} from "react";

function RiddleMeThis() {
    const [userAnswer, setUserAnswer] = useState("");
    const [correct, setCorrect] = useState(null);

    const correctAnswers = ["nickel quarter", "quarter nickel"];

    function handleSubmit(e) {
        e.preventDefault();
        let fixedAnswer = userAnswer.trim().toLowerCase();
        for(let i = 0; i < correctAnswers.length; i++) {
            if(fixedAnswer == correctAnswers[i]) {
                setCorrect(true);
                return;
            }
            setCorrect(false);
        }
    }

    return <>
        <h2>Riddle Me This</h2>
        <p>Welcome, fellow visitor of Virtual Pet. I am the Master of Riddles, and I have a riddle to give you. Answer it, and you can win Petbucks!</p>
        {/* Picture of Master of Riddles */}
        <h3>Here is my riddle:</h3>
        <p>"I have two coins that add up to 30 cents. One of them is not a nickel. What are the two coins? (Just write the two coins, with just a space in between them)</p>
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
            <p>You got it! One coin isn't a nickel, but the other one is! Great job!</p>
        }
    </>
}

export default RiddleMeThis;