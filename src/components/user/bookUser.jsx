import React, { useEffect , useState} from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { bookAPI } from '../../API/Book';
import { useParams } from "react-router-dom";


export default function BookUser() {

const {id} = useParams()  
const getBook = async (id)=>{
  try{
    let response = await bookAPI.getBookById(id)
    console.log(response.data)
  }
  catch(err){
    console.log(err)
  }
}

const [book,setbook]= useState({imgUrl:'',name:'',author:'',category:''})

useEffect(()=>{
  getBook(id)
})
  return (

    <div>
    <div >
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
            <Nav.Link><img className="rounded" src="" alt="" /></Nav.Link>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        
          <div className="container d-flex m-5">
          <div className="bookCard" >
            <Card style={{ width: "12rem"}}>
              <Card.Img
                variant="top"
                src={book?.imgUrl}
              />
              <Card.Body>
                <Dropdown>
                  <Dropdown.Toggle variant="white" id="dropdown-basic">
                    want to read
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      read
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </div>
  
          <div className="bookInfo m-5 w-50">
            <h1>{book?.name}</h1>
            <h2>{book?.author}</h2>
            <h2>{book?.category}</h2>
            <p>4.5 - 356 rating</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusantium id, sunt distinctio consequatur adipisci ratione enim aspernatur reiciendis vel. Sequi veniam perspiciatis dolores mollitia beatae provident aut officiis quam.</p>
          </div>
        </div>
        }
      
      
    </div>

      

      <div className="container">
        <h1>Reviews</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut explicabo rerum veniam voluptatum et pariatur fugit dicta cupiditate, dolorum maxime delectus sunt nisi, nostrum ipsa sed vel, qui quo magnam.</p>
      </div>
    </div>
  );
}
