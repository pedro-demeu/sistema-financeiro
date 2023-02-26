import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
interface CustomLinkProps {
  title: string
  to: string
}

export const CustomLink: React.FC<CustomLinkProps> = ({ title, to }) => {
  return (
    <Link className="customLink" to={to}>
      {title}
    </Link>
  );
};
