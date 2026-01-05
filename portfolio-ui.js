// Portfolio UI Builder Module
class PortfolioUI {
    constructor(githubAPI) {
        this.api = githubAPI;
        this.loadingStates = new Set();
    }

    showLoading(container) {
        const skeleton = `
            <div class="loading-skeleton">
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
            </div>
        `;
        container.innerHTML = skeleton;
    }

    hideLoading(container) {
        const loading = container.querySelector('.loading-skeleton');
        if (loading) loading.remove();
    }

    createRepoCard(repo) {
        const languageColor = this.api.getRepoLanguageColor(repo.language);
        const updatedText = this.api.formatDate(repo.updated_at);
        
        return `
            <div class="repo-card" data-aos="fade-up">
                <div class="repo-header">
                    <i class="far fa-folder"></i>
                    <div class="repo-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" title="Live Demo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
                <h4 class="repo-title">${repo.name.replace(/-|_/g, ' ')}</h4>
                <p class="repo-description">
                    ${repo.description || 'No description available'}
                </p>
                <div class="repo-footer">
                    <div class="repo-stats">
                        ${repo.language ? `
                            <span class="repo-language">
                                <span class="language-dot" style="background-color: ${languageColor}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        ${repo.stargazers_count > 0 ? `
                            <span class="repo-stat">
                                <i class="fas fa-star"></i>
                                ${repo.stargazers_count}
                            </span>
                        ` : ''}
                        ${repo.forks_count > 0 ? `
                            <span class="repo-stat">
                                <i class="fas fa-code-branch"></i>
                                ${repo.forks_count}
                            </span>
                        ` : ''}
                    </div>
                    <div class="repo-updated">${updatedText}</div>
                </div>
                ${repo.topics && repo.topics.length > 0 ? `
                    <div class="repo-topics">
                        ${repo.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    createProjectCard(project) {
        return `
            <div class="portfolio-item" data-aos="zoom-in">
                <div class="image">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="hover-items">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="icons">
                        <a href="${project.github}" class="icon" target="_blank" rel="noopener noreferrer" title="GitHub Repository">
                            <i class="fab fa-github"></i>
                        </a>
                        ${project.demo ? `
                            <a href="${project.demo}" class="icon" target="_blank" rel="noopener noreferrer" title="Live Demo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    createStatCard(icon, number, title, description = '') {
        return `
            <div class="stat-card" data-aos="fade-up">
                <div class="stat-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="stat-details">
                    <h3 class="stat-number">${number}</h3>
                    <p class="stat-title">${title}</p>
                    ${description ? `<p class="stat-description">${description}</p>` : ''}
                </div>
            </div>
        `;
    }

    async renderGitHubStats() {
        const container = document.querySelector('.contribution-stats-container');
        if (!container) return;

        try {
            this.showLoading(container);
            const stats = await this.api.getContributionStats();
            
            container.innerHTML = `
                ${this.createStatCard('fas fa-folder', stats.totalRepos, 'Repositories', 'Public repositories')}
                ${this.createStatCard('fas fa-star', stats.totalStars, 'Total Stars', 'Stars received')}
                ${this.createStatCard('fas fa-code-branch', stats.totalForks, 'Forks', 'Repository forks')}
                ${this.createStatCard('fas fa-users', stats.followers, 'Followers', 'GitHub followers')}
            `;
        } catch (error) {
            console.error('Error rendering GitHub stats:', error);
            container.innerHTML = '<p class="error-message">Unable to load GitHub statistics</p>';
        }
    }

    async renderFeaturedRepos() {
        const container = document.querySelector('.featured-repos-section .repos-grid');
        if (!container) return;

        try {
            this.showLoading(container);
            const repos = await this.api.getFeaturedRepositories(6);
            
            container.innerHTML = repos.map(repo => this.createRepoCard(repo)).join('');
            this.hideLoading(container);
        } catch (error) {
            console.error('Error rendering featured repos:', error);
            container.innerHTML = '<p class="error-message">Unable to load featured repositories</p>';
        }
    }

    async renderAllRepos() {
        const container = document.querySelector('.more-repos-section .repos-grid');
        if (!container) return;

        try {
            this.showLoading(container);
            const allRepos = await this.api.getRepositories({ excludeForked: true });
            const featuredRepos = await this.api.getFeaturedRepositories(6);
            const featuredIds = new Set(featuredRepos.map(r => r.id));
            
            // Filter out featured repos and get next 9
            const otherRepos = allRepos
                .filter(repo => !featuredIds.has(repo.id))
                .slice(0, 9);
            
            container.innerHTML = otherRepos.map(repo => this.createRepoCard(repo)).join('');
            this.hideLoading(container);
        } catch (error) {
            console.error('Error rendering repos:', error);
            container.innerHTML = '<p class="error-message">Unable to load repositories</p>';
        }
    }

    async renderLanguageStats() {
        const container = document.querySelector('.language-stats-container');
        if (!container) return;

        try {
            const languages = await this.api.getLanguageStats();
            const entries = Object.entries(languages);
            const total = entries.reduce((sum, [, count]) => sum + count, 0);
            
            container.innerHTML = `
                <div class="language-stats">
                    ${entries.map(([lang, count]) => {
                        const percentage = ((count / total) * 100).toFixed(1);
                        const color = this.api.getRepoLanguageColor(lang);
                        return `
                            <div class="language-item" data-aos="fade-right">
                                <div class="language-info">
                                    <span class="language-dot" style="background-color: ${color}"></span>
                                    <span class="language-name">${lang}</span>
                                    <span class="language-percentage">${percentage}%</span>
                                </div>
                                <div class="language-bar">
                                    <div class="language-progress" style="width: ${percentage}%; background-color: ${color}"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error rendering language stats:', error);
        }
    }

    async renderProfileInfo() {
        try {
            const profile = await this.api.getUserProfile();
            
            // Update profile image if element exists
            const profileImg = document.querySelector('.header-content .image img');
            if (profileImg && profile.avatar_url) {
                // Keep existing image, but we could update it if needed
                // profileImg.src = profile.avatar_url;
            }
            
            // Update bio if different
            const bioElement = document.querySelector('.right-header p');
            if (bioElement && profile.bio) {
                // Keep existing bio as it's more detailed
            }
        } catch (error) {
            console.error('Error loading profile info:', error);
        }
    }

    createFilterButtons() {
        return `
            <div class="repo-filters" data-aos="fade-down">
                <button class="filter-btn active" data-filter="all">All Projects</button>
                <button class="filter-btn" data-filter="featured">Featured</button>
                <button class="filter-btn" data-filter="web">Web Apps</button>
                <button class="filter-btn" data-filter="ml">Machine Learning</button>
                <button class="filter-btn" data-filter="mobile">Mobile</button>
            </div>
        `;
    }

    initializeFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                await this.applyFilter(filter);
            });
        });
    }

    async applyFilter(filter) {
        const container = document.querySelector('.repos-grid');
        if (!container) return;

        try {
            this.showLoading(container);
            let repos;

            switch(filter) {
                case 'featured':
                    repos = await this.api.getFeaturedRepositories(12);
                    break;
                case 'web':
                    repos = await this.api.getRepositories({ 
                        excludeForked: true 
                    });
                    repos = repos.filter(r => 
                        ['JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(r.language)
                    );
                    break;
                case 'ml':
                    repos = await this.api.getRepositories({ 
                        excludeForked: true 
                    });
                    repos = repos.filter(r => 
                        ['Python', 'Jupyter Notebook'].includes(r.language) &&
                        (r.description?.toLowerCase().includes('machine learning') ||
                         r.description?.toLowerCase().includes('ml') ||
                         r.description?.toLowerCase().includes('model'))
                    );
                    break;
                case 'mobile':
                    repos = await this.api.getRepositories({ 
                        language: 'Dart',
                        excludeForked: true 
                    });
                    break;
                default:
                    repos = await this.api.getRepositories({ excludeForked: true });
                    repos = repos.slice(0, 15);
            }

            container.innerHTML = repos.map(repo => this.createRepoCard(repo)).join('');
            this.hideLoading(container);
        } catch (error) {
            console.error('Error applying filter:', error);
            container.innerHTML = '<p class="error-message">Unable to load repositories</p>';
        }
    }

    async initializePortfolio() {
        console.log('Initializing portfolio with GitHub data...');
        
        try {
            // Load all components in parallel for better performance
            await Promise.all([
                this.renderGitHubStats(),
                this.renderFeaturedRepos(),
                this.renderAllRepos(),
                this.renderLanguageStats(),
                this.renderProfileInfo()
            ]);
            
            console.log('Portfolio initialized successfully!');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioUI;
}
