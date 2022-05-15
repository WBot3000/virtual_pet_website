import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardHeader,
  Button,
  LinearProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

import "../App.css";
const useStyles = makeStyles({
  bar: {
    height: "100%",
  },
  text: {
    size: "20px",
  },
});
const ViewAPet = (props) => {
  const classes = useStyles();
  const [inputError, setError] = useState(false);
  const [pdfClick, changePdfClicked] = useState(false);

  useEffect(() => {
    console.log("on load useeffect");
    async function fetchData() {
      if (pdfClick) {
        try {
          console.log(props.data.petData);
          console.log("props.data.petData");
          let data = await axios.post(
            `http://localhost:3001/GetAnimalPdf`,
            { data: props.data.petData },
            {
              headers: { responseType: "arraybuffer" },
            }
          );

          let binaryString = window.atob(data.data);

          let binaryLen = binaryString.length;

          let bytes = new Uint8Array(binaryLen);

          for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }

          let blob = new Blob([bytes], { type: "application/pdf" });

          let link = document.createElement("a");

          link.href = window.URL.createObjectURL(blob);
          link.download = "pet.pdf";

          link.click();
        } catch (e) {
          console.log(e);
          setError(true);
        }
      }
    }
    fetchData();
  }, [pdfClick]);

  function getPDF() {
    changePdfClicked(!pdfClick);
  }

  const buildCard = (datum) => {
    console.log(datum);
    return (
      <Card
        style={{
          border: "5px solid",
          margin: "auto",
          height: "1000px",
          width: "50%",
        }}
      >
        <CardHeader
          title={datum.petData.petData.petName}
          style={{ textAlign: "center" }}
          titleTypographyProps={{ variant: "h3" }}
        />
        <CardContent>
          <CardMedia
            src={`${datum.petData.img}`}
            title={datum.petData.petData.petName}
            component="img"
            style={{ width: "50%", margin: "auto" }}
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
            <br />
            <Grid item>
              <Grid style={{ width: "500px" }} container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Hunger: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgress
                    variant="determinate"
                    value={datum.petData.petData.hunger}
                    className={classes.bar}
                    color="success"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    {datum.petData.petData.hunger}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid item>
              <Grid style={{ width: "500px" }} container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Happiness: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgress
                    variant="determinate"
                    value={datum.petData.petData.happiness}
                    className={classes.bar}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    {datum.petData.petData.happiness}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid item>
              <Grid style={{ width: "500px" }} container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">Hygiene: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgress
                    variant="determinate"
                    value={datum.petData.petData.hygiene}
                    className={classes.bar}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    {datum.petData.petData.hygiene}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid item>
              <Grid container spacing={1} className={classes.buttonGroup}>
                <Grid item xs={4}>
                  <Button variant="contained">Feed</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained">Pet</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained">Wash</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained">Kick</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" onClick={() => getPDF()}>
                    PDF
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Link to="/viewpets">
                    <Button variant="contained" color="error">
                      Back
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  let card = buildCard(props.data);
  let error = null;
  if (inputError) {
    error = (
      <h2 style={{ color: "red", textAlign: "center" }}>
        SOMETHING WENT WRONG!!
      </h2>
    );
  }
  return (
    <div>
      <Navigation />
      {card}
      {error}
    </div>
  );
};

export default ViewAPet;
