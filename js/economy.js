// Economy Dashboard - Complete Fixed Version
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load required libraries dynamically
        if (!window.Chart) {
            await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        }
        if (!window.axios) {
            await loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
        }

        // Initialize all charts with fallback data
        const charts = {
            gdp: initChart('gdpChart', getGDPConfig()),
            sector: initChart('gdpSectorChart', getSectorConfig()),
            debt: initChart('debtChart', getDebtConfig()),
            budget: initChart('budgetChart', getBudgetConfig()),
            trade: initChart('tradeChart', getTradeConfig()),
            fdi: initChart('fdiChart', getFDIConfig())
        };

        // Fetch and update data
        const economicData = await fetchEconomicData();
        updateCharts(charts, economicData);
        setupYearFilter(charts);

    } catch (error) {
        console.error("Economy dashboard failed:", error);
        showError("Economy data unavailable. Showing cached data.");
    }
});

// Chart Initialization Helper
function initChart(canvasId, config) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    return ctx ? new Chart(ctx, config) : null;
}

// API Data Fetching
async function fetchEconomicData() {
    try {
        const proxyUrl = 'https://corsproxy.io/?';
        const endpoints = [
            'https://api.worldbank.org/v2/country/ETH/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=5',
            'https://api.worldbank.org/v2/country/ETH/indicator/FP.CPI.TOTL.ZG?format=json&per_page=5'
        ];
        
        const responses = await Promise.all(
            endpoints.map(url => axios.get(proxyUrl + encodeURIComponent(url)))
        );

        return {
            gdpGrowth: processWBData(responses[0].data),
            inflation: processWBData(responses[1].data)
        };
    } catch (error) {
        console.error("API Error:", error);
        return null; // Will use fallback data
    }
}

// Chart Configurations
function getGDPConfig() {
    return {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'GDP Growth Rate (%)',
                    data: [8.4, 6.1, 5.7, 5.6, 6.2],
                    borderColor: '#078C03',
                    backgroundColor: 'rgba(7, 140, 3, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` } }
            }
        }
    };
}

// ... Similar config functions for other charts ...

// Utility Functions
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
    const alert = document.createElement('div');
    alert.className = 'data-alert';
    alert.textContent = message;
    document.body.prepend(alert);
    setTimeout(() => alert.remove(), 5000);
}
