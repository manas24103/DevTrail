import React, { createContext, useContext, useState } from 'react';

const AuthModeContext = createContext();

export const useAuthMode = () => {
  const context = useContext(AuthModeContext);
  if (!context) {
    throw new Error('useAuthMode must be used within an AuthModeProvider');
  }
  return context;
};

export const AuthModeProvider = ({ children }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const value = {
    authMode,
    setAuthMode,
  };

  return (
    <AuthModeContext.Provider value={value}>
      {children}
    </AuthModeContext.Provider>
  );
};

export default AuthModeContext;
