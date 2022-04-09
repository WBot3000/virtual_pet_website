import {useState, useEffect} from "react";
import CountingGameScreen from "./CountingGameScreen";

function CountingGame() {
    //const [gameState, setGameState] = useState("");
    const [objArray, setObjArray] = useState([]);
    const [shapeToFind, setShapeToFind] = useState("circle");
    const [colorToFind, setColorToFind] = useState("red");
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
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
            if(shapeToFind == shapes[shapeIdx] && colorToFind == colors[colorIdx]) {
                corr++;
            }
            arr.push({shape: shapes[shapeIdx], color: colors[colorIdx]});
        }
        setObjArray(arr);
        setCorrectAnswer(corr);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if(currentAnswer == correctAnswer) {
            console.log("Correct!");
        }
        else {
            console.log("Incorrect...");
        }
    }

    return <>
        <p>Count all the {`${colorToFind} ${shapeToFind}s`}</p>
        <CountingGameScreen objects={objArray}/>
        <form onSubmit={handleSubmit}>
            <label>
                How Many?
                <input type="number" onChange={e => setCurrentAnswer(e.target.value)}/>
            </label>
            <label>
                Check Number
                <input type="submit" value="Is this correct?"/>
            </label>
        </form>
    </>
}

export default CountingGame;