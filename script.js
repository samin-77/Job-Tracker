// Initial Data
let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Dev", location: "Remote", type: "Full-time", salary: "$120k", description: "Modern UI development using React.", status: "all" },
    { id: 2, companyName: "Amazon", position: "SDE-1", location: "Seattle", type: "On-site", salary: "$130k", description: "Scalable backend systems.", status: "all" },
    { id: 3, companyName: "Meta", position: "Designer", location: "Hybrid", salary: "$110k", description: "Design next-gen social interactions.", status: "all" },
    { id: 4, companyName: "Netflix", position: "UI Engineer", location: "Remote", type: "Contract", salary: "$140k", description: "Optimizing video playback interfaces.", status: "all" },
    { id: 5, companyName: "Microsoft", position: "Architect", location: "Redmond", type: "Full-time", salary: "$150k", description: "Cloud solutions for enterprise.", status: "all" },
    { id: 6, companyName: "Stripe", position: "Payments Dev", location: "Remote", type: "Full-time", salary: "$125k", description: "Building global payment APIs.", status: "all" },
    { id: 7, companyName: "Airbnb", position: "Mobile Dev", location: "Hybrid", salary: "$135k", description: "Seamless travel experiences.", status: "all" },
    { id: 8, companyName: "Spotify", position: "Backend Dev", location: "Full-time", salary: "$115k", description: "Scalable audio streaming.", status: "all" }
];

let currentTab = 'all';

// Theme Logic
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Set initial theme based on preference
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}

function render() {
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('no-jobs-state');
    container.innerHTML = '';
    
    let filteredJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);

    // Dynamic Job Count Display (e.g., Job 1 of 8)
    document.getElementById('section-job-count').innerText = `${filteredJobs.length} of ${jobs.length}`;

    if (filteredJobs.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between transition-transform hover:scale-[1.02]";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-bold text-lg text-slate-800 dark:text-white">${job.companyName}</h3>
                        <button onclick="deleteJob(${job.id})" class="text-slate-300 hover:text-rose-500">
                             <span class="text-xs">DELETE</span>
                        </button>
                    </div>
                    <p class="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-3">${job.position}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">${job.description}</p>
                    <p class="text-slate-800 dark:text-slate-200 font-bold text-sm mb-6">${job.salary}</p>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="py-2 text-xs font-bold rounded border transition-all ${job.status === 'interview' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'}">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="py-2 text-xs font-bold rounded border transition-all ${job.status === 'rejected' ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-500 text-rose-600 hover:bg-rose-50'}">Rejected</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

window.updateStatus = (id, status) => {
    const job = jobs.find(j => j.id === id);
    job.status = (job.status === status) ? 'all' : status;
    updateDashboard();
    render();
};

window.deleteJob = (id) => {
    jobs = jobs.filter(j => j.id !== id);
    updateDashboard();
    render();
};

window.switchTab = (tab) => {
    currentTab = tab;
    ['all', 'interview', 'rejected'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        el.className = (t === tab) 
            ? "px-6 py-3 font-medium text-indigo-600 border-b-2 border-indigo-600 transition-all" 
            : "px-6 py-3 font-medium text-slate-500 hover:text-indigo-600 transition-all";
    });
    render();
};

updateDashboard();
render();