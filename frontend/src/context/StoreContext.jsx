import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  let url = "http://localhost:5000";

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
