import React, {useState, useEffect} from 'react'
import { Button, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import _ from 'lodash';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const DrugsPage = () => {
    const [page, setPage] = useState(1);
    const [entriesInPage, setEntriesInPage] = useState(5);
    const [Drugs, setDrugs] = useState([]);
    const [CurrentElements, setCurrentElements] = useState([]);
    const [pageQuantity, setPageQuantity] = useState(1);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handlePagination = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const axiosCall = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/drugs');
            setDrugs(res.data);
            setPageQuantity(Math.ceil(res.data.length/entriesInPage));
            let elements =_.slice(res.data, 0, entriesInPage);
            setCurrentElements(elements);
        };
        axiosCall();
    }, []);

    useEffect(()=>{
        let pageStartIndex = (page-1)*entriesInPage;
        let pageEndIndex = page*entriesInPage;
        let elements = _.slice(Drugs, pageStartIndex, pageEndIndex)
        setCurrentElements(elements);
        console.log(CurrentElements);
    },[page]);

    return (
        <div>
            <Container>
                <Typography variant={"h4"} textAlign="left">Drugs subsystem</Typography>
                <div style={{display:'flex', justifyContent:'flex-end', marginBlock:'20px'}}>
                    <Button variant="contained" href="/drugs/create">
                        <AddCircleOutlineIcon/> Register new drug
                    </Button>
                </div>
                <TableContainer component={Paper}> 
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Active ingredient</b></TableCell>
                                <TableCell><b>Strength</b></TableCell>
                                <TableCell><b>View detailed info</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {CurrentElements.map((drug)=>
                            (<TableRow key={drug.id}>
                                <TableCell>{drug.name}</TableCell>
                                <TableCell>{drug.active_ingredient}</TableCell>
                                <TableCell>{drug.strength}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" href={"/drug/"+drug.id}>
                                        <VisibilityIcon/> MORE INFORMATION
                                    </Button>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { Drugs.length > entriesInPage ?
                <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                    <Pagination 
                    count={pageQuantity} 
                    defaultPage={1} 
                    showFirstButton 
                    showLastButton 
                    page={page}
                    onChange={handlePagination}
                    variant={"text"}
                    color="primary"
                    size={'large'}
                    />
                </div>
                : <></>}
                Currently on page {page}
            </Container>
        </div>
    )
}
