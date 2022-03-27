function GamesList() { //TODO: Add links to the individual game pages
    return <>
        <p className="indented">Why not play some games?</p> 
        <div> 
            <dl id="games_list">
                <dt>The Counting Game</dt>
                <dd>Can you count? Well, then this game is for you!</dd>
                <dt>Rock, Paper, Scissors</dt>
                <dd>A classic game. They should add dragons.</dd>
                <dt>Riddle Me This</dt>
                <dd>For those who like to think.</dd>
            </dl>
        </div>
    </>
}

export default GamesList;