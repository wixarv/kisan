import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography, Card, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: true },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Login Data:", values);
      resetForm(); 
    },
  });
  
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F0F2F5", p: 2 }}>
      <Card elevation={0} sx={{ width: "480px", border: "1px solid #ddd", p: "30px", borderRadius: "12px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <img src="https://finpartner.km-ira.com/static/media/KhetiMitra_Logo.99483d913ba831adfa800e50d5d1f53f.svg" alt="Kheti Mitra" style={{ height: "65px", marginBottom: "4px" }} />
        </Box>
        <Typography sx={{ textAlign: "center", color: "#2ca58d", fontSize: "1.5rem", fontWeight: 600, mb: 4 }}>Hi, Welcome Back</Typography>
        
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="User Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={textFieldStyles}
          />
        
          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={textFieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#697586' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#2ca58d', '&:hover': { bgcolor: '#2ca58d' }, height: '48px', mb: 2.5, textTransform: 'none', fontSize: '16px', fontWeight: 500, borderRadius: '8px', boxShadow: 'none' }}
          >
            Sign In
          </Button>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  name="rememberMe"
                  sx={{ color: '#2ca58d', '&.Mui-checked': { color: '#2ca58d' }, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
              }
              label={<Typography sx={{ color: '#697586', fontSize: '14px' }}>Remember me</Typography>}
            />
            <Typography sx={{ color: "#2ca58d", fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;

const textFieldStyles = {
  bgcolor: "white",
  mb:2,
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