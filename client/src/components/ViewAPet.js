import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, Navigate } from 'react-router-dom';
import user from "../data_access_layer/user";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  Button
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
  form: {
    textAlign: 'center'
}
});
const ViewAPet = (props) => {
  const classes = useStyles();
  const [inputError, setError] = useState(false);
  const [onPetCreated, setPetId] = useState(null);
  const buildCard = (datum) => {
    console.log(datum)
    return (
        <Card className={classes.card} variant="outlined">
          <CardHeader className={classes.titleHead}/>
          <CardMedia component='img' src={`${datum.petData.img}`} />
          <h3 style={{textAlign: 'center'}}>{datum.petData.petData.petName}</h3>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
            </Typography>
          </CardContent>
          <Button variant="contained">Feed</Button>
          <Button variant="contained">Pet</Button>
          <Button variant="contained">Wash</Button>
          <Button variant="contained">Kick</Button>
        </Card>
      );
  };

  let card = buildCard(props.data);
  let error = null;
  if(inputError){
      error = <h2 style={{color:'red', textAlign: 'center'}}>STOP SUBMITTING WRONG STUFF!!</h2>
  }
  return <div>
            {card}
            {error}
        </div>;

};

export default ViewAPet;
