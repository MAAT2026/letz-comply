// Luxembourg fund regulation data

export const ENTITY_TYPES = [
  { id: "aifm", label: "Authorised AIFM", description: "Fully authorised Alternative Investment Fund Manager under AIFMD, managing AIFs above the AIFMD thresholds (€100M leveraged / €500M unleveraged)", icon: "🏦" },
  { id: "reg-aifm", label: "Registered AIFM", description: "Sub-threshold manager under the simplified regime (below AIFMD thresholds), registered with the CSSF but not fully authorised", icon: "📉" },
  { id: "manco", label: "UCITS Management Company (Chapter 15)", description: "Management company authorised under Chapter 15 of the 2010 Law to manage UCITS funds. Subject to CSSF 18/698 and the UCITS Directive", icon: "🏢" },
  { id: "ch16-manco", label: "Management Company (Chapter 16)", description: "Non-UCITS management company authorised under Chapter 16 of the 2010 Law for managing AIFs (non-UCITS funds) including SIFs, RAIFs, and Part II UCIs", icon: "🏢" },
  { id: "super-manco", label: "Super ManCo", description: "Dual-licensed management company authorised under both Chapter 15 (UCITS) and AIFMD, managing both UCITS and AIFs within a single regulated entity", icon: "🏦🏢" },
  { id: "internal-aif", label: "Internally Managed AIF", description: "Self-managed SICAV (SIAG/FIAAG) acting as its own AIFM, with no separately appointed management company. Requires minimum capital of €300,000", icon: "🔄" },
  { id: "law-firm", label: "Law Firm", description: "Legal practice advising fund clients on structuring, regulatory compliance, and documentation", icon: "⚖️" },
  { id: "reg-service", label: "Regulatory Services", description: "Compliance, regulatory consulting, or advisory firm supporting fund managers with CSSF obligations", icon: "📋" },
  { id: "fund-promoter", label: "Fund Promoter / Initiator", description: "Asset manager or sponsor launching funds in Luxembourg. Note: 'Initiator' is the specific term used for SIF structures under the 2007 Law", icon: "🚀" },
  { id: "depositary", label: "Depositary Bank", description: "Depositary or sub-depositary institution responsible for safekeeping fund assets and oversight under UCITS/AIFMD", icon: "🏛️" },
  { id: "other", label: "Other", description: "Another type of firm in the Luxembourg fund ecosystem", icon: "🔷" },
];

export const JOB_TITLES = [
  "Analyst / Associate",
  "Senior Analyst / Senior Associate",
  "Manager",
  "Senior Manager / AVP",
  "Vice President / Director",
  "Managing Director / Partner",
  "C-Level (CFO, COO, CRO, CCO…)",
  "Conducting Officer",
  "Other",
];

export const FUNCTIONS = [
  { id: "accounting", label: "Accounting", icon: "📒", color: "purple" },
  { id: "aml", label: "AML / Financial Crime", icon: "🛡️", color: "rose" },
  { id: "compliance", label: "Compliance", icon: "✅", color: "emerald" },
  { id: "fund-law", label: "Fund Law / Legal", icon: "⚖️", color: "red" },
  { id: "internal-audit", label: "Internal APage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_DownPage_Downudit", icon: "🔎", color: "slate" },
  { id: "investor-relations", label: "Investor Relations", icon: "🤝", color: "teal" },
  { id: "it", label: "IT / Data (incl. DORA)", icon: "💻", color: "pink" },
  { id: "operations", label: "Operations (incl. DORA)", icon: "⚙️", color: "slate" },
  { id: "oversight", label: "Oversight of Delegates", icon: "🔍", color: "orange" },
  { id: "portfolio-management", label: "Portfolio Management", icon: "📈", color: "indigo" },
  { id: "risk", label: "Risk Management", icon: "⚠️", color: "amber" },
  { id: "tax", label: "Tax", icon: "🧾", color: "yellow" },
  { id: "valuation", label: "Valuation", icon: "📊", color: "blue" },
];

export const SEGMENTS = [
  "UCITS", "AIFMD / AIF", "Private Equity", "Real Estate Funds",
  "Infrastructure Funds", "Debt Funds", "Fund of Funds", "Money Market Funds",
  "ETFs", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)",
  "RAIF", "SIF", "SICAR", "Part II UCI",
];

export const SENIORITY_LEVELS = [
  "Intern / Trainee", "Junior Analyst", "Analyst", "Senior Analyst",
  "Manager", "Senior Manager / VP", "Director / C-level",
  "Conducting Officer / Senior Management",
];

