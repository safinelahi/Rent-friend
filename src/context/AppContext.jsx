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
    window.location.href = "/"; 
  };

  /* NEW UPDATE: 
     1. Added a check for existing bookings.
     2. Returns a response object so the UI knows if it succeeded or failed.
  */
  const addRental = (item) => {
    // Check if user already has an active booking
    if (myRentals.length > 0) {
      return { success: false, error: "LIMIT_REACHED" };
    }

    // If no active booking, proceed to add
    const updated = [
      ...myRentals, 
      { 
        ...item, 
        bookingId: "RF-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
        bookedAt: new Date().toISOString()
      }
    ];

    setMyRentals(updated);
    localStorage.setItem("rf_rentals", JSON.stringify(updated));
    return { success: true };
  };

  return (
    <AppContext.Provider value={{ user, login, logout, myRentals, addRental }}>
      {children}
    </AppContext.Provider>
  );
};