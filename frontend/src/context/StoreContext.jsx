import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  let url = "http://localhost:5000";
  // let url = "https://doi-demo.onrender.com";

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
