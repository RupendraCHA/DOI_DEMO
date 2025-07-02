import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";
import SalesOrderData from "./pages/salesOrderData/salesOrderData";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header/Header1";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import SapDataModules from "./pages/SapDataModules/SapDataModules";
import PurchaseOrder from "./components/PurchaseOrder/PurchaseOrder";
import Contact from "./components/Contact/Contact";
import DateRangeFilter from "./components/date";
import FileUpload from "./components/FileUpload/fileUpload";
import FileDownload from "./components/fileDownload";
import Reports from "./components/Reports/Reports";
import PowerBIDashboard from "./components/PowerBIDashboards/PowerBIDashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    const navigate = useNavigate();
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const { setToken, setUsername } = useContext(StoreContext);

   useEffect(() => {
    const handleTokenReceive = (event) => {
        if (!["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"].includes(event.origin)) {
            console.warn("Rejected postMessage from", event.origin);
            return;
        }

        if (event.data?.token) {
            localStorage.setItem("token", event.data.token);
            localStorage.setItem("username", event.data.username);
            localStorage.setItem("loginMethod", "SSO");
            setToken(event.data.token);
            setUsername(event.data.username);
            console.log("✅ Received token via postMessage");
            navigate("/home");
        }
    };

    window.addEventListener("message", handleTokenReceive);

    // Always set tokenLoaded to true so the loader does not block app usage
    setTokenLoaded(true);

    return () => window.removeEventListener("message", handleTokenReceive);
}, [navigate, setToken, setUsername]);


    if (!tokenLoaded) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h3>Loading, please wait...</h3>
            </div>
        );
    }

    return (
        <Routes>
            <Route exact path="/" element={<><Header message="login" /><Login /><Footer /></>} />
            <Route exact path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route exact path="/support" element={<><Header tabText="contact" message="contact" /><Contact /><Footer /></>} />
            <Route exact path="/signup" element={<><Header message="signup" /><SignUp /><Footer /></>} />
            <Route exact path="/sapDataModules" element={<PrivateRoute><><Header message="modules" /><SapDataModules /><Footer /></></PrivateRoute>} />
            <Route exact path="/salesData" element={<PrivateRoute><><Header message="sales" /><SalesOrderData /><Footer /></></PrivateRoute>} />
            <Route exact path="/reports" element={<PrivateRoute><><Header message="" /><Reports /><Footer /></></PrivateRoute>} />
            <Route exact path="/fileUpload" element={<PrivateRoute><><Header message="contact" /><FileUpload /><Footer /></></PrivateRoute>} />
            <Route exact path="/charts" element={<PrivateRoute><><Header message="" /><PowerBIDashboard /><Footer /></></PrivateRoute>} />
            <Route exact path="/fileDownload" element={<PrivateRoute><FileDownload /></PrivateRoute>} />
            <Route path="/purchaseOrder" element={<PrivateRoute><PurchaseOrder /></PrivateRoute>} />
            <Route path="/date" element={<PrivateRoute><DateRangeFilter /></PrivateRoute>} />
            <Route path="/powerBIDashboards" element={<PrivateRoute><><Header message="" /><PowerBIDashboard /><Footer /></></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
