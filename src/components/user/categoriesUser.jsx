import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import axios from 'axios';
import PaginationComponent from '../pagination';
import { categoryAPI } from '../../API/Category';
import { useNavigate } from 'react-router-dom';

export default function CategoriesUser() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (state) => {

    setShow(true);
  }

  const [myData, setData] = useState([]);
  const [categoryData, setCategoriesData] = useState([])
  const [totalpages, setTotalPages] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  
  
  const getAllCategory = async (page,limit=8) => {
    try {
      let response = await categoryAPI.getAllCategories(page,limit=16);
      console.log(response.status)
      if(response.status){
        setCurrentPage(page)
        setTotalPages(response.data.totalPages)
        setData([...response.data.categories]);
      }else{
        navigate('/login');
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory(1)

  }, [])

  useEffect(() => {
    // console.log("Data:", myData);
  }, [myData]);


      return (
    <div className='container mt-5'>
          <div className='d-flex flex-column align-items-center font-weight-bold'>
            <div className='m-3 align-item-center justifyContent'  style={{ fontSize: '24px', color:'blue' }}>CategoriesUser</div>
          </div>
          <div className='d-flex flex-wrap'>
                  {myData.map((item,index)=>{

            return <ListGroup className='col-3' style={{ maxWidth: '400px' }} key={index}>
                      <Link to={`/categories/${item._id}`} style={{textDecoration:'none', curser: 'pointer'}}>
                          <ListGroup.Item className='m-1 ml-4'onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'lightgray';
                              }}
                              onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'inherit';
                              }}
                              onClick={(e) => {e.target.style.backgroundColor = 'lightblue'; e.stopPropagation();}} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>{item.name}</ListGroup.Item>
                      </Link>
                      <br/>
                    </ListGroup>
                  })}
                      {/* return <ListGroup.Item key={index}>{item.name}</ListGroup.Item> */}
    </div>
    <div className='d-flex justify-content-center'>
        <PaginationComponent currentPage={currentPage} totalPages={totalpages} onPageChange={getAllCategory} />
      </div>    </div>
  )
}
