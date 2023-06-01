import "./App.css";
import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/user/home";
import BookUser from "./components/user/bookUser";
import BooksUser from "./components/user/booksUser";
import CategoriesUser from "./components/user/categoriesUser";
import CategoryUser from "./components/user/categoryUser";
import AuthorsUser from "./components/user/authorsUser";
import AuthorUser from "./components/user/authorUser";
import Login from "./components/login";
import Register from "./components/register";
import Admin from "./components/admin/admin";
import NotFound from "./components/NotFound";
import { useNavigate } from 'react-router-dom';


function App() {

  const token = localStorage.getItem('token') || ''
  const user = JSON.parse(localStorage.getItem('user')) || ''
  let isAdmin = false
  user.role === "admin" ? isAdmin = true : isAdmin = false
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };
  
  return (
    <Fragment>
<Routes>
        {token && isAdmin ? (
          <>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound path='/admin' />} />
          </>
        ) : token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookUser />} />
            <Route path="/books" element={<BooksUser />} />
            <Route path="/categories" element={<CategoriesUser />} />
            <Route path="/categories/:id" element={<CategoryUser />} />
            <Route path="/authors" element={<AuthorsUser />} />
            <Route path="/authors/:id" element={<AuthorUser />} />
            <Route path="*" element={<NotFound path='/' />} />

          </>
        ) : (
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />

          {/* <Route path="*" element={<NotFound path='/login'/>} /> */}
          </>

        )
        }

          <Route path="*" element={<NotFound />} />


      </Routes>

    </Fragment>
  );
}

export default App;
