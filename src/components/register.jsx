import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [serverErrors, setServerErrors] = useState([])
    const navigate = useNavigate();

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password1: '',
        password2: '',
    };

    const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    const baseURL = 'http://localhost:5000/api/v1/auth/register'
    axios.post(baseURL, values)
        .then(function (response) {
        console.log(response);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        navigate('/')
        })
        .catch(function (error) {
            // console.log("err || ",error.response.data);`
            setServerErrors(error.response.data.message);
        });
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(3, 'First name must be at least 3 characters long')
            .max(20, 'First name must be maximum 20 characters long')
            .required('First Name is required'),
        lastname: Yup.string()
            .min(3, 'Last name must be at least 3 characters long')
            .max(20, 'Last name must be maximum 20 characters long')
            .required('Last Name is required'),
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        password1: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
        password2: Yup.string()
            .oneOf([Yup.ref('password1')], 'Passwords do not match')
            .required('Confirm password is required'),
    });

    return (
        <div className="row justify-content-center">
            <div className="col-sm-6 col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Register</h5>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="firstname">First Name</label>
                                        <Field type="text" name="firstname" id="firstname" className={`form-control ${errors.firstname && touched.firstname ? 'is-invalid' : ''}`} />
                                        <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">Last Name</label>
                                        <Field type="text" name="lastname" id="lastname" className={`form-control ${errors.lastname && touched.lastname ? 'is-invalid' : ''}`} />
                                        <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field type="email" name="email" id="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1">Password</label>
                                        <Field type="password" name="password1" id="password1" className={`form-control ${errors.password1 && touched.password1 ? 'is-invalid' : ''}`} />
                                        <ErrorMessage name="password1" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">Confirm Password</label>
                                        <Field type="password" name="password2" id="password2" className={`form-control ${errors.password2 && touched.password2 ? 'is-invalid' : ''}`} />
                                        <ErrorMessage name="password2" component="div" className="invalid-feedback" />
                                    </div>
                                    {serverErrors.length>0 && serverErrors.map(item => <div className="text-center text-danger mt-3">{item.msg}</div> )
                                        
                                    }
                                    <div className='d-flex flex-column align-content-center  '>

                                    <button type="submit" className="btn btn-primary btn-block mt-4 mb-4">Register</button>
                                    <NavLink className={'text-center'} to={'/register'}>already have account?</NavLink>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
}

export default Signup;