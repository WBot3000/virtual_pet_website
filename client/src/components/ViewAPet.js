import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [pdfClick, changePdfClicked] = useState(false);

  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
        if(pdfClick){
          try {
              console.log(props.data.petData);
              console.log('props.data.petData');
              let data = await axios.post(`http://localhost:3001/GetAnimalPdf`, {data: props.data.petData}, {
                headers: { responseType:'arraybuffer' },  
              })
              
              let binaryString = window.atob(data.data);

              let binaryLen = binaryString.length;

              let bytes = new Uint8Array(binaryLen);

              for (let i = 0; i < binaryLen; i++) {
                  let ascii = binaryString.charCodeAt(i);
                  bytes[i] = ascii;
              }

              let blob = new Blob([bytes], {type: "application/pdf"});

              let link = document.createElement('a');

              link.href = window.URL.createObjectURL(blob);
              link.download = 'pet.pdf';

              link.click();
            } catch (e) {
              console.log(e)
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
          <h3>Happiness: {datum.petData.petData.happiness}</h3>
          <h3>Hunger: {datum.petData.petData.hunger}</h3>
          <h3>Hygiene: {datum.petData.petData.hygiene}</h3>
          <Button variant="contained">Feed</Button>
          <Button variant="contained">Pet</Button>
          <Button variant="contained">Wash</Button>
          <Button variant="contained">Kick</Button>
          <Button variant="contained" onClick={() => getPDF()}>PDF</Button>
        </Card>
      );
  };

  let card = buildCard(props.data);
  let error = null;
  if(inputError){
      error = <h2 style={{color:'red', textAlign: 'center'}}>SOMETHING WENT WRONG!!</h2>
  }
  return <div>
            {card}
            {error}
        </div>;

};

export default ViewAPet;
