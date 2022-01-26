import React from "react";

export default function GistList() {
  const getGists = (payload) => {
    console.log(payload);
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        getGists(username:${payload}){
          files
        }
       }
       
        
      `,
        variables: {
          now: new Date().toISOString(),
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  getGists({ username: "Paul" });
  return <div>testing</div>;
}
