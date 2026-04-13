export type ClientStatus = "New" | "Pending" | "Under Review" | "Approved" | "Rejected";
export type Sector = "Generics" | "Vaccines" | "Diagnostics" | "Herbal" | "Biologics";
export type RiskLevel = "Low" | "Medium" | "High";
export type Sentiment = "Positive" | "Neutral" | "Cautious";

export interface FundingHistory {
  year: number;
  amount: number;
  repaidOnTime: boolean;
  status: "Repaid On Time" | "Repaid Late" | "Defaulted";
}

export interface ParameterScore {
  name: string;
  passed: boolean;
  score?: number;
  maxScore?: number;
  explanation: string;
}

export interface Comment {
  id: string;
  author: string;
  role: "Donor" | "Investor";
  text: string;
  date: string;
  sentiment: Sentiment;
}

export interface AIAssessment {
  stage: number;
  title: string;
  status: "pending" | "running" | "complete";
  result?: string;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  sector: Sector;
  location: string;
  amountRequested: number;
  amountFunded: number;
  purpose: string;
  repaymentPlan: {
    monthlyInstallment: number;
    interestRate: number;
    timelineMonths: number;
  };
  localSourcingPercentage: number;
  manufacturingCapacity: string;
  mcazCompliant: boolean;
  status: ClientStatus;
  applicationDate: string;
  parameterScores: ParameterScore[];
  fundingHistory: FundingHistory[];
  comments: Comment[];
  aiAssessment: AIAssessment[];
  documents: string[];
}

