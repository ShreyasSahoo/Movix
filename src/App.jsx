import { useEffect } from "react";
import { fetchAllContent } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./feature/home/homeSlice";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResults from "./pages/searchResults/SearchResults";
import Explore from "./pages/explore/Explore";
import Missing from "./pages/missing/Missing";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  // const url = useSelector((state) => state.home.url);
  useEffect(() => {
    fetchConfig();
    fetchGenres();
  }, []);
  const fetchConfig = () => {
    fetchAllContent("/configuration").then((res) => {
      const url = {
        backdrop: res.data.images.secure_base_url + "original",
        poster: res.data.images.secure_base_url + "original",
        profile: res.data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  const fetchGenres = async () => {
    const endPoints = ["movie", "tv"];
    const promises = [];
    const allGenres = {};

    endPoints.forEach((endPoint) => {
      promises.push(fetchAllContent(`/genre/${endPoint}/list`));
    });
    const data = await Promise.all(promises);
    // data.map(item => console.log(item))
    data.map((genres) => {
      // console.log()
      return genres.data.genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log(allGenres)
    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
