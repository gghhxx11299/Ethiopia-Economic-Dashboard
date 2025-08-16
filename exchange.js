// Exchange rates data (in a real app, this would come from an API)
const exchangeRates = {
    "USD": { rate: 56.5, flag: "🇺🇸", name: "US Dollar", lastUpdated: "2025-08-15" },
    "EUR": { rate: 61.8, flag: "🇪🇺", name: "Euro", lastUpdated: "2025-08-15" },
    "GBP": { rate: 72.3, flag: "🇬🇧", name: "British Pound", lastUpdated: "2025-08-15" },
    "JPY": { rate: 0.39, flag: "🇯🇵", name: "Japanese Yen", lastUpdated: "2025-08-14" },
    "CNY": { rate: 7.8, flag: "🇨🇳", name: "Chinese Yuan", lastUpdated: "2025-08-15" },
    "AED": { rate: 15.4, flag: "🇦🇪", name: "UAE Dirham", lastUpdated: "2025-08-15" },
    "CAD": { rate: 41.2, flag: "🇨🇦", name: "Canadian Dollar", lastUpdated: "2025-08-14" },
    "AUD": { rate: 37.6, flag: "🇦🇺", name: "Australian Dollar", lastUpdated: "2025-08-14" }
};

// Parallel market rates (for comparison)
const parallelRates = {
    "USD": 140.0,
    "EUR": 164.0,
    "GBP": 191.0
};

// Initialize Exchange Page
document.addEventListener('DOMContentLoaded', () => {
    // Load current rates
    loadCurrentRates();
    
    // Initialize calculator
    setupCalculator();
    
    // Initialize charts
    initExchangeCharts();
    
    // Load comparison table
    loadComparisonTable();
    
    // Set last updated time
    document.getElementById('exchange-update-time').textContent = new Date().toLocaleString();
});

// Load current rates into the grid
function loadCurrentRates() {
    const container = document.getElementById('rates-container');
    container.innerHTML = '';
    
    for (const [code, data] of Object.entries(exchangeRates)) {
        const rateCard = document.createElement('div');
        rateCard.className = 'rate-card';
        rateCard.innerHTML = `
            <div class="rate-flag">${data.flag}</div>
            <div class="rate-details">
                <div class="rate-name">${data.name}</div>
                <div class="rate-code">${code}</div>
            </div>
            <div class="rate-value">${data.rate.toFixed(2)} ETB</div>
        `;
        container.appendChild(rateCard);
    }
}

// Set up the currency calculator
function setupCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateConversion);
    
    // Also calculate when amount changes
    document.getElementById('amount').addEventListener('input', calculateConversion);
    
    // Calculate on page load
    calculateConversion();
}

// Perform currency conversion
function calculateConversion() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    // Convert to ETB first if needed
    let inBirr;
    if (fromCurrency === 'ETB') {
        inBirr = amount;
    } else {
        inBirr = amount * exchangeRates[fromCurrency].rate;
    }
    
    // Convert from ETB to target currency
    let result;
    if (toCurrency === 'ETB') {
        result = inBirr;
    } else {
        result = inBirr / exchangeRates[toCurrency].rate;
    }
    
    // Display result
    document.getElementById('result-value').textContent = result.toFixed(2);
    
    // Display conversion text
    const fromText = fromCurrency === 'ETB' ? 
        `${amount.toFixed(2)} Ethiopian Birr` : 
        `${amount.toFixed(2)} ${fromCurrency}`;
    
    const toText = toCurrency === 'ETB' ? 
        'Ethiopian Birr' : toCurrency;
    
    document.getElementById('result-text').textContent = `${fromText} = ${result.toFixed(2)} ${toText}`;
}

// Initialize exchange rate charts
function initExchangeCharts() {
    // USD Chart
    const usdCtx = document.getElementById('usdChart').getContext('2d');
    new Chart(usdCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                {
                    label: 'Official Rate (ETB/USD)',
                    data: [54.1, 54.5, 55.2, 55.8, 56.1, 56.3, 56.5, 56.5],
                    borderColor: '#078C03',
                    backgroundColor: 'rgba(7, 140, 3, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Parallel Market (ETB/USD)',
                    data: [120, 125, 130, 135, 138, 140, 140, 140],
                    borderColor: '#ED1C24',
                    backgroundColor: 'rgba(237, 28, 36, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.3
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
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ETB per USD'
                    }
                }
            }
        }
    });

    // EUR Chart
    const eurCtx = document.getElementById('eurChart').getContext('2d');
    new Chart(eurCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                {
                    label: 'Official Rate (ETB/EUR)',
                    data: [58.3, 59.1, 59.8, 60.5, 61.0, 61.5, 61.8, 61.8],
                    borderColor: '#078C03',
                    backgroundColor: 'rgba(7, 140, 3, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Parallel Market (ETB/EUR)',
                    data: [140, 145, 150, 155, 158, 162, 164, 164],
                    borderColor: '#ED1C24',
                    backgroundColor: 'rgba(237, 28, 36, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.3
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
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ETB per EUR'
                    }
                }
            }
        }
    });
}

// Load rate comparison table
function loadComparisonTable() {
    const tableBody = document.getElementById('rates-comparison');
    tableBody.innerHTML = '';
    
    for (const [code, data] of Object.entries(exchangeRates)) {
        if (parallelRates[code]) {
            const diff = parallelRates[code] - data.rate;
            const diffPercent = (diff / data.rate * 100).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${code} - ${data.name}</td>
                <td>${data.rate.toFixed(2)} ETB</td>
                <td>${parallelRates[code].toFixed(2)} ETB</td>
                <td class="${diff > 0 ? 'positive' : 'negative'}">${diff > 0 ? '+' : ''}${diffPercent}%</td>
                <td>${data.lastUpdated}</td>
            `;
            tableBody.appendChild(row);
        }
    }
}

// Fetch exchange rates from API (mock implementation)
async function fetchExchangeRates() {
    try {
        // In a real implementation, this would call the National Bank of Ethiopia API
        // or another reliable exchange rate API
        
        // For demo purposes, we'll simulate an API call
        const now = new Date();
        document.getElementById('exchange-update-time').textContent = now.toLocaleString();
        
        showNotification('Exchange rates updated successfully');
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        showNotification('Failed to update exchange rates');
    }
}
