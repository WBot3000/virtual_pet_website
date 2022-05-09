import { useState } from "react";
import { Link } from "react-router-dom";
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

function Search() {
  //Dummy data for search functionality (Pet could contain pet data)
  const data = [
    { id: 1, user: "AwesomeMan", pet: { name: "George" } },
    { id: 2, user: "AwesomeWoman", pet: { name: "Clark" } },
    { id: 3, user: "NotBot", pet: { name: "Leslie" } },
    { id: 4, user: "Unicorn Overlord", pet: { name: "Unicorn Underlord" } },
    { id: 5, user: "zzzzz", pet: { name: "George 2.0" } },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  function submitSearch(e) {
    e.preventDefault();
    if (searchTerm.trim() == "") {
      setSearchResults(data);
    } else {
      let results = data.filter((result) => {
        return result.user
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase().trim());
      });
      setSearchResults(results);
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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          <Typography variant="h2">Search Pets</Typography>
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={submitSearch}>
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
                  <h2>{person.user}</h2>
                  <img
                    src={require("../assets/lilcat.png")}
                    alt={`${person.user}'s pet, ${person.pet.name}`}
                    className="search_results_images"
                  />
                  <Link to={"/petpage/0"}>
                    <p>Go to Pet Page</p>
                  </Link>{" "}
                  {/* Will be a link to specific pet pages once that system gets set up */}
                </div>
              );
            })}
          </List>
        </Grid>
      </Paper>
    </>
  );
}

export default Search;
