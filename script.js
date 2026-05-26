/* ==========================================================================
   CONSTANTS & BASIC CONFIGURATION
   ========================================================================== */
const VA_RATE = 6.0;         // Hardcoded 2026 benchmark VA loan interest rate
const CONV_RATE = 6.5;       // Comparative conventional loan interest rate 
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
        sellerConcessionLikelihood: "Extremely Rare. Seattle homes get multiple offers almost immediately, and sellers have no reason to help cover your costs or negotiate on price.",
        cashNeededEstimate: 0.05,
        militaryRetirementTax: "Washington State has no income tax, so your military retirement pay is completely untaxed.",
        retirementTaxSavings: 2800,
        vaWaitTimePrimary: 24,
        vaWaitTimeSpecialty: 52,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Foreclosure rates stay low across King County because home values have risen steadily, giving most owners a comfortable equity cushion.",
        pcsNote: "Military move windows often overlap with peak corporate hiring season, flooding the market with competing buyers right when you need to close.",
        retiredNote: "Even without state income taxes, Seattle's high cost of living can put real pressure on a fixed military retirement check.",
        appraisalGapRisk: "High",
        propertyTaxExemption: "Property tax relief is limited and only available to disabled veterans who also meet strict low-income requirements.",
        showCrisisBanner: false
    },
    "los-angeles": {
        name: "Los Angeles, CA",
        state: "CA",
        marketTier: "BROKEN",
        medianPrice: 900000,
        sellerConcessionLikelihood: "Non-Existent. Most LA sellers won't consider a VA offer because they strongly prefer cash buyers or conventional loans that skip the VA appraisal process entirely.",
        cashNeededEstimate: 0.06,
        militaryRetirementTax: "California taxes military retirement pay the same as any other income, meaning there are no special exemptions for veterans.",
        retirementTaxSavings: -3400,
        vaWaitTimePrimary: 31,
        vaWaitTimeSpecialty: 68,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "VA mortgage relief programs are running dry in Southern California, and more veterans are falling behind on payments as a result.",
        pcsNote: "Sellers here won't wait for military paperwork or longer closing timelines — they'll move on to the next offer without hesitation.",
        retiredNote: "High state taxes combined with some of the most expensive real estate in the country make Los Angeles a very hard place to live on a fixed military pension.",
        appraisalGapRisk: "Very High",
        propertyTaxExemption: "There is a basic property tax break for disabled veterans, but the savings are small compared to LA's extremely high home values.",
        showCrisisBanner: true
    },
    "san-diego": {
        name: "San Diego, CA",
        state: "CA",
        marketTier: "BROKEN",
        medianPrice: 875000,
        sellerConcessionLikelihood: "Almost Non-Existent. With so many military families competing for the same homes, VA offers consistently lose out to faster, simpler bids.",
        cashNeededEstimate: 0.06,
        militaryRetirementTax: "California taxes military retirement pay as regular income — there is no state-level break for veterans.",
        retirementTaxSavings: -3200,
        vaWaitTimePrimary: 28,
        vaWaitTimeSpecialty: 59,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "San Diego has some of the highest rates of veterans behind on their mortgage payments anywhere in the country.",
        pcsNote: "With so many bases nearby, every rotation season floods the market with buyers — and cash offers beat standard military timelines every time.",
        retiredNote: "High home prices plus full state taxation on retirement income makes it very hard to stretch a fixed pension in San Diego.",
        appraisalGapRisk: "Very High",
        propertyTaxExemption: "State veteran exemptions provide very little actual financial relief given how high San Diego home prices are.",
        showCrisisBanner: true
    },
    "denver": {
        name: "Denver, CO",
        state: "CO",
        marketTier: "COMPETITIVE",
        medianPrice: 580000,
        sellerConcessionLikelihood: "Rare. You might find some flexibility on homes that have been sitting on the market for more than six weeks, but don't count on it.",
        militaryRetirementTax: "Colorado lets some veterans deduct a portion of their military retirement pay from state taxes, depending on your age.",
        retirementTaxSavings: 1400,
        vaWaitTimePrimary: 19,
        vaWaitTimeSpecialty: 41,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Mortgage delinquency rates are stable overall but are slowly rising in some outer suburban areas.",
        pcsNote: "Spring PCS season tightens Denver's housing supply fast, putting buyers under pressure to make quick decisions.",
        retiredNote: "The state tax deduction takes some sting out of Denver's rising home prices, but values have climbed significantly in recent years.",
        appraisalGapRisk: "Moderate-High",
        propertyTaxExemption: "Veterans rated 100% disabled can exempt the first $200,000 of their home's value from property taxes.",
        showCrisisBanner: false
    },
    "okc": {
        name: "Oklahoma City, OK",
        state: "OK",
        marketTier: "BUYER-FRIENDLY",
        medianPrice: 240000,
        sellerConcessionLikelihood: "Common. Sellers here regularly offer to cover closing costs and often agree to make repairs before closing at no extra charge.",
        cashNeededEstimate: 0.00,
        militaryRetirementTax: "Oklahoma does not tax military retirement pay at all — every dollar goes straight to you.",
        retirementTaxSavings: 1900,
        vaWaitTimePrimary: 12,
        vaWaitTimeSpecialty: 26,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "Low home prices keep monthly payments affordable, which is the main reason foreclosure rates stay very low across the area.",
        pcsNote: "The market moves at a manageable pace, so standard military move timelines work without much friction.",
        retiredNote: "Oklahoma City offers some of the best overall financial value in the country for veterans living on a military pension.",
        appraisalGapRisk: "Very Low",
        propertyTaxExemption: "Veterans rated 100% permanently disabled pay absolutely no property taxes in Oklahoma.",
        showCrisisBanner: false
    },
    "austin": {
        name: "Austin, TX",
        state: "TX",
        marketTier: "MODERATE",
        medianPrice: 460000,
        sellerConcessionLikelihood: "Possible. Newer developments and older homes that have been listed for a while may be open to negotiating on price or covering some closing costs.",
        cashNeededEstimate: 0.02,
        militaryRetirementTax: "Texas has no state income tax, so your entire military retirement check is yours to keep.",
        retirementTaxSavings: 2200,
        vaWaitTimePrimary: 18,
        vaWaitTimeSpecialty: 38,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "Austin has more new housing supply than most Texas cities, which helps soften the impact of rising mortgage delinquencies elsewhere.",
        pcsNote: "Austin's tech-driven market can shift quickly, but military move timelines are generally workable here.",
        retiredNote: "No state income tax is a real advantage, but Texas property taxes are among the highest in the country — plan for that.",
        appraisalGapRisk: "Low-Moderate",
        propertyTaxExemption: "Veterans rated 100% disabled pay no property taxes. Lower disability ratings still qualify for a partial reduction based on the percentage.",
        showCrisisBanner: false
    },
    "san-antonio": {
        name: "San Antonio, TX",
        state: "TX",
        marketTier: "BUYER-FRIENDLY",
        medianPrice: 290000,
        sellerConcessionLikelihood: "Highly Likely. San Antonio sellers routinely offer to cover closing costs, fix issues before closing, and throw in other incentives to get the deal done.",
        cashNeededEstimate: 0.01,
        militaryRetirementTax: "Texas has no state income tax, so your military retirement pay is completely tax-free at the state level.",
        retirementTaxSavings: 2000,
        vaWaitTimePrimary: 14,
        vaWaitTimeSpecialty: 32,
        vaHealthcareScore: "Good",
        foreclosureRiskNote: "With a large military population and a steady local economy, mortgage defaults stay low and spread out across a wide base.",
        pcsNote: "San Antonio's economy is built around its military installations, and local real estate professionals are experienced at working around military timelines.",
        retiredNote: "San Antonio is one of the best places in the country to retire on a military pension — low costs, no income tax, and a community that understands military life.",
        appraisalGapRisk: "Low",
        propertyTaxExemption: "Veterans rated 100% disabled are completely exempt from property taxes.",
        showCrisisBanner: false
    },
    "detroit": {
        name: "Detroit, MI",
        state: "MI",
        marketTier: "MODERATE",
        medianPrice: 230000,
        sellerConcessionLikelihood: "Likely. Sellers in Detroit are generally open to covering closing costs and willing to negotiate on repairs or needed updates.",
        militaryRetirementTax: "Michigan does not tax military retirement pay — it is fully exempt from state income taxes.",
        cashNeededEstimate: 0.01,
        retirementTaxSavings: 1600,
        vaWaitTimePrimary: 15,
        vaWaitTimeSpecialty: 35,
        vaHealthcareScore: "Poor",
        foreclosureRiskNote: "Detroit's economic history has left mortgage delinquency rates slightly above the national average, though the market has been slowly improving.",
        pcsNote: "The local market moves slowly, which actually works in your favor — less competition and less pressure to rush into a decision.",
        retiredNote: "Tax-free retirement income is a solid benefit here, though some parts of the city still deal with uneven infrastructure and city services.",
        appraisalGapRisk: "Low",
        propertyTaxExemption: "Veterans rated 100% disabled are exempt from property taxes on their primary home.",
        showCrisisBanner: false
    },
    "dc": {
        name: "Washington, DC",
        state: "DC",
        marketTier: "HYPER-COMPETITIVE",
        medianPrice: 650000,
        sellerConcessionLikelihood: "Extremely Rare. DC homes move fast and sellers expect clean, simple offers, while VA loan requirements slow things down in a market that won't wait.",
        cashNeededEstimate: 0.04,
        militaryRetirementTax: "Washington DC taxes military retirement pay as regular income, offering only a small standard deduction.",
        retirementTaxSavings: -1100,
        vaWaitTimePrimary: 22,
        vaWaitTimeSpecialty: 49,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "DC's extremely high cost of living puts steady financial pressure on lower-ranking service members and veterans on fixed incomes.",
        pcsNote: "Government rotation schedules create intense waves of competing buyers each spring, making it very hard to buy on a standard military timeline.",
        retiredNote: "Between high taxes and one of the most expensive housing markets in the country, DC is a difficult fit for anyone on a fixed military pension.",
        appraisalGapRisk: "High",
        propertyTaxExemption: "Veterans without a total disability rating receive no meaningful property tax relief in Washington DC.",
        showCrisisBanner: true
    },
    "jacksonville": {
        name: "Jacksonville, FL",
        state: "FL",
        marketTier: "COMPETITIVE",
        medianPrice: 380000,
        sellerConcessionLikelihood: "Occasional. Homes listed for more than a month may come with some help toward closing costs, but it's not the norm.",
        cashNeededEstimate: 0.03,
        militaryRetirementTax: "Florida has no state income tax, so military retirement pay arrives completely untaxed at the state level.",
        retirementTaxSavings: 2100,
        vaWaitTimePrimary: 17,
        vaWaitTimeSpecialty: 39,
        vaHealthcareScore: "Moderate",
        foreclosureRiskNote: "Some Jacksonville neighborhoods are seeing rising default rates, partly driven by rapidly increasing homeowner insurance premiums.",
        pcsNote: "Deployment and rotation cycles create short bursts of high demand, which can make the buying window feel rushed and options thin.",
        retiredNote: "Florida's zero income tax is a big draw, but skyrocketing property insurance costs are quickly eating into that advantage.",
        appraisalGapRisk: "Moderate",
        propertyTaxExemption: "Veterans rated 100% disabled pay no property taxes. Combat-disabled veterans over 65 qualify for additional discounts.",
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
function calculateFundingFee(homePrice, disability, usage, downPayment) {
    if (disability === "yes") return 0;
    
    let rate = 0;
    if (downPayment >= 10) {
        rate = 0.0125; // 1.25% for 10%+ down
    } else if (downPayment >= 5) {
        rate = 0.0150; // 1.50% for 5%+ down
    } else {
        rate = usage === "first" ? 0.0215 : 0.033;
    }
    
    return Math.round(homePrice * rate);
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
        document.querySelector('input[name="status"][value="retired"]').checked = true;
        document.querySelector('input[name="disability"][value="no"]').checked = true;
        document.querySelector('input[name="usage"][value="first"]').checked = true;
        document.querySelector('input[name="downpayment"][value="0"]').checked = true;
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

    document.querySelectorAll('input[name="status"], input[name="disability"], input[name="usage"], input[name="downpayment"]').forEach(input => {
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
        const downPaymentPercent = parseInt(document.querySelector('input[name="downpayment"]:checked').value);

        // Mathematical Evaluation Block
        const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
        const loanAmountBeforeFee = homePrice - downPaymentAmount;
        const fundingFeeAmount = calculateFundingFee(homePrice, disability, usage, downPaymentPercent);
        const totalVALoan = loanAmountBeforeFee + fundingFeeAmount;
        const vaMonthlyPI = calculateMonthlyPayment(totalVALoan, VA_RATE, LOAN_TERM);

        const convLoanAmount = homePrice * 0.95; // 5% Down system tracking
        const convMonthlyPI = calculateMonthlyPayment(convLoanAmount, CONV_RATE, LOAN_TERM);
        const monthlyPMI = Math.round((homePrice * PMI_RATE) / 12);
        const convMonthlyTotal = convMonthlyPI + monthlyPMI;
        
        const monthlySavings = convMonthlyTotal - vaMonthlyPI;
        const estimatedCashNeeded = Math.round(homePrice * city.cashNeededEstimate) + downPaymentAmount;

        /* --- UI Render Layer: Advertised HTML Column --- */
        document.getElementById('advertised-content').innerHTML = `
            <div class="stat-row">
                <span class="stat-label">Down Payment</span>
                <span class="stat-value ${downPaymentPercent > 0 ? 'blue' : 'green'}">${formatCurrency(downPaymentAmount)} (${downPaymentPercent}%)</span>
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
                <span class="stat-value green">${formatCurrency(downPaymentAmount)} (plus seller concessions)</span>
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
        } else {
            let feeRateText = "";
            if (downPaymentPercent >= 10) feeRateText = "1.25%";
            else if (downPaymentPercent >= 5) feeRateText = "1.50%";
            else feeRateText = usage === "first" ? "2.15%" : "3.3%";

            realityHTML += `
                <div class="stat-row">
                    <span class="stat-label">VA Funding Fee</span>
                    <span class="stat-value red">${formatCurrency(fundingFeeAmount)} (${feeRateText}) added to your loan balance on day one</span>
                </div>`;
        }

        // Row 2: Cash at Closing Engine
        let cashColor = 'red';
        let cashText = `~${formatCurrency(estimatedCashNeeded)} estimated in a ${city.marketTier} market`;
        if (estimatedCashNeeded <= 0) {
            cashColor = 'green';
            cashText = "Minimal — seller concessions are realistic here";
        } else if (estimatedCashNeeded <= (5000 + downPaymentAmount)) {
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
            realityHTML += `<div class="warning-row">🔍 <strong>Exemption ≠ Appraisal Protection:</strong> Your funding fee waiver saves ${formatCurrency(calculateFundingFee(homePrice, 'no', usage, downPaymentPercent))} but doesn't resolve the VA appraisal requirement. In ${city.marketTier} markets, sellers routinely reject VA offers due to appraisal and repair contingencies.</div>`;
        }

        document.getElementById('reality-content').innerHTML = realityHTML;

        /* --- UI Render Layer: Environmental Context Matrix --- */
        const taxItem = document.getElementById('tax-context');
        taxItem.className = "context-item tax";
        let taxHTML = `<strong>Retirement Tax:</strong> ${city.militaryRetirementTax}`;
        if (city.retirementTaxSavings > 0) {
            taxHTML += ` Annual savings vs. fully-taxed state: ~${formatCurrency(city.retirementTaxSavings)}`;
        } else if (city.retirementTaxSavings < 0) {
            taxHTML += ` Estimated state-level financial drag vs average: ~${formatCurrency(Math.abs(city.retirementTaxSavings))}`;
        }
        taxItem.innerHTML = taxHTML;

        const propTaxItem = document.getElementById('propertytax-context');
        propTaxItem.className = "context-item tax";
        propTaxItem.innerHTML = `<strong>Property Tax Exemption:</strong> ${city.propertyTaxExemption}`;

        const healthItem = document.getElementById('healthcare-context');
        healthItem.className = "context-item healthcare";
        healthItem.innerHTML = `<strong>VA Healthcare:</strong> Primary care wait ~${city.vaWaitTimePrimary} days. Specialty care wait ~${city.vaWaitTimeSpecialty} days. Overall rating: ${city.vaHealthcareScore}.`;

        const foreclosureItem = document.getElementById('foreclosure-context');
        foreclosureItem.className = "context-item foreclosure";
        foreclosureItem.innerHTML = `<strong>Local Risk:</strong> ${city.foreclosureRiskNote}`;

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
