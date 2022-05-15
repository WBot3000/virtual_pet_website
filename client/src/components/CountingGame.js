import { useState, useEffect } from "react";
import CountingGameScreen from "./CountingGameScreen";
import { Paper } from "@mui/material";
import axios from "axios";


function CountingGame(props) {
  //const [gameState, setGameState] = useState("");
  const [objArray, setObjArray] = useState([]);
  const [shapeToFind, setShapeToFind] = useState("circle");
  const [colorToFind, setColorToFind] = useState("red");
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [responseGiven, setResponseGiven] = useState(false);
  const [responseCorrect, setResponseCorrect] = useState(false);

  const [startTime, setStartTime] = useState(Date.now());
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [score, setScore] = useState(0);

  const shapes = ["circle", "triangle", "square"];
  const colors = ["red", "blue", "yellow"];

  useEffect(() => {
    let correctShapeIdx = Math.floor(Math.random() * shapes.length);
    setShapeToFind(shapes[correctShapeIdx]);
    let correctColorIdx = Math.floor(Math.random() * colors.length);
    setColorToFind(colors[correctColorIdx]);
    let arr = [];
    let corr = 0;
    for (let i = 0; i < 50; i++) {
      let shapeIdx = Math.floor(Math.random() * shapes.length);
      let colorIdx = Math.floor(Math.random() * colors.length);
      if (
        shapes[correctShapeIdx] == shapes[shapeIdx] &&
        colors[correctColorIdx] == colors[colorIdx]
      ) {
        corr++;
      }
      arr.push({ shape: shapes[shapeIdx], color: colors[colorIdx] });
    }
    setObjArray(arr);
    setCorrectAnswer(corr);
  }, []);

  function responseMessage() {
    if (responseCorrect) {
      return "Correct! You won PetBucks";
    } else {
      return "Incorrect...";
    }
  }

  async function addPetBucks(value){
    try{
      await axios.patch(`http://localhost:3001/AddPetBucks/${props.userId}`,{money:value});
    }catch(error){
      console.log(error.response.data.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setResponseGiven(true);
    if (currentAnswer == correctAnswer) {
      setResponseCorrect(true);
      let secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
      let scoreCalculation = Math.max(
        1000 - secondsElapsed - penaltyCount * 100,
        0
      );
      setScore(scoreCalculation);
      addPetBucks(20);
    } else {
      setPenaltyCount(penaltyCount + 1);
    }
  }

  return (
    <>
      <Paper
        style={{
          maxHeight: 875,
          overflow: "auto",
          border: "5px black solid",
          margin: 5,
        }}
      >
        <h2>Counting Game</h2>
        <p>
          Count all the {`${colorToFind} ${shapeToFind}s`}{" "}
          <img
            src={require(`../assets/counting_pics/${shapeToFind}_${colorToFind}.png`)}
            id="sample_shape"
            title="Count all these!"
          />
        </p>
        <CountingGameScreen objects={objArray} />
        {responseGiven && <p>{responseMessage()}</p>}
        {responseCorrect && <p>You scored {score}!</p>}
        {!responseCorrect && (
          <form onSubmit={handleSubmit}>
            <label>
              How Many?
              <br />
              <input
                type="number"
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            </label>
            <br />
            <label>
              Check Number
              <br />
              <input type="submit" value="Is this correct?" />
            </label>
          </form>
        )}
      </Paper>
    </>
  );
}

export default CountingGame;
