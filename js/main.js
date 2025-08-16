// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const dataUpdateBtn = document.getElementById('data-update-btn');
const quickStats = {
    population: document.getElementById('population-stat'),
    gdp: document.getElementById('gdp-stat'),
    inflation: document.getElementById('inflation-stat'),
    exchange: document.getElementById('exchange-stat')
};

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Data Update Button
dataUpdateBtn.addEventListener('click', () => {
    fetchAllData();
    showNotification('Data update initiated');
});

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize Charts
function initFeaturedCharts() {
    // Chart 1: GDP Growth
    const ctx1 = document.getElementById('featuredChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'GDP Growth (%)',
                data: [8.4, 6.1, 5.7, 5.6, 6.2, 7.3, 6.5],
                borderColor: '#078C03',
                backgroundColor: 'rgba(7, 140, 3, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Chart 2: Population Growth
    const ctx2 = document.getElementById('featuredChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Population (millions)',
                data: [99.4, 114.9, 117.6, 120.3, 123.4, 126.5, 131.5],
                backgroundColor: '#ED1C24',
                borderColor: '#C0161B',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Chart 3: Inflation Rate
    const ctx3 = document.getElementById('featuredChart3').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Inflation Rate (%)',
                data: [15.8, 19.9, 26.4, 34.0, 28.0, 18.0],
                borderColor: '#FCDD09',
                backgroundColor: 'rgba(252, 221, 9, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Fetch News
async function fetchNews() {
    try {
        // In a real implementation, this would call a news API
        // For demo purposes, we'll use mock data
        const mockNews = [
            {
                title: "Ethiopia's Economy Shows Strong Growth in Q2 2024",
                excerpt: "The Ethiopian economy grew by 7.5% in the second quarter of 2024, according to the National Bank of Ethiopia.",
                date: "July 15, 2024",
                image: "assets/news1.jpg",
                link: "#"
            },
            {
                title: "New IMF Agreement to Support Ethiopia's Economic Reforms",
                excerpt: "The International Monetary Fund has approved a new 3-year financial arrangement to support Ethiopia's economic reform program.",
                date: "June 28, 2024",
                image: "assets/news2.jpg",
                link: "#"
            },
            {
                title: "Ethiopia Launches Digital Transformation Strategy",
                excerpt: "The government has unveiled a comprehensive digital strategy aimed at boosting economic growth and service delivery.",
                date: "June 10, 2024",
                image: "assets/news3.jpg",
                link: "#"
            }
        ];

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = mockNews.map(news => `
            <div class="news-item">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-content">
                    <div class="news-date">${news.date}</div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <a href="${news.link}" class="news-link">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Fetch Data from APIs
async function fetchAllData() {
    try {
        // World Bank API for population
        const populationResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/SP.POP.TOTL?format=json&date=2024');
        const populationData = populationResponse.data[1]?.[0]?.value;
        if (populationData) {
            quickStats.population.textContent = `${(populationData / 1000000).toFixed(1)}M`;
        }

        // World Bank API for GDP growth
        const gdpResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/NY.GDP.MKTP.KD.ZG?format=json&date=2024');
        const gdpData = gdpResponse.data[1]?.[0]?.value;
        if (gdpData) {
            quickStats.gdp.textContent = `${gdpData.toFixed(1)}%`;
        }

        // World Bank API for inflation
        const inflationResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/FP.CPI.TOTL.ZG?format=json&date=2024');
        const inflationData = inflationResponse.data[1]?.[0]?.value;
        if (inflationData) {
            quickStats.inflation.textContent = `${inflationData.toFixed(1)}%`;
        }

        // Exchange rate (using fallback as NBE API typically requires auth)
        quickStats.exchange.textContent = "56.5 ETB/USD";

        showNotification('Data updated successfully');
    } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback data if APIs fail
        quickStats.population.textContent = "126.5M";
        quickStats.gdp.textContent = "7.3%";
        quickStats.inflation.textContent = "18.0%";
        quickStats.exchange.textContent = "56.5 ETB/USD";
        showNotification('Using cached data - API connection failed');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedCharts();
    fetchNews();
    fetchAllData();
    
    // Refresh data every 6 hours
    setInterval(fetchAllData, 6 * 60 * 60 * 1000);
});
