export const deleteUser = async (id: number) => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${API_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
    });
    return response;
}