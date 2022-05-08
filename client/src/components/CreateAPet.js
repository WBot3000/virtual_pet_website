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
  CardHeader
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
const CreateAPet = (props) => {
  const classes = useStyles();
  const [inputError, setError] = useState(false);
  const buildCard = (datum) => {
    return (
        <Card className={classes.card} variant="outlined">
          <CardHeader className={classes.titleHead}/>
          <CardMedia component='img' src={`${datum.petData.base64_img}`} />
  
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
            </Typography>
          </CardContent>
        </Card>
      );
  };

  const formSubmit = async (e) => {
    //disable form's default behavior
    e.preventDefault();
    //get references to form fields.
    let name = document.getElementById('name').value;
    let options = [];
    props.data.petData.custom_items.forEach(e => {
        if(document.getElementById(e.id).checked){
            options.push(e.id);
        }
      });
    let user = props.data.currentUserID;

    let payload = {name, options, user};

    if (!payload.name.toLowerCase().match(/^[a-z]+$/)){
        setError(true);
        return;
    }

    const { data } = await axios.post('http://localhost:3001/CreatePet', payload, {
      headers: { Accept: 'application/json' }
    });
    console.log(data);
    //TODO NAVIGATE
    //setPostData(data);
    
  };
  let options = props.data.petData.custom_items.map(e => {
    return <label for={e.id}> {e.screen_name}
        <input
            type="checkbox"
            id={e.id}
            name={e.id}
            value={e.id}
        />
    </label> 
  })

  let form = <div>
    <form className={classes.form} id="simple-form" onSubmit={formSubmit}>
        <label>
        Name:
        <input pattern="[A-Za-z]"
            title="Aplha characters only!"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
        />
        </label>
        <br />
        Custom Options:
        {options}
        <br />
        <br />
        <input type="submit" value="Submit" />
    </form>
    </div>;

  let card = buildCard(props.data);
  let error = null;
  if(inputError){
      error = <h2 style={{color:'red', textAlign: 'center'}}>STOP SUBMITTING WRONG STUFF!!</h2>
  }
  return <div>
            {card}
            {form}
            {error}
        </div>;

};

export default CreateAPet;
