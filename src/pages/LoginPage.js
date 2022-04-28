import {useState} from "react";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) { //Currently uses preset for comparison
        e.preventDefault();
        if(username.toLowerCase().trim() != "walkerman" || password.trim() != "funnypassword") {
            setError("Error: Invalid username and password combination :(");
        }
        else {
            setError("Good combination! B)");
        }
    }


    return <div>
        <h2>Login to Virtual Pet</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username: <br/>
                <input type="text" placeholder="Type username here" onChange={(e) => setUsername(e.target.value)}/>
                <br/>
            </label>
            <label>
                Password: <br/>
                <input type="password" placeholder="Type password here" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
            </label>
            <label>
                Submit:
                <input type="submit" value="Enter the world of Virtual Pet!"/>
                <br/>
            </label>
        </form>
        {error && <p>{error}</p>}
    </div>
}

export default LoginPage;