import { useState, useEffect } from "react";
import "./styles.scss";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
const Header = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleOpenMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const handleCloseMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleOpenSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const handleNavigate = (endpoint) => {
    navigate(`/explore/${endpoint}`);
    handleCloseMobileMenu();
  };

  const handleSearchQuery = (event) => {
    if (event.key === "Enter" && query) {
      navigate(`/search/${query}`);
    }
  };

  const handleScroll = () => {
    // console.log(window.scrollY)
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow('hide')
      }
      else{
        setShow('show')
      }
    }
    else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);
  return (
    <header className={`${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={() => navigate("/")} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => handleNavigate("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => handleNavigate("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={handleOpenSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={handleOpenSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={handleCloseMobileMenu} />
          ) : (
            <SlMenu onClick={handleOpenMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a Movie or a TV Show"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchQuery}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
