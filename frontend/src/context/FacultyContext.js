import React, { createContext, useState, useEffect } from 'react';

export const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  const [facultyId, setFacultyId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize context values from local storage
  useEffect(() => {
    const storedFacultyId = localStorage.getItem('facultyId');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (storedFacultyId) {
      setFacultyId(storedFacultyId);
    }
    setIsAuthenticated(storedIsAuthenticated);
  }, []);

  return (
    <FacultyContext.Provider value={{ facultyId, setFacultyId, isAuthenticated, setIsAuthenticated }}>
      {children}
    </FacultyContext.Provider>
  );
};
