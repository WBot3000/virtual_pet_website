import {Link} from "react-router-dom";

function Search() {

    //Dummy data for search functionality (Pet could contain pet data)
    const data = [{id: 1, user: "AwesomeMan", pet: {name: "George"}}, 
    {id: 2, user: "AwesomeWoman", pet: {name: "Clark"}},
    {id: 3, user: "NotBot", pet: {name: "Leslie"}},
    {id: 4, user: "Unicorn Overlord", pet: {name: "Unicorn Underlord"}},
    {id: 5, user: "zzzzz", pet: {name: "George 2.0"}}];

    return <>
        {data.map(person => {
            return <div className='search_results'>
                <h2>{person.user}</h2>
                <img src={require('../assets/lilcat.png')} alt={`${person.user}'s pet, ${person.pet.name}`} className='search_results_images'/>
                <Link to={"/petpage/0"}><p>Go to Pet Page</p></Link> {/* Will be a link to specific pet pages once that system gets set up */}
            </div>
        })}
    </>
}

export default Search;