import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useThemeStore } from "../store/themeStore";
import ButtonAppBar from "../components/Appbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const PAGE_SIZE = 9;
const MAX_PAGE_BUTTONS = 4;

const ALLOWED_CATEGORIES = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const Products = () => {
  const { darkMode } = useThemeStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 0;
  const [page, setPage] = useState(pageFromUrl);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { addToCart } = useCartStore();

  // Fetch all products
  const { data, isLoading, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/products?limit=100");
      return res.data.products ?? [];
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      addToCart(data);
    },
  });

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  if (isLoading)
    return (
      <Button
        variant="text"
        size="large"
        color="secondary"
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </Button>
    );

  if (error)
    return (
      <Button
        variant="text"
        size="large"
        color="secondary"
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something Went Wrong...
      </Button>
    );

  // Filter by category
  let filteredProducts = data;
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) =>
        ALLOWED_CATEGORIES.includes(p.category) &&
        p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  } else {
    
    filteredProducts = filteredProducts.filter((p) =>
      ALLOWED_CATEGORIES.includes(p.category)
    );
  }

  // Sort products
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination after filtering
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  let startPage = Math.max(page - Math.floor(MAX_PAGE_BUTTONS / 2), 0);
  let endPage = startPage + MAX_PAGE_BUTTONS - 1;
  if (endPage >= totalPages) {
    endPage = totalPages - 1;
    startPage = Math.max(endPage - MAX_PAGE_BUTTONS + 1, 0);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, color: darkMode ? "#fff" : "#333" }}>
      <ButtonAppBar />

      <Typography
        variant="h5"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        PRODUCTS
      </Typography>

      {/* Sorting + Category Filter Dropdowns */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        {/* Sort Dropdown */}
        <FormControl sx={{ minWidth: "200", backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>
          <InputLabel sx={{ minWidth: "200", color: darkMode ? "#fff" : "#333"}}>Sort by Price</InputLabel>
          <Select
            value={sortOrder}
            label="Sort by Price"
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(0);
            }}
            sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}
          >
            <MenuItem value="default" sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>Default</MenuItem>
            <MenuItem value="lowToHigh" sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>Price: Low to High</MenuItem>
            <MenuItem value="highToLow" sx={{  backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>Price: High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* Category Dropdown */}
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel sx={{ color: darkMode ? "#fff" : "#333"}}>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter by Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(0);
            }}
            sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}
          >
            <MenuItem value="all" sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>All Categories</MenuItem>
            {ALLOWED_CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ backgroundColor: darkMode ? "#333" : "#fff" , color: darkMode ? "#fff" : "#333"}}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Product Grid */}
      <Grid container spacing={3} justifyContent="center">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: darkMode ? "#333" : "#fff",
                  color: darkMode ? "#fff" : "#333",
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.images[0]}
                    alt={product.title}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => mutation.mutate(product.id)}
                  >
                    Add To Cart
                  </Button>
                  <Button size="small" color="secondary">
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            No products found in this category.
          </Typography>
        )}
      </Grid>

      {/* 🔹 Pagination */}
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center"
        my={4}
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          sx={{
            backgroundColor: "#9c27b0",
            color: "#fff",
            "&:hover": { backgroundColor: "#9c27a0" },
            minWidth: "40px",
            height: "30px",
            fontSize: "0.75rem",
          }}
        >
          Prev
        </Button>

        {pageNumbers.map((num) => (
          <Button
            key={num}
            onClick={() => setPage(num)}
            variant={num === page ? "contained" : "outlined"}
            sx={{
              backgroundColor: num === page ? "#9c27a0" : "#e0e0e0",
              color: num === page ? "#fff" : "#000",
              "&:hover": {
                backgroundColor: "#9c27a0",
                color: "#fff",
              },
              minWidth: "30px",
              height: "30px",
              fontSize: "0.7rem",
            }}
          >
            {num + 1}
          </Button>
        ))}

        <Button
          variant="contained"
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={page === totalPages - 1}
          sx={{
            backgroundColor: "#9c27b0",
            color: "#fff",
            "&:hover": { backgroundColor: "#9c27a0" },
            minWidth: "40px",
            height: "30px",
            fontSize: "0.75rem",
          }}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};

export default Products;
