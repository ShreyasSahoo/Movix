import "./styles.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  // if (credits) {
  //   console.log(credits.data.crew);
  // }
  return (
    <div>
      <DetailsBanner
        video={data?.data?.results[0]}
        crew={credits?.data?.crew}
      />
      <Cast data={credits?.data?.cast} loading={creditsLoading} />
      <VideosSection data={data?.data} isLoading={isLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
