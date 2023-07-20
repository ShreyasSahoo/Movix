import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { fetchAllContent } from "../../utils/api";
import noResults from "../../assets/no-results.png";
import "./styles.scss";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useParams();
  const fetchInitialData = async () => {
    setIsLoading(true);
    fetchAllContent(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res.data);
        setIsLoading(false);
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    fetchInitialData();
    setPageNum(1);
  }, [query]);
  if (data) {
    console.log(data);
  }

  const fetchNextPageData = () => {
    fetchAllContent(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.data?.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  return (
    <div className="searchResultsPage">
      {isLoading && <Spinner initial={true} />}
      {!isLoading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } for '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard data={item} key={index} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
