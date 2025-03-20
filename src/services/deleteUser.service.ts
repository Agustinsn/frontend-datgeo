export const deleteUser = async (id: number) => {
    const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
    });
    return response;
}