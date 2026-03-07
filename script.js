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
            if (targetId === '#') return;
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

    // Load Data from courseData globally defined in data.js
    const teamsContainer = document.getElementById('teams-container');
    const deliverablesContainer = document.getElementById('deliverables-container');

    if (teamsContainer && typeof courseData !== 'undefined' && courseData.teams) {
        // Render Teams
        courseData.teams.forEach(team => {
            const card = document.createElement('div');
            card.className = 'team-card';

            let statusClass = 'status-pending';
            if (team.status.includes('Approved') || team.status.includes('Progress')) {
                statusClass = 'status-active';
            }

            const membersList = team.members.join(', ');

            card.innerHTML = `
                <h3 class="team-name">${team.name}</h3>
                <h4 class="project-title">${team.project || 'TBD'}</h4>
                <p class="members"><strong>Members:</strong> ${membersList}</p>
                <div class="team-badges">
                    <span class="badge ${statusClass}">${team.status}</span>
                </div>
            `;
            teamsContainer.appendChild(card);
        });
    }

    if (deliverablesContainer && typeof courseData !== 'undefined' && courseData.deliverables) {
        // Render Deliverables
        courseData.deliverables.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content card interactive">
                    <h3>${item.title || 'Submission Due'}</h3>
                    <p class="date">Due: ${item.date || 'TBD'}</p>
                </div>
            `;
            deliverablesContainer.appendChild(timelineItem);
        });
    }

    const proposalsContainer = document.getElementById('proposals-container');

    if (proposalsContainer && typeof courseData !== 'undefined' && courseData.proposals) {
        // Render Proposals
        courseData.proposals.forEach(prop => {
            const propLink = document.createElement('a');
            propLink.href = 'ProjectProposalDocuments/' + prop.file;
            propLink.target = '_blank';
            propLink.className = 'resource-card';

            // Determine if PDF or DOCX
            const isPdf = prop.file.toLowerCase().endsWith('.pdf');
            const icon = isPdf ? '📄' : '📝';
            const fileType = isPdf ? 'PDF' : 'DOCX';

            propLink.innerHTML = `
                <div class="resource-icon">${icon}</div>
                <div class="resource-info">
                    <h3>${prop.team} Proposal (${fileType})</h3>
                    <p>Download</p>
                </div>
            `;
            proposalsContainer.appendChild(propLink);
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
