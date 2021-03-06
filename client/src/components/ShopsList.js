import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import "../App.css";
const useStyles = makeStyles({
  card: {
    minWidth: 150,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #178577",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #178577",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#178577",
    fontWeight: "bold",
    fontSize: 12,
  },
  h3: {
    textAlign: "center",
  },
});

const ShopsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [allShops, setAllShops] = useState([]);
  const [errorOccured, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/allShops`);
        setAllShops(data);
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  if (errorOccured) {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  } else if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <br />
        <Grid container className={classes.grid} spacing={8}>
          {allShops.map((shop) => {
            return (
              <Grid item xs={4} key={shop._id}>
                <Card className={classes.card} variant="outlined">
                  <Link to={`/shop/${shop._id}`}>
                    <CardMedia
                      component="img"
                      title={shop.name}
                      src={require(`../assets/store_pics/${shop.name}.png`)}
                    />

                    <CardContent>
                      <Typography
                        className={classes.titleHead}
                        gutterBottom
                        variant="h6"
                        component="h2"
                      >
                        {shop.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
};

export default ShopsList;