export const REGULATIONS = [
  {
    id: 1,
    title: "CSSF Circular 24/856 – Updated NAV Calculation Requirements",
    source: "CSSF",
    date: "2024-12-15",
    topic: "Valuation",
    relevance: "high",
        applicableTo: ["UCITS", "Part II UCI", "SIF", "RAIF", "SICAR", "Fund of Funds", "Money Market Funds", "ETFs"],
    summary: "New requirements for NAV calculation frequency and error correction procedures for UCITS and AIFs managed in Luxembourg.",
    fullDetail: "The CSSF has issued updated guidance on NAV calculation, requiring daily oversight controls and a maximum tolerance threshold of 0.5% for UCITS. Fund administrators must implement automated reconciliation processes and report material NAV errors within 24 hours.",
    aiSummary: "This circular tightens NAV accuracy standards. Key changes: daily automated checks, 0.5% error threshold, 24h reporting window. Affects all Luxembourg-domiciled UCITS and Part II funds.",
    chain: [
      { level: "EU Directive", text: "UCITS Directive 2009/65/EC – Art. 85" },
      { level: "ESMA Guidelines", text: "ESMA/2023/NAV-GL – NAV Error Framework" },
      { level: "CSSF Circular", text: "Circular 24/856 – NAV Calculation" },
      { level: "Internal Policy", text: "Your Fund's Valuation Policy & Procedures" }
    ],
    concepts: ["NAV", "UCITS", "Tolerance Threshold", "Fund Administrator"],
    forYou: {
      valuation: {
        headline: "Your daily NAV checks just got stricter",
        explanation: "You must now run automated reconciliation before each NAV strike. The 0.5% threshold means even small pricing discrepancies need investigation. Document every override.",
        actions: ["Review current NAV tolerance levels", "Set up automated pre-NAV reconciliation", "Update error escalation procedures"]
      },
      compliance: {
        headline: "New monitoring obligation for NAV accuracy",
        explanation: "You need to verify that the fund administrator's controls meet the new 24-hour error reporting requirement. Add NAV error monitoring to your compliance calendar.",
        actions: ["Update compliance monitoring plan", "Review administrator SLA for NAV reporting"]
      },
      risk: {
        headline: "NAV error risk framework needs updating",
        explanation: "The tighter thresholds mean your risk models should incorporate NAV error scenarios. Consider stress-testing the 0.5% boundary across all fund types.",
        actions: ["Update risk assessment for NAV errors", "Add NAV tolerance monitoring to risk dashboard"]
      },
      accounting: {
        headline: "Reconciliation process changes required",
        explanation: "Daily automated reconciliation is now mandatory before NAV calculation. Ensure your systems can flag discrepancies automatically and maintain audit trails.",
        actions: ["Implement automated daily reconciliation", "Update accounting procedures manual"]
      },
      it: {
        headline: "System automation requirements increased",
        explanation: "You need to ensure NAV calculation systems support automated reconciliation and can generate error reports within the 24-hour window. API integrations may need updating.",
        actions: ["Audit current NAV system capabilities", "Plan automated reconciliation integration"]
      },
      "fund-law": {
        headline: "Prospectus disclosures may need updating",
        explanation: "The new error thresholds and reporting timelines should be reflected in fund documentation. Review whether current prospectus language covers the updated requirements.",
        actions: ["Review prospectus valuation sections", "Update standard fund documentation templates"]
      },
      "portfolio-management": {
        headline: "NAV accuracy directly impacts portfolio decisions",
        explanation: "Stricter NAV tolerance thresholds mean pricing errors will surface faster. Ensure your portfolio management system integrates with the automated reconciliation process.",
        actions: ["Verify portfolio system NAV feeds are accurate", "Review pricing sources for illiquid holdings"]
      },
      "oversight": {
        headline: "Fund administrator NAV controls need monitoring",
        explanation: "Your delegate (fund administrator) must meet the 24-hour error reporting requirement. Update your oversight framework to include NAV error KPIs.",
        actions: ["Update administrator oversight checklist for NAV accuracy", "Request evidence of automated reconciliation from delegate"]
      },
      "aml": {
        headline: "NAV integrity is relevant to financial crime controls",
        explanation: "Accurate NAV calculation helps detect unusual subscription/redemption patterns. Ensure AML monitoring systems align with the 24-hour error window.",
        actions: ["Assess NAV error monitoring for financial crime indicators"]
      },
      "operations": {
        headline: "Automated reconciliation requires operational readiness",
        explanation: "Daily automated NAV reconciliation must be fully operational before each NAV strike. Ensure your BCP covers NAV calculation system failures.",
        actions: ["Include NAV systems in BCP testing", "Document manual fallback for NAV reconciliation"]
      },
      "investor-relations": {
        headline: "NAV errors can trigger investor notification obligations",
        explanation: "Material NAV errors above the 0.5% threshold may require investor communication and compensation. Ensure your investor notification procedure is up to date.",
        actions: ["Review investor notification procedure for NAV errors", "Update prospectus error correction disclosures"]
      },
      "tax": {
        headline: "NAV errors can impact subscription tax calculations",
        explanation: "Luxembourg subscription tax is based on NAV. Material corrections may require amended tax filings.",
        actions: ["Assess NAV error correction impact on subscription tax reporting"]
      }
    }
  },
  {
    id: 2,
    title: "ESMA Guidelines on Outsourcing to Cloud Service Providers",
    source: "ESMA",
    date: "2024-11-28",
    topic: "IT / Technology",
    relevance: "high",
        applicableTo: ["UCITS", "AIFMD / AIF", "Private Equity", "Real Estate Funds", "Infrastructure Funds", "Debt Funds", "Fund of Funds", "Money Market Funds", "ETFs", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)", "RAIF", "SIF", "SICAR", "Part II UCI"],
    summary: "Updated guidelines requiring enhanced due diligence and risk assessment for cloud outsourcing arrangements by regulated fund entities.",
    fullDetail: "ESMA mandates that fund managers conduct comprehensive risk assessments before entering cloud arrangements, including data sovereignty analysis, exit strategy planning, and ongoing monitoring of service providers. Annual reviews and board-level reporting are required.",
    aiSummary: "Cloud outsourcing just got more regulated. You need documented risk assessments, exit strategies, and annual board reports for every cloud arrangement. Applies to all ESMA-regulated entities.",
    chain: [
      { level: "EU Framework", text: "DORA – Digital Operational Resilience Act" },
      { level: "ESMA Guidelines", text: "ESMA/2024/CLD – Cloud Outsourcing" },
      { level: "CSSF Adoption", text: "CSSF expects compliance by Q2 2025" },
      { level: "Internal Policy", text: "Your IT Outsourcing & Vendor Policy" }
    ],
    concepts: ["Cloud Outsourcing", "DORA", "Data Sovereignty", "Exit Strategy"],
    forYou: {
      valuation: {
        headline: "Cloud-based pricing tools under scrutiny",
        explanation: "If your valuation models or pricing feeds run on cloud infrastructure, each provider needs a documented risk assessment and exit plan.",
        actions: ["List all cloud-based valuation tools", "Document risk assessments for each provider"]
      },
      compliance: {
        headline: "New oversight duties for cloud arrangements",
        explanation: "You must maintain a register of all cloud outsourcing, ensure risk assessments are current, and report annually to the board on cloud concentration risk.",
        actions: ["Create cloud outsourcing register", "Schedule annual board reporting", "Review existing cloud contracts"]
      },
      risk: {
        headline: "Cloud concentration risk enters your framework",
        explanation: "Assess whether multiple critical functions depend on the same cloud provider. ESMA wants to see documented concentration risk analysis and mitigation.",
        actions: ["Map cloud dependencies across functions", "Assess concentration risk", "Develop cloud exit scenarios"]
      },
      accounting: {
        headline: "Accounting system hosting matters now",
        explanation: "If your fund accounting platform is cloud-hosted, it falls under these guidelines. Ensure the provider meets data sovereignty requirements.",
        actions: ["Verify accounting platform hosting arrangements", "Check data residency compliance"]
      },
      it: {
        headline: "Major compliance burden for IT teams",
        explanation: "You're the primary responsible party for implementing these guidelines. Every cloud service needs risk assessment, exit planning, and ongoing monitoring documentation.",
        actions: ["Inventory all cloud services", "Implement monitoring framework", "Create exit strategy templates", "Plan annual review process"]
      },
      "fund-law": {
        headline: "Outsourcing agreements need legal review",
        explanation: "Cloud contracts must include specific clauses on data access, audit rights, and termination. Review all existing agreements against ESMA requirements.",
        actions: ["Review cloud contract templates", "Add mandatory ESMA clauses to standard agreements"]
      }
    }
  },
  {
    id: 3,
    title: "CSSF FAQ – AIFMD II Implementation Timeline",
    source: "CSSF",
    date: "2025-01-10",
    topic: "Fund Law",
    relevance: "high",
        applicableTo: ["AIFMD / AIF", "Private Equity", "Real Estate Funds", "Infrastructure Funds", "Debt Funds", "Fund of Funds", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)", "RAIF", "SIF", "SICAR"],
    summary: "CSSF publishes FAQ clarifying the Luxembourg implementation timeline for AIFMD II, including transitional provisions for existing AIFMs.",
    fullDetail: "The CSSF confirms that Luxembourg will transpose AIFMD II by April 2026. Existing AIFMs have a 12-month transitional period. Key changes include new liquidity management tool requirements, enhanced leverage reporting, and updated delegation rules.",
    aiSummary: "AIFMD II arrives in Luxembourg by April 2026. You get 12 months to transition. Focus areas: liquidity tools, leverage reporting, delegation. Start preparing now.",
    chain: [
      { level: "EU Directive", text: "AIFMD II – Directive 2024/927" },
      { level: "ESMA RTS", text: "Regulatory Technical Standards (pending)" },
      { level: "CSSF FAQ", text: "CSSF AIFMD II Implementation FAQ" },
      { level: "Internal Policy", text: "Your AIF Governance Framework" }
    ],
    concepts: ["AIFMD II", "AIFM", "Liquidity Management Tools", "Leverage Reporting", "Delegation"],
    forYou: {
      valuation: {
        headline: "New valuation disclosure requirements coming",
        explanation: "AIFMD II introduces enhanced valuation transparency for investors. Review how you report valuation methodologies and ensure alignment with new standards.",
        actions: ["Review AIFMD II valuation provisions", "Plan disclosure updates"]
      },
      compliance: {
        headline: "12-month transition window – start planning now",
        explanation: "Map all AIFMD II changes against current compliance framework. Liquidity management tools and delegation rules are the biggest compliance lifts.",
        actions: ["Create AIFMD II gap analysis", "Plan transition timeline", "Brief board on key changes"]
      },
      risk: {
        headline: "Leverage reporting gets a major overhaul",
        explanation: "New standardized leverage calculation and reporting to NCAs. Your risk models need to accommodate the new methodology well before the deadline.",
        actions: ["Study new leverage calculation methodology", "Update risk reporting templates"]
      },
      accounting: {
        headline: "Reporting templates will change",
        explanation: "AIFMD II standardizes several reporting formats. Start familiarizing yourself with the new templates to avoid last-minute scrambles.",
        actions: ["Review new AIFMD II reporting requirements", "Plan system updates for new templates"]
      },
      it: {
        headline: "System changes needed for new reporting",
        explanation: "New leverage reporting formats and liquidity management tool reporting will require system updates. Begin scoping technical requirements.",
        actions: ["Scope system changes for AIFMD II", "Budget for development work"]
      },
      "fund-law": {
        headline: "Major legal framework update ahead",
        explanation: "AIFMD II changes delegation rules, introduces loan origination framework, and mandates liquidity management tools. Every AIF document needs review.",
        actions: ["Analyze all AIFMD II legal changes", "Plan document update project", "Review delegation arrangements"]
      }
    }
  },
  {
    id: 4,
    title: "ALFI Guidance – ESG Fund Naming Conventions",
    source: "ALFI",
    date: "2025-02-05",
    topic: "ESG / Sustainability",
    relevance: "medium",
        applicableTo: ["UCITS", "AIFMD / AIF", "RAIF", "SIF", "Part II UCI", "ETFs", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)"],
    summary: "ALFI publishes practical guidance on applying ESMA's fund naming guidelines for ESG and sustainability-related terms in Luxembourg fund names.",
    fullDetail: "Following ESMA's final guidelines on fund names using ESG terms, ALFI provides Luxembourg-specific interpretation. Funds using terms like 'sustainable', 'green', or 'ESG' must meet minimum 80% sustainable investment thresholds and apply Paris-Aligned Benchmark exclusions.",
    aiSummary: "If your fund name contains ESG terms, it must meet 80% sustainability thresholds. ALFI's guidance helps Luxembourg funds interpret ESMA's naming rules practically.",
    chain: [
      { level: "EU Regulation", text: "SFDR – Regulation 2019/2088" },
      { level: "ESMA Guidelines", text: "ESMA Fund Naming Guidelines 2024" },
      { level: "Industry Guidance", text: "ALFI ESG Naming Guidance" },
      { level: "Internal Policy", text: "Your Fund Naming & Marketing Policy" }
    ],
    concepts: ["SFDR", "ESG", "Fund Naming", "Paris-Aligned Benchmark", "Greenwashing"],
    forYou: {
      valuation: {
        headline: "ESG data quality matters for naming compliance",
        explanation: "Funds claiming ESG in their name must demonstrate 80% sustainable investments – which means your ESG data and scoring must be robust and auditable.",
        actions: ["Review ESG data sources for affected funds", "Verify sustainability scoring methodology"]
      },
      compliance: {
        headline: "Fund naming review required",
        explanation: "Audit all fund names for ESG-related terms. Any fund using 'sustainable', 'green', 'ESG' etc. must now meet quantitative thresholds.",
        actions: ["Audit fund names for ESG terms", "Verify 80% threshold compliance", "Update marketing review process"]
      },
      risk: {
        headline: "Greenwashing risk just got quantifiable",
        explanation: "The 80% threshold creates a clear compliance boundary. Monitor drift risk – if sustainable investments drop below 80%, the fund name becomes non-compliant.",
        actions: ["Add ESG threshold monitoring", "Assess greenwashing risk for named funds"]
      },
      accounting: {
        headline: "Sustainability reporting alignment needed",
        explanation: "Ensure periodic reporting accurately reflects the sustainability percentages that justify the fund's ESG name claim.",
        actions: ["Align periodic reports with naming thresholds", "Verify sustainability calculation methodology"]
      },
      it: {
        headline: "ESG data infrastructure check needed",
        explanation: "Systems must be able to calculate and report on the 80% sustainable investment threshold continuously, not just at reporting dates.",
        actions: ["Assess ESG data pipeline capabilities", "Plan real-time threshold monitoring"]
      },
      "fund-law": {
        headline: "Fund documentation and prospectus review",
        explanation: "Fund names using ESG terms must be supported by prospectus disclosures meeting the new thresholds. Review all affected fund documents.",
        actions: ["Review prospectuses of ESG-named funds", "Update naming policy", "Coordinate with marketing team"]
      }
    }
  },
  {
    id: 5,
    title: "CSSF Circular 18/698 – Authorisation & Organisation of IFMs",
    source: "CSSF",
    date: "2018-08-23",
    topic: "Fund Law",
    relevance: "high",
        applicableTo: ["UCITS", "AIFMD / AIF", "Private Equity", "Real Estate Funds", "Infrastructure Funds", "Debt Funds", "Fund of Funds", "Money Market Funds", "ETFs", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)", "RAIF", "SIF", "SICAR", "Part II UCI"],
    summary: "The cornerstone circular for all Luxembourg investment fund managers (ManCos and AIFMs), covering authorisation conditions, governance, delegation, AML/CFT, and internal control functions.",
    fullDetail: "Circular CSSF 18/698 replaces Circular 12/546 and consolidates all conditions for obtaining and maintaining authorisation as an IFM. It covers minimum own funds (€125,000 for IFMs, €300,000 for SIAGs/FIAAGs), governance requirements (minimum 3 board members, 2 conducting officers), the three-lines-of-defence model, AML/CFT obligations including the mandatory AML/CFT Compliance Officer, delegation framework rules, and the requirement for a Luxembourg central administration (both a decision-making centre and an administrative centre). Every IFM must have at least 3 FTE staff in Luxembourg performing key functions.",
    aiSummary: "This is the foundational regulatory text for every IFM in Luxembourg. Covers governance, own funds, delegation, AML/CFT, and internal controls. If you work at a ManCo or AIFM, this circular governs how your firm must be structured.",
    chain: [
      { level: "EU Directive", text: "UCITS Directive 2009/65/EC & AIFMD 2011/61/EU" },
      { level: "ESMA / Delegated Regulation", text: "Delegated Regulation (EU) 231/2013 (AIFMD)" },
      { level: "CSSF Circular", text: "Circular CSSF 18/698 – IFM Organisation" },
      { level: "Internal Policy", text: "Your IFM's Governance Framework & Compliance Charter" }
    ],
    concepts: ["IFM", "ManCo", "AIFM", "Conducting Officers", "Three Lines of Defence", "AML/CFT", "Delegation", "Central Administration", "Own Funds"],
    forYou: {
      valuation: {
        headline: "Valuation must be functionally independent from portfolio management",
        explanation: "Per CSSF 18/698 §532, the valuation function must be independent from both portfolio management and the remuneration policy. For complex/illiquid strategies, the CSSF recommends separating risk management and valuation entirely. If you perform valuation internally, specific safeguards against conflicts of interest are required.",
        actions: ["Review independence of valuation from portfolio management", "Document safeguards against conflicts of interest in valuation", "Ensure valuation policies cover all managed strategies"]
      },
      compliance: {
        headline: "Compliance Officer must be pre-approved by CSSF and permanently in Luxembourg",
        explanation: "CSSF 18/698 §240 requires every IFM to appoint a Compliance Officer with CSSF pre-approval. The officer must submit a CV, ID copy, declaration of honour, and criminal record extract. They must be permanently located in Luxembourg and produce an annual summary report submitted to the CSSF within 5 months of year-end.",
        actions: ["Verify Compliance Officer's CSSF notification is current", "Prepare annual compliance report (due 5 months after year-end)", "Update compliance charter with all required elements from §230"]
      },
      risk: {
        headline: "Permanent risk management function must be hierarchically independent",
        explanation: "Per §189, the permanent risk management function must be hierarchically and functionally independent from business units. The person responsible for risk management cannot simultaneously be responsible for investment management or internal audit (§200). Annual risk management reports must be submitted to the CSSF within 5 months of year-end.",
        actions: ["Review segregation of duties between risk and portfolio management", "Ensure risk management policy covers all risk types per §204", "Submit annual risk management report to CSSF within 5 months of year-end"]
      },
      accounting: {
        headline: "Accounting function must be accessible in Luxembourg at all times",
        explanation: "Per §149, accounting documents must always be available and/or accessible electronically at the Luxembourg head office. The name of the person responsible for the accounting function must be communicated to the CSSF (§146). If outsourced, the third party must be subject to initial due diligence and ongoing monitoring.",
        actions: ["Confirm accounting documents are accessible in Luxembourg", "Notify CSSF of person responsible for accounting function", "Ensure outsourced accounting is subject to delegation framework per §148"]
      },
      it: {
        headline: "Every IFM must have its own IT infrastructure and a cloud officer if using cloud",
        explanation: "Per §136, the CSSF expects IFMs to have their own computers and documented IT systems. §143 requires designation of a 'cloud officer' responsible for cloud computing services. IT systems must support business continuity with a documented BCP per §141.",
        actions: ["Designate a cloud officer if using cloud infrastructure", "Ensure BCP covers IT system disruptions", "Document IT risk management procedures per §137"]
      },
      "fund-law": {
        headline: "At least 3 FTE staff in Luxembourg and 2 conducting officers are mandatory",
        explanation: "Circular 18/698 §85 requires every IFM to employ at least 3 full-time people in Luxembourg performing key functions, including at least 2 conducting officers (§78). Conducting officers must be permanently located in Luxembourg and have CSSF pre-approval (§79). The management body must have at least 3 members (§59).",
        actions: ["Verify minimum 3 FTE at Luxembourg head office", "Confirm 2 conducting officers are CSSF-approved and Luxembourg-based", "Review management body composition for minimum 3 members"]
      },
      "portfolio-management": {
        headline: "Portfolio management must be kept separate from risk control",
        explanation: "CSSF 18/698 §200 prohibits the head of risk management from simultaneously heading investment management. Investment mandates and guidelines must be clearly documented and enforceable.",
        actions: ["Review segregation between portfolio management and risk function", "Confirm investment guidelines are documented per fund mandate"]
      },
      "oversight": {
        headline: "This circular is the framework for all delegation oversight",
        explanation: "Chapter 6 of CSSF 18/698 governs the entire delegation framework. You must have written agreements, conduct initial due diligence, and perform ongoing monitoring. Monitoring can never be sub-delegated (§451).",
        actions: ["Review delegation register against §418 requirements", "Ensure annual due diligence on all delegates is documented", "Verify CSSF was notified of all current delegations"]
      },
      "aml": {
        headline: "AML/CFT is a mandatory function under CSSF 18/698",
        explanation: "Chapter 8 of the circular requires every IFM to maintain AML/CFT procedures, two designated officers, investor due diligence, and annual reporting to the CSSF. These are non-negotiable obligations.",
        actions: ["Verify two AML/CFT officers are CSSF pre-approved and Luxembourg-based (§313)", "Confirm annual AML/CFT report is submitted within 5 months of year-end", "Review KYC/UBO procedures against §§320-360"]
      },
      "operations": {
        headline: "Central administration and operational substance are core requirements",
        explanation: "CSSF 18/698 §115 requires every IFM to maintain both a decision-making centre and an administrative centre in Luxembourg. Operational continuity must be supported by documented BCPs.",
        actions: ["Confirm both decision-making and administrative functions are genuinely in Luxembourg", "Review BCP documentation covering operational disruptions (§141)"]
      },
      "investor-relations": {
        headline: "Marketing and distribution arrangements must comply with IFM governance",
        explanation: "Distribution agreements must be covered by the delegation framework. Investor complaints must be handled by the IFM's compliance function, not solely by distributors.",
        actions: ["Review distribution agreements against delegation framework requirements", "Confirm investor complaint handling is overseen by compliance"]
      },
      "tax": {
        headline: "Own funds and substance requirements have tax implications",
        explanation: "The minimum own funds, Luxembourg FTE requirements, and central administration rules all interact with Luxembourg's corporate tax and substance-over-form analysis.",
        actions: ["Review Luxembourg tax substance assessment in light of CSSF 18/698 FTE requirements", "Confirm taxe d'abonnement filings are consistent with fund NAV and structure"]
      }
    }
  },
  {
    id: 6,
    title: "CSSF Circular 25/901 – Operational Resilience Framework",
    source: "CSSF",
    date: "2025-03-01",
    topic: "Operations",
    relevance: "high",
        applicableTo: ["UCITS", "AIFMD / AIF", "Private Equity", "Real Estate Funds", "Infrastructure Funds", "Debt Funds", "Fund of Funds", "Money Market Funds", "ETFs", "ELTIF 2.0", "Venture Capital (EuVECA)", "Social Entrepreneurship (EuSEF)", "RAIF", "SIF", "SICAR", "Part II UCI"],
    summary: "New CSSF requirements for operational resilience testing, incident reporting, and business continuity for all regulated fund entities in Luxembourg.",
    fullDetail: "Building on DORA, the CSSF requires all regulated entities to conduct annual resilience testing, maintain incident response playbooks, and report significant ICT incidents within 4 hours. Third-party risk management programs must be formalized.",
    aiSummary: "Annual resilience testing is now mandatory. Report ICT incidents within 4 hours. Formalize your third-party risk management. This is DORA coming to life in Luxembourg.",
    chain: [
      { level: "EU Regulation", text: "DORA – Regulation 2022/2554" },
      { level: "ESMA/EBA", text: "Joint RTS on ICT Risk Management" },
      { level: "CSSF Circular", text: "Circular 25/901 – Operational Resilience" },
      { level: "Internal Policy", text: "Your BCP & Incident Response Plans" }
    ],
    concepts: ["DORA", "ICT Incident", "Business Continuity", "Operational Resilience", "Third-Party Risk"],
    forYou: {
      valuation: {
        headline: "Valuation system resilience testing required",
        explanation: "Your NAV calculation infrastructure must be part of the annual resilience test. Can you calculate NAV if your primary system goes down?",
        actions: ["Include valuation systems in resilience test", "Document backup NAV calculation procedures"]
      },
      compliance: {
        headline: "New incident reporting timeline: 4 hours",
        explanation: "You must have processes to identify, classify, and report ICT incidents to the CSSF within 4 hours. Update your compliance monitoring framework.",
        actions: ["Update incident reporting procedures", "Train staff on 4-hour reporting", "Test incident classification process"]
      },
      risk: {
        headline: "Operational resilience enters the risk register",
        explanation: "Annual resilience testing results feed directly into your risk assessment. Third-party concentration risk is now explicitly required.",
        actions: ["Add operational resilience to risk register", "Plan annual testing program", "Map critical third-party dependencies"]
      },
      accounting: {
        headline: "Accounting system continuity planning",
        explanation: "Your fund accounting systems need documented business continuity procedures. Can you meet reporting deadlines if your primary system is unavailable?",
        actions: ["Document accounting system BCP", "Test backup procedures"]
      },
      it: {
        headline: "You own the resilience testing program",
        explanation: "IT is responsible for conducting annual resilience tests, maintaining incident playbooks, and ensuring 4-hour reporting capability. This is your biggest DORA deliverable.",
        actions: ["Design annual testing program", "Create incident response playbooks", "Implement 4-hour reporting capability", "Formalize third-party risk management"]
      },
      "fund-law": {
        headline: "Contractual updates for third-party providers",
        explanation: "All third-party service agreements need clauses supporting resilience testing, incident notification, and audit rights aligned with DORA requirements.",
        actions: ["Review third-party contracts for DORA compliance", "Update standard contract templates"]
      }
    }
  }
];


