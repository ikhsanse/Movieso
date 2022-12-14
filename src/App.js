import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie/:list" element={<MovieList/>} />
        <Route path="movie/detail/:movieId" element={<MovieDetail/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
