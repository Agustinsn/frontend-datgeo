export const getJobs = async () => {
    const response = await fetch(`/api/job_types`);
    const jobs = await response.json();
    return jobs;
}