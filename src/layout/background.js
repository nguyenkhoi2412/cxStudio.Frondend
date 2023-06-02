import React from "react";

const Background = ({ children }) => {
  return (
    <main className="bg-white dark:bg-black transition-all">
      {children}
    </main>
  );
};

export default Background;