// --- RELEVANCE SCORING ENGINE ---
const FUNCTION_TOPIC_SCORES = {
  valuation:   { "Valuation": 20, "Operations": 8,  "IT / Technology": 5,  "Fund Law": 2,  "ESG / Sustainability": 0 },
    compliance:  { "Fund Law": 18,  "ESG / Sustainability": 14, "Operations": 8,  "IT / Technology": 5,  "Valuation": 4 },
      risk:        { "Operations": 18, "Valuation": 12, "IT / Technology": 10, "Fund Law": 5,  "ESG / Sustainability": 4 },
        accounting:  { "Valuation": 15, "Operations": 14, "IT / Technology": 5,  "Fund Law": 3,  "ESG / Sustainability": 2 },
          it:          { "IT / Technology": 20, "Operations": 15, "Valuation": 4,  "Fund Law": 2,  "ESG / Sustainability": 2 },
            "fund-law":  { "Fund Law": 20, "ESG / Sustainability": 10, "Operations": 5,  "IT / Technology": 2,  "Valuation": 2 },
            };
            const RELEVANCE_BASE = { high: 72, medium: 48, low: 28 };
            export function computeRelevanceScore(regulation, userProfile) {
              const base = RELEVANCE_BASE[regulation.relevance] ?? 48;
                const topicBonus = FUNCTION_TOPIC_SCORES[userProfile?.function]?.[regulation.topic] ?? 0;
                  const segmentBonus = userProfile?.segment && regulation.applicableTo?.includes(userProfile.segment) ? 5 : 0;
                    return Math.min(99, base + topicBonus + segmentBonus);
            }
