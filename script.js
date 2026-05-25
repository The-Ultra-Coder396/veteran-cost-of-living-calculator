/* ==========================================================================
   CONSTANTS & BASIC CONFIGURATION
   ========================================================================== */
const VA_RATE = 6.125;         // Hardcoded 2026 benchmark VA loan interest rate
const CONV_RATE = 6.75;       // Comparative conventional loan interest rate 
const LOAN_TERM = 30;        // 30-Year fixed rate timeline matrix
const PMI_RATE = 0.008;      // Standard conventional private mortgage insurance rate (0.8%)
const MAP_VIEWBOX = { width: 1000, height: 589 };

/* ==========================================================================
   CITY DATA SPECIFICATION
   ========================================================================== */
const CITY_DATA = {
    "seattle": {
        name: "Seattle, WA",
        state: "WA",
        marketTier: "HYPER-COMPETITIVE",
        medianPrice: 850000,
        sellerConcessionLikelihood: "Extremely Rare. Bidding wars routinely force buyers to waive all contingency protections.",
        cashNeededEstimate: 0.05,
        militaryRetirementTax: "Washington has no state income tax, making retirement pay completely tax-free.",
        retirementTaxSavings: 2800,
        vaWaitTimePrimary: 24,
        vaWaitTimeSpecialty: 52,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Local foreclosure rates remain low due to high baseline equity growth across King County.",
        pcsNote: "PCS windows collide heavily with corporate relocation cycles, causing immediate bidding gridlocks.",
        retiredNote: "Retired veterans face steep cost-of-living challenges despite the favorable structural tax umbrella.",
        appraisalGapRisk: "High",
        propertyTaxExemption: "Property tax exemptions are strictly limited to disabled veterans with specific low-income thresholds.",
        showCrisisBanner: false
    },
    "los-angeles": {
        name: "Los Angeles, CA",
        state: "CA",
        marketTier: "BROKEN",
        medianPrice: 900000,
        sellerConcessionLikelihood: "Non-Existent. Sellers routinely filter out VA offers instantly in favor of all-cash or conventional terms.",
        cashNeededEstimate: 0.06,
        militaryRetirementTax: "California is one of the few states that fully taxes military retirement pay as regular income.",
        retirementTaxSavings: -3400,
        vaWaitTimePrimary: 31,
        vaWaitTimeSpecialty: 68,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "Post-VASP defaults are rising across Southern California as pandemic-era protections run dry.",
        pcsNote: "Sellers here will not wait for delayed military command approvals or extended escrow friction.",
        retiredNote: "Extreme state tax penalties and unyielding prices create an uphill battle for fixed pension structures.",
        appraisalGapRisk: "Very High",
        propertyTaxExemption: "Basic disabled veteran exemption is available, but it scale-caps low relative to LA base values.",
        showCrisisBanner: true
    },
    "san-diego": {
        name: "San Diego, CA",
        state: "CA",
        marketTier: "BROKEN",
        medianPrice: 875000,
        sellerConcessionLikelihood: "Virtually Non-Existent. Massive local military concentration causes extreme competition among VA buyers.",
        cashNeededEstimate: 0.06,
        militaryRetirementTax: "California fully taxes military retirement pay, yielding zero state-level relief.",
        retirementTaxSavings: -3200,
        vaWaitTimePrimary: 28,
        vaWaitTimeSpecialty: 59,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "San Diego has concentrated clusters of veterans experiencing high mortgage delinquency rates.",
        pcsNote: "Fleet concentration creates massive cyclical surges; standard PCS timelines fail against cash bids.",
        retiredNote: "The combination of high home prices and total state retirement taxation drains local pension value.",
        appraisalGapRisk: "Very High",
        propertyTaxExemption: "State exemptions offer negligible relief against multi-million dollar local assessments.",
        showCrisisBanner: true
    },
    "denver": {
        name: "Denver, CO",
        state: "CO",
        marketTier: "COMPETITIVE",
        medianPrice: 580000,
        sellerConcessionLikelihood: "Rare. Occasional structural credits are negotiable on homes sitting past 45 active days.",
        cashNeededEstimate: 0.03,
        militaryRetirementTax: "Colorado allows a significant structural deduction for military retirement pay based on age limits.",
        retirementTaxSavings: 1400,
        vaWaitTimePrimary: 19,
        vaWaitTimeSpecialty: 41,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Delinquencies are stable but rising slowly within the immediate suburban rings.",
        pcsNote: "Spring rotations face heavy regional inventory constraints that force fast, risky decisions.",
        retiredNote: "Tax deductions help soften the blow of Denver's aggressive baseline property valuations.",
        appraisalGapRisk: "Moderate-High",
        propertyTaxExemption: "A 50% exemption of the first $200,000 of a primary home's value exists for 100% disabled veterans.",
        showCrisisBanner: false
    },
    "okc": {
        name: "Oklahoma City, OK",
        state: "OK",
        marketTier: "BUYER-FRIENDLY",
        medianPrice: 240000,
        sellerConcessionLikelihood: "Common. Sellers routinely pay full closing costs and fund immediate structural repair demands.",
        cashNeededEstimate: 0.00,
        militaryRetirementTax: "Oklahoma completely exempts all military retirement pay from state income taxes.",
        retirementTaxSavings: 1900,
        vaWaitTimePrimary: 12,
        vaWaitTimeSpecialty: 26,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "Low baseline costs keep absolute default rates minimal across central Oklahoma.",
        pcsNote: "Mild market pace means transition housing adjustments track cleanly to standard orders.",
        retiredNote: "Exceptional purchasing power stretching across a highly favorable low-cost ecosystem.",
        appraisalGapRisk: "Very Low",
        propertyTaxExemption: "100% permanently disabled veterans receive a full, total exemption from all property taxes.",
        showCrisisBanner: false
    },
    "austin": {
        name: "Austin, TX",
        state: "TX",
        marketTier: "MODERATE",
        medianPrice: 460000,
        sellerConcessionLikelihood: "Possible. Negotiable options exist within older inventory layers or building developments.",
        cashNeededEstimate: 0.02,
        militaryRetirementTax: "Texas charges no state income tax, ensuring all retirement allocations land cleanly.",
        retirementTaxSavings: 2200,
        vaWaitTimePrimary: 18,
        vaWaitTimeSpecialty: 38,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Pockets of high inventory shield the area from immediate post-VASP localized panics.",
        pcsNote: "Corporate shifts distort standard pricing models, but military timelines remain manageable.",
        retiredNote: "Texas income tax rules favor pensions, though uncapped property tax metrics demand careful attention.",
        appraisalGapRisk: "Low-Moderate",
        propertyTaxExemption: "100% disabled veterans are completely exempt from property taxes; partial ratings yield graduated deductions.",
        showCrisisBanner: false
    },
    "san-antonio": {
        name: "San Antonio, TX",
        state: "TX",
        marketTier: "BUYER-FRIENDLY",
        medianPrice: 290000,
        sellerConcessionLikelihood: "Highly Likely. Incentives, closing credits, and rapid repair fixes are standard structural assumptions.",
        cashNeededEstimate: 0.01,
        militaryRetirementTax: "Texas charges no state income tax, making military pensions completely tax-free.",
        retirementTaxSavings: 2000,
        vaWaitTimePrimary: 14,
        vaWaitTimeSpecialty: 32,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Massive localized volume keeps default metrics distributed safely across wide margins.",
        pcsNote: "Military-centric economic engine ensures standard infrastructure handles institutional timeline delays smoothly.",
        retiredNote: "An incredibly secure, high-yield retirement destination for standard service pensions.",
        appraisalGapRisk: "Low",
        propertyTaxExemption: "Total property tax waivers are universally extended to 100% disabled resident veterans.",
        showCrisisBanner: false
    },
    "detroit": {
        name: "Detroit, MI",
        state: "MI",
        marketTier: "MODERATE",
        medianPrice: 230000,
        sellerConcessionLikelihood: "Likely. Closing help and system update concessions can be readily negotiated.",
        militaryRetirementTax: "Michigan completely exempts military retirement pay from state income taxation.",
        cashNeededEstimate: 0.01,
        retirementTaxSavings: 1600,
        vaWaitTimePrimary: 15,
        vaWaitTimeSpecialty: 35,
        vaHealthcareScore: "Poor",
        foreclosureRiskNote: "Legacy economic factors keep regional delinquency metrics slightly above national baselines.",
        pcsNote: "Infrastructural steps move slowly, but low operational stress keeps contract timelines secure.",
        retiredNote: "Favorable structural tax boundaries balance out uneven urban infrastructure profiles.",
        appraisalGapRisk: "Low",
        propertyTaxExemption: "100% disabled veterans receive full property tax discharge on primary structural residences.",
        showCrisisBanner: false
    },
    "dc": {
        name: "Washington, DC",
        state: "DC",
        marketTier: "HYPER-COMPETITIVE",
        medianPrice: 650000,
        sellerConcessionLikelihood: "Extremely Rare. Institutional fast-tracking makes standard contingency items liabilities.",
        cashNeededEstimate: 0.04,
        militaryRetirementTax: "DC taxes military retirement pay heavily above nominal progressive baseline limits.",
        retirementTaxSavings: -1100,
        vaWaitTimePrimary: 22,
        vaWaitTimeSpecialty: 49,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "High general living expenses place complex strains on lower-enlisted balance sheets.",
        pcsNote: "High-density political rotation windows force compressed, high-stakes contract positions.",
        retiredNote: "High baseline living premiums and tax drag pressure fixed retirement profiles.",
        appraisalGapRisk: "High",
        propertyTaxExemption: "No meaningful general property tax exemption exists for veterans without total disability status.",
        showCrisisBanner: true
    },
    "jacksonville": {
        name: "Jacksonville, FL",
        state: "FL",
        marketTier: "COMPETITIVE",
        medianPrice: 380000,
        sellerConcessionLikelihood: "Occasional. Partial closing cost allowances appear on listings passing 30 active days.",
        cashNeededEstimate: 0.03,
        militaryRetirementTax: "Florida has no state income tax, keeping pension yields completely untouched.",
        retirementTaxSavings: 2100,
        vaWaitTimePrimary: 17,
        vaWaitTimeSpecialty: 39,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "Regional pockets are demonstrating volatile default rates following recent insurance premium hikes.",
        pcsNote: "Coastal deployments cause intense localized rental spikes, narrowing purchasing horizons.",
        retiredNote: "Zero income tax metrics compete directly against soaring property insurance markets.",
        appraisalGapRisk: "Moderate",
        propertyTaxExemption: "100% disabled veterans receive total exemption; combat-disabled seniors get additional discounts.",
        showCrisisBanner: false
    }
};

