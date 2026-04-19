import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myRentals, setMyRentals] = useState([]);

  // Load data from browser memory on startup (Persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem("rf_user");
    const savedRentals = localStorage.getItem("rf_rentals");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedRentals) setMyRentals(JSON.parse(savedRentals));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("rf_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setMyRentals([]);
    localStorage.clear();
    window.location.href = "/"; // Hard reset to clear state
  };

  const addRental = (item) => {
    const updated = [...myRentals, { ...item, bookingId: "RF-" + Math.random().toString(36).substr(2, 5).toUpperCase() }];
    setMyRentals(updated);
    localStorage.setItem("rf_rentals", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{ user, login, logout, myRentals, addRental }}>
      {children}
    </AppContext.Provider>
  );
};