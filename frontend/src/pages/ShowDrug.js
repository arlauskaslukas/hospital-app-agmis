import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { Button, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import _ from 'lodash';

function ShowDrug() {
    let {id} = useParams();
    const [Drug, setDrug] = useState(null);
    useEffect(()=>{
        const axiosCall = async()=>{
            const res = await axios.get(`http://127.0.0.1:8000/api/drugs/${id}`);
            setDrug(res.data);
            console.log(res.data);
        };
        axiosCall();
    },[]);
    const formatDate = (string) =>{
        let returnable = _.replace(string, new RegExp("\.[0-9]*Z"), "")
        returnable = _.replace(returnable, "T", " ");
        return returnable;
    }
    if(Drug==null)
    {
        return <h3>Loading...</h3>
    }
    else return (
        <div>
            <Container>
                <Typography variant="h5" textAlign="left">
                    Information about drug {Drug===null?"":Drug.name}
                </Typography>
                <div style={{display:'flex', justifyContent:'flex-start', marginBlock:'20px'}}>
                    <Button variant="outlined" href="/drugs">
                        <ArrowBackIcon/> Go back to the list
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableRow>
                            <TableCell><b>Drug name</b></TableCell>
                            <TableCell>{Drug.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Active Pharmaceutical Ingredient</b></TableCell>
                            <TableCell>{Drug.active_ingredient}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Drug strength</b></TableCell>
                            <TableCell>{Drug.strength}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Drug Side Effects</b></TableCell>
                            <TableCell>{Drug.side_effects}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Contraindications</b></TableCell>
                            <TableCell>{Drug.contraindications}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Drug added to the subsystem at</b></TableCell>
                            <TableCell>{formatDate(Drug.created_at)}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default ShowDrug
