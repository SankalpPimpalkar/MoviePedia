import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import EditMovie from "./pages/EditMovie";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="search" element={<SearchMovies />} />

        <Route element={<ProtectedLayout />}>
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="edit-movie/:id" element={<EditMovie />} />
        </Route>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}
