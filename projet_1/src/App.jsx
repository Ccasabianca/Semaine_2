import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetch lancé");
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log("Fetch réussi", data);
      } catch (err) {
        console.error("Erreur pendant le fetch", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    try {
      console.log("Ajout produit");
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
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      const data = await response.json();
      setProducts([...products, data]);
      console.log("Ajout produit réussi", data);
      alert("Le produit avec l'id " + data.id + " a été créé");
    } catch (err) {
      console.error("Erreur pendant ajout produit", err.message);
      alert("Erreur : " + err.message);
    }
  };

  const updateProduct = async (id) => {
    try {
      console.log(`Update produit ${id}`);
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
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      console.log(`Update produit ${id} OK`);
      alert("Le produit avec l'id " + id + " a été modifié");
    } catch (err) {
      console.error("Erreur update produit", err.message);
      alert("Erreur : " + err.message);
    }
  };

  const updateProductPrice = async (id) => {
    try {
      console.log(`Update prix pour produit ${id}`);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: 39.99 }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, price: 39.99 } : product
        )
      );
      console.log(`Update prix OK pour produit ${id}`);
      alert("Le prix du produit avec l'id " + id + " a été modifié");
    } catch (err) {
      console.error("Update prix erreur:", err.message);
      alert("Erreur : " + err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.log(`Supprime produit ${id}`);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      setProducts(products.filter((product) => product.id !== id));
      console.log(`Produit ${id} supprimé`);
      alert("Le produit avec l'id " + id + " a été supprimé");
    } catch (err) {
      console.error("Erreur suppression produit", err.message);
      alert("Erreur : " + err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

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
                <Button
                  onClick={() => updateProductPrice(product.id)}
                  className="update-price-btn my-2"
                  variant="success"
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  onClick={() => deleteProduct(product.id)}
                  className="delete-btn my-2"
                  variant="danger"
                >
                  Supprimer le produit
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
