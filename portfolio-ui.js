// Portfolio UI Builder Module
class PortfolioUI {
    constructor(githubAPI) {
        this.api = githubAPI;
        this.loadingStates = new Set();
        this.fallbackEnabled = false;
    }

    // Fallback data for when GitHub API is unavailable
    getFallbackRepos() {
        return [
            {
                id: 1,
                name: 'Coursera-NestJS-Course',
                description: 'This is a nestjs course on coursera',
                html_url: 'https://github.com/sjamillah/Coursera-NestJS-Course',
                homepage: null,
                language: 'TypeScript',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-12-22T01:18:01Z',
                topics: ['nestjs', 'backend', 'typescript']
            },
            {
                id: 2,
                name: 'Blogs-App',
                description: 'This is a blogs full-stack application with beginner backend logic.',
                html_url: 'https://github.com/sjamillah/Blogs-App',
                homepage: null,
                language: 'JavaScript',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-09-18T11:02:20Z',
                topics: ['fullstack', 'blog', 'javascript']
            },
            {
                id: 3,
                name: 'Calculator-App',
                description: 'This is a repository for a calculator application.',
                html_url: 'https://github.com/sjamillah/Calculator-App',
                homepage: null,
                language: 'TypeScript',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-07-22T10:57:07Z',
                topics: ['calculator', 'react', 'typescript']
            },
            {
                id: 4,
                name: 'Medical_Q-A_Chatbot',
                description: 'This is a medical question and answering chatbot repository.',
                html_url: 'https://github.com/sjamillah/Medical_Q-A_Chatbot',
                homepage: null,
                language: 'Jupyter Notebook',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-06-24T17:18:30Z',
                topics: ['ai', 'chatbot', 'medical']
            },
            {
                id: 5,
                name: 'Air_Quality_Forecasting_Model',
                description: 'This is an air quality forecasting model',
                html_url: 'https://github.com/sjamillah/Air_Quality_Forecasting_Model',
                homepage: null,
                language: 'Jupyter Notebook',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-05-28T02:19:54Z',
                topics: ['machine-learning', 'forecasting', 'python']
            },
            {
                id: 6,
                name: 'Cardio-Vascular_Pipeline',
                description: 'This is a pipeline for detecting cardio vascular diseases in rural areas.',
                html_url: 'https://github.com/sjamillah/Cardio-Vascular_Pipeline',
                homepage: null,
                language: 'Jupyter Notebook',
                stargazers_count: 0,
                forks_count: 0,
                updated_at: '2025-04-03T23:53:56Z',
                topics: ['healthcare', 'ml', 'python']
            }
        ];
    }

    getFallbackStats() {
        return {
            totalRepos: 64,
            totalStars: 8,
            totalForks: 3,
            followers: 12
        };
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
            let stats;
            
            try {
                stats = await this.api.getContributionStats();
            } catch (error) {
                console.log('Using fallback stats data');
                stats = this.getFallbackStats();
                this.fallbackEnabled = true;
            }
            
            container.innerHTML = `
                ${this.createStatCard('fas fa-folder', stats.totalRepos, 'Repositories', 'Public repositories')}
                ${this.createStatCard('fas fa-star', stats.totalStars, 'Total Stars', 'Stars received')}
                ${this.createStatCard('fas fa-code-branch', stats.totalForks, 'Forks', 'Repository forks')}
                ${this.createStatCard('fas fa-users', stats.followers, 'Followers', 'GitHub followers')}
            `;
        } catch (error) {
            console.error('Error rendering GitHub stats:', error);
            // Use fallback stats as last resort
            const stats = this.getFallbackStats();
            container.innerHTML = `
                ${this.createStatCard('fas fa-folder', stats.totalRepos, 'Repositories', 'Public repositories')}
                ${this.createStatCard('fas fa-star', stats.totalStars, 'Total Stars', 'Stars received')}
                ${this.createStatCard('fas fa-code-branch', stats.totalForks, 'Forks', 'Repository forks')}
                ${this.createStatCard('fas fa-users', stats.followers, 'Followers', 'GitHub followers')}
            `;
        }
    }

    async renderFeaturedRepos() {
        const container = document.querySelector('.featured-repos-section .repos-grid');
        if (!container) return;

        try {
            this.showLoading(container);
            let repos;
            
            try {
                repos = await this.api.getFeaturedRepositories(6);
            } catch (error) {
                console.log('Using fallback repos data');
                repos = this.getFallbackRepos().slice(0, 6);
                this.fallbackEnabled = true;
            }
            
            container.innerHTML = repos.map(repo => this.createRepoCard(repo)).join('');
            this.hideLoading(container);
        } catch (error) {
            console.error('Error rendering featured repos:', error);
            // Use fallback as last resort
            const repos = this.getFallbackRepos().slice(0, 6);
            container.innerHTML = repos.map(repo => this.createRepoCard(repo)).join('');
        }
    }

    async renderAllRepos() {
        const container = document.querySelector('.more-repos-section .repos-grid');
        if (!container) return;

        try {
            this.showLoading(container);
            let otherRepos;
            
            try {
                const allRepos = await this.api.getRepositories({ excludeForked: true });
                const featuredRepos = await this.api.getFeaturedRepositories(6);
                const featuredIds = new Set(featuredRepos.map(r => r.id));
                
                // Filter out featured repos and get next 9
                otherRepos = allRepos
                    .filter(repo => !featuredIds.has(repo.id))
                    .slice(0, 9);
            } catch (error) {
                console.log('Using fallback repos data for more projects');
                otherRepos = this.getFallbackRepos();
                this.fallbackEnabled = true;
            }
            
            container.innerHTML = otherRepos.map(repo => this.createRepoCard(repo)).join('');
            this.hideLoading(container);
        } catch (error) {
            console.error('Error rendering repos:', error);
            // Use fallback as last resort
            const otherRepos = this.getFallbackRepos();
            container.innerHTML = otherRepos.map(repo => this.createRepoCard(repo)).join('');
        }
    }

    async renderLanguageStats() {
        const container = document.querySelector('.language-stats-container');
        if (!container) return;

        try {
            let languages;
            
            try {
                languages = await this.api.getLanguageStats();
            } catch (error) {
                console.log('Using fallback language stats');
                // Fallback language data
                languages = {
                    'JavaScript': 18,
                    'TypeScript': 8,
                    'Python': 12,
                    'Jupyter Notebook': 10,
                    'HTML': 6,
                    'Dart': 2,
                    'CSS': 3,
                    'Go': 1
                };
                this.fallbackEnabled = true;
            }
            
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
            // Provide minimal fallback
            container.innerHTML = '<p class="error-message">Language statistics will be available soon</p>';
        }
    }

    async renderProfileInfo() {
        try {
            const profile = await this.api.getUserProfile();
            
            // Profile data is available but keeping existing content
            // as it's more detailed. Could be enhanced in future to show
            // avatar_url or other profile information if needed.
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
