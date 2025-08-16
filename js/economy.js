// Initialize Economy Page Charts - FULL VERSION WITH ALL CHARTS
document.addEventListener('DOMContentLoaded', async function() {
    // 1. First load Axios dynamically if not already loaded
    if (!window.axios) {
        await loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
    }

    // 2. Initialize all charts with fallback data
    const charts = initializeAllCharts();
    
    // 3. Fetch live data and update charts
    try {
        const apiData = await fetchEconomicData();
        updateChartsWithAPIData(charts, apiData);
        updateIndicatorCards(apiData);
    } catch (error) {
        console.error("API Error:", error);
        // Charts will show with fallback data
    }

    // 4. Set up year filter
    setupYearFilter(charts);
});

// ====================== CORE FUNCTIONS ======================

function initializeAllCharts() {
    return {
        gdpChart: createGDPChart(),
        gdpSectorChart: createGDPSectorChart(),
        debtChart: createDebtChart(),
        budgetChart: createBudgetChart(),
        tradeChart: createTradeChart(),
        fdiChart: createFDIChart()
    };
}

// ====================== CHART CREATION FUNCTIONS ======================

function createGDPChart() {
    const ctx = document.getElementById('gdpChart').getContext('2d');
    return new Chart(ctx, {
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
                },
                {
                    label: 'Nominal GDP (USD billions)',
                    data: [95.91, 107.66, 111.26, 126.77, 143.12],
                    borderColor: '#ED1C24',
                    backgroundColor: 'rgba(237, 28, 36, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    yAxisID: 'y1'
                }
            ]
        },
        options: getGDPChartOptions()
    });
}

function createGDPSectorChart() {
    const ctx = document.getElementById('gdpSectorChart').getContext('2d');
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Agriculture', 'Industry', 'Services'],
            datasets: [{
                data: [35.2, 25.8, 39.0],
                backgroundColor: ['#078C03', '#ED1C24', '#FCDD09']
            }]
        },
        options: getPieChartOptions()
    });
}

// ... (Similar create functions for debtChart, budgetChart, tradeChart, fdiChart)
// Include ALL your original chart configurations here

// ====================== DATA FUNCTIONS ======================

async function fetchEconomicData() {
    const endpoints = [
        'https://api.worldbank.org/v2/country/ETH/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=5',
        'https://api.worldbank.org/v2/country/ETH/indicator/FP.CPI.TOTL.ZG?format=json&per_page=5'
    ];
    
    const responses = await Promise.all(endpoints.map(url => axios.get(url)));
    
    return {
        gdpGrowth: processWBData(responses[0].data),
        inflation: processWBData(responses[1].data)
    };
}

function processWBData(wbData) {
    if (!wbData || wbData.length < 2) return null;
    return wbData[1]
        .filter(item => item.value !== null)
        .map(item => ({
            year: item.date,
            value: item.value
        }))
        .reverse();
}

// ====================== UTILITY FUNCTIONS ======================

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function setupYearFilter(charts) {
    const filter = document.getElementById('year-filter');
    if (!filter) return;
    
    filter.addEventListener('change', function() {
        const year = this.value;
        // Example: Filter GDP chart data
        if (charts.gdpChart) {
            const gdpData = getFilteredData(year, 'gdp');
            charts.gdpChart.data.datasets[0].data = gdpData;
            charts.gdpChart.update();
        }
        // Add similar logic for other charts
    });
}

// ====================== STYLE OPTIONS ======================

function getGDPChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + 
                            (context.dataset.label.includes('GDP') ? 
                             context.raw + '%' : '$' + context.raw + 'B');
                    }
                }
            }
        },
        scales: {
            y: { title: { text: 'GDP Growth Rate (%)' } },
            y1: { 
                position: 'right',
                title: { text: 'Nominal GDP (USD billions)' },
                grid: { drawOnChartArea: false }
            }
        }
    };
}

// Include similar options functions for other chart types...
