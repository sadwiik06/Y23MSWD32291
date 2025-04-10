import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Container, Typography, Button, AppBar, Toolbar, Box, Grid, Card, 
  CardContent, CardMedia, Rating, Chip, TextField, InputAdornment
} from '@mui/material';
import { 
  Search, ShoppingCart, LocalShipping, 
  Security, SupportAgent, Storefront, 
  ArrowForward, FavoriteBorder, PersonOutline 
} from '@mui/icons-material';

// Sample featured products data - replace with real API data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    rating: 4.7,
    image: "/api/placeholder/500/300",
    category: "Electronics",
    discount: 15
  },
  {
    id: 2,
    name: "Stylish Casual Sneakers",
    price: 89.99,
    rating: 4.5,
    image: "/api/placeholder/500/300",
    category: "Fashion",
    discount: 0
  },
  {
    id: 3,
    name: "Organic Green Tea Set",
    price: 34.99,
    rating: 4.8,
    image: "/api/placeholder/500/300",
    category: "Food & Beverages",
    discount: 10
  },
  {
    id: 4,
    name: "Smart Home Security Camera",
    price: 149.99,
    rating: 4.6,
    image: "/api/placeholder/500/300",
    category: "Electronics",
    discount: 20
  }
];

// Sample categories
const categories = [
  { name: "Electronics", icon: "📱", color: "#3f51b5" },
  { name: "Fashion", icon: "👕", color: "#e91e63" },
  { name: "Home & Kitchen", icon: "🏠", color: "#009688" },
  { name: "Beauty", icon: "✨", color: "#9c27b0" },
  { name: "Sports", icon: "⚽", color: "#f44336" },
  { name: "Books", icon: "📚", color: "#ff9800" }
];

const Home = () => {
  const location = useLocation();
  const userRole = location.state?.role;
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: isScrolled ? 'white' : 'transparent',
          boxShadow: isScrolled ? 1 : 'none',
          transition: 'all 0.3s',
          color: isScrolled ? '#1a237e' : 'white'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold', 
                color: isScrolled ? '#1a237e' : 'white',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Storefront sx={{ mr: 1, fontSize: 35 }} />
              DoorStep
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                placeholder="Search products..."
                size="small"
                sx={{ 
                  mr: 2, 
                  backgroundColor: isScrolled ? '#f5f5f5' : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                  width: { xs: '120px', sm: '200px', md: '300px' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search color={isScrolled ? 'primary' : 'inherit'} />
                    </InputAdornment>
                  ),
                }}
              />

              {userRole ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    startIcon={<FavoriteBorder />}
                    sx={{ 
                      color: isScrolled ? '#1a237e' : 'white',
                      ml: 1
                    }}
                  >
                    Wishlist
                  </Button>
                  <Button
                    startIcon={<ShoppingCart />}
                    sx={{ 
                      color: isScrolled ? '#1a237e' : 'white',
                      ml: 1
                    }}
                  >
                    Cart
                  </Button>
                  <Button
                    startIcon={<PersonOutline />}
                    sx={{ 
                      color: isScrolled ? '#1a237e' : 'white',
                      ml: 1
                    }}
                  >
                    {userRole}
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    component={Link}
                    to="/login"
                    variant={isScrolled ? "contained" : "outlined"}
                    size="medium"
                    sx={{
                      backgroundColor: isScrolled ? '#1976d2' : 'transparent',
                      borderColor: 'white',
                      color: isScrolled ? 'white' : 'white',
                      '&:hover': { 
                        backgroundColor: isScrolled ? '#1565c0' : 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'white' 
                      },
                      mr: 2,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant={isScrolled ? "outlined" : "contained"}
                    size="medium"
                    sx={{
                      backgroundColor: isScrolled ? 'transparent' : 'white',
                      borderColor: isScrolled ? '#1976d2' : 'white',
                      color: isScrolled ? '#1976d2' : '#1a237e',
                      '&:hover': { 
                        backgroundColor: isScrolled ? 'rgba(25, 118, 210, 0.04)' : 'rgba(255, 255, 255, 0.9)',
                        borderColor: isScrolled ? '#1976d2' : 'white' 
                      },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section with Background Color and Shiny Text Effect - Replacing Carousel */}
      <Box 
        sx={{ 
          height: { xs: '70vh', md: '80vh' },
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #7986cb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 4
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              position: 'relative',
              fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'shine 2s infinite linear',
              },
              '@keyframes shine': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' }
              },
              overflow: 'hidden'
            }}
          >
            Everything You Need, Delivered to Your Doorstep
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              textShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}
          >
            Shop the latest trends in fashion, electronics, home goods and more with fast delivery and easy returns
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            endIcon={<ArrowForward />}
            sx={{ 
              backgroundColor: '#e91e63',
              '&:hover': { backgroundColor: '#c2185b' },
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(233, 30, 99, 0.5)'
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Shop By Category
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                  },
                  py: 2,
                  bgcolor: 'white'
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    backgroundColor: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    fontSize: '2rem'
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {category.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: '#e3f2fd',
                  p: 2,
                  mb: 2
                }}
              >
                <LocalShipping sx={{ fontSize: 40, color: '#1976d2' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>Free Shipping</Typography>
              <Typography variant="body2" color="text.secondary">
                Free shipping on all orders over $50
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: '#e8f5e9',
                  p: 2,
                  mb: 2
                }}
              >
                <Security sx={{ fontSize: 40, color: '#43a047' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>Secure Payments</Typography>
              <Typography variant="body2" color="text.secondary">
                100% secure payment processing
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: '#fff3e0',
                  p: 2,
                  mb: 2
                }}
              >
                <ArrowForward sx={{ fontSize: 40, color: '#ff9800' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>Easy Returns</Typography>
              <Typography variant="body2" color="text.secondary">
                30-day return policy for all items
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: '#f3e5f5',
                  p: 2,
                  mb: 2
                }}
              >
                <SupportAgent sx={{ fontSize: 40, color: '#9c27b0' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" mb={1}>24/7 Support</Typography>
              <Typography variant="body2" color="text.secondary">
                Customer support available anytime
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box 
        sx={{ 
          bgcolor: '#1a237e', 
          color: 'white', 
          py: 6,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers today
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: '#1a237e',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Browse Products
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f5f5f5', pt: 6, pb: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                DoorStep
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Your one-stop destination for all your shopping needs with fast delivery right to your doorstep.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Social media icons would go here */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <Typography variant="body2" component="div">
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Box component="li" sx={{ mb: 1 }}>Home</Box>
                  <Box component="li" sx={{ mb: 1 }}>Products</Box>
                  <Box component="li" sx={{ mb: 1 }}>Featured</Box>
                  <Box component="li" sx={{ mb: 1 }}>New Arrivals</Box>
                  <Box component="li">Contact Us</Box>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Categories
              </Typography>
              <Typography variant="body2" component="div">
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  {categories.slice(0, 5).map((category, index) => (
                    <Box component="li" sx={{ mb: 1 }} key={index}>{category.name}</Box>
                  ))}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                1234 Shopping Avenue<br />
                Retail District, RD 56789<br />
                support@doorstep.com<br />
                +1 (555) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 4, pt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} DoorStep. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;