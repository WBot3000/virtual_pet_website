import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Paper,
  List,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Alert(props) {
  return <MuiAlert elevation={6} 
                   variant="filled" {...props} />;
}

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [errorOccured, setError] = useState(false);
  const [allAnimals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        const {data} = await axios.get(`http://localhost:3001/GetAllUsers`);
        console.log(data);
        let animals = [];

        for (let e of data){
          let user = e.username;
          for (let userPet of e.pets){
            let pet = {name: userPet.petName, petId: userPet.petId, options: userPet.options};
            let payload = {petId: pet.petId, options: pet.options}
            console.log("payload")
            console.log(payload)
            const { data } = await axios.post('http://localhost:3001/GetPetImageFromOptions', payload, {
              headers: { Accept: 'application/json' }
            });
            let newAnimals = allAnimals;
            animals.push({user, pet, img_data: data.img_data});
            console.log(animals)
          }
        }
        setAnimals(animals);
        setSearchResults(animals);
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    if (searchTerm.trim() == "") {
      setSearchResults(allAnimals);
    } else {
      let results = allAnimals.filter((result) => {
        return result.user
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase().trim());
      });
      setSearchResults(results);
    }
  }

  let error = null;
  if(errorOccured){
    error = <Alert severity="error">Unable to get pets!</Alert>
    return (
      <div>
          {error}
          <h2>Loading....</h2>
      </div>
      );
  }

  else if (loading) {
      return (
      <div>
          <h2>Loading....</h2>
      </div>
      );
  }
  else{
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
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            <Typography variant="h2">Search Pets</Typography>
            <label for="searchbar"></label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton id="searchbar" onClick={submitSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "80%", margin: "5px", alignSelf: "center" }}
            />
            <List>
              {searchResults.map((person) => {
                return (
                  <div className="search_results">
                    <h2>{person.user} - {person.pet.name}</h2>
                    <img
                      src={person.img_data}
                      alt={`${person.user}'s pet, ${person.pet.name}`}
                      className="search_results_images"
                    />
                  </div>
                );
              })}
            </List>
          </Grid>
        </Paper>
      </>
    );
  }
  
}

export default Search;
