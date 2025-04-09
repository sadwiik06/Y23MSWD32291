import React from "react";


const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card text-center shadow p-4" style={{ maxWidth: "400px" }}>
        <h2 className="text-danger mb-3">Access Denied</h2>
        <p className="mb-0">You do not have the necessary permissions to view this page.</p>
        <p className="text-muted">Only admins are allowed.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
