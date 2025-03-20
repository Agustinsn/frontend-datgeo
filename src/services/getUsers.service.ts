export const getUsers = async () => {
    const response = await fetch(`/api/employees`);
    const data = await response.json();
    return data;
}
