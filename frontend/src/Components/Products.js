import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const saveProduct = async () => {
    try {
      const productData = { name, price, category };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, productData);
      }

      setName('');
      setPrice('');
      setCategory('');
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-5 text-center fw-bold">🛒 Product Management</h2>

      {/* Product Form */}
      <Card className="p-4 shadow-sm mb-5">
        <Form>
          <Row className="gy-3">
            <Col md={4}>
              <Form.Control
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button
                variant={editingId ? "warning" : "success"}
                onClick={saveProduct}
                className="w-100 fw-semibold"
              >
                {editingId ? "Update" : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Product Cards */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map(product => (
          <Col key={product._id}>
            <Card className="h-100 shadow-sm rounded-4">
              <Card.Body>
                <Card.Title className="fw-bold">{product.name}</Card.Title>
                <Card.Text>
                  <span className="d-block mb-1"><strong>💵 Price:</strong> ₹{product.price}</span>
                  <span className="d-block"><strong>📦 Category:</strong> {product.category}</span>
                </Card.Text>

                <div className="text-center my-3">
                  <QRCodeCanvas
                    value={`Product Name: ${product.name}\nPrice: ₹${product.price}\nCategory: ${product.category}`}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={true}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() => editProduct(product)}
                  >
                    <PencilSquare className="me-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <TrashFill className="me-1" />
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Product;
