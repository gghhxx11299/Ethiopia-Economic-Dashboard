// Main Dashboard - Complete Fixed Version
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load libraries if not already loaded
        if (!window.Chart || !window.axios) {
            await Promise.all([
                !window.Chart ? loadScript('https://cdn.jsdelivr.net/npm/chart.js') : Promise.resolve(),
                !window.axios ? loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js') : Promise.resolve()
            ]);
        }

        initMobileMenu();
        initFeaturedCharts();
        loadNews();
        refreshData();

        // Refresh data every 6 hours
        setInterval(refreshData, 6 * 60 * 60 * 1000);

    } catch (error) {
        console.error("Main dashboard failed:", error);
        showError("Dashboard initialization failed");
    }
});

function initFeaturedCharts() {
    const chartsConfig = {
        gdp: {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    data: [8.4, 6.1, 5.7, 5.6, 6.2],
                    borderColor: '#078C03'
                }]
            }
        },
        // ... other featured charts
    };

    Object.entries(chartsConfig).forEach(([id, config]) => {
        const ctx = document.getElementById(`featured-${id}-chart`)?.getContext('2d');
        if (ctx) new Chart(ctx, config);
    });
}

async function refreshData() {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        const [population, gdp, inflation] = await Promise.all([
            axios.get(proxyUrl + encodeURIComponent('https://api.worldbank.org/v2/country/ETH/indicator/SP.POP.TOTL?format=json&date=2024')),
            // ... other API calls
        ]);
        
        updateQuickStats({
            population: population.data[1]?.[0]?.value / 1000000,
            gdp: gdp.data[1]?.[0]?.value,
            inflation: inflation.data[1]?.[0]?.value
        });
        
    } catch (error) {
        console.error("Data refresh failed:", error);
        useFallbackData();
    }
}

// Shared utility functions
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}
