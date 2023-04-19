document.getElementById('search-job-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const keyword = document.getElementById('keyword').value;

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/user/SearchJobs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            },
            body:JSON.stringify({
                keyword:keyword

            })

        });
        const data = await response.json();
       // Add this line to log the server response

        if (data.jobs && Array.isArray(data.jobs)) {
          displaySearchResults(data.jobs);
        } else {
        
          alert('Error searching for jobs');
        }
    } catch (error) {
        console.error(error);
        alert('Error searching for jobs');
    }
});


function displaySearchResults(jobs) {
    
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';
        jobDiv.innerHTML = `
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <p>${job.tag}</p>
            <p>${job.location}</p>
            <p>${job.experiance}</p>
            <a href="apply_job.html?jobId=${job._id}">Apply for this job</a>
        `;
        searchResults.appendChild(jobDiv);
    });
}




