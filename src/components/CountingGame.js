import {useState, useEffect} from "react";
import CountingGameScreen from "./CountingGameScreen";

function CountingGame() {
    //const [gameState, setGameState] = useState("");
    const [objArray, setObjArray] = useState([]);
    const [shapeToFind, setShapeToFind] = useState("circle");
    const [colorToFind, setColorToFind] = useState("red");
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [responseGiven, setResponseGiven] = useState(false);
    const [responseCorrect, setResponseCorrect] = useState(false);
    const [startTime, setStartTime] = useState(new Date());

    const shapes = ["circle", "triangle", "square"];
    const colors = ["red", "blue", "yellow"];

    useEffect(() => {
        let correctShapeIdx = Math.floor(Math.random() * shapes.length);
        setShapeToFind(shapes[correctShapeIdx]);
        let correctColorIdx = Math.floor(Math.random() * colors.length);
        setColorToFind(colors[correctColorIdx]);
        let arr = [];
        let corr = 0;
        for(let i = 0; i < 50; i++) {
            let shapeIdx = Math.floor(Math.random() * shapes.length);
            let colorIdx = Math.floor(Math.random() * colors.length);
            if(shapes[correctShapeIdx] == shapes[shapeIdx] && colors[correctColorIdx] == colors[colorIdx]) {
                corr++;
            }
            arr.push({shape: shapes[shapeIdx], color: colors[colorIdx]});
        }
        setObjArray(arr);
        setCorrectAnswer(corr);
    }, []);

    function responseMessage() {
        if(responseCorrect) {
            return "Correct!";
        }
        else {
            return "Incorrect...";
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setResponseGiven(true);
        if(currentAnswer == correctAnswer) {
            setResponseCorrect(true);
        }
    }

    return <>
        <h2>Counting Game</h2>
        <p>Count all the {`${colorToFind} ${shapeToFind}s`}</p>
        <CountingGameScreen objects={objArray}/>
        {responseGiven && <p>{responseMessage()}</p>}
        {!responseCorrect &&
            <form onSubmit={handleSubmit}>
                <label>
                    How Many?
                    <br/>
                    <input type="number" onChange={e => setCurrentAnswer(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Check Number
                    <br/>
                    <input type="submit" value="Is this correct?"/>
                </label>
            </form>
        }
    </>
}

export default CountingGame;