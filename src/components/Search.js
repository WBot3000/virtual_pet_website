import {useState} from "react";
import {Link} from "react-router-dom";

function Search() {

    //Dummy data for search functionality (Pet could contain pet data)
    const data = [{id: 1, user: "AwesomeMan", pet: {name: "George"}}, 
    {id: 2, user: "AwesomeWoman", pet: {name: "Clark"}},
    {id: 3, user: "NotBot", pet: {name: "Leslie"}},
    {id: 4, user: "Unicorn Overlord", pet: {name: "Unicorn Underlord"}},
    {id: 5, user: "zzzzz", pet: {name: "George 2.0"}}];

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(data);

    function submitSearch(e) {
        e.preventDefault();
        if(searchTerm.trim() == "") {
            setSearchResults(data);
        }
        else {
            let results = data.filter(result => {return result.user.toLowerCase().startsWith(searchTerm.toLowerCase().trim())});
            setSearchResults(results);
        }
    }

    return <>
        <form onSubmit={submitSearch}>
            <label>
                Search Term:
                <br/>
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
            </label>
            <br/>
            <label>
                Search For Pet:
                <input type="submit" name="Search!"/>
            </label>
        </form>
        {searchResults.map(person => {
            return <div className='search_results'>
                <h2>{person.user}</h2>
                <img src={require('../assets/lilcat.png')} alt={`${person.user}'s pet, ${person.pet.name}`} className='search_results_images'/>
                <Link to={"/petpage/0"}><p>Go to Pet Page</p></Link> {/* Will be a link to specific pet pages once that system gets set up */}
            </div>
        })}
    </>
}

export default Search;