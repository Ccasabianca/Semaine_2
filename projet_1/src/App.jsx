import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import the CSS file

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container className="mt-4 mx-auto">
      <Row className="justify-content-center">
        {products.map((product) => (
          <Col key={product.id} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                className="card-img"
              />
              <Card.Body className="card-body">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {product.price}€
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
