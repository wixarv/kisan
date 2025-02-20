import React, { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPass = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("ggg", values);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F0F2F5",
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{ width: "480px", border: "1px solid #ddd", p: "30px", borderRadius: "12px" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <img
            src="https://finpartner.km-ira.com/static/media/KhetiMitra_Logo.99483d913ba831adfa800e50d5d1f53f.svg"
            alt="Kheti Mitra"
            style={{ height: "65px", marginBottom: "4px" }}
          />
        </Box>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault(); // Page refresh rokne ke liye
            formik.handleSubmit();
          }}
        >
          <Typography
            sx={{ textAlign: "center", color: "#2ca58d", fontSize: "1.5rem", fontWeight: 600, mb: 2 }}
          >
            Forgot password?
          </Typography>
          <Typography style={{ color: "#9e9e9e", textAlign: "center", fontWeight: 500 }}>
            Enter your email address below and we'll send you password reset link at mail.
          </Typography>
          <Box sx={{ mt: 3 }}>
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#2ca58d",
                "&:hover": { bgcolor: "#2ca58d" },
                height: "48px",
                mb: 2.5,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                borderRadius: "8px",
                boxShadow: "none",
              }}
            >
              Send Email
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default ForgotPass;

const textFieldStyles = {
  bgcolor: "white",
  mb: 2,
  "& .MuiOutlinedInput-root": {
    bgcolor: "white",
    "& fieldset": { borderColor: "black" },
    "&:hover fieldset": { borderColor: "black" },
    "&.Mui-focused fieldset": { borderColor: "black" },
  },
  "& .MuiInputLabel-root": { color: "black" },
  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
  "& .MuiOutlinedInput-input": { color: "black" },
  "& .MuiInputBase-input::placeholder": { color: "gray" },
};
