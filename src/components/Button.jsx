import React from "react";
import { Button as ShadcnButton } from "./ui/button";

function Button({ text, className, link }) {
  return (
    <a href={link} target="_blank" className={className}>
      <ShadcnButton
        variant="default"
        size="lg"
        className="h-[60px] rounded-[20px] min-w-[152px]"
      >
        {text}
      </ShadcnButton>
      </a>
  );
}

export default Button;
