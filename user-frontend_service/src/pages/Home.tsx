import "./home.css";
import { Link } from "react-router-dom";
import React from "react";
const Home: React.FC = () => {
  return (
    <div>
      <h2>Welcome to My App</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
};

export default Home;
