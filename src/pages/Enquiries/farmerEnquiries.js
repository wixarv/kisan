import React from 'react'
import { Box, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Card, CardContent } from '@mui/material';

const FarmerEnquiries = () => {

  const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const data = [{ id: 1, name: "Rahul Sharma", date: "2024-07-15", contact: "9876543210", email: "rahul@example.com" }];
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Box sx={{ py: 3 }}>
                <Card elevation={0} sx={{ maxWidth: 330, width: "100%", borderRadius: 2, overflow: "hidden", border: "1px solid #ddd", }}>
                    <Box sx={{ bgcolor: "#000A17", color: "white", p: 2.4, textAlign: "left" }}>
                        <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}
                            style={{
                                fontSize: '1rem',
                                fontWeight: 500
                            }}>Farmers</Typography>
                    </Box>
                    <CardContent sx={{ textAlign: "center", py: { xs: 2, sm: 3 } }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: 28, sm: 32 } }}>0</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }}>Total Farmers</Typography>
                    </CardContent>
                </Card>
            </Box>

            <TextField
                label="Search ..."
                variant="outlined"
                fullWidth
                size='small'
                sx={{
                    mb: 2,
                    bgcolor: "white",
             
                    "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "black" }
                    },
                    "& .MuiInputLabel-root": { color: "black" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-input": { color: "black", },
                    "& .MuiInputBase-input::placeholder": { color: "gray" },
                }}
            />

            <Card elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #ddd", }}>
                <Box sx={{ p: 2, borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Farmer Details</Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>
                            <TableRow>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>S No.</TableCell>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Farmer Name</TableCell>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Contact</TableCell>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.contact}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell><button>Action</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Card>
        </Box>
    );
}

export default FarmerEnquiries