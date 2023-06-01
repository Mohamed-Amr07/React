import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

import schema from '../../schemas/schemas';
//  api
import { categoryAPI } from '../../API/Category';
import PaginationComponent from '../pagination';
export default function CategoriesAdmin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (state) => {

    setShow(true);
  }
  const [categoryData, setCategoriesData] = useState([])
  const [totalpages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ name: "" })


  const handleSubmit = (values) => {

    if (values.hasOwnProperty("_id")) {
      editCategory(values)
        setData({name:""})

      
    } else {
      createCategory(values).then(()=>{
        setCategoriesData([...categoryData,values])
      })
      
    }
    handleClose()
  }

  const handleDelete=(id)=>{
    deleteCategory(id).then(() => {
      setCategoriesData(categoryData.filter(item=>item._id !== id))
     })
  }

  const deleteCategory=async(id)=>{
    try {
      await categoryAPI.deleteCategory(id);
    } catch (error) {
      console.log(error)
    }
  }
  const editCategory = async (data) => {
    try {
      await categoryAPI.editCategory(data._id, data);
    } catch (error) {
      console.log(error)
    }
  }

  const createCategory = async (data) => {
    try {
      const cat=await categoryAPI.addCategory(data);

      setCategoriesData([...categoryData, cat.data.category])
    } catch (error) {
      console.log(error)
    }
  }


  const getAllCategory = async (page) => {
    try {
      let response = await categoryAPI.getAllCategories(page);

      setCurrentPage(page)
      setTotalPages(response.data.totalPages)
      setCategoriesData([...response.data.categories])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory(1)

  }, [])
  return (
    <div>

      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={schema.category}>
            {({ errors, touched }) => (
              <>
                <Form>
                  <Field component="input" type='text' className={`form-control  ${touched.name ? (errors['name'] ? "is-invalid" : "is-valid") : ""}`} name="name" placeholder='Category Name' />
                  <ErrorMessage name='name' className="invalid-feedback " component='div' />


                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit' >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <div>
        <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              categoryData.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                      <div className='btn btn-info ' onClick={() => {
                        setData(cat);
                        handleShow()
                      }}>edit</div>
                      <div className='btn btn-danger' onClick={()=>{handleDelete(cat._id)}}>delete</div>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>

      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalpages} onPageChange={getAllCategory} />
    </div>
  )
}


