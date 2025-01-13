import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  let url = "http://localhost:5000";
  // let url = "https://doi-demo.onrender.com";

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [sapSalesModuleText, setSapSalesModuleText] = useState(false);
  const [sapMaterialsModuleText, setSapMaterialsModuleText] = useState(false);
  const [sapIntroText, setSapIntroText] = useState(true);
  const [menu, setMenu] = useState("home");
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [salesTable, setSalesTable] = useState("");
  const [homeText, setHomeText] = useState(true);
  const [homeText1, setHomeText1] = useState(true);

  const fromDate = "2023-08-19";
  const lastDate = "2025-01-13";

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      setToken(jwtToken);
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const contextValue = {
    url,
    username,
    token,
    setToken,
    setUsername,
    sapSalesModuleText,
    setSapSalesModuleText,
    fromDate,
    lastDate,
    sapMaterialsModuleText,
    setSapMaterialsModuleText,
    sapIntroText,
    setSapIntroText,
    menu,
    setMenu,
    isLoading1,
    setLoading1,
    isLoading,
    setLoading,
    salesTable,
    setSalesTable,
    homeText,
    setHomeText,
    homeText1,
    setHomeText1,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
