import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useThemeStore } from '../store/themeStore';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {

    const { darkMode, toggleTheme } = useThemeStore()

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#333" }}>
                <Toolbar>
                    <Typography variant="button" component="div" sx={{ flexGrow: 1 }}>
                    <Link
                            to="/"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            Ecommerce.
                        </Link>
                    </Typography>
                    <Button color="inherit" sx={{ mx: 1 }}>
                        <Link
                            to="/products"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            Products
                        </Link>
                        <Link
                            to="/cart"
                            style={{ textDecoration: 'none', color: 'inherit', margin:"10px" }}
                        >
                            Cart
                        </Link>
                        <Link
                            to="/login"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            Login
                        </Link>
                    </Button>
                    <Button color="secondary" variant='contained' onClick={toggleTheme}>{darkMode ? <ContrastOutlinedIcon /> : <DarkModeOutlinedIcon />}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
