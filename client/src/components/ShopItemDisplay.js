import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";

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
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShopItemDisplay(props) {
    const classes = useStyles();
    const gid = props.userId;
    const iid = props.itemId;
    const [itemName, setItemName] = useState("");
    const [itemDes, setItemDes] = useState("");
    const [itemPrice, setItemPrice]=useState("");
    const [useCount,setUseCount]=useState("");
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3001/item/${iid}`);
            if (data) {
                setItemName(data.name);
                setItemDes(data.description);
                setItemPrice(data.price);
                setUseCount(data.useCount);
            }
        };
        fetchData();
    });
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={iid}>

            <Card className={classes.card} variant="outlined">
                {itemName !== "" ? <CardMedia component='img' src={require(`../assets/store_pics/${itemName}.png`)} /> : <CardMedia component='img' src={require(`../assets/inv/placeholder.png`)} />}

                <CardContent>
                    <Typography
                        className={classes.titleHead}
                        gutterBottom
                        variant="h6"
                        component="h2"
                    >
                        {itemName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {itemDes}
                        <br/>
                        Price: {itemPrice}
                        <br/>
                        Use count: {useCount}
                    </Typography>
                    <br />
                    <Button variant='contained' onClick={async () => {
                        try {
                            await axios.patch(`http://localhost:3001/AddToInv/${gid}/${iid}`).then((data)=>{
                                props.updateUserMoney(data.data.userMoney);
                            });
                            
                            setError(<Alert>Item added to inventory</Alert>);
                        } catch (error) {
                            if (error.response.status === 400) {
                                setError(<Alert severity="error">{error.response.data.message}</Alert>);
                            }
                        }
                    }}>Buy</Button>
                    <br/>
                    {error}
                </CardContent>

            </Card>
        </Grid>
    );
}

export default ShopItemDisplay;