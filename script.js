document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isDisplayed = window.getComputedStyle(navLinks).display !== 'none';
            if (isDisplayed && window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
                navLinks.style.padding = '1rem 0';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Mock Data for Teams
    const mockTeams = [
        {
            id: 1,
            name: "Team Alpha",
            project: "Autonomous Code Reviewer Agent",
            members: "Alice Johnson, Bob Smith, Charlie Lee",
            methodology: "LLM + AST Parsing",
            status: "Proposal Approved"
        },
        {
            id: 2,
            name: "Data Miners",
            project: "Multi-Agent Data Synthesis Pipeline",
            members: "David Kim, Eva Green",
            methodology: "LangChain + RAG",
            status: "In Progress"
        },
        {
            id: 3,
            name: "NeuroNavigators",
            project: "Self-Improving Web Scraper",
            members: "Frank Wright, Grace Hopper",
            methodology: "AutoGPT Architecture",
            status: "Proposal Approved"
        },
        {
            id: 4,
            name: "Agent Frameworks",
            project: "Dynamic Task Delegation Protocol",
            members: "Henry Ford, Isabel Allende, Jack Black",
            methodology: "Hierarchical Agents",
            status: "Awaiting Review"
        }
    ];

    const teamsContainer = document.getElementById('teams-container');

    if (teamsContainer) {
        // Render Teams
        mockTeams.forEach(team => {
            const card = document.createElement('div');
            card.className = 'team-card';
            
            let statusClass = 'status-pending';
            if (team.status.includes('Approved') || team.status.includes('Progress')) {
                statusClass = 'status-active';
            }

            card.innerHTML = `
                <h3 class="team-name">${team.name}</h3>
                <h4 class="project-title">${team.project}</h4>
                <p class="members"><strong>Members:</strong> ${team.members}</p>
                <div class="team-badges">
                    <span class="badge ${statusClass}">${team.status}</span>
                    <span class="badge">${team.methodology}</span>
                </div>
            `;
            teamsContainer.appendChild(card);
        });
    }

    // Simple intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-title, .card, .timeline-content, .team-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(section);
    });
});
