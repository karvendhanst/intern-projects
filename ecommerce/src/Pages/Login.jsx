import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography, Paper } from "@mui/material";
import { useThemeStore } from "../store/themeStore";
import ButtonAppBar from "../components/Appbar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"), 
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const { darkMode } = useThemeStore();

  const bgColor = darkMode ? "#121212" : "#f5f5f5";
  const textColor = darkMode ? "#ffffff" : "#333333";
  const inputBg = darkMode ? "#1e1e1e" : "#ffffff";

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, paddingBottom: "50px" }}>
      <ButtonAppBar />
      <Box
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: 400,
          margin: "50px auto",
          padding: 4,
          borderRadius: 2,
          backgroundColor: bgColor,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", color: textColor }}
        >
          LOGIN
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email "
                InputProps={{
                  style: { color: textColor, backgroundColor: inputBg },
                }}
                InputLabelProps={{
                  style: { color: textColor },
                }}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                label="Password"
                autoComplete="current-password"
                InputProps={{
                  style: { color: textColor, backgroundColor: inputBg },
                }}
                InputLabelProps={{
                  style: { color: textColor },
                }}
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
