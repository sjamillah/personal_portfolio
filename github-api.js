// GitHub API Integration Module
class GitHubAPI {
    constructor(username) {
        this.username = username;
        this.baseUrl = 'https://api.github.com';
        this.cache = {
            repos: null,
            user: null,
            timestamp: null
        };
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    async fetchWithCache(url) {
        try {
            const response = await fetch(url);
            
            // Check for rate limiting
            if (response.status === 403 || response.status === 429) {
                const remaining = response.headers.get('X-RateLimit-Remaining');
                const resetTime = response.headers.get('X-RateLimit-Reset');
                console.warn('GitHub API rate limit reached. Remaining:', remaining);
                if (resetTime) {
                    const resetDate = new Date(resetTime * 1000);
                    console.warn('Rate limit resets at:', resetDate.toLocaleString());
                }
                throw new Error('API rate limit exceeded');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getUserProfile() {
        const now = Date.now();
        if (this.cache.user && (now - this.cache.timestamp) < this.cacheExpiry) {
            return this.cache.user;
        }

        const url = `${this.baseUrl}/users/${this.username}`;
        const data = await this.fetchWithCache(url);
        this.cache.user = data;
        this.cache.timestamp = now;
        return data;
    }

    async getRepositories(options = {}) {
        const { sort = 'updated', per_page = 100 } = options;
        const now = Date.now();
        
        if (this.cache.repos && (now - this.cache.timestamp) < this.cacheExpiry) {
            return this.processRepos(this.cache.repos, options);
        }

        const url = `${this.baseUrl}/users/${this.username}/repos?sort=${sort}&per_page=${per_page}`;
        const data = await this.fetchWithCache(url);
        this.cache.repos = data;
        this.cache.timestamp = now;
        
        return this.processRepos(data, options);
    }

    processRepos(repos, options) {
        const { language = null, excludeForked = true, minStars = 0 } = options;
        
        let filtered = repos;
        
        if (excludeForked) {
            filtered = filtered.filter(repo => !repo.fork);
        }
        
        if (language) {
            filtered = filtered.filter(repo => repo.language === language);
        }
        
        if (minStars > 0) {
            filtered = filtered.filter(repo => repo.stargazers_count >= minStars);
        }
        
        return filtered;
    }

    async getFeaturedRepositories(count = 6) {
        const repos = await this.getRepositories({ excludeForked: true });
        
        // Prioritize repos with descriptions, stars, and recent activity
        const scored = repos.map(repo => {
            let score = 0;
            if (repo.description) score += 10;
            score += repo.stargazers_count * 5;
            score += repo.forks_count * 3;
            if (repo.homepage) score += 5;
            const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
            score += Math.max(0, 30 - daysSinceUpdate);
            
            return { ...repo, score };
        });
        
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, count);
    }

    async getLanguageStats() {
        const repos = await this.getRepositories({ excludeForked: true });
        const languages = {};
        
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const sorted = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);
        
        return Object.fromEntries(sorted);
    }

    async getContributionStats() {
        const repos = await this.getRepositories({ excludeForked: true });
        const user = await this.getUserProfile();
        
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        
        return {
            totalRepos: repos.length,
            totalStars,
            totalForks,
            followers: user.followers,
            following: user.following,
            publicGists: user.public_gists,
            createdAt: user.created_at
        };
    }

    getRepoLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Dart': '#00B4AB',
            'Jupyter Notebook': '#DA5B0B',
            'Go': '#00ADD8',
            'Ruby': '#701516',
            'PHP': '#4F5D95',
            'C++': '#f34b7d',
            'C': '#555555',
            'Shell': '#89e051',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33'
        };
        return colors[language] || '#8b949e';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 1) return 'Updated today';
        if (diffDays === 1) return 'Updated yesterday';
        if (diffDays < 30) return `Updated ${diffDays} days ago`;
        if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
        return `Updated ${Math.floor(diffDays / 365)} years ago`;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubAPI;
}
