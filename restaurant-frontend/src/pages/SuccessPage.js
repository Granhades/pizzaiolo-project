import React from "react";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>✅ Order Sent Successfully!</h1>
      <p>Your food will arrive shortly.</p>
      <Link to="/">← Back to Menu</Link>
    </div>
  );
}

export default SuccessPage;
