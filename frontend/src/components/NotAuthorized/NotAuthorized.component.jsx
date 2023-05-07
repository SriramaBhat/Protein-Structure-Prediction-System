import { Link } from "react-router-dom";
import "./notAuth.styles.scss";

const NotAuthorized = () => {
  return (
    <div className="not-auth">
      <h1>Not Authorized !!</h1>
      <p>Please Sign In to access this feature</p>
      <Link className="btn" to="/login">
        Sign In
      </Link>
    </div>
  );
};

export default NotAuthorized;
