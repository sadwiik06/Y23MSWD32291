import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col, Container, Badge, Spinner, Alert } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { PencilSquare, TrashFill, PlusCircle, BoxSeam, CurrencyDollar, Tag } from 'react-bootstrap-icons';

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL + '/api/products';


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async () => {
    if (!name || !price || !category) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const productData = { name, price, category };
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData, config);
        setEditingId(null);
        setSuccessMessage("Product updated successfully!");
      } else {
        await axios.post(API_URL, productData, config);
        setSuccessMessage("Product added successfully!");
      }

      setName('');
      setPrice('');
      setCategory('');
      fetchProducts();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error saving product:", error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError("Failed to save product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, config);
      fetchProducts();
      setSuccessMessage("Product deleted successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError("Failed to delete product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryBadgeColor = (category) => {
    const categories = {
      'electronics': 'primary',
      'clothing': 'success',
      'books': 'info',
      'furniture': 'warning',
      'food': 'danger'
    };
    
    return categories[category.toLowerCase()] || 'secondary';
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold text-primary">
       
        Product Management System
      </h2>

      {error && (
        <Alert variant="danger" className="mb-4" dismissible onClose={() => setError(null)}>
          <Alert.Heading>Error!</Alert.Heading>
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccessMessage('')}>
          <Alert.Heading>Success!</Alert.Heading>
          <p className="mb-0">{successMessage}</p>
        </Alert>
      )}

      {/* Product Form */}
      <Card className="p-4 shadow mb-5 border-0 rounded-3">
        <Card.Header className="bg-white border-0 pb-0">
          <h4 className="mb-0">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-primary"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    placeholder="Enter price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-primary"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border-primary"
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button
                  variant={editingId ? "warning" : "primary"}
                  onClick={saveProduct}
                  className="w-100 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      {editingId ? (
                        <>
                          
                          Update
                        </>
                      ) : (
                        <>
                          
                          Add
                        </>
                      )}
                    </>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Product Listing */}
      <h3 className="mb-4 fw-bold">
        <BoxSeam className="me-2" />
        Product Inventory ({products.length})
      </h3>

      {loading && !editingId ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <Alert variant="info">
          No products found. Add your first product using the form above.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map(product => (
            <Col key={product._id}>
              <Card className="h-100 shadow-sm rounded-3 border-0 product-card" style={{ width: '300px', marginRight: 'auto', marginLeft: 'auto' }}>
                <div className="position-absolute top-0 end-0 m-2">
                  <Badge bg={getCategoryBadgeColor(product.category)} className="px-3 py-2 rounded-pill text-white">
                    {product.category}
                  </Badge>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold fs-4 mb-3">{product.name}</Card.Title>
                  <Card.Text as="div">
                    <div className="d-flex align-items-center mb-2">
                      <CurrencyDollar className="text-success me-2" size={18} />
                      <span className="fw-semibold fs-5 text-success">₹{product.price}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Tag className="text-secondary me-2" size={18} />
                      <span>{product.category}</span>
                    </div>
                  </Card.Text>

                  <div className="text-center my-4 qr-container">
                    <QRCodeCanvas
                      value={`Product Name: ${product.name}\nPrice: ₹${product.price}\nCategory: ${product.category}`}
                      size={150}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"H"}
                      includeMargin={true}
                    />
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0 p-3">
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      onClick={() => editProduct(product)}
                      className="px-3 py-2 d-flex align-items-center"
                    >
                      <PencilSquare className="me-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteProduct(product._id)}
                      className="px-3 py-2 d-flex align-items-center"
                    >
                      <TrashFill className="me-2" />
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

// Add some custom CSS for enhanced styling
const styles = `
  .product-card {
    transition: transform 0.3s, box-shadow 0.3s;
    width:300px;
  
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
  }
  
  .qr-container {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    display: inline-block;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Product;