import React, { useEffect } from "react";
import { useApi } from "../providers/DataProvider";
export default function GistList({ userName, setShowDetails }) {
  const { state, dispatch, getGists, getGist } = useApi();
  const { currentUser, currentGist } = state;
  useEffect(() => {
    getGists(userName)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "GET_USER_GISTS", payload: res.data.getGists });
      });
  }, [userName, currentGist]);

  const selectGist = (id) => {
    getGist(id)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "GET_GIST", payload: res.data.getGist });
        setShowDetails(true);
      });
  };

  const renderGist = ({ id, description, date, recommended }) => {
    return (
      <tr key={id} onClick={() => selectGist(id)}>
        <td>{description}</td>
        <td>{date}</td>
        <td>{recommended && "x"}</td>
      </tr>
    );
  };

  return (
    <table>
      {userName}
      <tbody>
        <tr>
          <th>description</th>
          <th>date</th>
          <th>recommended</th>
        </tr>
        {currentUser && currentUser.map((gist) => renderGist(gist))}
      </tbody>
    </table>
  );
}
