import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, Navigate } from 'react-router-dom';
import MuiAlert from "@material-ui/lab/Alert";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import '../App.css';
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #178577',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #178577',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#178577',
    fontWeight: 'bold',
    fontSize: 12
  },
  h3: {
      textAlign: 'center'
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} 
                   variant="filled" {...props} />;
}

const ViewPetList = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [petImages, setImages] = useState(null);
  const [allPetData, setData] = useState([]);
  const [errorOccured, setError] = useState(false);

  let card = null;

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        const {data} = await axios.get(`http://localhost:3001/GetAllUserPetIds/${props.user_id}`);
        setData(data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        let images = [];
        for (let pet of allPetData) {
            let imageData = await axios.get(`http://localhost:3001/GetPetImage/${props.user_id}/${pet.petName}`);
            images.push({id: pet.petName, img_data: imageData});
        }

        setImages(images);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, [loading]);

  const buildCard = (datum) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={datum.id}>
        <Card className={classes.card} variant="outlined">
        <Link to={`/viewpets/${datum.id}`}>
            
            <CardMedia component='img' src={`${datum.img_data.data.image}`} />

              <CardContent>
                <Typography
                  className={classes.titleHead}
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  {datum.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  
                </Typography>
              </CardContent>
              <h3 className={classes.h3}>{datum.id}</h3>
          </Link>
          
        </Card>
      </Grid>
    );
  };
    let error = null;
    if(errorOccured){
      error = <Alert severity="error">Unable to get your pets!</Alert>
    }
    else if (loading || !petImages) {
        return (
        <div>
            <h2>Loading....</h2>
        </div>
        );
    }

    else if(petImages){
        card =
        petImages &&
        petImages.map((datum) => {
            return buildCard(datum);
        });
    }

    
    
    return (
      <div>
        {error}
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
      </div>
    );
};

export default ViewPetList;
