import React from 'react'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { authorAPI } from "../../API/Author";


export default function AuthorsUser() {
  let  [authors, SetAuthors]  = useState([])

useEffect(()=>{
  
  const getAuhtors = async(id)=>{
    try {
      let res = await authorAPI.getAllAuthors();
    console.log(res.data.authors)  
    SetAuthors(res.data.authors)
    } catch (error) {
      console.log(error)
    }
  }
  getAuhtors()
}, [])


  return (
    <div className="bg-light  text-dark p-5 text-center">
        <h3 className="mb-5">Authors</h3>
        <div className="row">
          {
              authors.map((author) => {
              return <div className="col-sm-6 col-md-4 col-lg-3 p-1" key={author._id}>
                <Card >
                  <Card.Img id="card" variant="top" src={author?.imgUrl} />
                  <Card.Body className="text-dark p-2 m-2">
                    <Nav.Link href={`/authors/${author._id}`}>{author?.firstname+' '+author?.lastname}</Nav.Link>
                  </Card.Body>
                </Card>
              </div>
            })
          }
        </div>
      </div>
  )
}


