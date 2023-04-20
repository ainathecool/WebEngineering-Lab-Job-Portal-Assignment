document.getElementById('apply-job-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const jobTitle = document.getElementById('job-title').value;
    const userEmail = document.getElementById('user-email').value;
    const resume = document.getElementById('resume').files[0];

    const formData = new FormData();
    formData.append('jobTitle', jobTitle);
    formData.append('userEmail', userEmail);
    formData.append('file', resume);

    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('/Student/ApplyForJobs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();

        if (data.Message === 'Job Application!') {
            alert('Job application submitted successfully!');
            window.location.href = 'job_listening.html';
        } else {
            alert('Error submitting job application. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('Error submitting job application');
    }
});
