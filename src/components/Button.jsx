import React from "react";
import { Button as ShadcnButton } from "./ui/button";
import { Link } from "react-router-dom";

function Button({ text, className, link, variant = "default" }) {
  return (
    <Link to={link} className={className}>
      <ShadcnButton
        variant={variant}
        size="lg"
        className="h-[60px] rounded-[20px] min-w-[152px]"
      >
        {text}
      </ShadcnButton>
    </Link>
  );
}

export default Button;
