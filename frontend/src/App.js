import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Home from "./components/Home/home.component";
import LoginForm from "./components/LoginForm/loginForm.component";
import "./App.styles.scss";
import SignUpForm from "./components/SignupForm/signupForm.component";
import { UserContext } from "./context/user.context";
import { useContext } from "react";
import DNAToAA from "./components/dna-to-aa/dnaToAA.component";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized.component";
import NotFound from "./components/NotFound/NotFound.component";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUpForm />} />
        {currentUser ? (
          <Route path="dna-to-aa" element={<DNAToAA />} />
        ) : (
          <Route path="dna-to-aa" element={<NotAuthorized />} />
        )}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
