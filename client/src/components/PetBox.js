import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  bar: {
    height: "100%",
  },
});
function PetBox() {
  const classes = useStyles();
  const data = {
    pet: { name: "Little Cat", hunger: 90, happiness: 80, cleanliness: 80 },
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
          <br />
          <Typography variant="h4">Stats</Typography>
          <Grid item>
            <Grid style={{ width: "500px" }} container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">Hunger: </Typography>
              </Grid>
              <Grid item xs={8}>
                <LinearProgress
                  variant="determinate"
                  value={data.pet.hunger}
                  className={classes.bar}
                  color="success"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">{data.pet.hunger}%</Typography>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid item>
            <Grid style={{ width: "500px" }} container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">Happiness: </Typography>
              </Grid>
              <Grid item xs={8}>
                <LinearProgress
                  variant="determinate"
                  value={data.pet.happiness}
                  className={classes.bar}
                  color="primary"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">{data.pet.happiness}%</Typography>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid item>
            <Grid style={{ width: "500px" }} container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">Hygiene: </Typography>
              </Grid>
              <Grid item xs={8}>
                <LinearProgress
                  variant="determinate"
                  value={data.pet.cleanliness}
                  className={classes.bar}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">{data.pet.cleanliness}%</Typography>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid item>
            <Typography variant="h4">Petbucks: ${data.money}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PetBox;
