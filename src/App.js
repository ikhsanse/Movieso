import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import RegisterPage from "./pages/RegisterPage";
import { AuthContextProvider } from "./store/context/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <div className="bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movie/:list" element={<MovieList />} />
          <Route path="movie/detail/:movieId" element={<MovieDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
