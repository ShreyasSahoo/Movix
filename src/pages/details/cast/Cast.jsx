import React from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import avatar from "../../../assets/avatar.png";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  //   if (data) {
  //     console.log(data);
  //   }
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              const imgUrl = item?.profile_path
                ? url?.profile + item?.profile_path
                : avatar;

              return (
                <div className="listItem" key={item.id}>
                  <div className="profileImg">
                    <LazyImage src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;