import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Home from "./components/Home/home.component";
import LoginForm from "./components/LoginForm/loginForm.component";
import "./App.styles.scss";
import SignUpForm from "./components/SignupForm/signupForm.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
}

export default App;