export const mockClients: Client[] = [
  {
    id: "1",
    companyName: "ZimGeneric Pharma",
    contactPerson: "Tendai Moyo",
    sector: "Generics",
    location: "Harare",
    amountRequested: 450000,
    amountFunded: 315000,
    purpose: "Expand production line for essential generic medicines including ARVs and antimalarials",
    repaymentPlan: { monthlyInstallment: 22500, interestRate: 8.5, timelineMonths: 24 },
    localSourcingPercentage: 65,
    manufacturingCapacity: "WHO-GMP certified facility with 3 production lines, capacity of 50M tablets/year",
    mcazCompliant: true,
    status: "Under Review",
    applicationDate: "2026-03-15",
    parameterScores: [
      { name: "MCAZ Regulatory Compliance", passed: true, explanation: "Valid MCAZ license #ZW-2024-0891" },
      { name: "Manufacturing Capacity & Equipment", score: 82, maxScore: 100, passed: true, explanation: "WHO-GMP certified, 3 active production lines" },
      { name: "Local Sourcing Percentage", passed: true, explanation: "65% local sourcing — exceeds 50% threshold" },
      { name: "Repayment Plan & Timeline", score: 75, maxScore: 100, passed: true, explanation: "Clear 24-month plan with 8.5% interest" },
      { name: "Previous Funding History", passed: true, explanation: "2 prior loans, both repaid on time" },
    ],
    fundingHistory: [
      { year: 2024, amount: 200000, repaidOnTime: true, status: "Repaid On Time" },
      { year: 2023, amount: 150000, repaidOnTime: true, status: "Repaid On Time" },
    ],
    comments: [
      { id: "c1", author: "Sarah Chen", role: "Donor", text: "Impressive track record with ARV production. The local sourcing percentage is encouraging.", date: "2026-03-20", sentiment: "Positive" },
      { id: "c2", author: "James Mukwena", role: "Investor", text: "Good fundamentals but the expansion timeline seems ambitious given current supply chain issues.", date: "2026-03-22", sentiment: "Cautious" },
    ],
    aiAssessment: [
      { stage: 1, title: "Document & Compliance Review", status: "complete", result: "All required documents uploaded. MCAZ license verified and valid until 2027." },
      { stage: 2, title: "Financial & Repayment Analysis", status: "complete", result: "Strong financials. Debt-to-equity ratio of 0.3. Revenue growth of 22% YoY. Repayment capacity confirmed." },
      { stage: 3, title: "Parameter Scoring", status: "complete", result: "Overall match: 84%. All 5 parameters passed. Strongest in regulatory compliance and track record." },
      { stage: 4, title: "Scenario Modeling", status: "complete", result: "Best Case: Full repayment in 20 months with 15% ROI. Worst Case: Extended to 30 months due to supply chain delays. Risk Level: Low. Recommendation: APPROVE with standard monitoring." },
    ],
    documents: ["Government ID", "MCAZ License", "Bank Statements", "Business Registration", "Revenue Statements", "Repayment Schedule", "Business Plan"],
  },
  {
    id: "2",
    companyName: "AfriVax Solutions",
    contactPerson: "Grace Ndlovu",
    sector: "Vaccines",
    location: "Bulawayo",
    amountRequested: 800000,
    amountFunded: 200000,
    purpose: "Establish cold-chain vaccine storage and distribution center for southern Zimbabwe",
    repaymentPlan: { monthlyInstallment: 30000, interestRate: 10, timelineMonths: 36 },
    localSourcingPercentage: 40,
    manufacturingCapacity: "New facility under construction, expected capacity 10M doses/year",
    mcazCompliant: false,
    status: "New",
    applicationDate: "2026-04-01",
    parameterScores: [
      { name: "MCAZ Regulatory Compliance", passed: false, explanation: "MCAZ application pending — expected approval Q3 2026" },
      { name: "Manufacturing Capacity & Equipment", score: 45, maxScore: 100, passed: false, explanation: "Facility under construction, not yet operational" },
      { name: "Local Sourcing Percentage", passed: false, explanation: "40% local sourcing — below 50% threshold" },
      { name: "Repayment Plan & Timeline", score: 60, maxScore: 100, passed: true, explanation: "36-month plan, higher interest rate reflects risk" },
      { name: "Previous Funding History", passed: false, explanation: "No previous funding history" },
    ],
    fundingHistory: [],
    comments: [
      { id: "c3", author: "Peter Hall", role: "Donor", text: "Vaccine infrastructure is critical for Zimbabwe but this company needs more time to mature.", date: "2026-04-05", sentiment: "Cautious" },
    ],
    aiAssessment: [],
    documents: ["Government ID", "Business Registration", "Business Plan"],
  },
  {
    id: "3",
    companyName: "Muti Natural Health",
    contactPerson: "Rumbidzai Chikore",
    sector: "Herbal",
    location: "Mutare",
    amountRequested: 120000,
    amountFunded: 120000,
    purpose: "Scale production of WHO-approved traditional herbal medicines for malaria prevention",
    repaymentPlan: { monthlyInstallment: 7500, interestRate: 7, timelineMonths: 18 },
    localSourcingPercentage: 92,
    manufacturingCapacity: "Small-scale certified lab, 500K units/year, GMP-compliant",
    mcazCompliant: true,
    status: "Approved",
    applicationDate: "2026-02-10",
    parameterScores: [
      { name: "MCAZ Regulatory Compliance", passed: true, explanation: "Valid MCAZ herbal medicine license" },
      { name: "Manufacturing Capacity & Equipment", score: 58, maxScore: 100, passed: true, explanation: "Small but well-equipped facility, GMP-compliant" },
      { name: "Local Sourcing Percentage", passed: true, explanation: "92% local sourcing — excellent" },
      { name: "Repayment Plan & Timeline", score: 88, maxScore: 100, passed: true, explanation: "Conservative 18-month plan with competitive 7% rate" },
      { name: "Previous Funding History", passed: true, explanation: "1 prior loan repaid on time" },
    ],
    fundingHistory: [
      { year: 2025, amount: 80000, repaidOnTime: true, status: "Repaid On Time" },
    ],
    comments: [
      { id: "c4", author: "Sarah Chen", role: "Donor", text: "Excellent local sourcing. This is exactly the kind of company we should be funding.", date: "2026-02-15", sentiment: "Positive" },
      { id: "c5", author: "David Mapfumo", role: "Investor", text: "Small scale but solid execution. Happy to see continued growth.", date: "2026-02-18", sentiment: "Positive" },
    ],
    aiAssessment: [
      { stage: 1, title: "Document & Compliance Review", status: "complete", result: "All documents verified. MCAZ herbal license valid." },
      { stage: 2, title: "Financial & Repayment Analysis", status: "complete", result: "Conservative financials. Low burn rate. Solid repayment capacity with 30% margin buffer." },
      { stage: 3, title: "Parameter Scoring", status: "complete", result: "Overall match: 91%. Outstanding local sourcing at 92%." },
      { stage: 4, title: "Scenario Modeling", status: "complete", result: "Best Case: Full repayment in 15 months. Worst Case: 20 months with seasonal dip. Risk Level: Low. Recommendation: STRONGLY APPROVE." },
    ],
    documents: ["Government ID", "MCAZ License", "Bank Statements", "Business Registration", "Revenue Statements", "Repayment Schedule", "Business Plan"],
  },
  {
    id: "4",
    companyName: "DiagnoZim Technologies",
    contactPerson: "Kudzai Shumba",
    sector: "Diagnostics",
    location: "Harare",
    amountRequested: 350000,
    amountFunded: 0,
    purpose: "Develop rapid diagnostic test kits for TB and HIV, replacing imported alternatives",
    repaymentPlan: { monthlyInstallment: 18000, interestRate: 9, timelineMonths: 24 },
    localSourcingPercentage: 55,
    manufacturingCapacity: "ISO 13485 certified lab, prototype stage, scaling to 2M kits/year",
    mcazCompliant: true,
    status: "Pending",
    applicationDate: "2026-03-28",
    parameterScores: [
      { name: "MCAZ Regulatory Compliance", passed: true, explanation: "MCAZ diagnostic device license obtained" },
      { name: "Manufacturing Capacity & Equipment", score: 52, maxScore: 100, passed: true, explanation: "ISO certified but still scaling from prototype" },
      { name: "Local Sourcing Percentage", passed: true, explanation: "55% local sourcing — meets threshold" },
      { name: "Repayment Plan & Timeline", score: 70, maxScore: 100, passed: true, explanation: "Standard 24-month plan" },
      { name: "Previous Funding History", passed: false, explanation: "First-time applicant — no funding history" },
    ],
    fundingHistory: [],
    comments: [],
    aiAssessment: [],
    documents: ["Government ID", "MCAZ License", "Business Registration", "Business Plan"],
  },
  {
    id: "5",
    companyName: "BioZim Pharmaceuticals",
    contactPerson: "Farai Chirau",
    sector: "Biologics",
    location: "Gweru",
    amountRequested: 1200000,
    amountFunded: 480000,
    purpose: "Build biologics manufacturing plant for insulin and biosimilar production",
    repaymentPlan: { monthlyInstallment: 40000, interestRate: 11, timelineMonths: 48 },
    localSourcingPercentage: 35,
    manufacturingCapacity: "Planned state-of-the-art biologics facility, ground broken Q1 2026",
    mcazCompliant: false,
    status: "Under Review",
    applicationDate: "2026-01-20",
    parameterScores: [
      { name: "MCAZ Regulatory Compliance", passed: false, explanation: "MCAZ biologics license application in progress" },
      { name: "Manufacturing Capacity & Equipment", score: 30, maxScore: 100, passed: false, explanation: "Facility under construction — no operational capacity yet" },
      { name: "Local Sourcing Percentage", passed: false, explanation: "35% local sourcing — below 50% threshold" },
      { name: "Repayment Plan & Timeline", score: 55, maxScore: 100, passed: true, explanation: "Long 48-month timeline with higher interest rate" },
      { name: "Previous Funding History", passed: true, explanation: "1 prior loan repaid late but in full" },
    ],
    fundingHistory: [
      { year: 2024, amount: 300000, repaidOnTime: false, status: "Repaid Late" },
    ],
    comments: [
      { id: "c6", author: "James Mukwena", role: "Investor", text: "High-risk but potentially transformative. Zimbabwe desperately needs local insulin production.", date: "2026-02-01", sentiment: "Cautious" },
      { id: "c7", author: "Peter Hall", role: "Donor", text: "Previous late repayment is concerning. Need to see stronger financial controls.", date: "2026-02-10", sentiment: "Cautious" },
    ],
    aiAssessment: [
      { stage: 1, title: "Document & Compliance Review", status: "complete", result: "Missing MCAZ license. 4 of 7 required documents uploaded." },
      { stage: 2, title: "Financial & Repayment Analysis", status: "complete", result: "High debt burden. Previous late repayment. Cash flow projections show break-even at month 30." },
      { stage: 3, title: "Parameter Scoring", status: "complete", result: "Overall match: 42%. Failed 3 of 5 parameters. Major gaps in compliance and sourcing." },
      { stage: 4, title: "Scenario Modeling", status: "complete", result: "Best Case: Full repayment in 42 months with successful facility launch. Worst Case: Default risk at 35% due to construction delays and regulatory hurdles. Risk Level: High. Recommendation: DEFER — revisit after MCAZ approval and facility completion." },
    ],
    documents: ["Government ID", "Business Registration", "Revenue Statements", "Business Plan"],
  },
];

export const portfolioStats = {
  totalCapitalDeployed: 1115000,
  totalRepaid: 430000,
  averageRiskScore: 64,
  activeClients: 5,
  approvedClients: 1,
  pendingAssessments: 2,
};
