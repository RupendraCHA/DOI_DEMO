import React, { useEffect } from "react";

const SignIn = () => {
  const signInLinkUrl =
    "https://ap-south-1nmrg96rqu.auth.ap-south-1.amazoncognito.com/login?client_id=1esfsaanp9ncgms41753687pd8&redirect_uri=https%3A%2F%2Fdoi-demo-52o9.onrender.com%2Fhome&response_type=code&scope=email+openid+phone";

  useEffect(() => {
    // Redirect to the sign-in URL
    window.location.href = signInLinkUrl;
  }, []);

  return null; // Render nothing since the user will be redirected
};

export default SignIn;
