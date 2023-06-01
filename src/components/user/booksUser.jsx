import React from 'react'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { bookAPI } from '../../API/Book';





export default function BooksUser() {
  let  [books, setBooks]  = useState([])

useEffect(()=>{
  const getAllBooks = async(id)=>{
    try {
    let res = await  bookAPI.getAllBooks();
    console.log(res.data.books)  
    setBooks(res.data.books)
    } catch (error) {
      console.log(error)
    }
  }
  getAllBooks()
  // async function fetchData(){
  //   let res = await fetch('http://localhost:2000/api/v1/books')
  //   let data = await res.json()
  //   console.log(data.data)
  //   setBooks(data.data)
  // }
  // fetchData();
}, [])

  return (
    <div className="bg-light text-dark p-5 text-center">
        <h3 className="mb-5">Books</h3>
        <div className="row">
          {
              books.map((book) => {
              return <div className="col-sm-6 col-md-4 col-lg-3 p-1" key={book._id}>
                <Card >
                  <Card.Img id="card" variant="top" src={book?.imgUrl} />
                  <Card.Body className="text-dark p-2 m-2">
                    <Nav.Link href={`/books/${book._id}`}>{book?.name}</Nav.Link>
                    <Nav.Link href={`/authors/${book._id}`}>{book?.author?.firstname+' '+book?.author?.lastname}</Nav.Link>
                  </Card.Body>
                </Card>
              </div>
            })
          }
        </div>
      </div>
  )
}
