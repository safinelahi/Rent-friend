import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("rf_token") || null);
  const [myRentals, setMyRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to fetch rentals
  const fetchRentals = async () => {
    try {
      const res = await api.get('/bookings/my-rentals');
      if (res.data.success) {
        setMyRentals(res.data.bookings);
        localStorage.setItem("rf_rentals", JSON.stringify(res.data.bookings));
      }
    } catch (err) {
      console.error("Failed to fetch rentals:", err);
    }
  };

  // Check auth state when the app loads
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("rf_token");
      
      if (savedToken) {
        setToken(savedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem("rf_user", JSON.stringify(res.data.user));
            // Fetch bookings from backend
            await fetchRentals();
          } else {
            localStorage.removeItem("rf_token");
            localStorage.removeItem("rf_user");
            localStorage.removeItem("rf_rentals");
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error("Auth verification failed:", err);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem("rf_token");
            localStorage.removeItem("rf_user");
            localStorage.removeItem("rf_rentals");
            setToken(null);
            setUser(null);
          } else {
            const savedUser = localStorage.getItem("rf_user");
            if (savedUser) setUser(JSON.parse(savedUser));
            const savedRentals = localStorage.getItem("rf_rentals");
            if (savedRentals) setMyRentals(JSON.parse(savedRentals));
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("rf_token", userToken);
    localStorage.setItem("rf_user", JSON.stringify(userData));
    
    api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    
    // Fetch bookings from backend after login
    await fetchRentals();
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setMyRentals([]);
    localStorage.removeItem("rf_token");
    localStorage.removeItem("rf_user");
    localStorage.removeItem("rf_rentals");
    delete api.defaults.headers.common['Authorization'];
    window.location.href = "/";
  };

  // Upgrade renter to lender
  const upgradeToLender = async () => {
    if (!user) return { success: false, error: "NO_USER" };

    try {
      const res = await api.patch('/users/upgrade');
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("rf_user", JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, error: res.data.error || "Upgrade failed" };
    } catch (err) {
      console.error("Upgrade failed:", err);
      return { success: false, error: err.response?.data?.error || "Upgrade failed" };
    }
  };

  // Rental helper function to POST new booking to backend
  const addRental = async (bookingData) => {
    try {
      const res = await api.post('/bookings', bookingData);
      if (res.data.success) {
        // Refresh local bookings list
        await fetchRentals();
        return { success: true, booking: res.data.booking };
      }
      return { success: false, error: res.data.error || "Booking failed" };
    } catch (err) {
      console.error("Booking creation failed:", err);
      return { 
        success: false, 
        error: err.response?.data?.error || "Booking failed. Please try again." 
      };
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      myRentals, 
      addRental, 
      upgradeToLender,
      refreshRentals: fetchRentals,
      isLoading,
      isVerified: user?.isVerified || false,
      isLender: user?.role === 'lender'
    }}>
      {children}
    </AppContext.Provider>
  );
};