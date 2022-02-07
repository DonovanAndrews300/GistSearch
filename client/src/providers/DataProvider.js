import React, { createContext, useReducer, useContext } from "react";

export const DataContext = createContext();
export const useApi = () => useContext(DataContext);

const initialState = {
  currentUser: [],
  currentGist: {},
};
function dataReducer(state, action) {
  switch (action.type) {
    case "GET_USER_GISTS":
      return { ...state, currentUser: action.payload };

    case "GET_GIST":
      return { ...state, currentGist: action.payload };

    case "UPDATE_RECOMMENDED":
      return { ...state, currentGist: action.payload };

    default:
      throw new Error();
  }
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getGist = (id) => {
    try {
      return fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          {
            getGist(gistId:${id}){
              id,
              description,
              files
            }
           } 
          `,
          variables: {
            now: new Date().toISOString(),
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateRecommendedGist = (gistId) => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
         mutation{
            updateRecommendedGist(gistId:${gistId}) {
              id
              description
              date
            }}
        `,
        variables: {
          now: new Date().toISOString(),
        },
      }),
    });
  };
  const getGists = (username) => {
    try {
      return fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        {
          getGists(username:"${username}"){
            id,
            description,
            date,
            recommended,
            files
          }
         }  
        `,
          variables: {
            now: new Date().toISOString(),
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        getGist,
        getGists,
        updateRecommendedGist,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
