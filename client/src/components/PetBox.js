import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Stack,
} from "@mui/material";
function PetBox() {
  const data = {
    pet: { name: "Little Cat", hunger: 100, happiness: 100, cleanliness: 100 },
    money: 42,
  };

  return (
    <Card style={{ border: "5px solid", margin: "5px", height: "60%" }}>
      <CardHeader
        title={data.pet.name}
        style={{ textAlign: "center" }}
        titleTypographyProps={{ variant: "h3" }}
      />
      <CardContent>
        <CardMedia
          image={require("../assets/lilcat.png")}
          title="Your Pet"
          component="img"
          style={{ width: "70%", margin: "auto" }}
        />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "80vh" }}
        >
          {" "}
          <p>Stats</p>
          <ul id="stats_list">
            <li>Hunger: {data.pet.hunger}</li>
            <li>Happiness: {data.pet.happiness}</li>
            <li>Cleanliness: {data.pet.cleanliness}</li>
          </ul>
          <p>Petbucks: ${data.money}</p>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PetBox;
