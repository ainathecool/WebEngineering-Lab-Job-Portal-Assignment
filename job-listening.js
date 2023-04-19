function displayJob(job) {
    const jobList = document.getElementById('jobList');

    const jobContainer = document.createElement('div');
    jobContainer.classList.add('job');

    const jobTitle = document.createElement('h2');
    jobTitle.textContent = job.title;

    const jobDescription = document.createElement('p');
    jobDescription.textContent = job.description;

    const jobDetails = document.createElement('ul');

    const jobTag = document.createElement('li');
    jobTag.textContent = `Tag: ${job.tag}`;

    const jobSalary = document.createElement('li');
    jobSalary.textContent = `Salary: ${job.salary}`;

    const jobLocation = document.createElement('li');
    jobLocation.textContent = `Location: ${job.location}`;

    const jobExperience = document.createElement('li');
    jobExperience.textContent = `Experience: ${job.experience}`;

    

    jobDetails.appendChild(jobTag);
    jobDetails.appendChild(jobSalary);
    jobDetails.appendChild(jobLocation);
    jobDetails.appendChild(jobExperience);
    

    jobContainer.appendChild(jobTitle);
    jobContainer.appendChild(jobDescription);
    jobContainer.appendChild(jobDetails);
  

    jobList.appendChild(jobContainer);
}



async function fetchJobs() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch('http://localhost:3000/user/JobListening', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    if (response.ok) {
        const data = await response.json(); // Parse the response as JSON
        const jobs = data.jobs; // Access the 'jobs' property in the response object

        if (Array.isArray(jobs)) {
            jobs.forEach(job => { // Now you can use forEach on the jobs array
                displayJob(job);
                
                
            });
        } else {
            //console.error('Error: expected an array of jobs, but received:', data);
        }
    } else {
       // console.error('Error fetching jobs:', response.statusText);
    }
}
