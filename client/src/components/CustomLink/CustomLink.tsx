import React from 'react';
import { Link } from 'react-router-dom';
interface CustomLinkProps {
  title: string
  to: string
}

export const CustomLink: React.FC<CustomLinkProps> = ({ title, to }) => {
  return (
    <Link style={{
      color: 'white',
      textDecoration: 'none',
      cursor: "pointer"
    }} to={to}>
      {title}
    </Link>
  );
};
