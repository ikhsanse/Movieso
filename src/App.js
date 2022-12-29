import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import RegisterPage from "./pages/RegisterPage";
import { AuthContextProvider } from "./store/context/auth-context";
import MyShow from "./pages/MyShow";
import '../node_modules/react-modal-video/scss/modal-video.scss';


function App() {
  document.title = "Movieso"
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
          <Route path="myshow" element={<MyShow />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
