// Learning Paths data — curated by function and seniority

export const LEARNING_PATHS = {
  valuation: {
    label: "Valuation",
    icon: "📊",
    color: "blue",
    paths: [
      {
        id: "val-foundations",
        title: "Valuation Foundations",
        description: "Core NAV calculation principles, pricing sources, and oversight responsibilities under Luxembourg law.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "val-f1", title: "What is NAV and why does it matter?", type: "read", xp: 20, duration: "5 min",
            content: "NAV (Net Asset Value) is the per-share value of a fund, calculated as total assets minus liabilities divided by shares outstanding. For UCITS, NAV must be calculated at least twice a month (typically daily). Errors above the CSSF tolerance trigger mandatory compensation and reporting obligations.",
            sources: [
              { label: "CSSF Circular 24/856", ref: "§§ 15–22 — NAV calculation frequency and error thresholds" },
              { label: "2010 Law (UCITS)", ref: "Art. 107 — Obligation to publish NAV" },
            ]
          },
          {
            id: "val-f2", title: "Pricing sources: liquid vs. illiquid assets", type: "read", xp: 25, duration: "8 min",
            content: "Liquid assets (listed equities, government bonds) are priced using last market price or bid price. Illiquid assets (private equity, real estate, OTC derivatives) require fair value models such as DCF, comparable transactions, or third-party appraisals. The valuation policy must document which methodology applies to each asset class.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 525–531 — Asset valuation methodologies for AIFs" },
              { label: "ESMA Guidelines on ETF and UCITS", ref: "Annex II — Valuation of UCITS assets, paras 43–55" },
            ]
          },
          {
            id: "val-f3", title: "The fund administrator's role in NAV", type: "read", xp: 20, duration: "5 min",
            content: "The fund administrator calculates NAV operationally, but ultimate responsibility remains with the ManCo or AIFM (cannot be delegated away). The ManCo must have a valuation oversight function, perform independent checks, and maintain a written valuation policy. Oversight includes daily reconciliations and exception reports.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 532–538 — Delegation of valuation and oversight obligations" },
              { label: "CSSF FAQ on AIFMD", ref: "Q&A 12 — ManCo responsibility when NAV delegated" },
            ]
          },
          {
            id: "val-f4", title: "Quiz: NAV Basics", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "What is the maximum NAV error tolerance for UCITS under Circular 24/856?", options: ["1%", "0.5%", "2%", "0.25%"], answer: 1 },
              { q: "Who retains ultimate responsibility for valuation even when delegated?", options: ["Fund Administrator", "Depositary", "ManCo / AIFM", "CSSF"], answer: 2 },
              { q: "Within how many hours must a material NAV error be reported to the CSSF?", options: ["48 hours", "72 hours", "24 hours", "12 hours"], answer: 2 },
            ]
          },
          {
            id: "val-f5", title: "Fair value methodology and overrides", type: "read", xp: 25, duration: "8 min",
            content: "When market prices are unavailable or unreliable (e.g., suspended trading, thinly traded securities), the IFM must apply a fair value override. This requires documented justification, board or valuation committee approval, and immediate notification to the depositary. Fair value overrides must be disclosed in the fund's financial statements.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 541–545 — Fair value override process and documentation" },
              { label: "IFRS 13", ref: "Level 2 and Level 3 fair value hierarchy — applied by reference in Luxembourg fund accounting" },
            ]
          },
        ]
      },
      {
        id: "val-advanced",
        title: "Advanced Valuation & Governance",
        description: "Independence requirements, conflicts of interest, and CSSF 18/698 valuation framework.",
        level: "senior",
        xp: 200,
        modules: [
          {
            id: "val-a1", title: "CSSF 18/698 §532 – Valuation independence", type: "read", xp: 30, duration: "8 min",
            content: "Circular 18/698 §532 requires that the valuation function be functionally independent from the portfolio management function. The head of valuation cannot also head portfolio management. For self-managed SICAVs, the board must establish a valuation committee with independent members. Independence must be documented in the organisational chart and evidenced in meeting minutes.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§532 — Functional independence of valuation; §§ 533–536 — Governance of the valuation function" },
              { label: "AIFMD Level 2 Regulation (EU) 231/2013", ref: "Art. 19–24 — Valuation independence requirements for AIFMs" },
            ]
          },
          {
            id: "val-a2", title: "Side pockets and hard-to-value assets", type: "read", xp: 30, duration: "10 min",
            content: "Side pockets are used to segregate illiquid or hard-to-value assets from the main fund portfolio, protecting redeeming investors and those remaining in the fund. CSSF requires prior approval for UCITS side pockets. For AIFs, side pockets must be provided for in the fund documents, with a clear governance process including board approval and disclosure to investors.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 555–560 — Treatment of illiquid assets and side pocket arrangements" },
              { label: "ESMA Q&A on UCITS", ref: "Section XI — Liquidity Management Tools including side pockets" },
            ]
          },
          {
            id: "val-a3", title: "Conflicts of interest in valuation", type: "read", xp: 25, duration: "7 min",
            content: "Conflicts arise when portfolio managers influence the valuation of assets they manage. The IFM must have a conflicts of interest policy (per §§ 232–248 of Circular 18/698), and valuation conflicts must be identified, recorded, and mitigated. Mitigation measures include independent valuation committees, third-party valuers, and escalation procedures.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 232–248 — Conflicts of interest policy; §540 — Specific conflicts in valuation" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 20 — External valuer independence" },
            ]
          },
          {
            id: "val-a4", title: "Quiz: Valuation Governance", type: "quiz", xp: 50, duration: "8 min", questions: [
              { q: "Under CSSF 18/698, can the same person head valuation and portfolio management?", options: ["Yes, if approved by the board", "No, they must be independent", "Yes, for small funds", "Only with CSSF waiver"], answer: 1 },
              { q: "What is a 'side pocket' used for?", options: ["Segregating illiquid assets", "Storing cash reserves", "Hedging currency risk", "Reporting to CSSF"], answer: 0 },
              { q: "Swing pricing primarily protects:", options: ["The fund manager", "The depositary", "Existing investors from dilution", "New investors from losses"], answer: 2 },
            ]
          },
          {
            id: "val-a5", title: "Automated reconciliation and audit trails", type: "read", xp: 35, duration: "10 min",
            content: "CSSF expects all NAV calculations to be supported by complete audit trails — logs of every pricing input, override, and calculation step. Reconciliations between the fund administrator, the portfolio manager's books, and the depositary must be performed daily and any breaks resolved within agreed timelines. Automated systems must have access controls and change logs.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 145–149 — Accounting and record-keeping; §§ 134–143 — IT systems and audit trails" },
              { label: "CSSF Circular 17/656", ref: "IT risk management — reconciliation controls" },
            ]
          },
          {
            id: "val-a6", title: "Stress-testing NAV calculation systems", type: "read", xp: 30, duration: "8 min",
            content: "IFMs must stress-test their valuation and NAV systems to ensure operational resilience. This includes testing for system outages, simultaneous large redemptions, illiquid market conditions, and pricing source failures. DORA (Regulation EU 2022/2554) now requires formalised ICT resilience testing annually for all financial entities including ManCos.",
            sources: [
              { label: "DORA (EU 2022/2554)", ref: "Art. 25–27 — ICT resilience testing programme" },
              { label: "CSSF Circular 25/901", ref: "§§ 45–60 — Operational resilience testing requirements" },
            ]
          },
        ]
      }
    ]
  },
  compliance: {
    label: "Compliance",
    icon: "✅",
    color: "emerald",
    paths: [
      {
        id: "comp-foundations",
        title: "Compliance Function Essentials",
        description: "The compliance officer's role, the compliance charter, and how the three lines of defence work.",
        level: "junior",
        xp: 160,
        modules: [
          {
            id: "comp-f1", title: "The three lines of defence explained", type: "read", xp: 20, duration: "6 min",
            content: "The three lines model: 1st line = business functions owning their risks day-to-day; 2nd line = compliance and risk functions providing oversight and challenge; 3rd line = internal audit providing independent assurance. Under CSSF 18/698, all three lines must be properly staffed, independent, and have direct access to the board.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 86–100 — Internal control framework and three lines of defence" },
              { label: "IIA Global — Three Lines Model (2020)", ref: "Applicable by reference in CSSF supervisory expectations" },
            ]
          },
          {
            id: "comp-f2", title: "What is a Compliance Charter?", type: "read", xp: 25, duration: "7 min",
            content: "The compliance charter (or compliance policy) formally defines the compliance function's mandate, authority, resources, and reporting lines. CSSF 18/698 requires it to be approved by the management body and reviewed at least annually. It must cover scope of activities monitored, escalation procedures, and the compliance officer's right of direct access to the board.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 270–285 — Compliance function requirements, charter, and annual report" },
            ]
          },
          {
            id: "comp-f3", title: "AML/CFT basics for compliance teams", type: "read", xp: 25, duration: "8 min",
            content: "Luxembourg IFMs are subject to the Law of 12 November 2004 on combating money laundering. Every IFM must appoint an AML/CFT Compliance Officer (RC) and an AML/CFT Responsible Person (RP), both notified to the CSSF. KYC must be performed before onboarding, and suspicious transactions reported to the FIU (Cellule de Renseignement Financier) without delay.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 313–340 — AML/CFT obligations, RC/RP appointment, reporting" },
              { label: "Luxembourg AML Law 2004 as amended", ref: "Art. 2–8 — Scope, CDD obligations, reporting" },
            ]
          },
          {
            id: "comp-f4", title: "Quiz: Compliance Fundamentals", type: "quiz", xp: 45, duration: "5 min", questions: [
              { q: "How many conducting officers must every Luxembourg IFM have?", options: ["1", "2", "3", "4"], answer: 1 },
              { q: "The Compliance Officer's annual report must be submitted to the CSSF within how many months of year-end?", options: ["3 months", "5 months", "6 months", "12 months"], answer: 1 },
              { q: "Which line of defence is internal audit?", options: ["1st line", "2nd line", "3rd line", "None"], answer: 2 },
            ]
          },
          {
            id: "comp-f5", title: "Conflicts of interest management", type: "read", xp: 20, duration: "5 min",
            content: "IFMs must maintain a written conflicts of interest policy identifying situations where conflicts may arise between the IFM, its staff, and clients. Conflicts must be managed (mitigated), and where not manageable, disclosed to investors before acting. The register of conflicts must be reviewed regularly and reported to the board at least annually.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 232–248 — Conflicts of interest policy, register, and disclosure" },
              { label: "MiFID II (Directive 2014/65/EU)", ref: "Art. 23 — Conflicts of interest (applies to portfolio management activities)" },
            ]
          },
          {
            id: "comp-f6", title: "Marketing and distribution compliance", type: "read", xp: 25, duration: "7 min",
            content: "Marketing materials must be fair, clear, and not misleading. CSSF pre-approves UCITS KIID/KID documents. Cross-border marketing requires notification under the CBDF Regulation (EU 2019/1156). ESG-related fund names must comply with ESMA's naming guidelines (minimum sustainable investment thresholds, no 'ESG', 'sustainable' names without substance).",
            sources: [
              { label: "CBDF Regulation (EU 2019/1156)", ref: "Arts. 4–9 — Pre-marketing and notification procedures" },
              { label: "ESMA Guidelines on fund names (ESMA34-472-2816)", ref: "Final Report 2024 — Thresholds and naming restrictions" },
            ]
          },
        ]
      },
      {
        id: "comp-advanced",
        title: "CSSF 18/698 – Deep Dive",
        description: "Mastering the cornerstone circular: authorisation, governance, delegation, and AML/CFT obligations.",
        level: "senior",
        xp: 250,
        modules: [
          {
            id: "comp-a1", title: "Authorisation conditions under CSSF 18/698", type: "read", xp: 35, duration: "12 min",
            content: "To be authorised as a Luxembourg IFM (ManCo or AIFM), the entity must have: minimum initial capital of €125,000 (UCITS ManCo) or €300,000 (AIFM managing >€500m), at least 2 conducting officers resident in Luxembourg, at least 3 FTE staff at the Luxembourg head office, a registered office in Luxembourg, and fit & proper management. CSSF must pre-approve any material changes.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 1–50 — Authorisation conditions, capital, conducting officers, FTE requirements" },
              { label: "2010 Law (UCITS)", ref: "Art. 101–105 — ManCo authorisation conditions" },
              { label: "AIFMD (Directive 2011/61/EU)", ref: "Art. 7–8 — AIFM authorisation conditions" },
            ]
          },
          {
            id: "comp-a2", title: "Delegation framework and monitoring obligations", type: "read", xp: 35, duration: "12 min",
            content: "An IFM may delegate functions (portfolio management, risk, administration) to third parties subject to CSSF notification in advance, written delegation agreement, and ongoing monitoring. The IFM must retain sufficient expertise to monitor delegates, cannot delegate so many functions it becomes a letter-box entity, and the delegate must be regulated in its jurisdiction.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 362–413 — Delegation Chapter 6: conditions, agreements, monitoring obligations" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 75–82 — Delegation conditions and substance requirements" },
            ]
          },
          {
            id: "comp-a3", title: "What cannot be delegated?", type: "read", xp: 30, duration: "8 min",
            content: "The monitoring of delegated activities itself cannot be sub-delegated — it must remain with the IFM. Additionally, the overall management responsibility, the compliance function oversight, and strategic decision-making cannot be delegated. The conducting officers remain personally responsible for compliance with CSSF requirements at all times.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 380–390 — Non-delegable functions; §415 — Conducting officer personal responsibility" },
            ]
          },
          {
            id: "comp-a4", title: "AML/CFT officer requirements (§313)", type: "read", xp: 30, duration: "8 min",
            content: "Every IFM must designate: (1) a Responsable du Contrôle (RC) — senior manager responsible for AML/CFT compliance programme; and (2) a Responsable du Traitement (RP) — responsible for analysing and reporting suspicious transactions to the FIU. Both must be notified to CSSF. For small IFMs, one person may hold both roles. Training records must be maintained.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§313 — RC/RP appointment requirements; §§ 314–325 — AML/CFT programme" },
              { label: "CSSF Circular 20/744", ref: "AML/CFT requirements for supervised entities — updated obligations" },
            ]
          },
          {
            id: "comp-a5", title: "Quiz: CSSF 18/698 Mastery", type: "quiz", xp: 60, duration: "10 min", questions: [
              { q: "What is the minimum number of FTE staff required at the Luxembourg head office of an IFM?", options: ["1", "2", "3", "5"], answer: 2 },
              { q: "Can the monitoring of delegated activities itself be delegated?", options: ["Yes", "No", "Only for small IFMs", "With CSSF approval"], answer: 1 },
              { q: "What is a 'letter-box entity'?", options: ["An IFM with a PO box address", "An IFM with insufficient Luxembourg substance", "A fund with no investors", "An IFM without a compliance officer"], answer: 1 },
            ]
          },
          {
            id: "comp-a6", title: "Annual reporting obligations and CSSF filings", type: "read", xp: 30, duration: "10 min",
            content: "Luxembourg IFMs must submit annually: compliance report (within 5 months of year-end), internal audit report, risk report, and AML/CFT report to the board. UCITS funds submit annual financial statements within 4 months of year-end. AIFs submit annual reports within 6 months. AIFMD Annex IV reporting is submitted quarterly or annually depending on AUM.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 270–290 — Compliance annual report; §§ 453–465 — Internal audit reporting" },
              { label: "AIFMD Annex IV", ref: "Reporting template — filed via CSSF e-filing portal" },
            ]
          },
          {
            id: "comp-a7", title: "AIFMD II – Compliance impact analysis", type: "read", xp: 30, duration: "10 min",
            content: "AIFMD II (Directive 2024/927/EU) introduces: enhanced delegation substance requirements (AIFMs must retain more functions in-house), mandatory Liquidity Management Tools for open-ended AIFs, standardised Annex IV reporting, and new rules on loan-originating funds. Luxembourg transposition deadline was April 2026. IFMs must review delegation agreements, fund documents, and internal policies.",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Full text — focus Arts. 18, 20 (delegation), 46a (LMTs), 24 (reporting)" },
              { label: "CSSF FAQ on AIFMD II", ref: "Published 2025 — Luxembourg-specific transposition guidance" },
            ]
          },
        ]
      }
    ]
  },
  risk: {
    label: "Risk Management",
    icon: "⚠️",
    color: "amber",
    paths: [
      {
        id: "risk-foundations",
        title: "Risk Management Basics",
        description: "Core risk categories, the RMP, and how the permanent risk function operates.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "risk-f1", title: "The five core risk categories", type: "read", xp: 20, duration: "6 min",
            content: "CSSF 18/698 identifies five core risk categories for IFMs: (1) Market risk — price movements; (2) Credit risk — counterparty defaults; (3) Liquidity risk — inability to meet redemptions; (4) Operational risk — process failures, fraud, IT; (5) Concentration risk — over-exposure to single issuer. Each must be covered by the Risk Management Procedure (RMP) with defined limits and monitoring.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 472–510 — Risk categories, RMP content requirements, risk limits" },
              { label: "UCITS V Directive (2014/91/EU)", ref: "Art. 51 — Risk management process for UCITS" },
            ]
          },
          {
            id: "risk-f2", title: "What is a Risk Management Procedure (RMP)?", type: "read", xp: 25, duration: "7 min",
            content: "The RMP is the IFM's master risk document, required by CSSF 18/698 and AIFMD. It must describe: all material risks faced by the IFM and its funds, the risk measurement tools and models used, risk limits per fund, escalation procedures for limit breaches, frequency of risk reporting to the board, and the governance of the risk function. The RMP must be reviewed at least annually.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 467–490 — RMP content, approval, and review process" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 39–45 — RMP requirements for AIFMs" },
            ]
          },
          {
            id: "risk-f3", title: "Risk limits and escalation", type: "read", xp: 25, duration: "7 min",
            content: "Each fund's risk limits (VaR, duration, leverage, concentration) must be defined in the RMP and monitored daily. Limit breaches must be escalated to the head of risk (2nd line) and then to the board within defined timeframes. CSSF expects evidence of escalation in board minutes. Repeated unresolved breaches must be reported to CSSF.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 491–500 — Risk limits, breach management, board escalation" },
            ]
          },
          {
            id: "risk-f4", title: "Quiz: Risk Fundamentals", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Under CSSF 18/698, can the head of risk management also head investment management?", options: ["Yes", "No", "Only at large IFMs", "With board approval"], answer: 1 },
              { q: "What is 'liquidity risk'?", options: ["Risk of system failure", "Risk a fund cannot meet redemptions without loss", "Risk of currency fluctuation", "Risk of regulatory fine"], answer: 1 },
              { q: "Stress testing for UCITS is:", options: ["Optional", "Required only for AIFs", "Mandatory", "Only for funds over €1bn"], answer: 2 },
            ]
          },
          {
            id: "risk-f5", title: "DORA and operational resilience", type: "read", xp: 40, duration: "10 min",
            content: "DORA (Regulation EU 2022/2554) applies to all Luxembourg IFMs from January 2025. Key requirements: ICT risk management framework (documented, board-approved), major incident reporting to CSSF within 4 hours of classification, annual resilience testing (including TLPT — threat-led penetration testing for large entities), and contractual requirements for all ICT third-party providers.",
            sources: [
              { label: "DORA (EU 2022/2554)", ref: "Arts. 5–16 — ICT risk management; Art. 19 — Incident reporting; Arts. 25–27 — Testing" },
              { label: "CSSF Circular 25/901", ref: "§§ 1–80 — Luxembourg implementation of DORA for fund managers" },
            ]
          },
        ]
      },
      {
        id: "risk-advanced",
        title: "Advanced Risk Frameworks",
        description: "Leverage reporting, AIFMD II changes, stress testing, and liquidity management tools.",
        level: "senior",
        xp: 200,
        modules: [
          {
            id: "risk-a1", title: "Leverage calculation under AIFMD II", type: "read", xp: 35, duration: "12 min",
            content: "AIFMD II standardises leverage reporting via Annex IV using two methods: (1) Gross method — sum of absolute values of all positions; (2) Commitment method — netting derivative positions against hedges. AIFMD II introduces enhanced transparency: AIFMs must report leverage to CSSF quarterly (previously annually for some), and ESMA will publish aggregated leverage data publicly.",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Art. 24 — Revised Annex IV leverage reporting" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Arts. 7–11 — Gross and commitment leverage calculation methods" },
            ]
          },
          {
            id: "risk-a2", title: "Liquidity Management Tools (LMTs)", type: "read", xp: 35, duration: "10 min",
            content: "AIFMD II mandates that all open-ended AIFs must have at least two LMTs from a list defined in Annex V of AIFMD II. Tools include: redemption gates, notice periods, side pockets, swing pricing, anti-dilution levies, redemption fees, and suspension of redemptions. The choice of LMTs must be documented in the fund prospectus and the IFM must have operational procedures to activate them.",
            sources: [
              { label: "AIFMD II Annex V", ref: "Full list of available Liquidity Management Tools" },
              { label: "ESMA Guidelines on LMTs (ESMA34-1450114)", ref: "Operational guidance on activation and disclosure of LMTs" },
            ]
          },
          {
            id: "risk-a3", title: "Counterparty risk in OTC derivatives", type: "read", xp: 30, duration: "8 min",
            content: "OTC derivative exposure must be monitored daily. For UCITS, counterparty exposure to a single counterparty must not exceed 10% of NAV (5% for non-credit-institution counterparties). Collateral arrangements (ISDA/CSA) must be documented. EMIR (EU 648/2012) requires central clearing for standardised OTC derivatives and reporting to trade repositories.",
            sources: [
              { label: "UCITS Directive", ref: "Art. 52(1) — Counterparty risk limits for UCITS" },
              { label: "EMIR (EU 648/2012)", ref: "Arts. 4–12 — Clearing obligation, risk mitigation for non-cleared OTC derivatives" },
            ]
          },
          {
            id: "risk-a4", title: "Quiz: Advanced Risk", type: "quiz", xp: 50, duration: "8 min", questions: [
              { q: "AIFMD II requires open-ended AIFs to have how many LMTs?", options: ["None", "At least one", "At least two", "At least three"], answer: 2 },
              { q: "What does swing pricing protect against?", options: ["Market crashes", "Regulatory fines", "Investor dilution from transaction costs", "Currency risk"], answer: 2 },
              { q: "Major ICT incidents must be reported to CSSF within:", options: ["24 hours", "48 hours", "4 hours", "1 week"], answer: 2 },
            ]
          },
          {
            id: "risk-a5", title: "Annual risk reporting to CSSF", type: "read", xp: 50, duration: "12 min",
            content: "Risk reporting obligations: AIFMD Annex IV (quarterly for large AIFMs, annually for smaller), UCITS risk management report (to board, at least quarterly), CSSF annual survey for ManCos (IT questionnaire, substance data). Significant risk events (VAR limit breaches >3x, suspension of redemptions, major operational incidents) must be notified to CSSF ad hoc within defined timelines.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 501–510 — Risk reporting to the board and to CSSF" },
              { label: "AIFMD Annex IV template", ref: "CSSF e-filing portal — filing instructions" },
            ]
          },
        ]
      }
    ]
  },
  "fund-law": {
    label: "Fund Law",
    icon: "⚖️",
    color: "red",
    paths: [
      {
        id: "fl-foundations",
        title: "Luxembourg Fund Law Essentials",
        description: "Fund vehicles, regulatory hierarchy, and the Luxembourg 2010 Law.",
        level: "junior",
        xp: 160,
        modules: [
          {
            id: "fl-f1", title: "Luxembourg fund vehicles: UCITS, SIF, RAIF, ELTIF", type: "read", xp: 25, duration: "10 min",
            content: "Luxembourg offers four main fund vehicles: UCITS (2010 Law) — retail, CSSF-regulated, daily liquidity; SIF (2007 Law) — well-informed investors, CSSF-regulated, flexible; RAIF (2016 Law) — well-informed investors, not CSSF-regulated but must have authorised AIFM; ELTIF 2.0 — long-term investment fund for retail and professional investors, CSSF-authorised. Each has distinct investor eligibility, diversification rules, and regulatory costs.",
            sources: [
              { label: "2010 Law (UCITS)", ref: "Full text — Arts. 1–185: UCITS regime" },
              { label: "2007 Law (SIF)", ref: "Full text — Arts. 1–88: SIF regime, eligible assets, investor requirements" },
              { label: "2016 Law (RAIF)", ref: "Full text — Arts. 1–84: RAIF regime, mandatory AIFM requirement" },
              { label: "ELTIF 2.0 Regulation (EU 2023/606)", ref: "Arts. 1–50 — Updated eligibility and portfolio composition rules" },
            ]
          },
          {
            id: "fl-f2", title: "The 2010 Law – key provisions", type: "read", xp: 25, duration: "8 min",
            content: "The 2010 Law (transposing UCITS IV/V) governs UCITS in Luxembourg. Key provisions: Art. 101–110 — ManCo authorisation and capital; Art. 50 — Eligible assets list; Art. 52 — Diversification rules (5/10/40 rule); Art. 107 — NAV publication; Art. 151–154 — Fund mergers; Art. 177–185 — Depositary obligations. UCITS V (2014/91/EU) added enhanced depositary duties.",
            sources: [
              { label: "2010 Law (as amended)", ref: "Arts. 50–58 — Eligible assets and investment restrictions for UCITS" },
              { label: "UCITS V Directive (2014/91/EU)", ref: "Arts. 22–26 — Depositary functions, liability, delegation chain" },
            ]
          },
          {
            id: "fl-f3", title: "AIFMD vs UCITS Directive", type: "read", xp: 25, duration: "8 min",
            content: "AIFMD (2011/61/EU) covers all AIFs (non-UCITS) managed by authorised AIFMs above the threshold (€500m or €100m with leverage). Key differences from UCITS: AIFs have no mandatory eligible asset restrictions, but must comply with AIFMD leverage reporting, LMT requirements, and depositary chain rules. Sub-threshold AIFMs (below €500m/€100m) are registered but not fully authorised — lighter obligations.",
            sources: [
              { label: "AIFMD (Directive 2011/61/EU)", ref: "Arts. 3–4 — Scope and thresholds; Arts. 21–26 — Depositary; Arts. 23–24 — Disclosure and reporting" },
              { label: "2013 Law (AIFM)", ref: "Luxembourg transposition — Arts. 1–60" },
            ]
          },
          {
            id: "fl-f4", title: "Quiz: Fund Law Basics", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "A RAIF must be managed by:", options: ["The CSSF directly", "An authorized AIFM", "A bank", "Any legal entity"], answer: 1 },
              { q: "What is the minimum management body size for an IFM?", options: ["1 member", "2 members", "3 members", "5 members"], answer: 2 },
              { q: "AIFMD II must be transposed in Luxembourg by:", options: ["April 2024", "April 2025", "April 2026", "April 2027"], answer: 2 },
            ]
          },
          {
            id: "fl-f5", title: "Prospectus requirements and fund documentation", type: "read", xp: 40, duration: "10 min",
            content: "UCITS funds must publish a full Prospectus (CSSF-approved), KIID/KID (Key Information Document under PRIIPs for retail), and annual/semi-annual reports. AIFs must produce an Offering Document (not CSSF pre-approved unless UCITS) and annual report within 6 months of year-end. Material changes to fund documents require CSSF notification 1 month in advance for UCITS.",
            sources: [
              { label: "UCITS Directive", ref: "Art. 68–82 — Prospectus, KIID, and periodic reporting obligations" },
              { label: "PRIIPs Regulation (EU 1286/2014)", ref: "Arts. 5–14 — KID format and content requirements" },
              { label: "CSSF FAQ on UCITS", ref: "Section on material vs non-material prospectus changes" },
            ]
          },
        ]
      },
      {
        id: "fl-advanced",
        title: "AIFMD II – Full Implementation Guide",
        description: "Delegation rules, liquidity tools, loan origination, leverage reporting and transitional provisions.",
        level: "senior",
        xp: 220,
        modules: [
          {
            id: "fl-a1", title: "AIFMD II – What changed from AIFMD I?", type: "read", xp: 35, duration: "12 min",
            content: "AIFMD II introduces 6 key changes: (1) Delegation — enhanced substance requirements, ESMA to receive annual reports on non-EU delegation; (2) LMTs — mandatory for open-ended AIFs (Annex V); (3) Loan origination — dedicated chapter for LOFs with diversification and retention rules; (4) Leverage — standardised Annex IV reporting; (5) Depositary — third-country access routes; (6) Data reporting — enhanced transparency and ESMA public register.",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Official Journal L 2024/927 — full text with amending provisions highlighted" },
              { label: "CSSF FAQ on AIFMD II (2025)", ref: "Luxembourg-specific transposition Q&A" },
            ]
          },
          {
            id: "fl-a2", title: "New delegation substance requirements", type: "read", xp: 35, duration: "10 min",
            content: "Under AIFMD II, AIFMs that delegate portfolio management or risk management to non-EU entities must report this annually to their NCAs (CSSF). ESMA will aggregate and publish the data. The letter-box entity prohibition is reinforced: an AIFM must retain sufficient human and technical resources to monitor delegates. The CSSF will scrutinise delegation arrangements more intensively from 2026.",
            sources: [
              { label: "AIFMD II", ref: "Art. 20(4a)–(4f) — Enhanced delegation reporting to ESMA and NCAs" },
              { label: "CSSF Circular 18/698", ref: "§§ 362–413 — Existing Luxembourg delegation requirements (still apply)" },
            ]
          },
          {
            id: "fl-a3", title: "Loan origination fund framework", type: "read", xp: 30, duration: "8 min",
            content: "AIFMD II introduces a dedicated framework for Loan Originating Funds (LOFs). Requirements: (1) Originate-to-distribute strategy limited (must retain 5% economic interest); (2) Concentration — no more than 20% NAV to single borrower (non-financial corporates); (3) Open-ended LOFs only with exceptional CSSF approval; (4) Leverage cap 175% for open-ended, 300% for closed-ended. Must disclose lending policy in fund documents.",
            sources: [
              { label: "AIFMD II", ref: "Arts. 15a–15f — Loan originating AIF framework" },
              { label: "CSSF FAQ on AIFMD II (2025)", ref: "Section on LOF transposition in Luxembourg" },
            ]
          },
          {
            id: "fl-a4", title: "Quiz: AIFMD II", type: "quiz", xp: 60, duration: "10 min", questions: [
              { q: "What is the transitional period for existing AIFMs under AIFMD II?", options: ["6 months", "12 months", "18 months", "24 months"], answer: 1 },
              { q: "AIFMD II standardises which reporting?", options: ["Annex IV leverage reporting", "SFDR disclosures", "PRIIP KIDs", "CSSF fees"], answer: 0 },
              { q: "Under AIFMD II, open-ended AIFs without LMTs are:", options: ["Permitted if small", "Prohibited", "Allowed with board approval", "Subject to CSSF waiver"], answer: 1 },
            ]
          },
          {
            id: "fl-a5", title: "Transitional provisions and gap analysis", type: "read", xp: 30, duration: "10 min",
            content: "Existing AIFMs had a 12-month transitional period from April 2026 (Luxembourg transposition) to comply with AIFMD II. Priority actions: (1) Review all delegation agreements for enhanced substance compliance; (2) Update fund prospectuses and constitutive documents to include LMTs; (3) Set up LOF governance if applicable; (4) Update Annex IV reporting templates; (5) Notify CSSF of material changes to operations.",
            sources: [
              { label: "AIFMD II", ref: "Art. 2 — Transitional provisions for existing AIFMs" },
              { label: "CSSF Circular — AIFMD II transposition circular (2026 expected)", ref: "Luxembourg-specific timeline and action items" },
            ]
          },
          {
            id: "fl-a6", title: "ESG naming rules – legal implications", type: "read", xp: 30, duration: "8 min",
            content: "ESMA's fund naming guidelines (final report 2024) prohibit using 'ESG', 'sustainable', 'green', 'climate', 'impact', or similar terms in fund names unless: (1) ≥80% of investments meet the ESG/sustainability characteristics; (2) For 'sustainable' or 'impact' names — ≥80% sustainable investments per SFDR Art. 2(17); (3) Exclusions per Paris-Aligned Benchmark apply. Non-compliant funds must be renamed by CSSF deadline.",
            sources: [
              { label: "ESMA Guidelines on fund names (ESMA34-472-2816)", ref: "Final Report 2024 — Annex I: keywords and thresholds" },
              { label: "SFDR (EU 2019/2088)", ref: "Art. 2(17) — Definition of 'sustainable investment'" },
            ]
          },
        ]
      }
    ]
  },
  aml: {
    label: "AML / Financial Crime",
    icon: "🛡️",
    color: "rose",
    paths: [
      {
        id: "aml-foundations",
        title: "AML/CFT Fundamentals",
        description: "Know your customer, UBO identification, suspicious transaction reporting, and CSSF 18/698 Chapter 8.",
        level: "junior",
        xp: 160,
        modules: [
          {
            id: "aml-f1", title: "AML/CFT framework in Luxembourg", type: "read", xp: 25, duration: "8 min",
            content: "Luxembourg's AML/CFT regime is based on: (1) Law of 12 November 2004 on AML/CFT; (2) CSSF Circular 18/698 Chapter 8 (§§ 313–355); (3) CSSF Circular 20/744 (updated AML/CFT obligations). Luxembourg IFMs are 'professionals of the financial sector' subject to full AML obligations. The CSSF is the AML supervisory authority for IFMs and conducts on-site AML inspections.",
            sources: [
              { label: "Luxembourg AML Law 2004 (as amended)", ref: "Arts. 1–11 — Scope, CDD, suspicious transaction reporting" },
              { label: "CSSF Circular 18/698", ref: "§§ 313–355 — AML/CFT programme requirements for IFMs" },
              { label: "CSSF Circular 20/744", ref: "Full circular — updated AML/CFT guidance applicable since 2021" },
            ]
          },
          {
            id: "aml-f2", title: "KYC and Customer Due Diligence", type: "read", xp: 25, duration: "8 min",
            content: "CDD must be performed before establishing a business relationship. Standard CDD: identify and verify client identity using reliable documents; Enhanced CDD (EDD): required for high-risk clients (PEPs, high-risk countries, complex structures), requires senior management approval and enhanced monitoring. Simplified CDD: permitted for low-risk clients (e.g., regulated EU funds). CDD must be refreshed when risk profile changes.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 316–335 — CDD, EDD, simplified CDD conditions and procedures" },
              { label: "EU 4th AML Directive (2015/849) as amended by 5th (2018/843)", ref: "Arts. 13–24 — CDD measures and high-risk third countries" },
            ]
          },
          {
            id: "aml-f3", title: "UBO identification and verification", type: "read", xp: 25, duration: "7 min",
            content: "Every IFM must identify the Ultimate Beneficial Owner (UBO) — the natural person(s) who ultimately own or control >25% of a legal entity client. For funds investing in other funds, look-through to underlying UBOs is required when feasible. UBO information must be verified using reliable sources (Luxembourg RBE register, corporate documents). Complex structures (trusts, nominees) require enhanced scrutiny.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 320–328 — UBO identification procedures; §330 — Look-through for fund investments" },
              { label: "Luxembourg RBE Law (2019)", ref: "Registration of beneficial owners — mandatory filing and verification" },
            ]
          },
          {
            id: "aml-f4", title: "Quiz: AML/CFT Basics", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "How many AML/CFT officer roles must every Luxembourg IFM designate?", options: ["1", "2", "3", "4"], answer: 1 },
              { q: "What does STR stand for?", options: ["Standard Tax Report", "Suspicious Transaction Report", "Structured Trade Record", "System Tolerance Review"], answer: 1 },
              { q: "What is a PEP?", options: ["Personal Equity Plan", "Politically Exposed Person", "Private Equity Partner", "Portfolio Exit Plan"], answer: 1 },
            ]
          },
          {
            id: "aml-f5", title: "Risk-based approach to AML", type: "read", xp: 40, duration: "10 min",
            content: "The risk-based approach (RBA) requires IFMs to identify, assess, and mitigate their ML/TF risks before applying controls proportionately. The IFM must maintain a written Business Risk Assessment (BRA) covering: products and services offered, client types, geographies, delivery channels, and transactions. The BRA informs the AML/CFT policies, procedures, and training programme. CSSF inspects BRAs as part of AML on-site reviews.",
            sources: [
              { label: "CSSF Circular 20/744", ref: "Section III — Business Risk Assessment methodology and expectations" },
              { label: "FATF Recommendations", ref: "Recommendations 1, 10, 15 — Risk-based approach and CDD" },
            ]
          },
        ]
      }
    ]
  },
  it: {
    label: "IT / Data",
    icon: "💻",
    color: "pink",
    paths: [
      {
        id: "it-foundations",
        title: "IT Governance & DORA",
        description: "Cloud obligations, BCP, incident reporting, and the digital resilience framework.",
        level: "junior",
        xp: 170,
        modules: [
          {
            id: "it-f1", title: "CSSF 18/698 IT requirements (§134–143)", type: "read", xp: 25, duration: "8 min",
            content: "CSSF 18/698 §§ 134–143 set out baseline IT governance requirements for IFMs: documented IT strategy aligned with business strategy; IT governance framework including board oversight; IT asset inventory; system access controls and data security; change management procedures; incident management; and business continuity plans for IT systems. These requirements are now supplemented and in some areas superseded by DORA.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 134–143 — IT governance, access controls, BCP for IT systems" },
              { label: "CSSF IT risk management guidelines (2022)", ref: "Supplementary guidance on cloud, cybersecurity, outsourcing" },
            ]
          },
          {
            id: "it-f2", title: "The cloud officer obligation", type: "read", xp: 20, duration: "5 min",
            content: "Per CSSF Circular 17/654 and 18/698 §140, any IFM using cloud infrastructure must designate a 'Cloud Officer' responsible for: oversight of cloud service providers, ensuring data residency and security compliance, maintaining an inventory of cloud deployments, and reporting cloud risks to the board. The Cloud Officer role can be combined with other IT governance roles for small IFMs.",
            sources: [
              { label: "CSSF Circular 17/654", ref: "Full circular — Cloud computing obligations for supervised entities" },
              { label: "CSSF Circular 18/698", ref: "§140 — Cloud officer designation requirement" },
            ]
          },
          {
            id: "it-f3", title: "DORA – what it means for fund managers", type: "read", xp: 30, duration: "10 min",
            content: "DORA (Regulation EU 2022/2554) applies to Luxembourg IFMs from 17 January 2025. Five pillars: (1) ICT Risk Management — board-approved framework, documented; (2) ICT Incident Management — classification, reporting to CSSF within 4 hours; (3) Digital Operational Resilience Testing — annual basic testing, TLPT for significant entities; (4) Third-party risk — register of ICT providers, CSSF oversight of critical providers; (5) Information sharing — voluntary threat intelligence sharing.",
            sources: [
              { label: "DORA (EU 2022/2554)", ref: "Arts. 5–16 (ICT risk), Art. 19 (incident reporting), Arts. 25–27 (testing), Arts. 28–44 (third-party)" },
              { label: "CSSF Circular 25/901", ref: "§§ 1–100 — Luxembourg DORA implementation guidance for IFMs" },
            ]
          },
          {
            id: "it-f4", title: "Quiz: IT Governance", type: "quiz", xp: 50, duration: "6 min", questions: [
              { q: "Under CSSF 18/698, using cloud infrastructure requires designating a:", options: ["Data Officer", "Cloud Officer", "IT Director", "System Admin"], answer: 1 },
              { q: "DORA requires major ICT incidents to be reported within:", options: ["4 hours", "24 hours", "48 hours", "1 week"], answer: 0 },
              { q: "DORA requires resilience testing:", options: ["Never", "On request only", "Annually", "Every 5 years"], answer: 2 },
            ]
          },
          {
            id: "it-f5", title: "Business Continuity Planning for IT systems", type: "read", xp: 45, duration: "12 min",
            content: "Every IFM must maintain a Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP) for IT systems. Key requirements: RTO (Recovery Time Objective) and RPO (Recovery Point Objective) defined per critical system; annual BCP testing with results reported to the board; crisis communication procedures; backup infrastructure outside the primary site. DORA extends this to ICT resilience testing including adversarial scenarios.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 141–143 — BCP and DRP requirements for IFMs" },
              { label: "DORA (EU 2022/2554)", ref: "Arts. 11–14 — ICT business continuity and backup policies" },
            ]
          },
        ]
      }
    ]
  },
  operations: {
    label: "Operations",
    icon: "⚙️",
    color: "slate",
    paths: [
      {
        id: "ops-foundations",
        title: "Operational Resilience",
        description: "Central administration, BCP, third-party risk, and CSSF Circular 25/901.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "ops-f1", title: "Central administration requirements", type: "read", xp: 25, duration: "7 min",
            content: "CSSF 18/698 §115 requires every IFM to have its central administration in Luxembourg, comprising two centres: the decision-making centre (where key management decisions are taken) and the administrative centre (where accounting records, corporate documents, and regulatory filings are maintained). Both must be physically present in Luxembourg. Remote work arrangements must not compromise this requirement.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§115 — Central administration definition; §§ 116–120 — Substance requirements" },
              { label: "CSSF FAQ on substance and central administration", ref: "2022 Q&A — Remote work and Luxembourg presence" },
            ]
          },
          {
            id: "ops-f2", title: "CSSF Circular 25/901 – Operational Resilience", type: "read", xp: 30, duration: "10 min",
            content: "CSSF Circular 25/901 implements DORA for Luxembourg financial sector entities including IFMs. Key operational requirements: annual operational resilience testing plan approved by the board; identification of critical functions and their dependencies; recovery time objectives for each critical function; third-party ICT provider risk register with materiality assessment; and board responsibility for oversight of the ICT risk management framework.",
            sources: [
              { label: "CSSF Circular 25/901", ref: "§§ 1–80 — Full operational resilience requirements applicable to IFMs" },
              { label: "DORA (EU 2022/2554)", ref: "Arts. 5–27 — ICT risk management and testing framework" },
            ]
          },
          {
            id: "ops-f3", title: "Third-party risk management", type: "read", xp: 25, duration: "7 min",
            content: "IFMs must maintain a register of all third-party ICT service providers, assessed for materiality (criticality to operations). For critical ICT third parties: enhanced due diligence before engagement, contractual minimum requirements (SLAs, audit rights, business continuity provisions), and annual monitoring reviews. DORA gives CSSF and ESMA direct oversight powers over designated Critical Third-Party Providers (CTPPs).",
            sources: [
              { label: "DORA (EU 2022/2554)", ref: "Arts. 28–44 — ICT third-party risk management, register, contractual requirements" },
              { label: "CSSF Circular 18/698", ref: "§§ 134–140 — IT outsourcing oversight (pre-DORA baseline)" },
            ]
          },
          {
            id: "ops-f4", title: "Quiz: Operations & Resilience", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Per CSSF 18/698 §115, every IFM must have a central administration with which two centres?", options: ["Legal and tax", "Decision-making and administrative", "Compliance and risk", "IT and operations"], answer: 1 },
              { q: "Annual operational resilience testing is required under:", options: ["UCITS Directive", "DORA", "SFDR", "EMIR"], answer: 1 },
              { q: "Can monitoring of third-party delegates be sub-delegated?", options: ["Yes", "No", "Only for IT functions", "With CSSF approval"], answer: 1 },
            ]
          },
          {
            id: "ops-f5", title: "Transfer agent and fund administrator oversight", type: "read", xp: 30, duration: "8 min",
            content: "The transfer agent (TA) processes investor subscriptions, redemptions, and switches, maintaining the register of unitholders. The IFM must oversee the TA via written SLA, regular KPI reporting, and annual due diligence visits. Key oversight metrics: settlement accuracy rate, AML/KYC completion rates, complaint resolution times. Issues with TA performance must be escalated to the board and, if material, to CSSF.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 362–413 — Delegation and oversight of TA and fund administrator" },
              { label: "CSSF FAQ on distribution and TA oversight", ref: "Section on TA delegation and CSSF notification requirements" },
            ]
          },
        ]
      }
    ]
  },
  accounting: {
    label: "Accounting",
    icon: "📒",
    color: "purple",
    paths: [
      {
        id: "acc-foundations",
        title: "Fund Accounting Essentials",
        description: "Luxembourg accounting obligations, NAV reconciliation, and outsourcing rules.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "acc-f1", title: "Accounting obligations under CSSF 18/698 (§145–149)", type: "read", xp: 25, duration: "7 min",
            content: "CSSF 18/698 §§ 145–149 require IFMs to maintain complete, accurate, and accessible accounting records at the Luxembourg head office. Books of account must be kept for at least 10 years. The person responsible for the accounting function must be notified to CSSF. Annual accounts must be prepared according to Luxembourg GAAP (Lux GAAP) or IFRS (for public interest entities) and audited by an approved réviseur d'entreprises agréé.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 145–149 — Accounting obligations, record-keeping, responsible person" },
              { label: "Luxembourg Commercial Code", ref: "Arts. 17–23 — Accounting record requirements, retention periods" },
            ]
          },
          {
            id: "acc-f2", title: "NAV calculation and daily reconciliation", type: "read", xp: 25, duration: "8 min",
            content: "Daily reconciliation involves matching: (1) portfolio manager's positions vs fund administrator's books; (2) fund administrator's cash vs depositary's cash; (3) fund administrator's NAV vs independently-calculated check NAV. Breaks above materiality thresholds must be investigated and resolved within T+1. The reconciliation process and break resolution procedures must be documented in the IFM's operating procedures.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 524–545 — Valuation and reconciliation procedures" },
              { label: "CSSF Circular 24/856", ref: "§§ 15–25 — NAV error tolerance and reconciliation standards" },
            ]
          },
          {
            id: "acc-f3", title: "Annual accounts and audit deadlines", type: "read", xp: 20, duration: "5 min",
            content: "Filing deadlines: UCITS funds — annual report including audited accounts within 4 months of fiscal year-end; AIFs — within 6 months; Luxembourg ManCo/AIFM entity accounts — within 7 months (standard Luxembourg law). The auditor must be a CSSF-approved réviseur d'entreprises agréé. Accounts must include: balance sheet, profit & loss, notes, auditor's report, and manager's report.",
            sources: [
              { label: "2010 Law (UCITS)", ref: "Art. 154 — Annual report publication deadline (4 months)" },
              { label: "AIFMD", ref: "Art. 22 — AIF annual report deadline (6 months)" },
              { label: "Luxembourg Companies Law", ref: "Art. 79 — Annual accounts filing deadline for SA/Sàrl (7 months)" },
            ]
          },
          {
            id: "acc-f4", title: "Quiz: Fund Accounting", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Accounting documents must be accessible at which location per CSSF 18/698?", options: ["CSSF offices", "Luxembourg head office", "Fund administrator's office", "Any EU location"], answer: 1 },
              { q: "Luxembourg funds must file audited annual accounts within:", options: ["3 months", "5 months", "7 months", "12 months"], answer: 2 },
              { q: "The person responsible for the accounting function must be:", options: ["A CPA", "Notified to the CSSF", "A conducting officer", "Located outside Luxembourg"], answer: 1 },
            ]
          },
          {
            id: "acc-f5", title: "AIFMD II reporting template changes", type: "read", xp: 40, duration: "10 min",
            content: "AIFMD II standardises Annex IV reporting across the EU. Changes from AIFMD I: more granular leverage data (gross and commitment method), enhanced liquidity portfolio data, new fields for loan origination funds, and standardised ESMA XML templates. Luxembourg AIFMs file Annex IV via the CSSF e-filing portal quarterly (AUM > €1bn) or annually. Changes take effect from the Luxembourg transposition date (April 2026).",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Art. 24 — Revised Annex IV reporting obligations" },
              { label: "CSSF e-filing portal guidance", ref: "Annex IV filing instructions and updated XML templates (2026)" },
            ]
          },
        ]
      }
    ]
  },
  oversight: {
    label: "Oversight of Delegates",
    icon: "🔍",
    color: "orange",
    paths: [
      {
        id: "ov-foundations",
        title: "Delegation & Oversight Framework",
        description: "CSSF 18/698 Chapter 6 — written agreements, due diligence, and monitoring obligations.",
        level: "junior",
        xp: 160,
        modules: [
          {
            id: "ov-f1", title: "When can an IFM delegate?", type: "read", xp: 25, duration: "7 min",
            content: "An IFM may delegate functions if: (1) there is an objective reason for delegation; (2) the delegate is authorised/regulated and capable; (3) CSSF is notified in advance; (4) the IFM retains sufficient expertise to monitor the delegate; and (5) delegation does not create a letter-box entity. Delegation of portfolio management to a non-EU entity requires that country to have a cooperation agreement with CSSF.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 362–380 — Conditions for delegation, CSSF notification requirements" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 75 — Objective reasons for delegation; Art. 77 — Non-EU delegate requirements" },
            ]
          },
          {
            id: "ov-f2", title: "Written delegation agreements – what must they include?", type: "read", xp: 25, duration: "8 min",
            content: "Mandatory content of delegation agreements per CSSF 18/698 §§ 395–410: scope of delegated activities; SLA metrics; information and reporting obligations of the delegate; IFM's right to give instructions and terminate; audit and inspection rights; confidentiality; data protection; BCP of the delegate; sub-delegation restrictions; and compliance with applicable regulations. Agreements must be reviewed at least annually.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 395–413 — Mandatory content of delegation agreements" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 78 — Written agreement requirements for delegation" },
            ]
          },
          {
            id: "ov-f3", title: "Annual due diligence on delegates", type: "read", xp: 25, duration: "7 min",
            content: "The IFM must conduct at least annual due diligence on each delegate, covering: financial soundness, regulatory compliance status, operational capacity, AML/CFT framework, and key personnel stability. Due diligence results must be documented and presented to the board. Material findings (e.g., regulatory sanctions on delegate) must trigger immediate reassessment of the delegation arrangement.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 380–394 — Ongoing monitoring and annual due diligence on delegates" },
            ]
          },
          {
            id: "ov-f4", title: "Quiz: Delegation Oversight", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "What functions cannot be delegated under CSSF 18/698?", options: ["Accounting", "Monitoring of delegates", "Transfer agency", "IT support"], answer: 1 },
              { q: "CSSF must be notified of delegations:", options: ["After 30 days", "Only if material", "In advance", "Annually"], answer: 2 },
              { q: "The letter-box entity rule prohibits:", options: ["Outsourcing IT", "Delegating so many functions the IFM has no real substance", "Using cloud services", "Hiring non-Luxembourg staff"], answer: 1 },
            ]
          },
          {
            id: "ov-f5", title: "AIFMD II – New delegation substance rules", type: "read", xp: 40, duration: "10 min",
            content: "AIFMD II tightens delegation substance requirements: AIFMs must retain sufficient human resources at the Luxembourg level (conducting officers must be able to genuinely oversee delegated portfolio management); annual reports on non-EU delegation must be submitted to CSSF, who forward to ESMA; and ESMA will publish an aggregate register. The CSSF has signalled it will increase scrutiny of Luxembourg IFMs delegating extensively to non-EU entities from 2026.",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Art. 20(4a)–(4f) — Enhanced delegation reporting and substance requirements" },
              { label: "CSSF FAQ on AIFMD II (2025)", ref: "Section on delegation substance and new reporting obligations" },
            ]
          },
        ]
      }
    ]
  },
  "portfolio-management": {
    label: "Portfolio Management",
    icon: "📈",
    color: "indigo",
    paths: [
      {
        id: "pm-foundations",
        title: "Portfolio Management Compliance",
        description: "Investment guidelines, best execution, segregation from risk, and AIFMD obligations.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "pm-f1", title: "Segregation of portfolio management from risk control", type: "read", xp: 25, duration: "7 min",
            content: "CSSF 18/698 requires functional independence between portfolio management (1st line) and risk management (2nd line). The head of portfolio management cannot also head risk. This separation must be reflected in the organisational chart, reporting lines, and compensation structures. Risk must have the authority to independently challenge and, where necessary, override portfolio management decisions on risk limit breaches.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 466–472 — Independence of risk function from portfolio management" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Art. 42 — Functional independence of risk management" },
            ]
          },
          {
            id: "pm-f2", title: "Investment guidelines and mandate boundaries", type: "read", xp: 25, duration: "7 min",
            content: "Every fund must have written investment guidelines (in the prospectus/offering document) specifying: eligible asset classes, geographic and sector concentrations, leverage limits, currency hedging policy, and prohibited instruments. The portfolio manager must operate strictly within these guidelines. Breaches must be reported to compliance and risk immediately, and resolved within the cure period defined in the fund documents.",
            sources: [
              { label: "CSSF Circular 18/698", ref: "§§ 491–500 — Investment limit monitoring and breach resolution" },
              { label: "UCITS Directive", ref: "Arts. 50–57 — UCITS investment restrictions and eligible assets" },
            ]
          },
          {
            id: "pm-f3", title: "Best execution obligations under MiFID II", type: "read", xp: 25, duration: "8 min",
            content: "MiFID II Art. 27 requires IFMs to take all sufficient steps to obtain the best possible result for clients when executing orders. Best execution must be assessed across: price, costs, speed, likelihood of execution and settlement, size, nature, and any other relevant factors. IFMs must maintain a Best Execution Policy reviewed annually, report top execution venues annually (RTS 28), and monitor execution quality.",
            sources: [
              { label: "MiFID II (Directive 2014/65/EU)", ref: "Art. 27 — Best execution obligation; RTS 27 & 28 — execution quality reporting" },
              { label: "ESMA Q&A on MiFID II / MiFIR", ref: "Section on best execution — applicable to portfolio managers" },
            ]
          },
          {
            id: "pm-f4", title: "Quiz: Portfolio Management", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Can the head of risk management also head portfolio management?", options: ["Yes", "No", "Only for UCITS", "With CSSF approval"], answer: 1 },
              { q: "Liquidity stress testing for managed funds is:", options: ["Optional", "Recommended only", "Mandatory", "Only for closed-ended funds"], answer: 2 },
              { q: "Best execution obligations apply under:", options: ["AIFMD", "MiFID II", "UCITS Directive", "DORA"], answer: 1 },
            ]
          },
          {
            id: "pm-f5", title: "AIFMD II leverage and reporting changes", type: "read", xp: 35, duration: "10 min",
            content: "Under AIFMD II, portfolio managers of AIFs must provide enhanced leverage data to the risk function for Annex IV reporting. New requirements: monthly leverage monitoring at the fund level, separate gross and commitment method calculations, and narrative explanation of leverage strategy in investor disclosures. For loan originating funds, a separate leverage cap (175%/300%) applies and must be monitored daily.",
            sources: [
              { label: "AIFMD II (Directive 2024/927/EU)", ref: "Art. 24 — Enhanced Annex IV leverage reporting; Arts. 15a–15f — LOF leverage caps" },
              { label: "AIFMD Delegated Regulation 231/2013", ref: "Arts. 7–11 — Gross and commitment method calculations (still apply)" },
            ]
          },
        ]
      }
    ]
  },
  tax: {
    label: "Tax",
    icon: "🧾",
    color: "yellow",
    paths: [
      {
        id: "tax-foundations",
        title: "Luxembourg Fund Taxation",
        description: "Taxe d'abonnement, FATCA/CRS, DAC6, Pillar Two, and treaty eligibility.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "tax-f1", title: "Luxembourg taxe d'abonnement explained", type: "read", xp: 25, duration: "7 min",
            content: "The taxe d'abonnement is Luxembourg's main fund-level tax. Standard rate 0.05% p.a. on total NAV (calculated quarterly). Reduced rate 0.01% applies to: money market funds, funds investing in other Luxembourg funds already subject to the tax, funds limited to institutional investors, and microfinance funds. Exemptions exist for certain pension funds and ETFs in some cases. Calculated on last business day of each quarter.",
            sources: [
              { label: "2010 Law (UCITS)", ref: "Arts. 174–176 — Taxe d'abonnement rates, exemptions, and calculation" },
              { label: "2007 Law (SIF)", ref: "Art. 68 — Taxe d'abonnement for SIFs (0.01% flat rate)" },
            ]
          },
          {
            id: "tax-f2", title: "FATCA and CRS reporting obligations", type: "read", xp: 25, duration: "8 min",
            content: "FATCA (US law, implemented in Luxembourg via IGA signed 2014) requires Luxembourg financial institutions to report US account holders' financial information to the US IRS via the ACD (Administration des Contributions Directes). CRS (OECD Common Reporting Standard, implemented by DAC2/Law 18 December 2015) extends similar reporting to 100+ participating countries. Annual reporting deadline: 30 June of the following year.",
            sources: [
              { label: "Luxembourg FATCA IGA (2014)", ref: "Model 1 IGA — reporting obligations and exempt entities" },
              { label: "DAC2 / CRS Luxembourg Law (2015)", ref: "Arts. 1–20 — CRS due diligence and reporting framework" },
              { label: "ACD reporting portal guidance", ref: "FATCA/CRS annual filing instructions" },
            ]
          },
          {
            id: "tax-f3", title: "DAC6 – cross-border tax arrangements", type: "read", xp: 25, duration: "8 min",
            content: "DAC6 (Directive 2018/822/EU) requires intermediaries (lawyers, accountants, fund managers) to report cross-border tax arrangements with certain hallmarks to the ACD within 30 days. Hallmarks include: confidentiality clauses on tax benefits, premium fees linked to tax advantage, round-tripping of funds, and use of preferential regimes. Fund structuring advice that falls within DAC6 scope must be assessed before implementation.",
            sources: [
              { label: "DAC6 Directive (EU 2018/822)", ref: "Annex IV — Hallmarks A to E; Arts. 8ab — Reporting obligations" },
              { label: "Luxembourg DAC6 Law (2020)", ref: "Arts. 1–12 — Luxembourg transposition, intermediary definition, filing deadlines" },
            ]
          },
          {
            id: "tax-f4", title: "Quiz: Fund Taxation", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Luxembourg UCITS standard subscription tax rate is:", options: ["0.05%", "0.01%", "0.5%", "1%"], answer: 0 },
              { q: "Pillar Two introduces a global minimum tax of:", options: ["10%", "12%", "15%", "20%"], answer: 2 },
              { q: "FATCA is a US law requiring foreign institutions to report on:", options: ["EU investors", "US account holders", "Crypto assets", "Real estate investments"], answer: 1 },
            ]
          },
          {
            id: "tax-f5", title: "BEPS Pillar Two impact on fund structures", type: "read", xp: 35, duration: "10 min",
            content: "BEPS Pillar Two (Global Minimum Tax, 15%) was transposed in Luxembourg by the Law of 22 December 2023. Investment funds and their holding structures may be impacted if part of a large group (>€750m consolidated revenue). Key exclusions: substance-based carve-outs for payroll and tangible assets; exclusion for investment funds that are Ultimate Parent Entities; Luxembourg IIR (Income Inclusion Rule) applies to constituent entities. Tax advisers must assess each structure.",
            sources: [
              { label: "Luxembourg Pillar Two Law (22 December 2023)", ref: "Full text — Chapter 10: investment fund exclusions and carve-outs" },
              { label: "OECD Pillar Two Model Rules (2021)", ref: "Arts. 1–9 — GloBE rules, definitions, and investment fund treatment" },
            ]
          },
        ]
      }
    ]
  },
  "investor-relations": {
    label: "Investor Relations",
    icon: "🤝",
    color: "teal",
    paths: [
      {
        id: "ir-foundations",
        title: "Investor Relations & Disclosure",
        description: "PRIIP KIDs, SFDR disclosures, fund naming rules, and investor communication obligations.",
        level: "junior",
        xp: 150,
        modules: [
          {
            id: "ir-f1", title: "PRIIP KID and KIID requirements", type: "read", xp: 25, duration: "7 min",
            content: "The PRIIPs KID (Key Information Document) replaced the UCITS KIID from January 2023 for all retail UCITS. Format: maximum 3 pages, standardised sections (what is this product, risk indicator, performance scenarios, costs, how long to hold). The KID must be translated into the language of each country where the fund is marketed to retail investors and updated annually (or when materially out of date).",
            sources: [
              { label: "PRIIPs Regulation (EU 1286/2014)", ref: "Arts. 5–14 — KID format, content, and delivery obligations" },
              { label: "PRIIPs Delegated Regulation (EU 2017/653 as amended)", ref: "Annexes I–IV — Standardised templates and calculation methodologies" },
            ]
          },
          {
            id: "ir-f2", title: "SFDR Article 8 and Article 9 disclosures", type: "read", xp: 25, duration: "8 min",
            content: "SFDR (EU 2019/2088) classifies funds as: Article 6 (no sustainability claims), Article 8 (promotes environmental or social characteristics), or Article 9 (has sustainable investment as objective). Pre-contractual disclosures (template in Annex II/IV of SFDR RTS) must be included in the prospectus. Periodic reporting (RTS templates) in annual report. Greenwashing risk: ESMA and CSSF actively supervise SFDR classification accuracy.",
            sources: [
              { label: "SFDR (EU 2019/2088)", ref: "Arts. 8–9 — Fund classification; Arts. 11–12 — Periodic reporting obligations" },
              { label: "SFDR Level 2 RTS (EU 2022/1288)", ref: "Annexes II–IV — Pre-contractual and periodic disclosure templates" },
            ]
          },
          {
            id: "ir-f3", title: "ESG fund naming rules (ESMA guidelines)", type: "read", xp: 25, duration: "7 min",
            content: "ESMA's final naming guidelines (2024) set thresholds for ESG-related fund names. Funds using 'ESG', 'SRI', 'responsible' in their name: minimum 80% of investments must meet ESG characteristics. Funds using 'sustainable': 80% rule plus meaningful proportion of sustainable investments per SFDR Art. 2(17). Funds using 'impact': investments must demonstrate measurable real-world impact. Paris-aligned benchmark exclusions apply to all categories.",
            sources: [
              { label: "ESMA Guidelines on fund names (ESMA34-472-2816)", ref: "Final Report May 2024 — Annex I: full keyword list, thresholds, and transition periods" },
              { label: "CSSF circular on ESMA naming guidelines transposition", ref: "Expected 2025 — Luxembourg implementation deadline" },
            ]
          },
          {
            id: "ir-f4", title: "Quiz: Investor Relations", type: "quiz", xp: 40, duration: "5 min", questions: [
              { q: "Under ESMA naming guidelines, ESG funds must have what minimum sustainable investment threshold?", options: ["50%", "70%", "80%", "100%"], answer: 2 },
              { q: "SFDR Article 9 funds have:", options: ["No sustainability objective", "Sustainability as a promotion", "Sustainable investment as their objective", "Only ESG exclusions"], answer: 2 },
              { q: "Investor complaint handling must be overseen by:", options: ["The distributor", "The IFM's compliance function", "The depositary", "The CSSF directly"], answer: 1 },
            ]
          },
          {
            id: "ir-f5", title: "Investor notification obligations for NAV errors", type: "read", xp: 35, duration: "8 min",
            content: "When a NAV error exceeds the CSSF tolerance threshold (0.5% for UCITS per Circular 24/856), the IFM must: (1) notify CSSF within 24 hours of discovery; (2) notify affected investors and the depositary; (3) calculate and pay compensation to all affected investors who redeemed/subscribed at the incorrect price; (4) provide CSSF with a root cause analysis and corrective action plan within 30 days.",
            sources: [
              { label: "CSSF Circular 24/856", ref: "§§ 25–40 — NAV error thresholds, notification procedures, compensation methodology" },
              { label: "CSSF FAQ on NAV errors", ref: "Q&A on calculation of investor compensation and reporting timelines" },
            ]
          },
        ]
      }
    ]
  },
  "fund-admin": {
    label: "Fund Administration",
    icon: "🏛️",
    color: "teal",
    paths: [
      {
        id: "fa-foundations",
        title: "Fund Administration Essentials",
        description: "What UCI administrators do, the three core functions, and oversight obligations under Circular 22/811.",
        level: "junior",
        xp: 180,
        modules: [
          {
            id: "fa-f1", title: "What does a UCI administrator do?", type: "read", xp: 25, duration: "7 min",
            content: "A UCI administrator (central administration agent) performs three core functions: (1) Registrar agent — maintains the register of shareholders/unitholders, processes subscriptions and redemptions, handles investor AML/KYC checks; (2) NAV calculation and fund accounting — calculates the fund's Net Asset Value, maintains accounting records, and reconciles positions with the depositary; (3) Client communication — prepares financial reports, distributes investor notices, and handles regulatory filings. Under CSSF Circular 22/811, these three functions can be performed by the management company itself, or delegated to a specialised third-party administrator. Either way, the management company retains ultimate oversight responsibility.",
            sources: [
              { label: "CSSF Circular 22/811 (as amended by 25/900)", ref: "Points 1–9 — Scope and definition of UCI administrator functions" },
            ]
          },
          {
            id: "fa-f2", title: "The registrar agent function", type: "read", xp: 25, duration: "8 min",
            content: "The registrar agent maintains the official register of who owns units or shares in the fund. This includes: processing subscription and redemption orders, maintaining the register of unitholders/shareholders, issuing and cancelling units/shares, managing the AML/KYC process for investors (verifying identity, checking sanctions lists, performing ongoing monitoring), handling transfers between investors, and managing nominee/omnibus account structures. Under Circular 22/811, the registrar must have written procedures for each of these tasks, including clear escalation paths for suspicious transactions. The registrar function is the front line of AML/CFT compliance for the fund.",
            sources: [
              { label: "CSSF Circular 22/811", ref: "Points 10–17 — Registrar agent obligations" },
              { label: "Law of 12 November 2004 (AML/CFT)", ref: "Arts. 3–5 — CDD and reporting obligations applicable to registrar function" },
            ]
          },
          {
            id: "fa-f3", title: "NAV calculation and fund accounting", type: "read", xp: 25, duration: "8 min",
            content: "The NAV calculation and accounting function is responsible for computing the fund's Net Asset Value per share/unit. This includes: collecting market prices and valuations for all portfolio assets, applying the fund's accounting policies and valuation methodology, calculating the NAV per share class, performing reconciliations between the fund's books and the depositary's records, detecting and reporting NAV errors (per CSSF Circular 24/856), and maintaining complete accounting records. For UCITS, NAV must be calculated at least twice a month (daily in practice). For AIFs, the frequency is set in the fund's constitutional documents but must be at least annually.",
            sources: [
              { label: "CSSF Circular 22/811", ref: "Points 26–32 — NAV calculation and accounting function" },
              { label: "CSSF Circular 24/856", ref: "§§ 15–25 — NAV error tolerance and reconciliation standards" },
            ]
          },
          {
            id: "fa-f4", title: "Quiz — Fund Administration", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "What are the three core functions of a UCI administrator?", options: ["Compliance, audit, and reporting", "Registrar, NAV calculation/accounting, and client communication", "Portfolio management, risk, and compliance", "Custody, clearing, and settlement"], answer: 1 },
              { q: "Who retains ultimate responsibility for fund administration even when delegated?", options: ["The fund administrator", "The depositary", "The management company / AIFM", "The CSSF"], answer: 2 },
              { q: "What circular governs NAV error handling in Luxembourg?", options: ["CSSF Circular 18/698", "CSSF Circular 22/811", "CSSF Circular 24/856", "CSSF Circular 02/77"], answer: 2 },
              { q: "Can a RAIF's AIFM perform central administration in-house?", options: ["No, must always use third party", "Yes, if authorised to do so", "Only with CSSF waiver", "Only for accounting, not registrar"], answer: 1 },
            ]
          },
          {
            id: "fa-f5", title: "Delegation and oversight in fund administration", type: "read", xp: 40, duration: "10 min",
            content: "When a management company delegates fund administration to a third party, it does not transfer its regulatory responsibility. Under CSSF Circular 22/811, the ManCo must: enter into a written delegation agreement specifying scope, performance standards, and termination conditions; maintain the expertise and resources to effectively oversee the delegate; conduct periodic due diligence reviews of the administrator's performance; ensure the administrator has adequate BCP/DRP plans; and retain the right to inspect the administrator's books and records. The depositary also has an oversight role: it must verify that NAV calculation is carried out in accordance with applicable law and fund documents. The administrator may sub-delegate certain tasks (e.g. transfer agency to a platform) only with the ManCo's prior consent and subject to equivalent oversight requirements.",
            sources: [
              { label: "CSSF Circular 22/811", ref: "Points 37–48 — Delegation conditions and ManCo oversight obligations" },
              { label: "CSSF Circular 18/698", ref: "§§ 362–413 — Delegation framework and monitoring requirements" },
            ]
          },
        ]
      }
    ]
  },
  "ifm-governance": {
    label: "IFM Governance & Audit",
    icon: "🏛",
    color: "indigo",
    paths: [
      {
        id: "ifm-gov-foundations",
        title: "IFM Governance & Audit",
        description: "The CSSF self-assessment questionnaire, management letter, and separate report under Circular 21/789.",
        level: "junior",
        xp: 160,
        modules: [
          {
            id: "ifm-g1", title: "The IFM self-assessment questionnaire", type: "read", xp: 35, duration: "10 min",
            content: "Every Luxembourg investment fund manager (IFM) — including Chapter 15 and 16 ManCos, authorised AIFMs, registered AIFMs, FIAAGs, and SIAGs — must complete an annual self-assessment questionnaire and submit it to the CSSF via the eDesk Portal (https://edesk.apps.cssf.lu). The questionnaire is customised based on the IFM's authorisation type and covers predefined topics including governance, substance, organisation, internal controls, and supervision of delegates. The management body (board of directors or governing body) and senior management are responsible for the content. Deadline: within 4 months after the end of the IFM's financial year. AML/CFT matters are NOT covered in this questionnaire — those are addressed separately under Circular 21/788. Key regulatory references: CSSF Circular 21/789 (as amended by 23/839), Art. 147(2) of the UCI Law, Art. 50 of the AIFM Law. Key takeaway: The self-assessment questionnaire is the CSSF's annual health check on your organisation — take it seriously, because the auditor will verify your answers.",
            sources: [
              { label: "CSSF Circular 21/789 (as amended by 23/839)", ref: "Full circular — scope, questionnaire topics, submission deadline, and eDesk instructions" },
              { label: "Art. 147(2) UCI Law / Art. 50 AIFM Law", ref: "Legal basis for annual self-assessment obligation" },
            ]
          },
          {
            id: "ifm-g2", title: "The management letter & the separate report", type: "read", xp: 40, duration: "12 min",
            content: "IFMs must appoint an approved statutory auditor (réviseur d'entreprises agréé — REA) who produces two key annual documents beyond the standard audit report: (1) The management letter — highlights weaknesses and points needing improvement identified during the statutory audit, following ISA 260 and ISA 265 standards. It must include follow-up on unresolved issues from prior years and a detailed remediation plan with timetables from the IFM's management. Submitted via eDesk within 7 months after year-end. (2) The separate report — the REA performs specific procedures defined by the CSSF to verify the reliability of the IFM's answers in the self-assessment questionnaire. Results are presented as answers to closed-ended questions (not an audit opinion). Also submitted via eDesk within 7 months after year-end. If the REA finds weaknesses that management does not remedy in a timely manner, the REA must note in the management letter that no management comments were received. Key regulatory references: CSSF Circular 21/789 (Sections 4.1–4.3), Art. 104/154 of the UCI Law, Art. 7a of the AIFM Law. Key takeaway: The auditor isn't just checking your books — they're also checking whether you told the CSSF the truth in your self-assessment.",
            sources: [
              { label: "CSSF Circular 21/789, Sections 4.1–4.3", ref: "Management letter and separate report requirements, submission deadlines" },
              { label: "Art. 104/154 UCI Law, Art. 7a AIFM Law", ref: "Legal basis for REA audit obligations" },
              { label: "ISA 260 and ISA 265", ref: "International auditing standards for communication of audit findings and weaknesses" },
            ]
          },
          {
            id: "ifm-g3", title: "Quiz — IFM Governance", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "How often must an IFM complete the CSSF self-assessment questionnaire?", options: ["Every 2 years", "Annually", "Every 3 years", "Only on request from CSSF"], answer: 1 },
              { q: "What is the deadline for submitting the self-assessment questionnaire?", options: ["3 months after year-end", "4 months after year-end", "5 months after year-end", "7 months after year-end"], answer: 1 },
              { q: "What two documents must the REA produce annually beyond the audit report?", options: ["Risk report and compliance report", "Management letter and separate report", "Self-assessment and management letter", "Separate report and risk procedure"], answer: 1 },
              { q: "Via which platform must all these documents be submitted to the CSSF?", options: ["CSSF Sofie portal", "eDesk Portal", "Direct email to CSSF", "Paper submission to CSSF offices"], answer: 1 },
            ]
          },
        ]
      }
    ]
  },
  "aml-pro": {
    label: "AML/CFT Professional",
    icon: "🛡️",
    color: "rose",
    paths: [
      {
        id: "aml-pro-foundations",
        title: "AML/CFT for Fund Professionals",
        description: "Luxembourg's AML/CFT framework, CDD, PEPs, EDD triggers, and suspicious transaction reporting.",
        level: "junior",
        xp: 230,
        modules: [
          {
            id: "aml-p1", title: "Luxembourg's AML/CFT framework — who's covered?", type: "read", xp: 25, duration: "8 min",
            content: "Luxembourg's anti-money laundering regime is built on the Law of 12 November 2004 (as amended through February 2025) and the CSSF Regulation No 12-02 (as amended by No 20-05). The law applies to: credit institutions, UCIs and their management companies, AIFMs, insurance undertakings, investment firms, payment institutions, and — since the February 2025 amendment — crypto-asset service providers (CASPs). The EU framework is the 4th AML Directive (2015/849) as amended by the 5th (2018/843). For the fund industry, AML obligations fall on the ManCo/AIFM and, where fund administration is delegated, on the administrator performing registrar functions. Penalties for non-compliance: administrative fines up to EUR 5 million (or 10% of annual turnover), withdrawal of authorisation, and personal liability for compliance officers.",
            sources: [
              { label: "Law of 12 November 2004 on AML/CFT (as amended Feb 2025)", ref: "Arts. 1–2 — Scope and covered professionals" },
              { label: "CSSF Regulation No 12-02 (as amended by No 20-05)", ref: "Arts. 1–3 — Application to fund entities" },
              { label: "4th AML Directive (EU 2015/849) as amended by 5th (EU 2018/843)", ref: "Arts. 1–4 — Scope and definitions" },
            ]
          },
          {
            id: "aml-p2", title: "Customer Due Diligence — the basics", type: "read", xp: 25, duration: "8 min",
            content: "CDD has four components under Luxembourg law: (1) Identifying and verifying the customer's identity using reliable, independent documents; (2) Identifying all beneficial owners — natural persons owning >25% of shares or voting rights (direct or indirect); (3) Understanding the purpose and intended nature of the business relationship; (4) Ongoing monitoring. For natural persons: full name, date/place of birth, nationality, residential address, and photo ID copy. For legal entities: name, legal form, registered office, directors/managers, certified RCS extract dated within 3 months. CDD must be completed before the business relationship is established — before the investor's subscription is accepted. Source of funds (where this transaction's money comes from) and source of wealth (how the person built their overall wealth) are two distinct concepts, both relevant for higher-risk clients.",
            sources: [
              { label: "Law of 12 November 2004", ref: "Art. 3(2) — CDD obligations: identification, UBO, purpose, monitoring" },
              { label: "CSSF Regulation No 12-02", ref: "Arts. 13–19 — CDD procedures and documentation requirements" },
            ]
          },
          {
            id: "aml-p3", title: "PEPs, high-risk countries, and Enhanced Due Diligence", type: "read", xp: 30, duration: "10 min",
            content: "Enhanced Due Diligence (EDD) is mandatory when: the customer or beneficial owner is a Politically Exposed Person (PEP) — defined as heads of state, government ministers, MPs, supreme court judges, ambassadors, senior military officers, board members of central banks or state-owned enterprises, AND their family members and close associates (Art. 1(9)–(11) of the 2004 Law); the customer is from a high-risk third country (EU Commission list); transactions are unusually complex or large with no apparent economic purpose; or in correspondent banking relationships with non-EEA institutions. Relationships with shell banks are PROHIBITED entirely (Art. 3-4). EDD measures: obtain senior management approval, establish source of wealth AND source of funds, apply enhanced ongoing monitoring. Simplified Due Diligence (SDD) is permitted for low-risk clients but does NOT mean no due diligence — identification and verification are still required, just with lighter ongoing monitoring.",
            sources: [
              { label: "Law of 12 November 2004", ref: "Arts. 3-2 and 3-3 — EDD triggers; Art. 1(9)–(11) — PEP definition including family and associates" },
              { label: "CSSF Regulation No 12-02", ref: "Arts. 22–24 — EDD measures and procedures" },
            ]
          },
          {
            id: "aml-p4", title: "Quiz — AML/CFT Basics", type: "quiz", xp: 45, duration: "6 min", questions: [
              { q: "What ownership threshold defines a beneficial owner under Luxembourg law?", options: [">10% of shares", ">25% of shares or voting rights", ">50% of shares", ">33% of shares"], answer: 1 },
              { q: "Are relationships with shell banks permitted under Luxembourg law?", options: ["Yes, with enhanced due diligence", "Yes, with senior management approval", "No, they are prohibited entirely", "Only for EU-domiciled shell banks"], answer: 2 },
              { q: "Does simplified due diligence mean no identification is required?", options: ["Yes, SDD exempts from all CDD", "No — identification is still required, just lighter ongoing monitoring", "Only for regulated EU institutions", "Yes, for amounts under EUR 15,000"], answer: 1 },
              { q: "How often should CDD files be reviewed for high-risk clients?", options: ["Every 5 years", "Every 3 years", "Every 2 years", "Annually"], answer: 3 },
            ]
          },
          {
            id: "aml-p5", title: "Suspicious transaction reporting", type: "read", xp: 40, duration: "10 min",
            content: "When a professional identifies or suspects a transaction involves proceeds of crime or terrorism financing, they must file a Suspicious Transaction Report (STR) with Luxembourg's Financial Intelligence Unit — the Cellule de Renseignement Financier (CRF). The obligation exists regardless of the amount. Key rules: the report must be filed BEFORE the transaction is executed if possible; if delaying would risk tipping off the client, report immediately after; the professional must NOT disclose to the client that an STR has been filed (tipping-off prohibition — Art. 5-1 of the 2004 Law); and all supporting documents must be retained for at least 5 years. Failure to report is a criminal offence. Luxembourg law protects good-faith reporters — professionals who file STRs cannot be held liable for breach of professional secrecy. The cash transaction CDD threshold is EUR 15,000 (Art. 3(1) of the 2004 Law). For occasional wire transfers, identification is triggered at EUR 1,000 (EU Funds Transfer Regulation).",
            sources: [
              { label: "Law of 12 November 2004", ref: "Art. 5 — Reporting obligation to CRF; Art. 5-1 — Tipping-off prohibition" },
              { label: "EU Funds Transfer Regulation (EU 2015/847)", ref: "Art. 3 — EUR 1,000 threshold for occasional wire transfers" },
            ]
          },
          {
            id: "aml-p6", title: "The AML/CFT Summary Report RC (SRRC)", type: "read", xp: 40, duration: "10 min",
            content: "The CSSF requires all in-scope entities to submit an annual AML/CFT Summary Report RC (SRRC) as part of its data-driven supervision strategy, introduced by CSSF Circular 24/854. Key facts: Who prepares it? The Responsable du Contrôle (RC) — the person responsible for day-to-day AML/CFT control. Who submits it? The Responsable du Respect (RR) — the person at board/management level ultimately responsible for AML/CFT compliance. How? Exclusively via the CSSF eDesk platform — no other submission method is accepted. When? Within 5 months after closing the annual accounts. The RR can delegate the technical submission to another eDesk user with the 'AML/CFT responsible' role, but the RR remains ultimately responsible. Who is in scope? All Luxembourg IFMs (ManCos, AIFMs, registered AIFMs), Luxembourg branches of foreign IFMs, and Luxembourg investment funds supervised by the CSSF for AML/CFT. Who is excluded? Funds that have designated a Luxembourg ManCo that submits the report on their behalf. Effective for financial years ending on or after 31 December 2023. Key regulatory references: CSSF Circular 24/854, Art. 42(7) of CSSF Regulation 12-02. Key takeaway: The SRRC is the CSSF's annual AML compliance snapshot — make sure your RC and RR know their roles and deadlines.",
            sources: [
              { label: "CSSF Circular 24/854", ref: "Full circular — scope, RC/RR roles, eDesk submission procedure, deadlines" },
              { label: "Art. 42(7) of CSSF Regulation 12-02", ref: "Legal basis for the SRRC obligation" },
            ]
          },
        ]
      }
    ]
  },
};

// Recommend paths based on function and seniority
export function getRecommendedPaths(functionId, seniority) {
  const fnPaths = LEARNING_PATHS[functionId];
  if (!fnPaths) return [];

  const isJunior = ["Intern / Trainee", "Junior Analyst", "Analyst"].includes(seniority);
  const isSenior = ["Senior Manager / VP", "Director / C-level"].includes(seniority);

  return fnPaths.paths.map(path => ({
    ...path,
    recommended: isJunior ? path.level === "junior" : isSenior ? path.level === "senior" : true,
  }));
}