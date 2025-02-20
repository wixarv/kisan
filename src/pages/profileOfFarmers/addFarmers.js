import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Card, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const textFieldStyles = {
    bgcolor: "white",
    "& .MuiOutlinedInput-root": {
        bgcolor: "white",
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
        "&.Mui-focused fieldset": { borderColor: "black" }
    },
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
    "& .MuiOutlinedInput-input": { color: "black" },
    "& .MuiInputBase-input::placeholder": { color: "gray" }
};

const states = ['State 1', 'State 2', 'State 3'];
const districts = ['District 1', 'District 2', 'District 3'];
const seasons = ['Kharif', 'Rabi', 'Summer'];
const years = ['2022', '2023', '2024'];

const validationSchema = Yup.object({
    FarmerName: Yup.string().required('Farmer Name is required'),
    ContactNo: Yup.string().required('Contact No. is required').matches(/^[0-9]{10}$/, 'Contact No. must be 10 digits'),
    Address: Yup.string().required('Address is required'),
    Email: Yup.string().email('Invalid email address'),
    AadharNo: Yup.string().required('Aadhar No. is required').matches(/^[0-9]{12}$/, 'Aadhar No. must be 12 digits'),
    State: Yup.string().required('State is required'),
    District: Yup.string().required('District is required'),
    Village: Yup.string(),
    Tehsil: Yup.string(),
    PinCode: Yup.string().required('Pin Code is required').matches(/^[0-9]{6}$/, 'Pin Code must be 6 digits'),
    CropName: Yup.string().required('Crop Name is required'),
    SeasonYear: Yup.string().required('Season Year is required'),
    ApproximateYield: Yup.string(),
    date: Yup.date().required('Sowing Date is required'),
    FieldName: Yup.string().required('Field Name is required'),
    Area: Yup.number().required('Area is required').positive('Area must be positive'),
    Latitude: Yup.number().required('Latitude is required'),
    Longitude: Yup.number().required('Longitude is required'),
    WKTData: Yup.string().required('WKT Data is required')
});

