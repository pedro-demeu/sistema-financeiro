import { Link } from "@mui/material";
import React from "react";
import "./style.css";
interface CustomLinkProps {
  title: string;
  to: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ title, to }) => {
  return (
    <Link
      className="customLink"
      sx={{
        color: "white",
        textDecoration: "none",
      }}
      href={to}
    >
      {title}
    </Link>
  );
};
