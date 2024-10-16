import React, { createContext, useState } from 'react';

export const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  const [facultyId, setFacultyId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <FacultyContext.Provider value={{ facultyId, setFacultyId, isAuthenticated, setIsAuthenticated }}>
      {children}
    </FacultyContext.Provider>
  );
};