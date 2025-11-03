import Visitor from "./layouts/visitors";
import React, { useState } from "react";

export const AppOpenContext = React.createContext(false);
export const SelectedVisitorInfoContext = React.createContext({});
export const GlobalContext = React.createContext([]);

const App = () => {
  const [globalVariable, setGlobalVariable] = useState({
    appOpen: true,
    agreePrivacy: false,
    siteID: "00000000-0000-0000-0000-000000000000",
    visitorID: null,
  });
  const [appOpen, setAppOpen] = useState(false);
  const [selectedVisitorInfo, setSelectedVisitorInfo] = useState({});

  localStorage.setItem("SiteID", "00000000-0000-0000-0000-000000000000");

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      <AppOpenContext.Provider value={{ appOpen, setAppOpen }}>
        <SelectedVisitorInfoContext.Provider
          value={{ selectedVisitorInfo, setSelectedVisitorInfo }}
        >
          <Visitor />
        </SelectedVisitorInfoContext.Provider>
      </AppOpenContext.Provider>
    </GlobalContext.Provider>
  );
};

export default App;
