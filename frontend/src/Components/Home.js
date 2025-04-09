import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
 // Important for JS components like Carousel

const Home = () => {
  const location = useLocation();
  const userRole = location.state?.role;

  // This useEffect ensures that Bootstrap carousel JS initializes properly
  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExample');
    if (carouselElement) {
      // Bootstrap auto-init (optional since `data-bs-ride="carousel"` is set)
      new window.bootstrap.Carousel(carouselElement);
    }
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Welcome to DoorStep!
            </Typography>

            {userRole ? (
  <Typography variant="h6" sx={{ color: '#424242' }}>
    Hello, {userRole}
  </Typography>
) : (
  <div>
    <Button
      component={Link}
      to="/login"
      variant="contained"
      size="large"
      sx={{
        backgroundColor: '#1976d2',
        '&:hover': { backgroundColor: '#1565c0' },
        mr: 2,
        px: 3,
        py: 1.2,
      }}
    >
      Login
    </Button>
    <Button
      component={Link}
      to="/register"
      variant="outlined"
      size="large"
      sx={{
        color: '#1976d2',
        borderColor: '#1976d2',
        '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
        px: 3,
        py: 1.2,
      }}
    >
      Register
    </Button>
  </div>
)}

          </Toolbar>
        </Container>
      </AppBar>

      {/* Bootstrap Carousel */}
      <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="1000">
              <img
                src="/images/home-banner.webp"
                className="d-block w-100"
                alt="Home Banner 1"
                style={{ borderRadius: '16px', boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="carousel-item" data-bs-interval="1000">
              <img
                src="/images/images.png"
                className="d-block w-100"
                alt="Home Banner 2"
                style={{ borderRadius: '16px', boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="carousel-item" data-bs-interval="1000">
              <img
                src="/images/second.png"
                className="d-block w-100"
                alt="Home Banner 3"
                style={{ borderRadius: '16px', boxShadow: '3px 3px 10px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Container>
    </>
  );
};

export default Home;
