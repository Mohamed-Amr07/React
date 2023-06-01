import React from 'react'
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


export default function Home() {
  let [user, setUser] = useState([])
  let [flag, setFlag] = useState('All')

  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      let res = await fetch('http://localhost:2000/api/v1/users/646859ae2d91fcd6ee319451') //${id}
      let data = await res.json()
      console.log(data.data)
      setUser(data.data)
    }
    fetchData();
  }, [])

  // let filteredBook = user[0].books.filter((book) => {
  //   return book.status == flag
  // })
  

  return (
    <div className='d-flex row justify-content-around' style={{ height: "100vh" }}>
      <div className='col-2 bg-dark text-light p-5 row'>
        <button className='bg-dark text-light' onClick={() => setFlag('All')}>all</button>
        <button className='bg-dark text-light' onClick={() => setFlag('Read')}>read</button>
        <button className='bg-dark text-light' onClick={() => setFlag('Currenly Reading')}>currenly reading</button>
        <button className='bg-dark text-light' onClick={() => setFlag('Want To Read')}>want to read</button> 
      </div>
      <div className='col-10 p-5 bg-light m-1'>
        <h3>{flag}</h3>
        <Table bordered className="text-dark text-center">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Author</th>
              <th>Avg Rate</th>
              <th>Rating</th>
              <th>Shelve</th>
            </tr>
          </thead>
          <tbody>
            {/* {user[0].books.map((book) => {
              return (
                <tr>
                  <td>cover</td>
                  <td>{book.bookId}</td>
                  <td>{book._id}</td>
                  <td>{book.rate}</td>
                  <td>{book.rate}</td>
                  <td>
                    <select name="status" id="status">
                      <option value="volvo">read</option>
                      <option value="saab">currenly reading</option>
                      <option value="mercedes">want to read</option>
                    </select>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
