import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://hanelytics-reporting-backend.onrender.com"; // Vsoft

    const [token, setTokenState] = useState("");
    const [username, setUsernameState] = useState("");

    const [sapSalesModuleText, setSapSalesModuleText] = useState(false);
    const [sapMaterialsModuleText, setSapMaterialsModuleText] = useState(false);
    const [sapIntroText, setSapIntroText] = useState(true);
    const [menu, setMenu] = useState("home");
    const [isLoading1, setLoading1] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [salesTable, setSalesTable] = useState("");
    const [homeText, setHomeText] = useState(true);
    const [homeText1, setHomeText1] = useState(true);
    const [loadProcurementData, setLoadProcurementData] = useState(false);
    const [loadSalesData, setLoadSalesData] = useState(false);
    const [loadOTC, setLoadOTC] = useState(false);
    const [loadProcurement, setLoadProcurement] = useState(false);
    const [loadFinance, setLoadFinance] = useState(false);

    const fromDate = "2023-08-19";
    const lastDate = "2025-01-13";

    // Sync state with localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token") || "";
        const storedUsername = localStorage.getItem("username") ;
        setTokenState(storedToken);
        if (storedUsername){
            setUsername(storedUsername);
        }
    }, []);

    // Token setter syncing with localStorage
    const setToken = (tokenValue) => {
        if (tokenValue) {
            localStorage.setItem("token", tokenValue);
        } else {
            localStorage.removeItem("token");
        }
        setTokenState(tokenValue);
    };

    // Username setter syncing with localStorage
    const setUsername = (name) => {
        if (name) {
            localStorage.setItem("username", name);
        } else {
            localStorage.removeItem("username");
        }
        setUsernameState(name);
    };

    const contextValue = {
        url,
        username,
        token,
        setToken,
        setUsername,
        sapSalesModuleText,
        setSapSalesModuleText,
        loadFinance,
        setLoadFinance,
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
        loadProcurementData,
        setLoadProcurementData,
        loadSalesData,
        setLoadSalesData,
        loadOTC,
        setLoadOTC,
        loadProcurement,
        setLoadProcurement,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
