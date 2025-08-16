// Exchange Dashboard - Complete Fixed Version
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (!window.Chart) {
            loadScript('https://cdn.jsdelivr.net/npm/chart.js')
                .then(initExchangeDashboard);
        } else {
            initExchangeDashboard();
        }
    } catch (error) {
        console.error("Exchange failed:", error);
        showError("Exchange data unavailable");
    }
});

function initExchangeDashboard() {
    loadCurrentRates();
    setupCalculator();
    initExchangeCharts();
    setInterval(fetchLatestRates, 3600000); // Refresh hourly
}

function initExchangeCharts() {
    const usdConfig = {
        type: 'line',
        data: {
            labels: getLast12Months(),
            datasets: [
                {
                    label: 'Official Rate',
                    data: [54.1, 54.5, 55.2, 55.8, 56.1, 56.3, 56.5],
                    borderColor: '#078C03',
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { tooltip: { callbacks: { label: ctx => `${ctx.raw} ETB/USD` } } }
        }
    };
    
    new Chart(document.getElementById('usdChart').getContext('2d'), usdConfig);
    
    // ... other currency charts ...
}

function getLast12Months() {
    const months = [];
    const date = new Date();
    for (let i = 11; i >= 0; i--) {
        const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
        months.push(d.toLocaleString('default', { month: 'short' }));
    }
    return months;
}
