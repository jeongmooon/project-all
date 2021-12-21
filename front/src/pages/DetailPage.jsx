import React from "react";
import DetailContainer from "../containers/detail/DetailContainer";

const DetailPage = ({ itemId, getDetailData, detailData }) => {
  return (
    <DetailContainer
      itemId={itemId}
      getDetailData={getDetailData}
      detailData={detailData}
    />
  );
};

export default DetailPage;
