import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
const HeroBanner = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { data } = useFetch("/movie/upcoming");
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    if (data) {
      const bg =
        url.backdrop +
        data?.data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
      // console.log(background)
    }
  }, [data, url.backdrop]);

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      <div className="backdropImg">
        <LazyImage src={background} className={"heroBannerLazyImage"} />
      </div>
      <div className="opacityLayer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of Movies , TV Shows and People to discover. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or a TV Show"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
