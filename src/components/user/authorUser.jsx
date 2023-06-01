import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
// import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { authorAPI } from "../../API/Author";
import { useParams } from "react-router-dom";

export default function AuthorUser() {
  const { id } = useParams();
  const getAuthor = async (id) => {
    try {
      let response = await authorAPI.getAuthorById(id);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [Author, setAuthor] = useState({
    firstName: "",
    lastName: "",
    books: [],
    imgUrl: "",
    DOB: "",
  });

  const [selectedValue, setSelectedValue] = useState('');

  function handleSelectChange(event) {
    setSelectedValue(event.target.value);
    let value = event.target.value;
    // call addtowishlist function 
  }

  useEffect(() => {
    getAuthor(id);
  });



  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href={`/`}>Home</Nav.Link>
              <Nav.Link href={`/categories/:id`}>Categories</Nav.Link>
              <Nav.Link href={`/books/:id`}>Books</Nav.Link>
              <Nav.Link href={`/authors/:id`}>Authors</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link>
              <img className="rounded" src="" alt="" />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {
        <div className="container d-flex m-5">
          <div className="AuthorCard">
            <Card style={{ width: "12rem" }}>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rI_tn3BpM-qwJC7iEu1ntsQtAN4ZDteE4g&usqp=CAU" />
            </Card>
          </div>

          <div className="AuthorInfo m-5 w-50">
            <h1>{Author?.name}</h1>
            <h2>{Author?.BD}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              accusantium id, sunt distinctio consequatur adipisci ratione enim
              aspernatur reiciendis vel. Sequi veniam perspiciatis dolores
              mollitia beatae provident aut officiis quam.
            </p>
          </div>
        </div>
      }
      {
        <div className="container">
          <h1>Auther's Books</h1>
          <div className="Authorbooks">
            <Card>
              <Card.Body className="d-flex">
                <Card.Img variant="left" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rI_tn3BpM-qwJC7iEu1ntsQtAN4ZDteE4g&usqp=CAU" />
                <h1 className="p-5">book name</h1>
                <div className="card flex justify-content-center">
                  <select className="form-control" name="cars" id="cars" value={selectedValue} onChange={(handleSelectChange)}>
                    <option value="want to read">Want to read</option>
                    <option value="read">Read</option>
                    <option value="reading">Reading</option>
                  </select>
                </div>

              </Card.Body>
            </Card>













          </div>
        </div>
      }
    </div>
  );
}