// Each entry: { definition: string, category: string }
// Categories: "regulators", "fund-vehicles", "governance", "aml-esg", "risk-ops", "reporting", "key-regs"
export const GLOSSARY = {
  // ── REGULATORS & BODIES ──────────────────────────────────────────────
  "CSSF": { category: "regulators", definition: "Commission de Surveillance du Secteur Financier – Luxembourg's financial regulator, supervising all regulated fund entities, banks, and investment firms." },
  "ESMA": { category: "regulators", definition: "European Securities and Markets Authority – EU-level supervisory authority that develops technical standards and guidelines for securities markets." },
  "EBA": { category: "regulators", definition: "European Banking Authority – EU body developing prudential standards for banks; co-develops DORA and AML rules with ESMA." },
  "EIOPA": { category: "regulators", definition: "European Insurance and Occupational Pensions Authority – EU supervisor for insurance and pension sectors, part of the European System of Financial Supervision." },
  "ECB": { category: "regulators", definition: "European Central Bank – conducts monetary policy for the eurozone and directly supervises significant credit institutions under the Single Supervisory Mechanism." },
  "ALFI": { category: "regulators", definition: "Association of the Luxembourg Fund Industry – the representative body for the Luxembourg investment fund community, publishes guidance and best practice." },
  "LPEA": { category: "regulators", definition: "Luxembourg Private Equity & Venture Capital Association – industry body representing PE and VC interests in Luxembourg." },
  "FIU": { category: "regulators", definition: "Financial Intelligence Unit (Cellule de Renseignement Financier) – Luxembourg body receiving suspicious transaction reports from financial institutions." },
  "BCL": { category: "regulators", definition: "Banque Centrale du Luxembourg – the Luxembourg central bank; collects statistical data from fund entities for European System of Central Banks reporting." },

  // ── KEY REGULATIONS ──────────────────────────────────────────────────
  "CSSF 18/698": { category: "key-regs", definition: "The cornerstone CSSF circular for all Luxembourg IFMs. Covers authorisation conditions, governance, own funds, the three-lines-of-defence model, AML/CFT, delegation, and substance requirements. Replaced Circular 12/546." },
  "UCITS Directive": { category: "key-regs", definition: "EU Directive 2009/65/EC – the legal framework for UCITS funds. Sets rules on eligible assets, risk spreading, investor protection, and management company requirements." },
  "AIFMD": { category: "key-regs", definition: "Alternative Investment Fund Managers Directive (2011/61/EU) – EU regulation governing managers of alternative investment funds including hedge funds, PE, and real estate funds." },
  "AIFMD II": { category: "key-regs", definition: "Revised AIFMD directive (2024/927) introducing new rules on delegation, liquidity management tools, loan origination, leverage reporting, and third-country provisions. Luxembourg transposition by April 2026." },
  "SFDR": { category: "key-regs", definition: "Sustainable Finance Disclosure Regulation (2019/2088) – requires financial market participants to disclose sustainability information at entity and product level. Classifies funds as Article 6, 8, or 9." },
  "DORA": { category: "key-regs", definition: "Digital Operational Resilience Act (2022/2554) – EU regulation ensuring financial entities can withstand ICT-related disruptions. Requires annual resilience testing, 4-hour major incident reporting, and third-party ICT risk management. Effective January 2025." },
  "EMIR": { category: "key-regs", definition: "European Market Infrastructure Regulation – governs OTC derivatives, requiring central clearing, trade reporting to repositories, and risk mitigation for non-cleared trades." },
  "MiFID II": { category: "key-regs", definition: "Markets in Financial Instruments Directive II – broad EU regulation covering investment services, product governance, best execution, transaction reporting, and investor protection rules." },
  "GDPR": { category: "key-regs", definition: "General Data Protection Regulation – EU data privacy law. Financial entities handling personal data of EU residents must comply, including fund administrators processing investor data." },
  "CSSF 02/77": { category: "key-regs", definition: "CSSF circular establishing the legal framework for the valuation of assets held by UCIs. Sets general principles on pricing sources, fair value methodology, and the role of the board in valuation oversight." },
  "Circular 11/512": { category: "key-regs", definition: "CSSF circular setting out the risk management framework for UCITS management companies, including the required format of the Risk Management Procedure (RMP) submitted annually to the CSSF." },
  "2010 Law": { category: "key-regs", definition: "Luxembourg Law of 17 December 2010 – cornerstone of fund regulation. Part I implements UCITS Directive, Part II covers non-UCITS funds, and it also governs SIFs and RAIFs." },

  // ── FUND VEHICLES ────────────────────────────────────────────────────
  "UCITS": { category: "fund-vehicles", definition: "Undertakings for Collective Investment in Transferable Securities – EU-regulated open-ended funds that can be sold across all EU member states with a single authorization. Subject to strict rules on diversification and liquidity." },
  "AIF": { category: "fund-vehicles", definition: "Alternative Investment Fund – any collective investment fund not authorized as a UCITS. Includes hedge funds, PE funds, real estate funds, and infrastructure funds. Managed by an authorized AIFM." },
  "RAIF": { category: "fund-vehicles", definition: "Reserved Alternative Investment Fund – Luxembourg fund vehicle not subject to direct CSSF approval, but must be managed by an authorized AIFM. Offers fast time-to-market. Limited to well-informed investors." },
  "SIF": { category: "fund-vehicles", definition: "Specialised Investment Fund – Luxembourg regulated fund for well-informed investors, supervised by the CSSF. More flexible than UCITS but requires CSSF product approval." },
  "SICAR": { category: "fund-vehicles", definition: "Société d'Investissement en Capital à Risque – Luxembourg investment vehicle for risk capital. Regulated by the CSSF, only available to well-informed investors." },
  "Part II UCI": { category: "fund-vehicles", definition: "A Luxembourg fund regulated under Part II of the 2010 Law. More flexible than UCITS (broader eligible assets) but no automatic EU passport for retail distribution." },
  "ELTIF": { category: "fund-vehicles", definition: "European Long-Term Investment Fund – EU-regulated fund designed to channel retail and institutional capital into long-term illiquid assets such as infrastructure, SMEs, and real assets. ELTIF 2.0 rules apply from 2024." },
  "EuVECA": { category: "fund-vehicles", definition: "European Venture Capital Fund – an EU-passported label for qualifying venture capital funds, allowing cross-border marketing to professional investors with a lighter regulatory regime than a full AIFM." },
  "EuSEF": { category: "fund-vehicles", definition: "European Social Entrepreneurship Fund – EU-passported fund label for funds investing in social enterprises, available to qualifying venture capital managers without full AIFM authorization." },
  "MMF": { category: "fund-vehicles", definition: "Money Market Fund – a fund investing in short-term, high-quality debt instruments. Subject to specific EU regulations (MMF Regulation 2017/1131) including daily and weekly liquidity requirements and NAV calculation rules." },
  "ETF": { category: "fund-vehicles", definition: "Exchange-Traded Fund – a fund whose units are traded on a stock exchange. Most ETFs are UCITS-structured. Subject to specific ESMA guidelines on index replication, transparency, and liquidity." },
  "FCP": { category: "fund-vehicles", definition: "Fonds Commun de Placement – a Luxembourg contractual fund structure with no legal personality. Managed by a ManCo on behalf of unitholders. One of the two main UCITS legal structures (alongside SICAV)." },
  "SICAV": { category: "fund-vehicles", definition: "Société d'Investissement à Capital Variable – an open-ended investment company with variable capital. The most common Luxembourg fund structure for UCITS, used by leading global asset managers." },

  // ── GOVERNANCE & SUBSTANCE ───────────────────────────────────────────
  "IFM": { category: "governance", definition: "Investment Fund Manager – umbrella term in Luxembourg covering ManCos (UCITS managers), AIFMs (alternative fund managers), SIAGs (self-managed UCITS investment companies), and FIAAGs (self-managed AIFs)." },
  "ManCo": { category: "governance", definition: "Management Company – entity authorized to manage UCITS or AIFs, responsible for portfolio management, risk management, and administration. Must meet CSSF 18/698 requirements including conducting officers and three lines of defence." },
  "AIFM": { category: "governance", definition: "Authorised Alternative Investment Fund Manager – entity licensed by the CSSF to manage AIFs. Subject to AIFMD and CSSF 18/698 requirements on governance, reporting, and substance." },
  "Super ManCo": { category: "governance", definition: "Dual-licensed management company authorized under both UCITS and AIFMD frameworks. Can manage both UCITS and AIFs within a single regulated entity, requiring combined governance structures." },
  "SIAG": { category: "governance", definition: "Société d'Investissement Auto-Gérée – a self-managed UCITS investment company that has not designated a separate management company. Subject to CSSF 18/698 with minimum capital of €300,000." },
  "FIAAG": { category: "governance", definition: "Fond d'Investissement Alternatif Auto-Géré – a self-managed AIF (internally managed AIF). Subject to CSSF 18/698 and must have minimum capital of €300,000." },
  "Conducting Officers": { category: "governance", definition: "Senior management persons who effectively conduct the business of an IFM. Per CSSF 18/698 §78, every IFM must have at least two, permanently located in Luxembourg, pre-approved by the CSSF." },
  "Three Lines of Defence": { category: "governance", definition: "Governance model required by CSSF 18/698: 1st line = business units taking/controlling risks; 2nd line = risk management and compliance functions; 3rd line = internal audit providing independent review." },
  "Central Administration": { category: "governance", definition: "Per CSSF 18/698 §115, every IFM must have a central administration in Luxembourg consisting of both a 'decision-making centre' AND an 'administrative centre'. A registered office alone is not sufficient." },
  "Letter-box Entity": { category: "governance", definition: "An IFM that has delegated so many functions it can no longer be considered as managing in substance. Prohibited by CSSF 18/698 §413-414. Minimum substance requires at least 3 FTE in Luxembourg performing key functions." },
  "Own Funds": { category: "governance", definition: "Minimum capital IFMs must maintain. Per CSSF 18/698 §25-28: IFMs need minimum €125,000 + 0.02% of AUM above €250M (capped at €10M), or one quarter of fixed overheads – whichever is greater." },
  "Delegation": { category: "governance", definition: "The practice of an authorized fund manager outsourcing specific functions (e.g., portfolio management) to third parties. Permitted under CSSF 18/698 Chapter 6 but requires prior CSSF notification and ongoing monitoring of delegates." },
  "Delegation Framework": { category: "governance", definition: "The governance structure governing when and how an IFM can delegate functions. IFMs must conduct initial due diligence and ongoing monitoring on all delegates and notify the CSSF in advance. Monitoring cannot itself be delegated." },
  "Compliance Charter": { category: "governance", definition: "A written document defining the compliance function's objectives, responsibilities, powers, and reporting lines. Required by CSSF 18/698 §229, must be approved by senior management and the board." },
  "Internal Audit Charter": { category: "governance", definition: "A written document defining the internal audit function's scope, authority, and responsibilities. Required by CSSF 18/698 §264, must be approved by the board." },
  "Permanent Compliance Function": { category: "governance", definition: "An ongoing, independent function required by CSSF 18/698 §226 to identify, assess, and manage compliance risks. Must be headed by a CSSF-pre-approved Compliance Officer with direct board access." },
  "Permanent Internal Audit Function": { category: "governance", definition: "An independent review function required by CSSF 18/698 §261 covering all IFM activities. Must follow a multi-year audit plan and produce annual reports submitted to the CSSF." },
  "Permanent Risk Management Function": { category: "governance", definition: "An independent function required by CSSF 18/698 §188 to identify, measure, and manage risks of all UCIs managed. Must be separate from portfolio management and report annually to the CSSF." },
  "Fund Administrator": { category: "governance", definition: "Third-party service provider handling fund accounting, NAV calculation, transfer agency, and regulatory reporting. Subject to the IFM's delegation framework and ongoing monitoring obligations." },
  "Depositary": { category: "governance", definition: "An independent financial institution appointed to safekeep fund assets, oversee cash flows, and verify that the fund is managed in accordance with applicable law and fund rules. Mandatory for all UCITS and AIFs." },
  "Transfer Agent": { category: "governance", definition: "The entity responsible for processing investor subscriptions and redemptions, maintaining the shareholder register, and calculating investor entitlements. Often delegated to a specialized third party." },
  "Sub-fund": { category: "governance", definition: "A compartment within an umbrella fund (e.g., SICAV). Each sub-fund has separate investment objectives and assets, but they share a single legal entity. Ring-fencing of liabilities between sub-funds is recognized under Luxembourg law." },

  // ── VALUATION & OPERATIONS ───────────────────────────────────────────
  "NAV": { category: "risk-ops", definition: "Net Asset Value – the per-share value of a fund, calculated by dividing total net assets by outstanding shares. Typically calculated daily for UCITS, and with more flexibility for AIFs." },
  "Tolerance Threshold": { category: "risk-ops", definition: "The maximum acceptable deviation in NAV calculation before an error must be reported and corrected. Circular 24/856 sets a 0.5% threshold for UCITS with a 24-hour reporting window." },
  "Fair Value": { category: "risk-ops", definition: "The price at which an asset would change hands between knowledgeable, willing parties in an arm's-length transaction. Used when market prices are unavailable or stale, particularly for illiquid assets." },
  "Side Pocket": { category: "risk-ops", definition: "A mechanism to segregate illiquid or hard-to-value assets from the main fund portfolio. Allows the liquid portion of the fund to continue operating normally while the illiquid assets are managed separately." },
  "Swing Pricing": { category: "risk-ops", definition: "A liquidity management tool where the fund's NAV is adjusted to pass transaction costs (e.g., market impact) to subscribing or redeeming investors, protecting existing investors from dilution." },
  "Redemption Gate": { category: "risk-ops", definition: "A liquidity management tool allowing a fund to limit or defer redemptions during periods of market stress. Mandatory under AIFMD II for open-ended AIFs that do not use other LMTs." },
  "Liquidity Management Tools": { category: "risk-ops", definition: "Mechanisms like swing pricing, redemption gates, notice periods, and side pockets used to manage liquidity risk in funds. AIFMD II requires open-ended AIFs to have at least one LMT available." },
  "Business Continuity": { category: "risk-ops", definition: "The capability to continue critical operations during and after a significant disruption or disaster. IFMs must maintain documented BCPs covering IT, operations, and key personnel." },
  "ICT Incident": { category: "risk-ops", definition: "Any event that disrupts information and communication technology systems, potentially affecting business operations. DORA requires major ICT incidents to be reported to the CSSF within 4 hours." },
  "Operational Resilience": { category: "risk-ops", definition: "An organization's ability to prevent, detect, respond to, and recover from operational disruptions. Annual resilience testing is mandatory under DORA and CSSF Circular 25/901." },
  "Third-Party Risk": { category: "risk-ops", definition: "Risk arising from reliance on external service providers for critical business functions. Must be formally assessed and managed under DORA and CSSF 18/698's delegation framework." },
  "Cloud Outsourcing": { category: "risk-ops", definition: "The use of cloud computing services for business operations. ESMA guidelines and CSSF 18/698 §143 require designated cloud officers, data sovereignty assessment, exit strategies, and ongoing monitoring." },
  "Data Sovereignty": { category: "risk-ops", definition: "The concept that data is subject to the laws of the country where it is stored or processed. Particularly relevant when using cloud providers whose servers are located outside the EEA." },
  "Exit Strategy": { category: "risk-ops", definition: "A documented plan for migrating away from a cloud or other service provider, including data retrieval, transition to an alternative, and ensuring continuity of service." },
  "Counterparty Risk": { category: "risk-ops", definition: "The risk that the other party to a financial contract (e.g., a swap counterparty or prime broker) defaults on its obligations. Must be monitored and managed per UCITS rules (5% UCITS limit per OTC counterparty)." },
  "Market Risk": { category: "risk-ops", definition: "The risk of losses due to adverse movements in market prices, interest rates, or currency exchange rates. A core risk category in the IFM's Risk Management Procedure." },
  "Liquidity Risk": { category: "risk-ops", definition: "The risk that a fund cannot meet redemption requests without significant market impact or at a significant loss. Management of liquidity risk is a key obligation under both UCITS and AIFMD frameworks." },
  "Credit Risk": { category: "risk-ops", definition: "The risk of financial loss due to a borrower or issuer failing to meet its obligations. Managed through investment restrictions (e.g., diversification limits) and credit quality requirements." },
  "Stress Testing": { category: "risk-ops", definition: "Simulation of adverse market scenarios to assess the resilience of a fund's portfolio and liquidity profile. Required under UCITS and AIFMD frameworks, including reverse stress testing for some fund types." },

  // ── AML / ESG / ETHICS ───────────────────────────────────────────────
  "AML/CFT": { category: "aml-esg", definition: "Anti-Money Laundering and Counter-Terrorist Financing. All Luxembourg IFMs must conduct risk assessments, customer due diligence, and report suspicious transactions to the FIU." },
  "AML/CFT Compliance Officer": { category: "aml-esg", definition: "Per CSSF 18/698 §313, every IFM must designate both a senior management AML/CFT officer and a day-to-day AML/CFT officer. Both must be permanently in Luxembourg and pre-approved by the CSSF." },
  "KYC": { category: "aml-esg", definition: "Know Your Customer – the process of identifying and verifying the identity of clients. A core element of AML/CFT obligations for fund entities, including verifying beneficial ownership." },
  "UBO": { category: "aml-esg", definition: "Ultimate Beneficial Owner – the natural person(s) who ultimately own or control a legal entity or arrangement. Luxembourg law requires IFMs to identify and verify UBOs as part of AML/CFT due diligence." },
  "PEP": { category: "aml-esg", definition: "Politically Exposed Person – an individual who holds or has held a prominent public position. Investing in funds by PEPs requires enhanced due diligence under AML/CFT regulations." },
  "Suspicious Transaction Report": { category: "aml-esg", definition: "A report filed with the FIU when an IFM suspects that a transaction or activity may be linked to money laundering or terrorist financing. Reporting is mandatory and tipping-off is prohibited." },
  "Greenwashing": { category: "aml-esg", definition: "Misleading claims about the environmental or sustainability characteristics of a financial product. ESMA's fund naming guidelines and SFDR aim to reduce greenwashing risk." },
  "ESG": { category: "aml-esg", definition: "Environmental, Social, and Governance – criteria used to assess the sustainability and ethical impact of investments. SFDR, the EU Taxonomy, and fund naming guidelines all regulate how ESG claims are made." },
  "SFDR Article 6": { category: "aml-esg", definition: "A fund that does not integrate sustainability into its investment process and discloses this. No specific sustainability objective or promotion of E/S characteristics." },
  "SFDR Article 8": { category: "aml-esg", definition: "A fund that promotes environmental or social characteristics, among other features. Must make pre-contractual and periodic disclosures showing how E/S characteristics are pursued." },
  "SFDR Article 9": { category: "aml-esg", definition: "A fund with sustainable investment as its objective. Subject to the strictest SFDR disclosures and must demonstrate that all investments contribute to sustainability without significant harm." },
  "EU Taxonomy": { category: "aml-esg", definition: "The EU's classification system for environmentally sustainable economic activities. Funds making taxonomy-related claims must disclose the proportion of investments aligned with the Taxonomy Regulation." },
  "Paris-Aligned Benchmark": { category: "aml-esg", definition: "An EU benchmark aligned with the Paris Agreement's goal of limiting global warming to 1.5°C. Funds using ESG names must apply Paris-Aligned Benchmark exclusions per ESMA's naming guidelines." },
  "CSRD": { category: "aml-esg", definition: "Corporate Sustainability Reporting Directive – EU directive requiring large companies (including some fund managers) to report on sustainability in a standardized format, using European Sustainability Reporting Standards (ESRS)." },
  "Double Materiality": { category: "aml-esg", definition: "The concept that companies must assess both the financial impact of sustainability issues on their business (financial materiality) AND the impact of their activities on society and the environment (impact materiality). Required under CSRD." },

  // ── REPORTING ────────────────────────────────────────────────────────
  "Annex IV Reporting": { category: "reporting", definition: "AIFMD-required periodic reporting by AIFMs to the CSSF covering fund strategy, leverage, liquidity, risk profile, and investor information. Frequency depends on fund size and type (quarterly for large AIFMs)." },
  "Risk Management Procedure (RMP)": { category: "reporting", definition: "A formal document submitted to the CSSF describing the IFM's risk management policy. Must be updated at least annually and submitted within 5 months of year-end. Format per Circular 11/512 (ManCos) or CSSF 18/698 Annex 1 (AIFMs)." },
  "RTS": { category: "reporting", definition: "Regulatory Technical Standards – binding, detailed technical rules developed by ESAs (ESMA, EBA, EIOPA) to supplement EU regulations. Once adopted by the European Commission, they have the force of EU law." },
  "ITS": { category: "reporting", definition: "Implementing Technical Standards – non-binding technical rules (templates, formats, procedures) developed by ESAs to ensure consistent application of EU regulations across member states." },
  "Leverage Reporting": { category: "reporting", definition: "Periodic reporting to regulators on the level of leverage employed by a fund. AIFMD II introduces a standardized calculation methodology. Large AIFMs report quarterly; smaller AIFMs report annually." },
  "PRIIP KID": { category: "reporting", definition: "Packaged Retail and Insurance-based Investment Products Key Information Document – a standardized 3-page document required for retail investors. Must include risk indicator, costs, and performance scenarios." },
  "KIID": { category: "reporting", definition: "Key Investor Information Document – the predecessor to the PRIIP KID for UCITS funds. Replaced by the PRIIP KID format for most retail UCITS from January 2023." },
  "Prospectus": { category: "reporting", definition: "The main legal document for a fund describing its investment objective, strategy, risks, fees, and terms of subscription/redemption. Must be approved by the CSSF and updated when material changes occur." },
  "CSSF eDesk": { category: "reporting", definition: "The CSSF's online portal for regulatory filings, notifications, and communications. Used for Annex IV submissions, circular replies, and CSSF pre-approval applications for conducting officers." },
  "Annex 1 (AIFMD)": { category: "reporting", definition: "The standardized format for the Risk Management Procedure required for AIFMs under CSSF 18/698. Must cover all risk types managed by the AIFM and be submitted to the CSSF within 5 months after year-end." },
};

