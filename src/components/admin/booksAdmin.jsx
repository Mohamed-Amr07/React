import React, { useState ,useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';


import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import schema from '../../schemas/schemas';
import { categoryAPI } from '../../API/Category';

import { bookAPI } from '../../API/Book';
import PaginationComponent from '../pagination';
export default function BooksAdmin() {

  // call api to get categories
  // call api to get authors
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (values) => {
    console.log(values)
    // createBook(values);
    // setBooksData([...booksData,values])
    if (values.hasOwnProperty("_id")) {
      editBook(values)
      setData({ name: "",author:"",category:"" })
    } else {
      createBook(values);
      setBooksData([...booksData, values])
      setData({ name: "", author: "", category: "" })


    }
    handleClose()

  }

  const [booksData, setBooksData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [authorData, setAuthorData] = useState([])
  const [totalpages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ name: "", category: "", author: "",image:"" })



  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
     setBooksData(booksData.filter(item=>item._id!==id))
    })
  }

  const deleteCategory = async (id) => {
    try {
      await bookAPI.deleteBook(id);
    } catch (error) {
      console.log(error)
    }
  }
  const editBook = async (data) => {
    try {
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
      await bookAPI.editBook(data._id, formData);
    } catch (error) {
      console.log(error)
    }
  }

  const createBook = async (data) => {
    try {
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }
      await bookAPI.addBook(formData);
    } catch (error) {
      console.log(error)
    }
  }


  const getAllBooks = async (page) => {
    try {
      let response = await bookAPI.getAllBooks(page);
      setCurrentPage(page)
      setTotalPages(response.data.totalPages)
      setBooksData([...response.data.books])
    } catch (error) {
      console.log(error)
    }
  }

  const getDataForDropDownMenu=async()=>{
    try {
      let response = await categoryAPI.getAllCategoriesAndAuthors();
      setCategoryData([...response.data.categories])
      setAuthorData([...response.data.authors])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllBooks(1, 10)
    getDataForDropDownMenu()

  }, [])
  return (
    <div>


      <Button variant="primary" onClick={handleShow}>
        Add Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={schema.book}>
            {({ errors, touched, setFieldValue }) => (
              <>
                <Form>
                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="name">Book Name</label>
                    <Field component="input"  type='text' className={`form-control  ${touched.name ? (errors['name'] ? "is-invalid" : "is-valid") : ""}`} name="name" placeholder='Book Name' />
                    <ErrorMessage name='name' className="invalid-feedback " component='div' />

                  </div>

                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="name">Category</label>
                    <Field name='category' as='select' className={`form-control  ${touched.category ? (errors['category'] ? "is-invalid" : "is-valid") : ""}`} >

                      <option  disabled >choose Category</option>
                      {
                        categoryData.map((category, index) => {
                          return <option key={index} value={category._id}>{category.name}</option>

                        })
                      }
                    </Field>
                    <ErrorMessage name='category' className="invalid-feedback " component='div' />

                  </div>

                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="name">Author</label>
                    <Field name='author' as='select' className={`form-control  ${touched.author ? (errors['author'] ? "is-invalid" : "is-valid") : ""}`} >

                      <option  disabled >choose Author</option>
                      {
                        authorData.map((author,index)=>{
                          return <option value={author._id}>{`${author.firstname} ${author.lastname}`}</option>

                        })
                      }
                 
                    </Field>
                    <ErrorMessage name='author' className="invalid-feedback " component='div' />

                  </div>

                  <div className='mb-3'>
                    <label className='form-lable' htmlFor="name">image</label>
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
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              booksData.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:5000${book.imgUrl}`} alt="" />
                  </td>
                  <td>{book.name}</td>
                  <td>{book.category?.name}</td>
                  <td>{`${book.author?.firstname}  ${book.author?.lastname}`}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                      <div className='btn btn-info ' onClick={() => {
                       let bookdata={_id:book._id, name: book.name}
                        setData(bookdata);
                        handleShow()
                      }}>edit</div>
                      <div className='btn btn-danger' onClick={() => { handleDelete(book._id) }}>delete</div>
                    </div>
                  </td>
                </tr>
              ))
            }
            
          </tbody>
        </Table>

      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalpages} onPageChange={getAllBooks} />

    </div>
  )
}
