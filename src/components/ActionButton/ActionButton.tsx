import React from "react";
import { Button, Link } from "@mui/material";
import "./style.css";

interface ActionButtonProps {
  title: string;
  onClick?: () => void;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onClick,
  color,
}) => {
  return (
    <Button onClick={onClick} className="actionButton">
      <Link
        href="/dashboard"
        sx={{
          textDecoration: "none",
          color: "white",
        }}
      >
        {title}
      </Link>
    </Button>
  );
};
