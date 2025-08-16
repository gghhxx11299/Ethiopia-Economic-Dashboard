// Initialize Economy Page Charts
document.addEventListener('DOMContentLoaded', () => {
    // GDP Growth Chart
    const gdpCtx = document.getElementById('gdpChart').getContext('2d');
    new Chart(gdpCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'GDP Growth Rate (%)',
                    data: [8.4, 6.1, 5.7, 5.6, 6.2, 7.3, 6.5],
                    borderColor: '#078C03',
                    backgroundColor: 'rgba(7, 140, 3, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#078C03',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Nominal GDP (USD billions, right)',
                    data: [95.91, 107.66, 111.26, 126.77, 163.70, 143.12, 117.46],
                    borderColor: '#ED1C24',
                    backgroundColor: 'rgba(237, 28, 36, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    yAxisID: 'y1',
                    pointBackgroundColor: '#ED1C24',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label.includes('GDP')) {
                                return `${label}: ${context.raw}%`;
                            } else {
                                return `${label}: $${context.raw}B`;
                            }
                        }
                    }
                },
                legend: {
                    position: 'top',
                    align: 'end'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'GDP Growth Rate (%)'
                    },
                    min: 0,
                    max: 10
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Nominal GDP (USD billions)'
                    },
                    min: 0,
                    max: 180,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });

    // GDP Sector Chart
    const gdpSectorCtx = document.getElementById('gdpSectorChart').getContext('2d');
    new Chart(gdpSectorCtx, {
        type: 'doughnut',
        data: {
            labels: ['Agriculture', 'Industry', 'Services'],
            datasets: [{
                data: [35.2, 25.8, 39.0],
                backgroundColor: [
                    '#078C03',
                    '#ED1C24',
                    '#FCDD09'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });

    // Debt Chart
    const debtCtx = document.getElementById('debtChart').getContext('2d');
    new Chart(debtCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'External Debt (USD billions)',
                    data: [20.9, 22.4, 23.8, 25.3, 27.1, 28.9],
                    borderColor: '#078C03',
                    backgroundColor: 'rgba(7, 140, 3, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Debt-to-GDP Ratio (%)',
                    data: [21.8, 20.8, 21.4, 20.0, 16.6, 20.2],
                    borderColor: '#ED1C24',
                    backgroundColor: 'rgba(237, 28, 36, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label.includes('Ratio')) {
                                return `${label}: ${context.raw}%`;
                            } else {
                                return `${label}: $${context.raw}B`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'External Debt (USD billions)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Debt-to-GDP Ratio (%)'
                    },
                    min: 15,
                    max: 25,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });

    // Budget Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    new Chart(budgetCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [8.2, 9.1, 10.5, 11.8, 13.2, 14.5],
                    backgroundColor: '#078C03'
                },
                {
                    label: 'Expenditure',
                    data: [10.5, 11.8, 13.2, 14.6, 16.1, 17.8],
                    backgroundColor: '#ED1C24'
                },
                {
                    label: 'Deficit',
                    data: [-2.3, -2.7, -2.7, -2.8, -2.9, -3.3],
                    backgroundColor: '#FCDD09'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw}B`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'USD (Billions)'
                    }
                }
            }
        }
    });

    // Trade Chart
    const tradeCtx = document.getElementById('tradeChart').getContext('2d');
    new Chart(tradeCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Exports',
                    data: [3.1, 3.2, 3.5, 3.9, 4.1, 4.5],
                    backgroundColor: '#078C03',
                    borderColor: '#056B02',
                    borderWidth: 1
                },
                {
                    label: 'Imports',
                    data: [12.5, 13.1, 15.1, 16.2, 17.8, 18.2],
                    backgroundColor: '#ED1C24',
                    borderColor: '#C0161B',
                    borderWidth: 1
                },
                {
                    label: 'Trade Balance',
                    data: [-9.4, -9.9, -11.6, -12.3, -13.7, -13.7],
                    type: 'line',
                    borderColor: '#333',
                    borderWidth: 3,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: '#333',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw}B`;
                        }
                    }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'USD (Billions)'
                    }
                }
            }
        }
    });

    // FDI Chart
    const fdiCtx = document.getElementById('fdiChart').getContext('2d');
    new Chart(fdiCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'FDI Inflows (USD billions)',
                data: [3.2, 3.5, 3.8, 4.1, 4.0, 4.2],
                backgroundColor: [
                    '#FCDD09',
                    '#FCDD09',
                    '#FCDD09',
                    '#FCDD09',
                    '#FCDD09',
                    '#FCDD09'
                ],
                borderColor: [
                    '#E6C500',
                    '#E6C500',
                    '#E6C500',
                    '#E6C500',
                    '#E6C500',
                    '#E6C500'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `FDI: $${context.raw}B`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'USD (Billions)'
                    }
                }
            }
        }
    });

    // Fetch real-time data
    fetchEconomicData();
});

// Fetch economic data from APIs
async function fetchEconomicData() {
    try {
        // World Bank API for GDP growth
        const gdpResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/NY.GDP.MKTP.KD.ZG?format=json&date=2024');
        const gdpData = gdpResponse.data[1]?.[0]?.value;
        if (gdpData) {
            document.getElementById('gdp-growth').textContent = `${gdpData.toFixed(1)}%`;
        }

        // World Bank API for inflation
        const inflationResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/FP.CPI.TOTL.ZG?format=json&date=2024');
        const inflationData = inflationResponse.data[1]?.[0]?.value;
        if (inflationData) {
            document.getElementById('inflation-rate').textContent = `${inflationData.toFixed(1)}%`;
        }

        // Note: Other indicators would require specific API endpoints or would use fallback data
    } catch (error) {
        console.error("Error fetching economic data:", error);
    }
}
