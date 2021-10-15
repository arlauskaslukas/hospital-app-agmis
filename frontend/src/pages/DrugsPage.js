import React, {useState, useEffect} from 'react'
import { Paginate } from '../components/Paginate'
import { Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
export const DrugsPage = () => {
    const [page, setPage] = useState(1);
    const [entriesInPage, setEntriesInPage] = useState(5);

    const handlePagination = (event, value) => {
        setPage(value);
    };
    const [Drugs, setDrugs] = useState([]);
    useEffect(() => {
        const axiosCall = async () => {
            const res = await axios.get('http://127.0.0.1:8000/api/drugs');
            setDrugs(res.data);
            console.log(res.data);
        };
        axiosCall();
    }, []);

    return (
        <div>
            <Container>
                <Typography variant={"h3"}>Drugs Table</Typography>
                <TableContainer component={Paper}> 
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Active ingredient</TableCell>
                                <TableCell>Strength</TableCell>
                                <TableCell>View detailed info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Drugs.map((drug)=>
                            (<TableRow key={drug.id}>
                                <TableCell>{drug.name}</TableCell>
                                <TableCell>{drug.active_ingredient}</TableCell>
                                <TableCell>{drug.strength}</TableCell>
                                <TableCell><VisibilityIcon/></TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { Drugs.length > entriesInPage ?
                <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                    <Pagination 
                    count={10} 
                    defaultPage={1} 
                    showFirstButton 
                    showLastButton 
                    page={page}
                    onChange={handlePagination}
                    variant={'outlined'}
                    size={'large'}
                    />
                </div>
                : <></>}
                Currently on page {page}
            </Container>
        </div>
    )
}
