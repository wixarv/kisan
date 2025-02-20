import React from 'react';
import { Box, TextField, Button, Typography, Grid, Card } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
    companyName: Yup.string().required('company Name Required '),
    executiveName: Yup.string().required('executive Name Required '),
    contactNo: Yup.string().matches(/\d{10}/, 'Invalid phone number').required('contact No Required '),
    email: Yup.string().email('Invalid email address').required(' email Required '),
});

const CompanyExecutiveForm = () => {
    const formik = useFormik({
        initialValues: {
            companyName: '',
            executiveName: '',
            contactNo: '',
            email: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        }
    });

    return (
        <Card elevation={0} sx={{ border: "1px solid #ddd", mt: 3, borderRadius: 2 }}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ color: "#212121", p: 3, textAlign: "left", borderBottom: "1px solid #ddd" }}>
                    <Typography style={{ fontSize: '18px', fontWeight: 600 }}>Profile of Company Executive</Typography>
                </Box>
                <Box sx={{ p: 5 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Company Name *</Typography>
                            <TextField
                                fullWidth
                                name="companyName"
                                size='small'
                                placeholder="Company Name"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                helperText={formik.touched.companyName && formik.errors.companyName}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Company Executive Name *</Typography>
                            <TextField
                                fullWidth
                                name="executiveName"
                                size='small'
                                placeholder="Company Executive Name"
                                value={formik.values.executiveName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.executiveName && Boolean(formik.errors.executiveName)}
                                helperText={formik.touched.executiveName && formik.errors.executiveName}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Contact No. *</Typography>
                            <TextField
                                fullWidth
                                name="contactNo"
                                size='small'
                                placeholder="Contact No."
                                value={formik.values.contactNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                                helperText={formik.touched.contactNo && formik.errors.contactNo}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Email Address *</Typography>
                            <TextField
                                fullWidth
                                name="email"
                                size='small'
                                placeholder="Email Address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Button type="submit" variant="contained" style={{
                            padding: '6px 16px',
                            background: '#0A2342',
                            textTransform: 'capitalize'
                        }}>Submit Details</Button>
                    </Box>
                </Box>
            </form>
        </Card>
    );
};

export default CompanyExecutiveForm;