export const LEARN_CARDS = [
  {
    id: "valuation",
    icon: "📊",
    title: "Valuation in Luxembourg Funds",
    color: "blue",
    summary: "How NAV calculation works, who's responsible, and what the CSSF expects from valuation oversight.",
    content: "In Luxembourg, the AIFM (or ManCo for UCITS) retains ultimate responsibility for valuation. However, the valuation function itself can be delegated to an external valuation consulting firm — and this is common practice, particularly for complex or illiquid strategies. When an external valuer is appointed, they carry out the actual valuation work, but the AIFM retains ultimate responsibility and must oversee the delegate under the delegation framework (CSSF 18/698 Chapter 6). The fund administrator performing NAV calculations must follow documented procedures for: collecting and verifying pricing data, applying the fund's valuation policy, reconciling with the depositary, and detecting/reporting NAV errors within the tolerance thresholds set by the management company (CSSF Circular 24/856). UCITS require daily NAV calculation with strict tolerance thresholds (0.5% tolerance), while AIFs typically have more flexibility. Key regulations: CSSF Circular 24/856 (NAV error handling), CSSF Circular 22/811 (administrator's role in NAV calculation), CSSF 18/698 §§ 532–538 (valuation independence and delegation), UCITS Directive Art. 85, AIFMD Art. 19."
  },
  {
    id: "compliance",
    icon: "✅",
    title: "Compliance Function in Luxembourg IFMs",
    color: "emerald",
    summary: "The compliance officer's role, the compliance charter, AML/CFT obligations, and what CSSF 18/698 expects.",
    content: "Under CSSF 18/698, every IFM must maintain a permanent, independent compliance function headed by a CSSF-pre-approved Compliance Officer. The function must be governed by a written Compliance Charter (§230) approved by the board, defining its scope, independence, and reporting lines. Key duties: identifying standards the IFM is subject to, assessing compliance risks, monitoring AML/CFT, managing conflicts of interest, and raising staff awareness. The Compliance Officer must produce an annual summary report submitted to the CSSF within 5 months after year-end. The compliance function cannot be performed by the same person as internal audit (§169). The Compliance Officer is also the key CSSF contact for AML/CFT and market abuse matters."
  },
  {
    id: "risk",
    icon: "⚠️",
    title: "Risk Management Framework",
    color: "amber",
    summary: "How the permanent risk management function works under CSSF 18/698 and the three-lines-of-defence model.",
    content: "Under CSSF 18/698 §188, every IFM must establish and maintain a permanent risk management function that is hierarchically and functionally independent from business units. The risk management function must implement the risk management policy, monitor risk limits, report regularly to the board, and conduct stress tests. Key risk categories: market, credit, liquidity, counterparty, and operational risk. The CSSF requires a formal Risk Management Procedure (RMP) submitted annually within 5 months of year-end. The person responsible for risk management cannot simultaneously be responsible for investment management or internal audit (§200). Risk management sits in the second line of defence alongside compliance, with internal audit as the independent third line."
  },
  {
    id: "accounting",
    icon: "📒",
    title: "Fund Accounting & Central Administration",
    color: "purple",
    summary: "Accounting obligations, Luxembourg substance requirements, and what it means to have a real central administration.",
    content: "CSSF 18/698 §115 requires every IFM to have a genuine central administration in Luxembourg – both a decision-making centre AND an administrative centre. Simply having a registered address is not enough. The accounting function (§145) must maintain accurate financial information, support daily NAV calculation, and ensure all accounting documents are always accessible at the Luxembourg head office (§149). The person responsible for accounting must be notified to the CSSF (§146). Fund accounting policies must comply with the accounting rules of the UCI's home Member State. Luxembourg funds file audited annual accounts within strict deadlines (7 months after year-end at the latest)."
  },
  {
    id: "it",
    icon: "💻",
    title: "IT Governance, DORA & Cloud Obligations",
    color: "pink",
    summary: "CSSF 18/698 IT requirements, the cloud officer obligation, business continuity planning, and DORA.",
    content: "CSSF 18/698 §134-143 requires every IFM to have suitable IT infrastructure in Luxembourg. The CSSF expects IFMs to own their IT systems, with documented procedures for identifying and managing IT risks (confidentiality, business continuity, cyber attacks, computer fraud). If using cloud computing, §143 requires designation of a 'cloud officer' – an employee responsible for cloud services and guaranteeing the skills of staff managing cloud resources. A Business Continuity Plan must be in place covering IT disruptions (§141). Third-party IT providers must be subject to the delegation framework – prior CSSF notification and ongoing monitoring. DORA (from Jan 2025) adds annual resilience testing and 4-hour major incident reporting."
  },
  {
    id: "fund-law",
    icon: "⚖️",
    title: "IFM Authorisation & Governance Requirements",
    color: "red",
    summary: "What it takes to be an authorised IFM in Luxembourg: substance, conducting officers, board composition, and own funds.",
    content: "CSSF 18/698 is the cornerstone text for every Luxembourg IFM. To obtain and maintain authorisation, an IFM must: have minimum own funds of €125,000 (€300,000 for SIAGs/FIAAGs), maintain at least 3 FTE staff in Luxembourg performing key functions (§123), appoint at least 2 CSSF-approved conducting officers permanently based in Luxembourg (§78-79), and have a management body of at least 3 members (§59). The board must include a majority of non-executive members. Every IFM must maintain the three internal control functions: compliance, risk management, and internal audit – each with a CSSF-pre-approved responsible person. Delegation is permitted but cannot reduce the IFM to a 'letter-box entity' (§413). The CSSF must be notified in advance of most material changes."
  },
  {
    id: "cssf-reporting",
    icon: "📋",
    title: "CSSF Reporting Obligations",
    color: "indigo",
    summary: "Key periodic reporting obligations for Luxembourg fund managers and administrators to the CSSF.",
    content: "Luxembourg fund managers and administrators must submit regular reports to the CSSF. Key reporting obligations include: (1) Quarterly financial reporting for IFMs (ManCos, AIFMs) under CSSF Circular 15/633 — covering assets under management, revenue, expenses, and own funds, due by the 20th of the month following each quarter-end; (2) UCI statistical reporting (U1.1 form) — quarterly reporting on fund-level data; (3) AIFMD Annex IV reporting — periodic disclosure to the CSSF on leverage, liquidity, and risk profiles of managed AIFs (quarterly for large AIFMs, annually for smaller); (4) Annual internal control reports — compliance report, risk management procedure, internal audit report, and AML/CFT report — all due within 5 months of year-end; (5) SFDR periodic reporting for Art. 8 and Art. 9 funds; (6) Annual self-assessment questionnaire for IFMs — due within 4 months of year-end, submitted via eDesk (CSSF Circular 21/789); (7) AML/CFT Summary Report RC (SRRC) — due within 5 months of closing the annual accounts, submitted via eDesk by the Responsable du Respect (CSSF Circular 24/854). All CSSF submissions must be made electronically via the CSSF's e-file, Sofie, or eDesk platforms (CSSF Circular 19/708). Key regulations: CSSF Circular 15/633, Circular 24/866, Circular 19/708, Circular 21/789, Circular 24/854."
  },
  {
    id: "ifm-governance-audit",
    icon: "🏛",
    title: "IFM Self-Assessment & Annual Audit (Circular 21/789)",
    color: "indigo",
    summary: "The CSSF annual self-assessment questionnaire, management letter, and separate report that every IFM must submit.",
    content: "Under CSSF Circular 21/789 (as amended by 23/839), every Luxembourg IFM — including Chapter 15 and 16 ManCos, authorised AIFMs, registered AIFMs, FIAAGs, and SIAGs — must complete an annual self-assessment questionnaire and submit it to the CSSF via the eDesk portal within 4 months after the end of their financial year. The questionnaire covers governance, substance, organisation, internal controls, and supervision of delegates. The management body and senior management are responsible for its content. AML/CFT matters are excluded (those are covered by Circular 21/788 and 24/854). In addition, every IFM must appoint an approved statutory auditor (réviseur d'entreprises agréé — REA) who submits two additional documents to the CSSF via eDesk within 7 months after year-end: (1) The management letter — documents weaknesses found during the statutory audit (per ISA 260/265) and must include prior-year follow-up and management's remediation plan with timetables. (2) The separate report — the REA verifies the reliability of the IFM's self-assessment questionnaire answers through specific CSSF-defined procedures, presented as closed-ended answers (not an audit opinion). Legal basis: Art. 147(2) of the UCI Law, Art. 50 of the AIFM Law. Key takeaway: the CSSF cross-checks your self-assessment against your auditor's findings every year."
  },
  {
    id: "aml-srrc",
    icon: "🛡️",
    title: "The AML/CFT Summary Report RC (Circular 24/854)",
    color: "rose",
    summary: "Annual AML/CFT reporting obligation for all Luxembourg IFMs and supervised funds — submitted via eDesk within 5 months of year-end.",
    content: "Under CSSF Circular 24/854, all Luxembourg IFMs (including registered AIFMs), Luxembourg branches of foreign IFMs, and Luxembourg investment funds supervised for AML/CFT purposes must submit an annual AML/CFT Summary Report RC ('SRRC') to the CSSF. The SRRC is prepared by the Responsable du Contrôle (RC — the person responsible for AML/CFT controls) and submitted by the Responsable du Respect (RR — the person responsible for AML/CFT compliance at board level) via the CSSF eDesk platform. Deadline: within 5 months after the closing of the annual accounts. The RR can delegate the technical submission to another eDesk user with the 'AML/CFT responsible' role, but the RR retains ultimate responsibility. Exception: Luxembourg investment funds that have designated a Luxembourg management company that submits the report on their behalf are excluded. Effective for financial years ending on or after 31 December 2023. Key regulation: CSSF Circular 24/854, Art. 42(7) of CSSF Regulation 12-02."
  },
  {
    id: "marketing-distribution",
    icon: "🌍",
    title: "Marketing & Distribution of Luxembourg Funds",
    color: "teal",
    summary: "Rules governing marketing communications, EU cross-border distribution, and AIF pre-marketing under AIFMD Art. 30a.",
    content: "Marketing Luxembourg funds — whether domestically or cross-border — is governed by strict rules under the CBDF Regulation (EU) 2019/1156 and CSSF Circular 22/795. All marketing communications must be: identifiable as marketing material (not disguised as editorial or research), fair, clear, and not misleading, consistent with the fund's prospectus and KIID/KID, and must present risks and rewards with equal prominence. Cross-border marketing under the EU passport requires a notification to the CSSF and the host regulator. Pre-marketing of AIFs to professional investors is permitted under AIFMD Art. 30a but must be notified to the CSSF within 2 weeks. Luxembourg UCITS can be marketed to retail investors EU-wide; AIFs can generally only be marketed to professional investors unless the host member state allows otherwise. Key regulations: CBDF Regulation (EU) 2019/1156, CSSF Circular 22/795, AIFMD Art. 30a–32 (as amended by AIFMD II, transposition deadline 16 April 2026)."
  }
];

