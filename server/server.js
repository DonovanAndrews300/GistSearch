var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

let githubUsers = [
  {
    id: 1,
    userName: "Joey",
    date: "September 22, 2011",

    gists: [
      {
        id: 11,
        description: "This is the gist of it ;)",
        date: "September 22, 2011",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 12,
        description: "This is the gist of it ;)",
        date: "September 22, 2011",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 13,
        description: "This is the gist of it ;)",
        date: "September 22, 2011",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
    ],
  },
  {
    id: 2,
    userName: "Paul",
    gists: [
      {
        id: 21,
        description:
          "Life is a journey, and every journey eventually leads to home.",
        date: "March 11, 2014",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 22,
        description:
          "Life is a journey, and every journey eventually leads to home.",
        date: "March 11, 2014",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 23,
        description:
          "Life is a journey, and every journey eventually leads to home.",
        date: "March 11, 2014",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
    ],
  },
  {
    id: 3,
    userName: "Jack",
    gists: [
      {
        id: 31,
        description: "May the Dark shine your way.",
        date: "March 24, 2016",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 32,
        description: "May the Dark shine your way.",
        date: "March 24, 2016",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
      {
        id: 33,
        description: "May the Dark shine your way.",
        date: "March 24, 2016",
        recommended: false,
        files: [
          "index.js",
          "Example.js",
          "AnorLondo.js",
          "RoadOfSacrifices.js",
        ],
      },
    ],
  },
];

// Construct a schema, using GraphQL schema language
var readSchema = buildSchema(`
  type Gist {
      id:Int
      description:String, 
      date:String,
      files:[String],
      recommended:Boolean
    }
  type User {
      id:Int,
      userName:String,
      gists:[Gist],
  }
  type Query {
    getUsers: [User],
    getGists(username:String):[Gist],
    getGist(gistId:Int):Gist
  }
  type Mutation {
      updateFavoriteGist(userId:Int gistId:Int, bol:Boolean):[Gist],
      
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getGists: ({ username }) => {
    let gists = null;
    githubUsers.forEach((user) => {
      if (user.userName === username) {
        gists = user.gists;
      }
    });
    console.log(gists);
    return gists;
  },

  getGist: (gistId) => {
    let currentGist = null;
    githubUsers.forEach((user) => {
      if (currentGist) return;
      currentGist = user.gists.find((el) => {
        return el.id === gistId.gistId;
      });
    });
    return currentGist;
  },

  updateFavoriteGist: (payload) => {
    let currentGistIndex = -1;
    const { userId, gistId, bol } = payload;
    githubUsers.forEach((user) => {
      if (userId === user.id && currentGistIndex < 0) {
        currentGistIndex = user.gists.findIndex((el) => el.id === gistId);
      }
    });
    githubUsers.forEach((user, index) => {
      if (userId === user.id) {
        const currentGist = githubUsers[index].gists[currentGistIndex];
        githubUsers[index].gists[currentGistIndex] = {
          ...currentGist,
          recommended: bol,
        };
        console.log(githubUsers[index].gists[currentGistIndex]);
      }
    });
  },
  getUserInfo: () => {
    return "Hello worldoo!";
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: readSchema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
