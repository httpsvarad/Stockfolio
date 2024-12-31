import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;
const BASE_URL = "https://outstanding-heart-production.up.railway.app";
const useStore = create((set) => ({

    user: null,
    message: null,
    loading: false,
    isLoading: false,
    stocks: [],

    register: async (email, password, name) => {
        set({ loading: true, message: null });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, { email, password, name });
            set({ user: response.data, loading: false });

        } catch (error) {
            set({ message: "Registration failed. Please try again.", loading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ loading: true, message: null });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
            set({ user: response.data, loading: false });

        } catch (error) {
            set({ message: "Invalid Credentials", loading: false });
            throw error;
        }
    },

    getUserStocks: async (userid) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/stocks/${userid}`);
            set({ stocks: response.data, isLoading: false });

        } catch (error) {
            set({ message: "Failed to fetch user stocks", isLoading: false, stocks: [] });
            throw error;
        }
    },

    deleteStock: async (stockId) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${BASE_URL}/api/stocks/${stockId}`);
            set({ isLoading: false });

        } catch (error) {
            set({ message: "Failed to delete stock", isLoading: false });
            throw error;
        }
    },

    addstock: async (user, name, quantity, price) => {

        set({ isLoading: true });
        try {
            await axios.post(`${BASE_URL}/api/stocks`, { user, name, quantity, price });
            set({ isLoading: false });

        } catch (error) {
            set({ message: "Failed to add stock", isLoading: false });
            throw error;
        }
    },

    updateStock: async (id, quantity, name, price, user) => {
        set({ isLoading: true });
        try {
            await axios.put(`${BASE_URL}/api/stocks`, { id, quantity, name, price, user });
            set({ isLoading: false, message: "Stock Updated!" });

        } catch (error) {
            set({ message: "Failed To Update Stock", isLoading: false });
            throw error;
        }
        finally {
            setTimeout(() => {
                set({ message: null });
            }, 1500);
        }
    },

    logout: async () => {
        set({ user: null });
        // try {
        //     await axios.post("http://localhost:8080/api/auth/logout");
        //     set({ user: null, loading: false });

        // } catch (error) {
        //     set({ message: "Failed to logout", loading: false });
        //     throw error;
        // }
    },

}))

export default useStore;