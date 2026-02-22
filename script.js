// Initial Data with random locations and job types
let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Dev", location: "Mountain View, CA", type: "Full-time", salary: "$120k", description: "Modern UI development using React and high-performance frontend architecture.", status: "all" },
    { id: 2, companyName: "Amazon", position: "SDE-1", location: "Seattle, WA", type: "Remote", salary: "$130k", description: "Designing scalable backend microservices and cloud infrastructure for AWS.", status: "all" },
    { id: 3, companyName: "Meta", position: "Product Designer", location: "Menlo Park, CA", type: "Hybrid", salary: "$110k", description: "Design next-gen social interactions and immersive virtual reality experiences.", status: "all" },
    { id: 4, companyName: "Netflix", position: "UI Engineer", location: "Los Gatos, CA", type: "Contractual", salary: "$140k", description: "Optimizing video playback interfaces and high-traffic streaming dashboards.", status: "all" },
    { id: 5, companyName: "Microsoft", position: "Azure Architect", location: "Redmond, WA", type: "Full-time", salary: "$150k", description: "Scaling enterprise cloud solutions and optimizing database migrations.", status: "all" },
    { id: 6, companyName: "Stripe", position: "Payments Dev", location: "San Francisco, CA", type: "Remote", salary: "$125k", description: "Building robust global payment APIs and high-security fintech integrations.", status: "all" },
    { id: 7, companyName: "Airbnb", position: "Mobile Dev", location: "New York, NY", type: "Hybrid", salary: "$135k", description: "Enhancing seamless travel experiences for iOS and Android mobile users.", status: "all" },
    { id: 8, companyName: "Spotify", position: "Backend Dev", location: "Austin, TX", type: "Part-time", salary: "$115k", description: "Building scalable audio streaming services and discovery algorithms.", status: "all" }
];

let currentTab = 'all';

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
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
    document.getElementById('section-job-count').innerText = `${filteredJobs.length} of ${jobs.length}`;

    if (filteredJobs.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        filteredJobs.forEach(job => {
            let badgeHTML = '';
            if (job.status === 'interview') {
                badgeHTML = `<span class="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Interviewing</span>`;
            } else if (job.status === 'rejected') {
                badgeHTML = `<span class="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Rejected</span>`;
            }

            const card = document.createElement('div');
            // Full width card with horizontal flex on desktop
            card.className = "bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between md:items-center transition-all hover:shadow-md relative overflow-hidden";
            card.innerHTML = `
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                         <h3 class="font-bold text-xl text-slate-800 dark:text-white leading-tight">${job.companyName}</h3>
                         ${badgeHTML}
                    </div>
                    <div class="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-briefcase"></i> ${job.position}</span>
                        <span class="text-slate-400 dark:text-slate-500 flex items-center gap-1"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                        <span class="text-slate-400 dark:text-slate-500 flex items-center gap-1"><i class="fa-solid fa-clock"></i> ${job.type}</span>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-1 md:line-clamp-2 max-w-2xl">${job.description}</p>
                    <p class="text-slate-800 dark:text-slate-200 font-black text-lg">${job.salary}</p>
                </div>
                
                <div class="flex items-center gap-3 mt-6 md:mt-0">
                    <div class="grid grid-cols-2 gap-2 w-full md:w-auto">
                        <button onclick="updateStatus(${job.id}, 'interview')" class="px-6 py-2 text-xs font-bold rounded-lg border transition-all ${job.status === 'interview' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}">Interview</button>
                        <button onclick="updateStatus(${job.id}, 'rejected')" class="px-6 py-2 text-xs font-bold rounded-lg border transition-all ${job.status === 'rejected' ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-500 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20'}">Rejected</button>
                    </div>
                    <button onclick="deleteJob(${job.id})" class="text-slate-300 hover:text-rose-500 transition-colors p-2">
                         <i class="fa-solid fa-trash-can text-lg"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Global scope functions
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
        if (t === tab) {
            el.className = "px-6 py-3 font-medium text-indigo-600 border-b-2 border-indigo-600 transition-all";
        } else {
            el.className = "px-6 py-3 font-medium text-slate-500 hover:text-indigo-600 transition-all";
        }
    });
    render();
};

// Start
updateDashboard();
render();

function render() {
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('no-jobs-state');
    container.innerHTML = '';
    
    let filteredJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    document.getElementById('section-job-count').innerText = `${filteredJobs.length} of ${jobs.length}`;

    if (filteredJobs.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        filteredJobs.forEach(job => {
            let accentClass = "";
            let glowClass = "";
            let badgeHTML = '';

            // Status Logic with Dark Mode specific glows
            if (job.status === 'interview') {
                accentClass = "border-l-4 border-l-emerald-500";
                // Stronger glow for dark mode (opacity 0.6 vs 0.2)
                glowClass = "hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]";
                badgeHTML = `<span class="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Interviewing</span>`;
            } else if (job.status === 'rejected') {
                accentClass = "border-l-4 border-l-rose-500";
                glowClass = "hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.2)] dark:hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]";
                badgeHTML = `<span class="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Rejected</span>`;
            } else {
                accentClass = "border-l-4 border-l-indigo-500";
                glowClass = "hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]";
            }

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between md:items-center transition-all duration-300 ${accentClass} ${glowClass} relative overflow-hidden`;
            
            card.innerHTML = `
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                         <h3 class="font-bold text-xl text-slate-800 dark:text-white leading-tight">${job.companyName}</h3>
                         ${badgeHTML}
                    </div>
                    <div class="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-briefcase"></i> ${job.position}</span>
                        <span class="text-slate-400 dark:text-slate-500 flex items-center gap-1"><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                        <span class="text-slate-400 dark:text-slate-500 flex items-center gap-1"><i class="fa-solid fa-clock"></i> ${job.type}</span>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-1 md:line-clamp-2 max-w-2xl">${job.description}</p>
                    <p class="text-slate-800 dark:text-slate-200 font-black text-lg">${job.salary}</p>
                </div>
                
                <div class="flex items-center gap-3 mt-6 md:mt-0">
                    <div class="grid grid-cols-2 gap-2 w-full md:w-auto">
                        <button onclick="updateStatus(${job.id}, 'interview')" class="px-6 py-2 text-xs font-bold rounded-lg border transition-all ${job.status === 'interview' ? 'bg-emerald-500 text-white border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}">Interview</button>
                        <button onclick="updateStatus(${job.id}, 'rejected')" class="px-6 py-2 text-xs font-bold rounded-lg border transition-all ${job.status === 'rejected' ? 'bg-rose-500 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'border-rose-500 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20'}">Rejected</button>
                    </div>
                    <button onclick="deleteJob(${job.id})" class="text-slate-300 hover:text-rose-500 transition-colors p-2">
                         <i class="fa-solid fa-trash-can text-lg"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }
}