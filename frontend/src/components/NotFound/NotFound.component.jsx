import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-auth">
      <h1>Oops!!</h1>
      <p>The resource you were looking for could not be found.</p>
      <Link className="btn" to="/">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