export const CALENDAR_EVENTS = [
  { date: "2025-03-31", title: "UCITS Annual Report Filing Deadline", type: "deadline", relevance: "high" },
  { date: "2025-04-01", title: "CSSF Circular 25/901 Takes Effect", type: "regulation", relevance: "high" },
  { date: "2025-04-15", title: "Q1 AIFMD Annex IV Reporting", type: "reporting", relevance: "medium" },
  { date: "2025-04-30", title: "ESMA Cloud Outsourcing Compliance Deadline", type: "deadline", relevance: "high" },
  { date: "2025-05-15", title: "ALFI European Asset Management Conference", type: "event", relevance: "low" },
  { date: "2025-05-31", title: "AIF Annual Report Filing Deadline", type: "deadline", relevance: "high" },
  { date: "2025-06-01", title: "SFDR Periodic Reporting Due", type: "reporting", relevance: "medium" },
  { date: "2025-06-15", title: "BCL Monthly Statistical Reporting", type: "reporting", relevance: "low" },
  { date: "2025-06-30", title: "CSSF Annual Fee Payment", type: "deadline", relevance: "medium" },
  { date: "2025-07-15", title: "Q2 AIFMD Annex IV Reporting", type: "reporting", relevance: "medium" },
];

export const ACTIONS_DATA = {
  valuation: [
    { id: 1, text: "Verify valuation function independence from portfolio management (CSSF 18/698 §532)", priority: "high", done: false },
    { id: 2, text: "Review NAV tolerance thresholds against Circular 24/856", priority: "high", done: false },
    { id: 3, text: "Document valuation policies covering all managed strategies and instruments", priority: "medium", done: false },
    { id: 4, text: "Ensure valuation procedures include conflict-of-interest safeguards", priority: "medium", done: false },
    { id: 5, text: "Test automated reconciliation before NAV strike", priority: "high", done: false },
  ],
  compliance: [
    { id: 1, text: "Confirm Compliance Officer's CSSF notification is current (§240)", priority: "high", done: false },
    { id: 2, text: "Prepare annual compliance summary report (due 5 months after year-end, §258)", priority: "high", done: false },
    { id: 3, text: "Review and update the Compliance Charter with all required elements (§230)", priority: "high", done: false },
    { id: 4, text: "Create cloud outsourcing register (ESMA guidelines)", priority: "medium", done: false },
    { id: 5, text: "Audit fund names for ESG naming compliance", priority: "medium", done: false },
    { id: 6, text: "Update incident reporting procedures (4h DORA timeline)", priority: "high", done: false },
  ],
  risk: [
    { id: 1, text: "Confirm risk manager is CSSF-pre-approved and separate from investment management (§197-200)", priority: "high", done: false },
    { id: 2, text: "Submit annual Risk Management Procedure (RMP) to CSSF within 5 months of year-end (§217)", priority: "high", done: false },
    { id: 3, text: "Ensure risk management policy covers all risk types per §204 (market, credit, liquidity, counterparty, operational)", priority: "medium", done: false },
    { id: 4, text: "Add operational resilience to risk register (DORA)", priority: "medium", done: false },
    { id: 5, text: "Study AIFMD II leverage calculation methodology", priority: "medium", done: false },
  ],
  accounting: [
    { id: 1, text: "Confirm accounting documents are always accessible at Luxembourg head office (§149)", priority: "high", done: false },
    { id: 2, text: "Notify CSSF of person responsible for accounting function (§146)", priority: "high", done: false },
    { id: 3, text: "Implement automated daily NAV reconciliation", priority: "high", done: false },
    { id: 4, text: "If accounting is outsourced, confirm delegate is subject to delegation framework (§148)", priority: "medium", done: false },
    { id: 5, text: "Review AIFMD II reporting template changes", priority: "medium", done: false },
  ],
  it: [
    { id: 1, text: "Designate a cloud officer if using cloud infrastructure (CSSF 18/698 §143)", priority: "high", done: false },
    { id: 2, text: "Document IT risk management procedures covering confidentiality, BCP, cyber (§137)", priority: "high", done: false },
    { id: 3, text: "Inventory all cloud services and notify CSSF of cloud providers used", priority: "high", done: false },
    { id: 4, text: "Design annual resilience testing program (DORA)", priority: "high", done: false },
    { id: 5, text: "Create ICT incident response playbooks with 4-hour escalation path", priority: "high", done: false },
    { id: 6, text: "Ensure BCP is documented and regularly tested (§141)", priority: "medium", done: false },
  ],
  "fund-law": [
    { id: 1, text: "Verify minimum 3 FTE at Luxembourg head office performing key functions (§123)", priority: "high", done: false },
    { id: 2, text: "Confirm 2 conducting officers are CSSF-approved and Luxembourg-based (§78-79)", priority: "high", done: false },
    { id: 3, text: "Verify management body has at least 3 members (§59)", priority: "high", done: false },
    { id: 4, text: "Review delegation arrangements – ensure no letter-box entity risk (§413-414)", priority: "medium", done: false },
    { id: 5, text: "Analyze AIFMD II legal changes and prepare fund document update project", priority: "medium", done: false },
    { id: 6, text: "Review third-party contracts for DORA and delegation framework compliance", priority: "medium", done: false },
  ],
  "portfolio-management": [
    { id: 1, text: "Ensure portfolio management is functionally separate from risk management (CSSF 18/698 §200)", priority: "high", done: false },
    { id: 2, text: "Review investment guidelines and mandate boundaries for all managed funds", priority: "high", done: false },
    { id: 3, text: "Verify best execution policy is documented, tested, and disclosed (MiFID II)", priority: "medium", done: false },
    { id: 4, text: "Review AIFMD II leverage calculation methodology for managed AIFs", priority: "medium", done: false },
    { id: 5, text: "Implement liquidity stress testing for managed fund portfolios", priority: "medium", done: false },
  ],
  "oversight": [
    { id: 1, text: "Confirm written delegation agreements are in place for all delegates (CSSF 18/698 §420)", priority: "high", done: false },
    { id: 2, text: "Conduct annual due diligence review of all delegates' capabilities and controls", priority: "high", done: false },
    { id: 3, text: "Ensure monitoring of delegates is performed by the IFM itself (cannot be sub-delegated, §451)", priority: "high", done: false },
    { id: 4, text: "Notify CSSF in advance of any new delegation or material change to existing delegation (§422)", priority: "high", done: false },
    { id: 5, text: "Review AIFMD II delegation substance requirements impact on current arrangements", priority: "medium", done: false },
    { id: 6, text: "Maintain up-to-date register of all delegations and sub-delegations", priority: "medium", done: false },
  ],
  "aml": [
    { id: 1, text: "Confirm AML/CFT Compliance Officer (senior management) is CSSF pre-approved and in Luxembourg (§313)", priority: "high", done: false },
    { id: 2, text: "Confirm day-to-day AML/CFT Officer is CSSF pre-approved and in Luxembourg (§313)", priority: "high", done: false },
    { id: 3, text: "Submit annual AML/CFT report to CSSF within 5 months of year-end", priority: "high", done: false },
    { id: 4, text: "Conduct annual enterprise-wide AML/CFT risk assessment", priority: "high", done: false },
    { id: 5, text: "Review KYC/CDD procedures for all investor types including UBO identification", priority: "medium", done: false },
    { id: 6, text: "Test suspicious transaction detection and STR filing process", priority: "medium", done: false },
  ],
  "operations": [
    { id: 1, text: "Review and test Business Continuity Plan covering all critical operations (CSSF 25/901)", priority: "high", done: false },
    { id: 2, text: "Implement ICT incident classification and 4-hour reporting capability (DORA)", priority: "high", done: false },
    { id: 3, text: "Conduct annual operational resilience testing (DORA)", priority: "high", done: false },
    { id: 4, text: "Map all critical third-party dependencies and assess concentration risk", priority: "medium", done: false },
    { id: 5, text: "Review transfer agent and fund administrator SLAs against regulatory requirements", priority: "medium", done: false },
  ],
  "investor-relations": [
    { id: 1, text: "Ensure PRIIP KID / KIID is up to date and reviewed annually for all funds", priority: "high", done: false },
    { id: 2, text: "Review fund prospectuses for AIFMD II and SFDR disclosure updates", priority: "high", done: false },
    { id: 3, text: "Verify SFDR pre-contractual disclosures (Art. 8 / Art. 9) are accurate and complete", priority: "high", done: false },
    { id: 4, text: "Audit fund names for ESMA ESG naming compliance (80% threshold)", priority: "medium", done: false },
    { id: 5, text: "Ensure investor complaint handling procedure is documented and communicated", priority: "medium", done: false },
  ],
  "tax": [
    { id: 1, text: "Review fund tax status and treaty eligibility for all managed vehicles", priority: "high", done: false },
    { id: 2, text: "Ensure Luxembourg subscription tax (taxe d'abonnement) reporting is accurate and filed on time", priority: "high", done: false },
    { id: 3, text: "Review DAC6 and FATCA/CRS reporting obligations and ensure timely compliance", priority: "medium", done: false },
    { id: 4, text: "Assess impact of BEPS Pillar Two (global minimum tax) on fund structures", priority: "medium", done: false },
    { id: 5, text: "Confirm withholding tax reclaim processes are in place for cross-border investments", priority: "medium", done: false },
  ],
};

