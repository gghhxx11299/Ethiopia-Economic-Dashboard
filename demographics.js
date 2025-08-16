// Initialize Demographics Page Charts
document.addEventListener('DOMContentLoaded', () => {
    // Population Growth Chart
    const populationCtx = document.getElementById('populationChart').getContext('2d');
    new Chart(populationCtx, {
        type: 'line',
        data: {
            labels: ['2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Population (millions)',
                data: [99.4, 114.9, 117.6, 120.3, 123.4, 126.5, 131.5],
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
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Population: ${context.raw} million`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Population (millions)'
                    }
                }
            }
        }
    });

    // Age Pyramid Chart
    const agePyramidCtx = document.getElementById('agePyramidChart').getContext('2d');
    new Chart(agePyramidCtx, {
        type: 'bar',
        data: {
            labels: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'],
            datasets: [
                {
                    label: 'Male',
                    data: [6.2, 5.8, 5.3, 4.9, 4.5, 4.0, 3.5, 2.9, 2.3, 1.8, 1.4, 1.0, 0.7, 0.8],
                    backgroundColor: '#078C03',
                    borderColor: '#056B02',
                    borderWidth: 1
                },
                {
                    label: 'Female',
                    data: [6.0, 5.6, 5.1, 4.7, 4.3, 3.9, 3.4, 2.9, 2.4, 1.9, 1.5, 1.1, 0.8, 1.0],
                    backgroundColor: '#ED1C24',
                    borderColor: '#C0161B',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} million`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Population (millions)'
                    }
                },
                y: {
                    stacked: true
                }
            }
        }
    });

    // Region Chart
    const regionCtx = document.getElementById('regionChart').getContext('2d');
    new Chart(regionCtx, {
        type: 'bar',
        data: {
            labels: ['Oromia', 'Amhara', 'SNNPR', 'Somali', 'Addis Ababa', 'Other'],
            datasets: [{
                label: 'Population (millions)',
                data: [42.1, 34.8, 23.4, 7.2, 5.1, 18.9],
                backgroundColor: [
                    '#078C03',
                    '#ED1C24',
                    '#FCDD09',
                    '#1E3A8A',
                    '#7E22CE',
                    '#666'
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
                            return `Population: ${context.raw} million`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Population (millions)'
                    }
                }
            }
        }
    });

    // Demographic Dividend Chart
    const dividendCtx = document.getElementById('dividendChart').getContext('2d');
    new Chart(dividendCtx, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040'],
            datasets: [{
                label: 'Dependency Ratio (Under 15 + Over 64 per 100 workers)',
                data: [90, 85, 80, 75, 72, 68, 63, 58, 53],
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
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Dependency Ratio'
                    },
                    min: 50,
                    max: 100
                }
            }
        }
    });

    // Ethnicity Chart
    const ethnicityCtx = document.getElementById('ethnicityChart').getContext('2d');
    new Chart(ethnicityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Oromo', 'Amhara', 'Tigray', 'Somali', 'Sidama', 'Gurage', 'Welayta', 'Other'],
            datasets: [{
                data: [34.5, 27.0, 6.1, 6.0, 4.0, 3.5, 2.4, 16.5],
                backgroundColor: [
                    '#078C03',
                    '#ED1C24',
                    '#FCDD09',
                    '#1E3A8A',
                    '#7E22CE',
                    '#0E7490',
                    '#BE123C',
                    '#666'
                ]
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

    // Religion Chart
    const religionCtx = document.getElementById('religionChart').getContext('2d');
    new Chart(religionCtx, {
        type: 'pie',
        data: {
            labels: ['Orthodox Christian', 'Muslim', 'Protestant', 'Traditional', 'Other'],
            datasets: [{
                data: [43.5, 34.0, 18.5, 2.5, 1.5],
                backgroundColor: [
                    '#078C03',
                    '#ED1C24',
                    '#FCDD09',
                    '#1E3A8A',
                    '#666'
                ]
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

    // Fetch demographic data
    fetchDemographicData();
});

// Fetch demographic data from APIs
async function fetchDemographicData() {
    try {
        // World Bank API for population
        const populationResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/SP.POP.TOTL?format=json&date=2024');
        const populationData = populationResponse.data[1]?.[0]?.value;
        if (populationData) {
            document.getElementById('population-total').textContent = `${(populationData / 1000000).toFixed(1)}M`;
        }

        // World Bank API for fertility rate
        const fertilityResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/SP.DYN.TFRT.IN?format=json&date=2024');
        const fertilityData = fertilityResponse.data[1]?.[0]?.value;
        if (fertilityData) {
            document.getElementById('fertility-rate').textContent = fertilityData.toFixed(1);
        }

        // World Bank API for urbanization
        const urbanResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/SP.URB.TOTL.IN.ZS?format=json&date=2024');
        const urbanData = urbanResponse.data[1]?.[0]?.value;
        if (urbanData) {
            document.getElementById('urbanization-rate').textContent = `${urbanData.toFixed(1)}%`;
        }

        // World Bank API for life expectancy
        const lifeResponse = await axios.get('https://api.worldbank.org/v2/country/ETH/indicator/SP.DYN.LE00.IN?format=json&date=2024');
        const lifeData = lifeResponse.data[1]?.[0]?.value;
        if (lifeData) {
            document.getElementById('life-expectancy').textContent = lifeData.toFixed(1);
        }
    } catch (error) {
        console.error("Error fetching demographic data:", error);
    }
}
