import { Link } from 'react-router-dom';

function NotFound({path}) {
    return (
        <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-6 text-center">
            <h1 className="display-4">404 Page Not Found</h1>
            <p className="lead">The page you're looking for doesn't exist.</p>
            <Link to={path} className="btn btn-primary mt-3">
                Go back to homepage
            </Link>
            </div>
        </div>
        </div>
    );
}

export default NotFound;
