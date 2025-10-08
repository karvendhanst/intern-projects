import React from "react";
import ButtonAppBar from "../components/Appbar";
import {
  Grid,
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { darkMode } = useThemeStore()

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <ButtonAppBar />
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ mt: 5,color: darkMode ? "#fff" : "#333" }}>
            Your cart is empty 
          </Typography>
        ) : (
          cart.map((cartProduct) => (
            <Grid
              item
              key={cartProduct.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card sx={{ display: "flex", maxWidth: 400, color: darkMode ? "#fff" : "#333", }}>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {cartProduct.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                    >
                      ${cartProduct.price}
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={1} sx={{ p: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(cartProduct.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151, objectFit: "contain" }}
                  image={cartProduct.images[0]}
                  alt={cartProduct.title}
                />
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {cart.length > 0 && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={4}
        >
          <Typography variant="h6" sx={{color: darkMode ? "#fff" : "#333"}}>Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </Stack>
      )}
    </div>
  );
}
