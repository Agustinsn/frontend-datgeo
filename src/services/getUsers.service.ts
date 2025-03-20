export const getUsers = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${API_URL}/employees`);
    const data = await response.json();
    return data;
}
