export const getJobs = async () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${API_URL}/job_types`);
    const jobs = await response.json();
    return jobs;
}