import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("rf_token") || null);
  const [myRentals, setMyRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. PERSISTENCE & VERIFICATION CHECK
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("rf_token");
      const savedRentals = localStorage.getItem("rf_rentals");
      
      if (savedToken) {
        setToken(savedToken);
        const savedUser = localStorage.getItem("rf_user");
        if (savedUser) setUser(JSON.parse(savedUser));
      }

      if (savedRentals) setMyRentals(JSON.parse(savedRentals));
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 2. LOGIN LOGIC
  const login = async (userData, userToken) => {
    // Ensure user has a default role if none exists
    const userWithRole = { ...userData, role: userData.role || 'renter' };
    
    setUser(userWithRole);
    setToken(userToken);
    localStorage.setItem("rf_token", userToken);
    localStorage.setItem("rf_user", JSON.stringify(userWithRole));
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  };

  // 3. LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    setMyRentals([]);
    localStorage.removeItem("rf_token");
    localStorage.removeItem("rf_user");
    localStorage.removeItem("rf_rentals");
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = "/";
  };

  // 4. NEW: AUTOMATIC ROLE UPGRADE LOGIC
  // This function turns a Renter into a Lender instantly
  const upgradeToLender = () => {
    if (!user) return { success: false, error: "NO_USER" };

    const updatedUser = { 
      ...user, 
      role: 'lender',
      upgradedAt: new Date().toISOString() 
    };

    setUser(updatedUser);
    localStorage.setItem("rf_user", JSON.stringify(updatedUser));
    
    // Future Backend Note: 
    // axios.patch('/api/v1/users/upgrade', { role: 'lender' })
    
    return { success: true };
  };

  // 5. RENTAL LOGIC
  const addRental = (item) => {
    if (myRentals.length > 0) {
      return { success: false, error: "LIMIT_REACHED" };
    }

    const updated = [
      ...myRentals, 
      { 
        ...item, 
        bookingId: "RF-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        status: "ACTIVE",
        bookedAt: new Date().toISOString()
      }
    ];

    setMyRentals(updated);
    localStorage.setItem("rf_rentals", JSON.stringify(updated));
    return { success: true };
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      myRentals, 
      addRental, 
      upgradeToLender, // Now available for Dashboard & List Item pages
      isLoading,
      isVerified: user?.isVerified || false,
      isLender: user?.role === 'lender' // Quick check for UI permissions
    }}>
      {children}
    </AppContext.Provider>
  );
};