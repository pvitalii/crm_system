import React from 'react';
import './Auth.css';
import { AuthProps } from '../../interfaces/auth-config.interface';
import { AuthForm } from '../AuthForm';

export function Auth({ config }: AuthProps) {
  return (
    <div className="page auth-container">
      <AuthForm config={config} />
    </div>
  );
}
