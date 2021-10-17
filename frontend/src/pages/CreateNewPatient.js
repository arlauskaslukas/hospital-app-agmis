import { Alert, AlertTitle, Button, Container, Divider, Grid, Paper, TextField } from '@mui/material';
import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Typography } from '@mui/material';
import _ from 'lodash';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme)=>({
    gridItems: {
        marginTop: "20px"
    }
}));

export const CreateNewPatient = () => {
    const styles = useStyles();
    const [FullName, setFullName] = useState("");
    const [Age, setAge] = useState("");
    const [Email, setEmail] = useState("");
    const [Contraindications, setContraindications] = useState("");
    const [nonValid, setnonValid] = useState([]);
    const [Success, setSuccess] = useState(false);
    const handleButtonClick = async() =>
    {
        setSuccess(false);
        if(Validation())
        {
            //logic for axios
            let res = await SendToDB();
            setSuccess(true);
            console.log(res.data);
        }


    }
    const SendToDB = async()=>{
        console.log({FullName, Age, Email, Contraindications});
        axios.post("http://127.0.0.1:8000/api/patients", {
            full_name: FullName,
            age: Age,
            email: Email,
            possible_contraindications: Contraindications
        });
    };
    const Validation = ()=> {
        let isDataValid = true;
        let num_regex = new RegExp("[1-9][0-9]*");
        let email_regex = new RegExp("\\w+@\\w+\\.[a-z]+");
        setnonValid([]);
        if(!_.isString(FullName) || _.isEqual(FullName, ""))
        {
            isDataValid=false;
            setnonValid(oldVals => [...oldVals, "Patient name is either empty or non-string."]);
        }
        if(!_.isString(Email) || !email_regex.test(Email))
        {
            isDataValid=false;
            setnonValid(oldVals => [...oldVals, "Email is either empty or doesn't match the guidelines: example@example.com"]);
        }
        if(!num_regex.test(Age))
        {
            isDataValid=false;
            setnonValid(oldVals => [...oldVals, "Age is either not filled or is not following guidelines"]);
        }
        return isDataValid;
    }
    return (
        <Container>
            <div>
                <h3>Create a new drug entry</h3>
                <div style={{display:'flex', justifyContent:'flex-start', marginBlock:'20px'}}>
                    <Button variant="outlined" href="/drugs">
                        <ArrowBackIcon/> Go back to the list
                    </Button>
                </div>
                {nonValid.length===0?<></>:
                <Alert variant="filled" severity="error" style={{textAlign:'left'}}>
                    <AlertTitle>Error</AlertTitle>
                    Your input data is not valid and does not follow the guidelines:
                    <ul>
                        {nonValid.map((entry)=>(
                            <li>{entry}</li>
                        ))}
                    </ul>
                </Alert>}
                {Success?
                <Alert variant="filled" severity="success" style={{textAlign:'left'}}>
                <AlertTitle>Success</AlertTitle>
                Your input data has been successfully uploaded to database.
                </Alert>:<></>}
                <Grid container component={Paper} paddingBottom={"20px"} paddingRight={"20px"} marginTop={"20px"} spacing={2}>
                    <Grid className={styles.gridItems} item xs={12} md={5}>
                        <TextField 
                        fullWidth 
                        variant={"outlined"} 
                        required 
                        label="Full name"
                        value={FullName}
                        onChange={(event)=>setFullName(event.target.value)}/>
                    </Grid>
                    <Grid className={styles.gridItems} item xs={12} md={5}>
                    <TextField 
                        fullWidth 
                        variant={"outlined"} 
                        required 
                        label="Patient Email"
                        value={Email}
                        onChange={(event)=>setEmail(event.target.value)}/>
                    </Grid>
                    <Grid className={styles.gridItems} item xs={12} md={2}>
                    <TextField 
                        fullWidth 
                        variant={"outlined"} 
                        required 
                        label="Patient age"
                        value={Age}
                        onChange={(event)=>setAge(event.target.value)}/>
                    </Grid>
                    <Grid className={styles.gridItems} item xs={12}>
                        <Typography variant="body1">
                            For the possible contraindications fill everything that applies: chronic diseases, current conditions, prescribed or over-the-counter medications usage, etc.
                        </Typography>
                    </Grid>
                    <Grid className={styles.gridItems} item xs={12}>
                    <TextField 
                        multiline
                        rows={4}
                        fullWidth 
                        variant={"outlined"} 
                        label="Possible Contraindications or Current Conditions"
                        value={Contraindications}
                        onChange={(event)=>setContraindications(event.target.value)}/>
                    </Grid>
                </Grid>
                <Divider/>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
                    <Button variant="contained" onClick={handleButtonClick}> Save Patient Data</Button>
                </div>
            </div>
        </Container>
    );
}