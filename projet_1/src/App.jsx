import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = async () => {
    const newProduct = {
      title: "Nouveau produit",
      price: 9.99,
      description: "Produit ajouté en POST",
      image: "https://via.placeholder.com/150",
      category: "electronics",
    };

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();

    setProducts([...products, data]);

    alert("Le produit avec l'id " + data.id + " a été créé");
  };

  const updateProduct = async (id) => {
    const updatedProduct = {
      title: "Produit mis à jour",
      price: 49.99,
      description: "Description mise à jour",
      image: "https://via.placeholder.com/150",
      category: "electronics",
    };

    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();

    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );

    alert("Le produit avec l'id " + data.id + " a été modifié");
  };

  return (
    <Container className="mt-4 mx-auto">
      <Row className="justify-content-center mb-4">
        <Button onClick={addProduct} className="add-btn" variant="primary">
          Ajouter un produit
        </Button>
      </Row>

      <Row className="justify-content-center">
        {products.map((product) => (
          <Col
            key={product.id}
            md={4}
            lg={3}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                className="card-img"
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {product.price}€
                <br />
                <Button
                  onClick={() => updateProduct(product.id)}
                  className="update-btn my-2"
                  variant="warning"
                >
                  Modifier le produit complet
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