export const CHAT_KB = {
  "what is cssf": "The CSSF (Commission de Surveillance du Secteur Financier) is Luxembourg's financial regulator. It supervises banks, investment funds, pension funds, and other financial entities. For fund professionals, the CSSF is your primary regulator – they approve fund launches, review documentation, and can conduct on-site inspections.",
  "what is ucits": "UCITS (Undertakings for Collective Investment in Transferable Securities) are EU-regulated open-ended investment funds. They benefit from the EU passport, meaning a UCITS approved in Luxembourg can be sold across all EU member states. They're subject to strict rules on diversification, liquidity, and investor protection.",
  "what is aifmd": "AIFMD (Alternative Investment Fund Managers Directive) regulates managers of alternative investment funds – including hedge funds, private equity, real estate, and infrastructure funds. AIFMD II (adopted in 2024) updates the rules on delegation, liquidity management tools, leverage reporting, and introduces a loan origination framework.",
  "what is dora": "DORA (Digital Operational Resilience Act) is an EU regulation ensuring financial entities can withstand ICT-related disruptions. It requires: ICT risk management frameworks, incident reporting (within 4 hours for major incidents), annual resilience testing, and third-party ICT risk management. It came into effect in January 2025.",
  "what is sfdr": "SFDR (Sustainable Finance Disclosure Regulation) requires financial market participants to disclose sustainability information. It classifies funds as Article 6 (no sustainability), Article 8 (promoting environmental/social characteristics), or Article 9 (sustainable investment objective). It impacts fund documentation, reporting, and marketing.",
  "how does nav work": "NAV (Net Asset Value) is calculated by taking total fund assets, subtracting liabilities, and dividing by outstanding shares. For UCITS, NAV must be calculated at least twice monthly (daily in practice). The process involves: collecting security prices, applying fair value adjustments, calculating accruals, running reconciliation checks, and publishing the final NAV.",
  "what is a manco": "A Management Company (ManCo) is authorized to manage UCITS or AIFs. It's responsible for portfolio management, risk management, and administration. In Luxembourg, a ManCo needs CSSF authorization and must maintain minimum capital, substance requirements, and governance structures including compliance, risk, and internal audit functions.",
  "what is a raif": "A RAIF (Reserved Alternative Investment Fund) is a Luxembourg fund vehicle that doesn't require direct CSSF approval – instead, it must be managed by an authorized AIFM. RAIFs offer faster time-to-market while still being regulated indirectly. They can invest in any asset class and are limited to well-informed investors.",
  "explain regulatory chain": "Regulations flow from EU level to your desk: 1) EU Directives/Regulations set the framework (e.g., UCITS Directive, AIFMD), 2) ESMA develops technical standards and guidelines, 3) CSSF transposes into Luxembourg law through Circulars and FAQs, 4) Your organization creates internal policies and procedures to comply. Understanding this chain helps you anticipate changes and prepare early.",
  "what are liquidity management tools": "Liquidity Management Tools (LMTs) help funds manage redemption pressures. Common tools include: swing pricing (adjusting NAV to pass transaction costs to redeeming investors), redemption gates (limiting redemptions), side pockets (segregating illiquid assets), and notice periods. AIFMD II mandates that all open-ended AIFs have at least one LMT available.",
  "what is the 2010 law": "The Luxembourg Law of 17 December 2010 is the cornerstone of fund regulation. Part I implements the UCITS Directive, Part II covers non-UCITS funds with a lighter regime, and it also governs SIFs (Specialised Investment Funds). It defines fund structures, governance requirements, and CSSF supervision powers.",
  "how to prepare for aifmd ii": "Start with a gap analysis comparing current practices to AIFMD II requirements. Key areas: 1) Delegation arrangements – review all delegations for new substance requirements, 2) Liquidity management – implement at least one LMT, 3) Leverage reporting – prepare for new calculation methodology, 4) Loan origination – if applicable, comply with new framework. Timeline: transposition by April 2026, with 12-month transition.",
  "what is cssf 18/698": "CSSF Circular 18/698 (dated 23 August 2018) is the cornerstone regulatory text governing how investment fund managers (IFMs) must be authorised and organised in Luxembourg. It covers: minimum own funds (€125,000 for IFMs, €300,000 for SIAGs/FIAAGs), governance (minimum 2 conducting officers, 3 board members), the three-lines-of-defence model (risk management, compliance, internal audit), AML/CFT obligations, delegation framework rules, and the requirement to have a genuine central administration in Luxembourg. It replaced Circular 12/546.",
  "what are conducting officers": "Conducting officers are the people who effectively run an IFM's business. Per CSSF 18/698 §78, every IFM must have at least two conducting officers permanently located in Luxembourg, bound by an employment contract, and pre-approved by the CSSF. They form the executive committee and are collectively responsible for all key functions including investment management, risk, compliance, internal audit, AML/CFT, valuation, IT, and accounting (§94). One conducting officer cannot be responsible for both risk-taking and risk control (§96).",
  "what is the three lines of defence": "The three-lines-of-defence model, required by CSSF 18/698 §154-158: 1st Line = Business units that take or acquire risks and carry out controls. 2nd Line = Risk management function (§5.3.1) and Compliance function (§5.3.2), which provide independent risk control. 3rd Line = Internal Audit function (§5.3.3), which provides independent, objective review of the first two lines. All three lines are complementary and mandatory for every Luxembourg IFM.",
  "what is the aml/cft compliance officer": "Per CSSF 18/698 §313, every IFM must designate TWO AML/CFT roles: (1) an AML/CFT Compliance Officer at senior management level (responsible for the annual AML/CFT report), and (2) an AML/CFT Compliance Officer for day-to-day operations. Both must be permanently in Luxembourg, employed by the IFM, and pre-approved by the CSSF. The annual AML/CFT report must be submitted to the CSSF within 5 months after year-end.",
  "what are the minimum own funds requirements": "Per CSSF 18/698 §25-28: IFMs (other than SIAGs/FIAAGs) need minimum capital of €125,000 at incorporation. On an ongoing basis, they must hold the greater of: (a) €125,000 + 0.02% of AUM above €250M (capped at €10M), or (b) one quarter of the preceding year's fixed overheads. SIAGs and FIAAGs must have initial capital of at least €300,000. AIFMs also need additional own funds of 0.01% of managed AIF portfolios to cover professional liability (§38), or hold professional indemnity insurance instead.",
  "what is a letter-box entity": "A letter-box entity is an IFM that has delegated so many functions it can no longer be considered as managing in substance. CSSF 18/698 §413 prohibits this. Per §414, substance is assessed primarily by the size and skills of the teams performing key functions in Luxembourg. In any case, an IFM must have at least 3 FTE staff at the Luxembourg head office performing key functions (§123). The CSSF will revoke authorisation if an IFM becomes a letter-box entity.",
  "what cannot be delegated": "Per CSSF 18/698 §417, certain activities must always be performed by the IFM itself and cannot be delegated: determination of the general investment policy, determination of each UCI's risk profile, interpretation of risk management analyses, implementation of the conflicts of interest policy, implementation of best execution policy, decision on the choice of delegates, and monitoring of delegated functions. The monitoring of delegated activities can never itself be delegated (§451)."
};

// Maps entity type to the regulation IDs most relevant to them
export const ENTITY_RELEVANCE = {
  "aifm": [3, 5, 6, 2],           // AIFMD II, 18/698, DORA, cloud
  "manco": [1, 5, 6, 4],          // NAV, 18/698, DORA, ESG
  "super-manco": [5, 3, 1, 6, 4, 2], // 18/698, AIFMD II, NAV, DORA, ESG, cloud (all relevant)
  "law-firm": [3, 5, 4, 6],       // AIFMD II, 18/698, ESG naming, DORA
  "reg-service": [5, 3, 6, 4, 1, 2], // all, prioritise 18/698 and AIFMD II
  "fund-promoter": [4, 3, 1, 5],     // ESG naming, AIFMD II, NAV, 18/698
  "depositary": [5, 6, 1, 2],        // 18/698, DORA, NAV, cloud
  "other": [1, 2, 3, 4, 5, 6],
};

export const CHAT_STARTERS = [
  "What is CSSF Circular 18/698?",
  "What are the conducting officer requirements?",
  "What is the three lines of defence model?",
  "What cannot be delegated by an IFM?"
];