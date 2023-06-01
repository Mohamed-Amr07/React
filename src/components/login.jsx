import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')


  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!*_])[a-zA-Z\d@#$%^&+=!*_]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character (@#$%^&+=!*_), and be at least 8 characters long'
      )      
  });
  
  
  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props)
    // const payLoad = {
    //   "email": values.email
    // }
    const baseURL = 'http://localhost:5000/api/v1/auth/login'
    axios.post(baseURL, values)
      .then(function (response) {
      // console.log(response);
      console.log(response.data);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user));
      if(response.data.user.role ==='user'){
        navigate("/");
      }else{
        navigate("/admin");
      }
      })
      .catch(function (error) {
        // console.log("err || ", error.response.data);
      setError(error.response.data);
      });
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };


  return (
  
    <div className="row justify-content-center m-5 pt-5">
      <div className="col-sm-6 col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Login</h5>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" id="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" id="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  {error && <div className="text-danger text-center mt-3">{error}</div>

                  }
                  <div className='d-flex flex-column align-content-center  '>

                  <button type="submit" className="btn btn-primary btn-block mt-4 mb-4">Sign in</button>
                    <NavLink className={'text-center'}  to={'/register'}>don't hav an account?</NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
