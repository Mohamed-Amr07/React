import React from 'react'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { useParams } from "react-router-dom";
// import { categoryAPI } from '../../API/Category';
import { bookAPI } from '../../API/Book';





export default function CategoryUser() {
  let  [books, SetBooks]  = useState([])
  let  [category, SetCategory]  = useState('')
  const { id } = useParams();

  
  useEffect(()=>{
    // const getCategory = async(id)=>{
    //   try {
    //    let res = await categoryAPI.getCategoryById('646a3b8a5b5687869fa10ab9');
    //     SetCategory(res.data.category[0])
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // getCategory();

    const getCategoryBooks = async(id)=>{
      try {
       let res = await bookAPI.getAllBooks(1, 5, '646a3b8a5b5687869fa10ab9');
      // console.log(res.data.books)  
      SetCategory(res.data.books[0].category)
      SetBooks(res.data.books)
      } catch (error) {
        console.log(error)
      }
    }
    getCategoryBooks();
  }, [])
  
    return (
      <div className="bg-light text-dark p-5 text-center">
        <h3 className="mb-5">{category.name}</h3>
          <div className="row">
            {
                books.map((book) => {
                return <div className="col-sm-6 col-md-4 col-lg-3 p-1" key={book._id}>
                  <Card >
                    <Card.Img id="card" variant="top" src={book?.imgUrl} />
                    <Card.Body className="text-dark p-2 m-2">
                      <Nav.Link href={`/books/${book._id}`}>{book?.name}</Nav.Link>
                    </Card.Body>
                  </Card>
                </div>
              })
            }
          </div>
        </div>
    )
}
