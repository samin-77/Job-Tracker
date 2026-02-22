// Initial Data (8 Meaningful Jobs)
let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Developer", location: "Mountain View, CA", type: "Full-time", salary: "$120k - $150k", description: "Build scalable web applications for millions of users worldwide.", status: "all" },
    { id: 2, companyName: "Amazon", position: "Software Engineer", location: "Seattle, WA", type: "Remote", salary: "$130k - $160k", description: "Innovate cloud computing services within the AWS ecosystem.", status: "all" },
    { id: 3, companyName: "Meta", position: "Product Designer", location: "Menlo Park, CA", type: "Hybrid", salary: "$110k - $140k", description: "Design next-generation social experiences for the metaverse.", status: "all" },
    { id: 4, companyName: "Netflix", position: "UI Engineer", location: "Los Gatos, CA", type: "Full-time", salary: "$140k - $180k", description: "Optimize playback experiences across all streaming devices.", status: "all" },
    { id: 5, companyName: "Stripe", position: "Backend Engineer", location: "Dublin, IE", type: "Remote", salary: "$125k - $155k", description: "Develop robust payment infrastructure for global commerce.", status: "all" },
    { id: 6, companyName: "Spotify", position: "iOS Developer", location: "Stockholm, SE", type: "Hybrid", salary: "$100k - $130k", description: "Craft the future of audio and podcasting for mobile users.", status: "all" },
    { id: 7, companyName: "Tesla", position: "Embedded Systems", location: "Austin, TX", type: "On-site", salary: "$115k - $145k", description: "Program the brains behind the world's most advanced EVs.", status: "all" },
    { id: 8, companyName: "Adobe", position: "Cloud Architect", location: "San Jose, CA", type: "Full-time", salary: "$135k - $165k", description: "Scale Creative Cloud infrastructure for global creators.", status: "all" }
];

let currentTab = 'all';

// Selectors
const container = document.getElementById('jobs-container');
const emptyState = document.getElementById('no-jobs-state');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const sectionCountEl = document.getElementById('section-job-count');

function updateDashboard() {
    totalCountEl.innerText = jobs.length;
    interviewCountEl.innerText = jobs.filter(j => j.status === 'interview').length;
    rejectedCountEl.innerText = jobs.filter(j => j.status === 'rejected').length;
}

function render() {
    container.innerHTML = '';
    let filteredJobs = jobs;

    if (currentTab !== 'all') {
        filteredJobs = jobs.filter(j => j.status === currentTab);
    }

    sectionCountEl.innerText = filteredJobs.length;

    if (filteredJobs.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-bold text-lg text-slate-800">${job.companyName}</h3>
                        <button onclick="deleteJob(${job.id})" class="text-slate-300 hover:text-rose-500 transition-colors">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <p class="text-indigo-600 font-semibold text-sm mb-3">${job.position}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase font-bold">${job.location}</span>
                        <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase font-bold">${job.type}</span>
                    </div>
                    <p class="text-sm text-slate-500 mb-4 line-clamp-2">${job.description}</p>
                    <p class="text-slate-800 font-bold text-sm mb-6">${job.salary}</p>
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

window.updateStatus = (id, newStatus) => {
    const job = jobs.find(j => j.id === id);
    // Enable toggle: if clicking the current status, it reverts to 'all'
    job.status = (job.status === newStatus) ? 'all' : newStatus;
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
    // Update Tab UI styles
    const tabs = ['all', 'interview', 'rejected'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (t === tab) {
            el.className = "px-6 py-3 font-medium text-indigo-600 border-b-2 border-indigo-600 transition-all";
        } else {
            el.className = "px-6 py-3 font-medium text-slate-500 hover:text-indigo-600 transition-all";
        }
    });
    render();
};

// Initial Load
updateDashboard();
render();