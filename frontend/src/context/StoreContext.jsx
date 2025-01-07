import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  let url = "http://localhost:5000";
  // let url = "https://doi-demo.onrender.com";

  const contextValue = {
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
