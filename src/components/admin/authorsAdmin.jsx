import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';


import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import schema from '../../schemas/schemas';

import { authorAPI } from '../../API/Author';
import PaginationComponent from '../pagination';

export default function AuthorsAdmin() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [authorsData, setAuthorsData] = useState([])
  const [totalpages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ firstname: "", lastname: "", date_of_birth: "",image:"" })


  const handleSubmit = (values) => {

    if (values.hasOwnProperty("_id")) {
      editAuthor(values)
      setData({ firstname: "", lastname: "", date_of_birth: "" })


    } else {
      createAuthor(values)

    }
    handleClose()
  }

  const handleDelete = (id) => {
    deleteAuthor(id)
  }

  const deleteAuthor = async (id) => {
    try {
      await authorAPI.deleteAuthor(id);
    } catch (error) {
      console.log(error)
    }
  }
  const editAuthor = async (data) => {
    try {
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
     const author= await authorAPI.editAuthor(data._id, formData);
     console.log("after edit",author)
    } catch (error) {
      console.log(error)
    }
  }

  const createAuthor = async (data) => {
    try {
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
      const author = await authorAPI.addAuthor(formData);

      setAuthorsData([...authorsData, author.data.author])
    } catch (error) {
      console.log(error)
    }
  }
// //////////////////////////



  const getAllAuthors = async (page) => {
    try {
      let response = await authorAPI.getAllAuthors(page);
console.log("authors",response.data)
      setCurrentPage(page)
      setTotalPages(response.data.totalPages)
      setAuthorsData([...response.data.authors])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllAuthors(1)

  }, [])
  return (
    <div>


      <Button variant="primary" onClick={handleShow}>
        Add Author
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={schema.author}>
            {({ errors, touched, setFieldValue }) => (
              <>
                <Form>
                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="firstname">First Name</label>
                    <Field component="input" id="firstname" type='text' className={`form-control  ${touched.firstname ? (errors['firstname'] ? "is-invalid" : "is-valid") : ""}`} name="firstname" placeholder='First Name' />
                    <ErrorMessage name='firstname' className="invalid-feedback " component='div' />

                  </div>


                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="lastname">Last Name</label>
                    <Field component="input" type='text' className={`form-control  ${touched.lastname ? (errors['lastname'] ? "is-invalid" : "is-valid") : ""}`} name="lastname" placeholder='Last Name' />
                    <ErrorMessage name='lastname' className="invalid-feedback " component='div' />

                  </div>

                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="date_of_birth">Date of Birth</label>
                    <Field component="input" id="date_of_birth" type='date' className={`form-control  ${touched.date_of_birth ? (errors['date_of_birth'] ? "is-invalid" : "is-valid") : ""}`} name="date_of_birth"  />
                    <ErrorMessage name='date_of_birth' className="invalid-feedback " component='div' />

                  </div>

                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="image">image</label>
                    <input
                      name="image"
                      type='file'
                      className={
                        `form-control  ${touched.image ? (errors['image'] ? "is-invalid" : "is-valid") : ""}`}
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage name='image' className="invalid-feedback " component='div' />

                  </div>


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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {
            authorsData.map((author, index) => (
              <tr key={author._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={`http://localhost:5000${author.imgUrl}`} alt="" />
                </td>
                <td>{author.firstname}</td>
                <td>{author.lastname}</td>
                <td>{new Date (author.DOB).toLocaleDateString()}</td>
                <td>
                  <div className='d-flex justify-content-between'>
                    <div className='btn btn-info ' onClick={() => {

                      let  authordata={
                        _id:author._id,
                        firstname:author.firstname,
                        lastname:author.lastname,
                        date_of_birth:"",image:""
                      
                      }
                      setData(authordata);
                      handleShow()
                    }}>edit</div>
                    <div className='btn btn-danger' onClick={() => { handleDelete(author._id) }}>delete</div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <PaginationComponent currentPage={currentPage} totalPages={totalpages} onPageChange={getAllAuthors} />

    </div>
  )
}