const AddFarmers = () => {
    const [showMap, setShowMap] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [center, setCenter] = useState({ lat: 28.6139, lng: 77.2090 });
    const [inputType, setInputType] = useState(null);
  
    const handleMapClick = (e) => {
      const newCenter = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarkerPosition(newCenter);
      setCenter(newCenter);
    };
  

    const formik = useFormik({
        initialValues: {
            FarmerName: '',
            ContactNo: '',
            Address: '',
            Email: '',
            AadharNo: '',
            State: '',
            District: '',
            Village: '',
            Tehsil: '',
            PinCode: '',
            CropName: '',
            SeasonYear: '',
            ApproximateYield: '',
            date: '',
            FieldName: '',
            Area: '',
            Latitude: '',
            Longitude: '',
            WKTData: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form Submitted', values);
        },
    });
    const handleAddFieldClick = () => {
        setShowMap(!showMap);
    };




    return (
        <Card elevation={0} sx={{ border: "1px solid #ddd", mt: 3, borderRadius: 2 }}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ color: "#212121", p: 3, textAlign: "left", borderBottom: "1px solid #ddd" }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Profile of Farmer</Typography>
                </Box>

                <Box sx={{ px: 5, py: 3 }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 500, mb: 2 }}>Personal Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Name of Farmer *</Typography>
                            <TextField
                                fullWidth
                                name="FarmerName"
                                size='small'
                                value={formik.values.FarmerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.FarmerName && Boolean(formik.errors.FarmerName)}
                                helperText={formik.touched.FarmerName && formik.errors.FarmerName}
                                placeholder="Enter Farmer Name"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Contact No. *</Typography>
                            <TextField
                                fullWidth
                                name="ContactNo"
                                size='small'
                                value={formik.values.ContactNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ContactNo && Boolean(formik.errors.ContactNo)}
                                helperText={formik.touched.ContactNo && formik.errors.ContactNo}
                                placeholder="Enter Contact No."
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Address *</Typography>
                            <TextField
                                fullWidth
                                name="Address"
                                size='small'
                                value={formik.values.Address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Address && Boolean(formik.errors.Address)}
                                helperText={formik.touched.Address && formik.errors.Address}
                                placeholder="Enter Address"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Email Address</Typography>
                            <TextField
                                fullWidth
                                name="Email"
                                size='small'
                                value={formik.values.Email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Email && Boolean(formik.errors.Email)}
                                helperText={formik.touched.Email && formik.errors.Email}
                                placeholder="Enter Email Address"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Aadhar No. *</Typography>
                            <TextField
                                fullWidth
                                name="AadharNo"
                                size='small'
                                value={formik.values.AadharNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.AadharNo && Boolean(formik.errors.AadharNo)}
                                helperText={formik.touched.AadharNo && formik.errors.AadharNo}
                                placeholder="Enter Aadhar No."
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>State *</Typography>
                            <TextField
                                select
                                fullWidth
                                name="State"
                                size='small'
                                value={formik.values.State}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.State && Boolean(formik.errors.State)}
                                helperText={formik.touched.State && formik.errors.State}
                                sx={textFieldStyles}
                            >
                                <MenuItem value="">Select State</MenuItem>
                                {states.map((state) => (
                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>District *</Typography>
                            <TextField
                                select
                                fullWidth
                                name="District"
                                size='small'
                                value={formik.values.District}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.District && Boolean(formik.errors.District)}
                                helperText={formik.touched.District && formik.errors.District}
                                sx={textFieldStyles}
                            >
                                <MenuItem value="">Select District</MenuItem>
                                {districts.map((district) => (
                                    <MenuItem key={district} value={district}>{district}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Village</Typography>
                            <TextField
                                fullWidth
                                name="Village"
                                size='small'
                                value={formik.values.Village}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Village && Boolean(formik.errors.Village)}
                                helperText={formik.touched.Village && formik.errors.Village}
                                placeholder="Enter Village"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Tehsil</Typography>
                            <TextField
                                fullWidth
                                name="Tehsil"
                                size='small'
                                value={formik.values.Tehsil}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Tehsil && Boolean(formik.errors.Tehsil)}
                                helperText={formik.touched.Tehsil && formik.errors.Tehsil}
                                placeholder="Enter Tehsil"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Pin Code *</Typography>
                            <TextField
                                fullWidth
                                name="PinCode"
                                size='small'
                                value={formik.values.PinCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.PinCode && Boolean(formik.errors.PinCode)}
                                helperText={formik.touched.PinCode && formik.errors.PinCode}
                                placeholder="Enter Pin Code"
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ px: 5, py: 1 }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 500, mb: 2 }}>Details of Farmer Crop</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Crop Name *</Typography>
                            <TextField
                                fullWidth
                                name="CropName"
                                size='small'
                                value={formik.values.CropName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.CropName && Boolean(formik.errors.CropName)}
                                helperText={formik.touched.CropName && formik.errors.CropName}
                                placeholder="Enter Crop Name"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Crop Season *</Typography>
                            <TextField
                                select
                                fullWidth
                                name="SeasonYear"
                                size='small'
                                value={formik.values.SeasonYear}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.SeasonYear && Boolean(formik.errors.SeasonYear)}
                                helperText={formik.touched.SeasonYear && formik.errors.SeasonYear}
                                sx={textFieldStyles}
                            >
                                <MenuItem value="">Select Season Year</MenuItem>
                                {seasons.map((season) => (
                                    <MenuItem key={season} value={season}>{season}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Season Year *</Typography>
                            <TextField
                                select
                                fullWidth
                                name="SeasonYear"
                                size='small'
                                value={formik.values.SeasonYear}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.SeasonYear && Boolean(formik.errors.SeasonYear)}
                                helperText={formik.touched.SeasonYear && formik.errors.SeasonYear}
                                sx={textFieldStyles}
                            >
                                <MenuItem value="">Select Season Year</MenuItem>
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>
                                Sowing Date *
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                name="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.date && Boolean(formik.errors.date)}
                                helperText={formik.touched.date && formik.errors.date}
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Approximate Yield</Typography>
                            <TextField
                                fullWidth
                                name="ApproximateYield"
                                size='small'
                                value={formik.values.ApproximateYield}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ApproximateYield && Boolean(formik.errors.ApproximateYield)}
                                helperText={formik.touched.ApproximateYield && formik.errors.ApproximateYield}
                                placeholder="Enter Approximate Yield"
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                </Box>


                <Box sx={{ px: 5, py: 3 }}>
                    <Typography sx={{ fontSize: '17px', fontWeight: 500, mb: 2 }}>Field Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Name of Field *</Typography>
                            <TextField
                                fullWidth
                                name="FieldName"
                                size='small'
                                value={formik.values.FieldName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.FieldName && Boolean(formik.errors.FieldName)}
                                helperText={formik.touched.FieldName && formik.errors.FieldName}
                                placeholder="Enter Name of Field"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Area (in Acres) *</Typography>
                            <TextField
                                fullWidth
                                name="Area"
                                size='small'
                                value={formik.values.Area}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Area && Boolean(formik.errors.Area)}
                                helperText={formik.touched.Area && formik.errors.Area}
                                placeholder="Enter Area in Acres"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Latitude</Typography>
                            <TextField
                                fullWidth
                                name="Latitude"
                                size='small'
                                value={formik.values.Latitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Latitude && Boolean(formik.errors.Latitude)}
                                helperText={formik.touched.Latitude && formik.errors.Latitude}
                                placeholder="Enter Latitude"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>Longitude</Typography>
                            <TextField
                                fullWidth
                                name="Longitude"
                                size='small'
                                value={formik.values.Longitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Longitude && Boolean(formik.errors.Longitude)}
                                helperText={formik.touched.Longitude && formik.errors.Longitude}
                                placeholder="Enter Longitude"
                                sx={textFieldStyles}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5, color: '#616161' }}>WKT Data *</Typography>
                            <TextField
                                fullWidth
                                name="WKTData"
                                size='small'
                                value={formik.values.WKTData}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.WKTData && Boolean(formik.errors.WKTData)}
                                helperText={formik.touched.WKTData && formik.errors.WKTData}
                                placeholder="Enter WKT Data"
                                sx={textFieldStyles}
                            />
                        </Grid>
                    </Grid>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'end', mr: 5, mb: 3 }}>
                    <Button onClick={handleAddFieldClick}
                        variant="contained" sx={{ padding: '6px 16px', background: '#0A2342', textTransform: 'capitalize' }}>
                        Add Filed
                    </Button>
                </Box>

                {showMap && (
                    <Box sx={{ position: "relative" }}>
                    <Box sx={{ position: "absolute", top: 10, left: 10, width: 220, bgcolor: "#1e3c15bf", borderRadius: 2, p: 1.5, boxShadow: 2, zIndex: 1 }}>
                      <Box sx={{ display: "flex", gap: 0.5, bgcolor: "white", borderRadius: 1, p: 0.5 }}>
                        <Button onClick={() => setInputType("latlng")} sx={{ bgcolor: "#ddd", fontSize: 10, flex: 1, "&:hover": { bgcolor: "#bbb" } }}>LatLng</Button>
                        <Button onClick={() => setInputType("location")} sx={{ bgcolor: "#2ca58d", color: "white", fontSize: 10, flex: 1, "&:hover": { bgcolor: "#2ca58d" } }}>Location</Button>
                      </Box>
                      {inputType === "latlng" && <TextField fullWidth size="small" placeholder="Enter Lat,Lng" sx={{ bgcolor: "white", borderRadius: 1, mt: 1 }} />}
                      {inputType === "location" && <TextField fullWidth size="small" placeholder="Enter Location" sx={{ bgcolor: "white", borderRadius: 1, mt: 1 }} />}
                      <Button fullWidth variant="contained" sx={{ bgcolor: "#2ca58d", fontSize: 12, mt: 1, "&:hover": { bgcolor: "#2ca58d" } }}>Search</Button>
                    </Box>
                    <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap">
                      <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }}
                       zoom={14} center={center} 
                       options={{ mapTypeId: "satellite", tilt: 45 }}
                        onClick={handleMapClick}>
                        {markerPosition && <Marker position={markerPosition} />}
                      </GoogleMap>
                    </LoadScript>
                  </Box>


                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                    <Button type="submit" variant="contained" sx={{ padding: '6px 16px', background: '#0A2342', textTransform: 'capitalize' }}>
                        Submit Details
                    </Button>
                </Box>
            </form>
        </Card>
    );
};

export default AddFarmers;