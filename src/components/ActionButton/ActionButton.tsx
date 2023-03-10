import React from 'react';
import { Button } from '@mui/material';
import './style.css';

interface ActionButtonProps {
  title: string
}

export const ActionButton: React.FC<ActionButtonProps | HTMLButtonElement> = ({
  title
}) => {
  return <Button className="actionButton">{title}</Button>;
};