const CITY_POSITIONS = {
    "seattle": { x: 214, y: 87 },
    "los-angeles": { x: 219, y: 348 },
    "san-diego": { x: 224, y: 375 },
    "denver": { x: 448, y: 265 },
    "okc": { x: 558, y: 352 },
    "austin": { x: 556, y: 443 },
    "san-antonio": { x: 543, y: 463 },
    "detroit": { x: 761, y: 201 },
    "dc": { x: 879, y: 230 },
    "jacksonville": { x: 835, y: 418 }
};

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */
function calculateFundingFee(homePrice, disability, usage) {
    if (disability === "yes") return 0;
    return usage === "first" ? Math.round(homePrice * 0.0215) : Math.round(homePrice * 0.033);
}

function calculateMonthlyPayment(principal, annualRate, years) {
    const r = (annualRate / 100) / 12;
    const n = years * 12;
    if (r === 0) return Math.round(principal / n);
    return Math.round(principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

function formatCurrency(number) {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
}

/* ==========================================================================
   STATE ENGINE & INTERFACE APPLICATION MANAGER
   ========================================================================== */
let selectedCityData = null;
let isCalculated = false;

document.addEventListener('DOMContentLoaded', () => {
    const appWrapper = document.querySelector('.app-wrapper');
    const calcPanel = document.getElementById('calc-panel');
    const closeBtn = document.getElementById('close-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const priceSlider = document.getElementById('price-slider');
    const priceDisplay = document.getElementById('price-display');
    
    const comparisonGrid = document.getElementById('comparison-grid');
    const contextRows = document.getElementById('context-rows');
    const crisisBanner = document.getElementById('crisis-banner');
    const lowPriceWarning = document.getElementById('low-price-warning');

    /* --- City Node Click Router --- */
    document.querySelectorAll('.city-node').forEach(node => {
        const cityKey = node.getAttribute('data-city');
        positionCityNode(node, cityKey);

        node.addEventListener('click', () => {
            document.querySelectorAll('.city-node').forEach(n => n.classList.remove('selected'));
            node.classList.add('selected');
            
            selectedCityData = CITY_DATA[cityKey];
            isCalculated = false;
            
            openPanel(selectedCityData);
        });
    });

    /* --- Open Panel Transition Layout --- */
    function openPanel(city) {
        if (!city) return;
        
        document.getElementById('selected-city-name').textContent = city.name;
        
        // Dynamic Badge Class Generation
        const badge = document.getElementById('market-badge');
        badge.textContent = "Market: " + city.marketTier;
        const tierClass = "tier-" + city.marketTier.toLowerCase().replace(/[^a-z]/g, '-');
        badge.className = "market-badge " + tierClass;
        
        // Initial Panel Visibility Resets
        crisisBanner.hidden = !city.showCrisisBanner;
        resetCalculatedOutput();
        
        // Form UI Input Resets
        document.querySelector('input[name="status"][value="active"]').checked = true;
        document.querySelector('input[name="disability"][value="no"]').checked = true;
        document.querySelector('input[name="usage"][value="first"]').checked = true;
        priceSlider.value = 400000;
        priceDisplay.textContent = "$400,000";
        
        // Viewport Class Transformations
        calcPanel.classList.add('visible');
        appWrapper.classList.add('panel-open');
    }

    /* --- Close Panel Action Pipeline --- */
    closeBtn.addEventListener('click', () => {
        calcPanel.classList.remove('visible');
        appWrapper.classList.remove('panel-open');
        document.querySelectorAll('.city-node').forEach(n => n.classList.remove('selected'));
        
        selectedCityData = null;
        isCalculated = false;
        
        crisisBanner.hidden = true;
        resetCalculatedOutput();
    });

    /* --- Live Slider Engine --- */
    priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        priceDisplay.textContent = formatCurrency(val);
        markInputsChanged();
    });

    document.querySelectorAll('input[name="status"], input[name="disability"], input[name="usage"]').forEach(input => {
        input.addEventListener('change', markInputsChanged);
    });

    function positionCityNode(node, cityKey) {
        const position = CITY_POSITIONS[cityKey];
        if (!position) return;

        node.style.left = `${(position.x / MAP_VIEWBOX.width) * 100}%`;
        node.style.top = `${(position.y / MAP_VIEWBOX.height) * 100}%`;
    }

    function markInputsChanged() {
        if (!selectedCityData) return;
        isCalculated = false;
        resetCalculatedOutput();
        crisisBanner.hidden = !selectedCityData.showCrisisBanner;
    }

    function resetCalculatedOutput() {
        lowPriceWarning.hidden = true;
        comparisonGrid.hidden = true;
        contextRows.hidden = true;
    }

    /* --- Dynamic Median Cost Checker --- */
    function checkLowPriceWarning(price, city) {
        if (!city) return;
        if (price < city.medianPrice) {
            lowPriceWarning.hidden = false;
            lowPriceWarning.innerHTML = `⚠ You've selected ${formatCurrency(price)}. The median sale price in ${city.name} is ${formatCurrency(city.medianPrice)}. Listings in this range are rare in this market — a VA appraisal is unlikely to be supported at this price without significant seller negotiation.`;
        } else {
            lowPriceWarning.hidden = true;
        }
    }

    /* --- Main Calculation Engine Action --- */
    calculateBtn.addEventListener('click', () => {
        if (!selectedCityData) return;
        executeCalculationPipeline();
    });

    function executeCalculationPipeline() {
        const city = selectedCityData;
        const homePrice = parseInt(priceSlider.value);
        const status = document.querySelector('input[name="status"]:checked').value;
        const disability = document.querySelector('input[name="disability"]:checked').value;
        const usage = document.querySelector('input[name="usage"]:checked').value;

        // Mathematical Evaluation Block
        const fundingFeeAmount = calculateFundingFee(homePrice, disability, usage);
        const totalVALoan = homePrice + fundingFeeAmount;
        const vaMonthlyPI = calculateMonthlyPayment(totalVALoan, VA_RATE, LOAN_TERM);

        const convLoanAmount = homePrice * 0.95; // 5% Down system tracking
        const convMonthlyPI = calculateMonthlyPayment(convLoanAmount, CONV_RATE, LOAN_TERM);
        const monthlyPMI = Math.round((homePrice * PMI_RATE) / 12);
        const convMonthlyTotal = convMonthlyPI + monthlyPMI;
        
        const monthlySavings = convMonthlyTotal - vaMonthlyPI;
        const estimatedCashNeeded = Math.round(homePrice * city.cashNeededEstimate);

        /* --- UI Render Layer: Advertised HTML Column --- */
        document.getElementById('advertised-content').innerHTML = `
            <div class="stat-row">
                <span class="stat-label">Down Payment</span>
                <span class="stat-value green">$0</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Monthly PMI</span>
                <span class="stat-value green">$0</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">VA Funding Fee</span>
                <span class="stat-value green">${disability === 'yes' ? '$0 (Exempt)' : 'Financeable (rolled into loan)'}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Cash at Closing</span>
                <span class="stat-value green">$0 (seller concessions available)</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Seller Acceptance</span>
                <span class="stat-value green">VA loans welcome everywhere</span>
            </div>
        `;

        /* --- UI Render Layer: Reality HTML Column --- */
        let realityHTML = '';

        // Row 1: Funding Fee Evaluation
        if (disability === 'yes') {
            realityHTML += `
                <div class="stat-row">
                    <span class="stat-label">VA Funding Fee</span>
                    <span class="stat-value green">$0 — Your 10%+ rating waives this entirely</span>
                </div>`;
        } else if (usage === 'first') {
            realityHTML += `
                <div class="stat-row">
                    <span class="stat-label">VA Funding Fee</span>
                    <span class="stat-value red">${formatCurrency(fundingFeeAmount)} (2.15%) added to your loan balance on day one</span>
                </div>`;
        } else {
            realityHTML += `
                <div class="stat-row">
                    <span class="stat-label">VA Funding Fee</span>
                    <span class="stat-value red">${formatCurrency(fundingFeeAmount)} (3.3%) — repeat use penalty, starts as debt immediately</span>
                </div>`;
        }

        // Row 2: Cash at Closing Engine
        let cashColor = 'red';
        let cashText = `~${formatCurrency(estimatedCashNeeded)} estimated in a ${city.marketTier} market`;
        if (estimatedCashNeeded <= 0) {
            cashColor = 'green';
            cashText = "Minimal — seller concessions are realistic here";
        } else if (estimatedCashNeeded <= 5000) {
            cashColor = 'amber';
        }
        realityHTML += `
            <div class="stat-row">
                <span class="stat-label">Cash at Closing</span>
                <span class="stat-value ${cashColor}">${cashText}</span>
            </div>`;

        // Row 3: Absolute Underlying Loan Liability
        realityHTML += `
            <div class="stat-row">
                <span class="stat-label">True Loan Balance</span>
                <span class="stat-value ${fundingFeeAmount > 0 ? 'red' : 'blue'}">${formatCurrency(totalVALoan)}</span>
            </div>`;

        // Row 4: Structural Market Acceptance Metrics
        let acceptanceColor = 'green';
        if (city.marketTier === 'BROKEN' || city.marketTier === 'HYPER-COMPETITIVE') acceptanceColor = 'red';
        else if (city.marketTier === 'COMPETITIVE') acceptanceColor = 'amber';
        realityHTML += `
            <div class="stat-row">
                <span class="stat-label">Seller Acceptance</span>
                <span class="stat-value ${acceptanceColor}">${city.sellerConcessionLikelihood}</span>
            </div>`;

        // Row 5: Local Valuation Contingency Risks
        let gapColor = 'green';
        if (['Moderate-High', 'High', 'Very High'].includes(city.appraisalGapRisk)) gapColor = 'red';
        else if (['Low-Moderate', 'Moderate'].includes(city.appraisalGapRisk)) gapColor = 'amber';
        realityHTML += `
            <div class="stat-row">
                <span class="stat-label">Appraisal Gap Risk</span>
                <span class="stat-value ${gapColor}">${city.appraisalGapRisk}</span>
            </div>`;

        // Row 6: Standard Multi-Amortization Output String
        realityHTML += `
            <div class="stat-row">
                <span class="stat-label">Monthly Payment Comparison</span>
                <span class="stat-value" style="font-weight:normal; font-size:0.8rem;">
                    <div>VA loan: <strong class="blue">${formatCurrency(vaMonthlyPI)}/mo</strong> (no PMI)</div>
                    <div style="margin-top:2px;">Conventional (5% down): <strong>${formatCurrency(convMonthlyTotal)}/mo</strong> (includes ~${formatCurrency(monthlyPMI)}/mo PMI)</div>
                    <div style="margin-top:4px;" class="${monthlySavings > 0 ? 'green' : 'amber'}">
                        ${monthlySavings > 0 
                            ? `You save ~${formatCurrency(monthlySavings)}/month with VA — ${formatCurrency(monthlySavings * 12 * 5)} over 5 years`
                            : `Conventional is ~${formatCurrency(Math.abs(monthlySavings))}/month lower due to fee adjustments`}
                    </div>
                </span>
            </div>`;

        // Structural Warning Containers
        if (status === 'active' && ['BROKEN', 'HYPER-COMPETITIVE'].includes(city.marketTier)) {
            realityHTML += `<div class="warning-row">⏱ <strong>PCS Time Crunch:</strong> ${city.pcsNote}</div>`;
        }
        if (status === 'retired') {
            realityHTML += `<div class="warning-row">📉 <strong>Pension Income Risk:</strong> ${city.retiredNote}</div>`;
        }
        if (disability === 'yes') {
            realityHTML += `<div class="warning-row">🔍 <strong>Exemption ≠ Appraisal Protection:</strong> Your funding fee waiver saves ${formatCurrency(calculateFundingFee(homePrice, 'no', usage))} but doesn't resolve the VA appraisal requirement. In ${city.marketTier} markets, sellers routinely reject VA offers due to appraisal and repair contingencies.</div>`;
        }

        document.getElementById('reality-content').innerHTML = realityHTML;

        /* --- UI Render Layer: Environmental Context Matrix --- */
        const taxItem = document.getElementById('tax-context');
        taxItem.className = "context-item tax";
        let taxHTML = `💰 <strong>Retirement Tax:</strong> ${city.militaryRetirementTax}`;
        if (city.retirementTaxSavings > 0) {
            taxHTML += ` Annual savings vs. fully-taxed state: ~${formatCurrency(city.retirementTaxSavings)}`;
        } else if (city.retirementTaxSavings < 0) {
            taxHTML += ` Estimated state-level financial drag vs average: ~${formatCurrency(Math.abs(city.retirementTaxSavings))}`;
        }
        taxItem.innerHTML = taxHTML;

        const propTaxItem = document.getElementById('propertytax-context');
        propTaxItem.className = "context-item tax";
        propTaxItem.innerHTML = `🏠 <strong>Property Tax Exemption:</strong> ${city.propertyTaxExemption}`;

        const healthItem = document.getElementById('healthcare-context');
        healthItem.className = "context-item healthcare";
        healthItem.innerHTML = `🏥 <strong>VA Healthcare:</strong> Primary care wait ~${city.vaWaitTimePrimary} days. Specialty care wait ~${city.vaWaitTimeSpecialty} days. Overall rating: ${city.vaHealthcareScore}.`;

        const foreclosureItem = document.getElementById('foreclosure-context');
        foreclosureItem.className = "context-item foreclosure";
        foreclosureItem.innerHTML = `⚠ <strong>Local Risk:</strong> ${city.foreclosureRiskNote}`;

        // Unhide Output Grids
        comparisonGrid.hidden = false;
        contextRows.hidden = false;
        isCalculated = true;

        /* --- Dynamic Contextual Cross-Check Rules --- */
        if (city.showCrisisBanner || (usage === 'repeat' && disability === 'no' && ['BROKEN', 'HYPER-COMPETITIVE'].includes(city.marketTier))) {
            crisisBanner.hidden = false;
        } else {
            crisisBanner.hidden = true;
        }

        // Post-calculation layout verification check
        checkLowPriceWarning(homePrice, city);
    }
});
