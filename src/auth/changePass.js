import React from 'react';
import { Box, TextField, Button, Typography, Grid, Card } from '@mui/material';
import { useFormik } from 'formik';

const textFieldStyles = {
    bgcolor: "white",
    "& .MuiOutlinedInput-root": {
        bgcolor: "white",
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
        "&.Mui-focused fieldset": { borderColor: "black" }
    },
    "& .MuiOutlinedInput-input": { color: "black" },
    "& .MuiInputBase-input::placeholder": { color: "gray" }
};

const ChangePassword = () => {
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: ''
        },
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        }
    });

    return (
        <Card elevation={0} sx={{ border: "1px solid #ddd", mt: 4, borderRadius: 2 }}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ color: "#212121", p: 3, textAlign: "left", borderBottom: "1px solid #ddd" }}>
                    <Typography sx={{fontSize:'18px'}}>Change Password</Typography>
                </Box>
                <Box sx={{ p: 5 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0.5, color: '#616161' }}>Current Password *</Typography>
                            <TextField
                                fullWidth
                                name="currentPassword"
                                size='small'
                                type="password"
                                placeholder="Current Password"
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{      fontSize: '0.875rem', fontWeight: 500, mb: 0.5, color: '#616161' }}>New Password *</Typography>
                            <TextField
                                fullWidth
                                name="newPassword"
                                size='small'
                                type="password"
                                placeholder="New Password"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Button type="submit" variant="contained" style={{
                            padding: '6px 16px',
                            background: '#0A2342',
                            textTransform: 'capitalize'
                        }}>Change Password</Button>
                    </Box>
                </Box>
            </form>
        </Card>
    );
};

export default ChangePassword;