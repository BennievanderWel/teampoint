import React from "react";

export default function Input({ id, label, fullWidth, ...props }) {
  const styles = {
    width: fullWidth ? "100%" : "auto"
  };

  return <input {...props} style={styles} className="input" id={id} />;
}
