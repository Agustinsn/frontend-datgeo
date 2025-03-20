export const getJobs = async () => {
    const response = await fetch("http://localhost:3000/job_types");
    const jobs = await response.json();
    return jobs;
}