import React from "react";

const Forbidden = () => {
  return (
    <div style={styles.container} data-testid="forbidden-container">
      <h1 style={styles.heading} data-testid="forbidden-heading">
        403 - Forbidden
      </h1>
      <p style={styles.message} data-testid="forbidden-message">
        You do not have permission to access this page.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    height: "100vh",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "18px",
  },
};

export default Forbidden;
