import { useState } from "react";
import GistList from "./components/GistList";
import GistDetails from "./components/GistDetails";
import { DataProvider } from "./providers/DataProvider";

function App() {
  const [userName, setUserName] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="App">
      <DataProvider>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <GistList userName={userName} setShowDetails={setShowDetails} />
        {showDetails && (
          <div
            style={{
              height: "50%",
              width: "50%",
              marginTop: 50,
              border: "1px solid black",
            }}
          >
            <span
              onClick={() => setShowDetails(false)}
              style={{ flex: "flex", JustifyContent: "start" }}
            >
              x
            </span>
            <GistDetails />
          </div>
        )}
      </DataProvider>
    </div>
  );
}

export default App;
