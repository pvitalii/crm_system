import React from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { AuthProps } from '../interfaces/auth-config.interface';
import { authValidationSchema } from '../utils/auth-validation.util';

interface ErrorResponse {
  message: string;
}

export function AuthForm({ config }: AuthProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authValidationSchema,
    onSubmit: (values) => config.onSubmit(values),
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        minWidth: 500,
        mx: 'auto',
        mt: 8,
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {config.title}
      </Typography>

      {config.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(config.error as AxiosError<ErrorResponse>).response?.data?.message || 'An error occurred'}
        </Alert>
      )}

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{
          '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-20px'
          }
        }}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{
          '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-20px'
          }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={config.isLoading}
        sx={{ mt: 2 }}
      >
        {config.isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          config.buttonText
        )}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to={config.linkTo}
          className="auth-link"
        >
          {config.linkText}
        </Link>
      </Box>
    </Box>
  );
} 