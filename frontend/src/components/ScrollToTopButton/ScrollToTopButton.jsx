import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
// import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [BackToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  return (
    <div>
      {BackToTopButton && (
        <button
          style={{
            position: "fixed",
            bottom: "100px",
            right: "60px",
            height: "40px",
            width: "40px",
            fontSize: "40px",
            border: "none",
            backgroundColor: "transparent",
            color: "black",
          }}
          onClick={scrollUp}
        >
          <FaArrowCircleUp />
          {/* <FaArrowUp /> */}
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
