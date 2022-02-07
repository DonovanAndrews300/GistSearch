import React, { useState } from "react";
import { useApi } from "../providers/DataProvider";

export default function GistDetails() {
  const [isRecommended, setIsRecommended] = useState();
  const { state, dispatch, updateRecommendedGist } = useApi();
  const { id, description, files } = state.currentGist;

  const toggleRecommended = () => {
    updateRecommendedGist(id)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE_RECOMMENDED",
          payload: res.data.updateRecommendedGist,
        });
        setIsRecommended(!isRecommended);
      });
  };
  return (
    <ul>
      <li>Date:</li>
      <li>Description: {description}</li>
      <li>Files: {files}</li>
      <li>
        Recommended:
        <input type="checkbox" onChange={() => toggleRecommended()} />
      </li>
    </ul>
  );
}
