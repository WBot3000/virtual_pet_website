import {Link} from "react-router-dom";

function GamesList() { //TODO: Add links to the individual game pages
    return <>
        <p className="indented">Why not play some games?</p> 
        <div> 
            <dl id="games_list">
                <dt><Link to="/games/counting">The Counting Game</Link></dt>
                <dd>Can you count? Well, then this game is for you!</dd>
                <dt><Link to="/games/rps">Rock, Paper, Scissors</Link></dt>
                <dd>A classic game. They should add dragons.</dd>
                <dt><Link to="/games/riddlemethis">Riddle Me This</Link></dt>
                <dd>For those who like to think.</dd>
            </dl>
        </div>
    </>
}

export default GamesList;