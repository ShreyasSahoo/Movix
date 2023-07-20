import "./styles.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/LazyImage";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const { url } = useSelector((state) => state.home);
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);
  const _genres = data?.data?.genres?.map((genre) => genre.id);
  // console.log(data?.data);
  const writer = crew?.filter(
    (person) =>
      person.job === "Screenplay" ||
      person.job === "Writer" ||
      person.job === "Story"
  );
  const director = crew?.filter((person) => person.job === "Director");
  // if (crew) {
  //   const jobs = crew?.map((member) => member.job);
  //   console.log(jobs);
  // }
  // if (writer) {
  //   console.log(writer);
  //   console.log(video);
  // }

  return (
    <div className="detailsBanner">
      {!isLoading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.data.poster_path ? (
                      <Img
                        src={url.backdrop + data.data.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data.data.name || data.data.title
                    }(${dayjs(data.data.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data.data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating
                        rating={data.data.vote_average.toFixed(1)}
                      />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.data.overview}</div>
                    </div>
                    <div className="info">
                      {data.data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <span className="text">{data.data.status}</span>
                        </div>
                      )}
                      {data.data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <span className="text">
                            {dayjs(data.data.release_date).format(
                              "MMM D, YYYY"
                            )}
                          </span>
                        </div>
                      )}
                      {data.data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Run Time : </span>
                          <span className="text">
                            {toHoursAndMinutes(data.data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          {director?.length > 1
                            ? "Directors : "
                            : "Director : "}
                        </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
