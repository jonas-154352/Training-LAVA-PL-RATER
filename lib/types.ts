// ==========================================
// LAVA Training Rater - Core Type Definitions
// ==========================================

// --- Personal Info ---
export interface PersonalInfo {
  firstName: string
  lastName: string
  fullName: string
  dateOfBirth: string
  gender: "male" | "female" | "non-binary" | ""
  maritalStatus: "single" | "married" | "divorced" | "widowed" | ""
  street: string
  city: string
  state: string
  zip: string
  county: string
  email: string
  phone: string
  yearsAtAddress: string
  ownership: "own" | "rent" | ""
  currentCarrier: string
  currentPremium: string
  policyExpiration: string
  priorCoverage: string
  coverageLapses: boolean
}

// --- Vehicle Info ---
export interface VehicleInfo {
  id: string
  vin: string
  year: string
  make: string
  model: string
  trim: string
  bodyType: string
  primaryUse: "commute" | "pleasure" | "business" | ""
  annualMileage: string
  oneWayMilesToWork: string
  daysDrivenPerWeek: string
  garagingSameAsPersonal: boolean
  garagingStreet: string
  garagingCity: string
  garagingState: string
  garagingZip: string
  antiTheft: boolean
  ownership: "owned" | "financed" | "leased" | ""
  lienholder: string
  compDeductible: "250" | "500" | "1000" | "2000" | "none" | ""
  collisionDeductible: "250" | "500" | "1000" | "2000" | "none" | ""
  rentalReimbursement: boolean
  roadsideAssistance: boolean
}

// --- Driving History ---
export interface DrivingHistory {
  yearsDriving: string
  atFaultAccidents: string
  movingViolations: string
  licenseStatus: "valid" | "suspended" | "revoked" | "permit" | ""
  priorInsurance: boolean
  priorCarrier: string
  yearsWithCarrier: string
}

// --- Auto Coverage ---
export interface AutoCoverage {
  bodilyInjuryLimit: "25/50" | "50/100" | "100/300" | "250/500" | ""
  propertyDamageLimit: "25" | "50" | "100" | "250" | ""
  liabilityLimit: "25/50" | "50/100" | "100/300" | "250/500" | ""
  compDeductible: "250" | "500" | "1000" | "2000" | "none" | ""
  collisionDeductible: "250" | "500" | "1000" | "2000" | "none" | ""
  pip: "none" | "2500" | "5000" | "10000" | ""
  medicalPayments: "none" | "1000" | "5000" | "10000" | "25000" | ""
  umUimCoverage: "none" | "state_min" | "standard" | ""
  uninsuredMotorist: boolean
  uninsuredLimit: "25/50" | "50/100" | "100/300" | ""
  rentalReimbursement: boolean
  rentalDailyLimit: "30" | "50" | "75" | ""
  roadsideAssistance: boolean
  gapCoverage: boolean
}

// --- Auto Discounts ---
export interface AutoDiscounts {
  multiCar: boolean
  homeownerBundle: boolean
  goodDriver: boolean
  safetyDevice: boolean
  dynamicDrive: boolean
}

// --- Full Auto Quote Input ---
export interface AutoQuoteInput {
  personalInfo: PersonalInfo
  vehicles: VehicleInfo[]
  drivers: DriverInfo[]
  drivingHistory: DrivingHistory
  coverage: AutoCoverage
  discounts: AutoDiscounts
  paymentPlan: "full" | "2pay" | "4pay" | "monthly" | ""
}

// --- Homeowners Property Info ---
export interface PropertyInfo {
  policyType: "HO3" | "HO4" | "HO6" | ""
  propertyType: "single_family" | "condo" | "townhouse" | ""
  yearBuilt: string
  yearRoofUpdated: string
  squareFootage: string
  stories: string
  roofShape: "hip" | "gable" | "flat" | "shed" | "other" | ""
  roofType: "asphalt" | "tile" | "metal" | "wood" | "slate" | ""
  roofAge: string
  constructionType: "frame" | "masonry" | "steel" | ""
  foundation: "slab" | "basement" | "crawlspace" | ""
  bedrooms: string
  bathrooms: string
  heatingType: "central" | "electric" | "gas" | "oil" | "none" | ""
  coolingType: "central" | "window" | "none" | ""
  fireAlarm: boolean
  securitySystem: boolean
  deadbolts: boolean
  swimmingPool: boolean
  trampoline: boolean
  distanceToFireDept: string
  distanceToFireHydrant: string
}

// --- Homeowners Coverage ---
export interface HomeownersCoverageOptions {
  dwellingCoverage: string
  otherStructures: string
  personalProperty: string
  lossOfUse: string
  liability: "100000" | "300000" | "500000" | ""
  medicalPayments: "1000" | "5000" | "10000" | ""
  deductible: "500" | "1000" | "2500" | "5000" | ""
}

// --- Homeowners Claims ---
export interface HomeownersClaims {
  numberOfClaims: string
  claimTypes: string[]
  priorCarrier: string
  policyExpiration: string
  claimsLast5Years: string
  priorCoverageDuration: string
}

// --- Homeowners Discounts ---
export interface HomeownersDiscounts {
  multiPolicy: boolean
  protectiveDevices: boolean
  claimsFree: boolean
  replacementCost: boolean
  waterBackup: boolean
  earthquake: boolean
  flood: boolean
}

// --- Full Homeowners Quote Input ---
export interface HomeownersQuoteInput {
  personalInfo: PersonalInfo
  propertyInfo: PropertyInfo
  coverage: HomeownersCoverageOptions
  claims: HomeownersClaims
  discounts: HomeownersDiscounts
}

// --- Carrier Definition ---
export interface Carrier {
  id: string
  name: string
  color: string
  shortName: string
}

// --- Coverage Detail Line Item ---
export interface CoverageDetail {
  label: string
  value: string
}

// --- Quote Result for Single Carrier ---
export interface CarrierQuote {
  carrierId: string
  carrierName: string
  carrierColor: string
  monthlyPremium: number
  semiAnnualPremium: number
  annualPremium: number
  isBestValue: boolean
  amBestRating: number // 1-5 rating
  coverageDetails: CoverageDetail[]
  discountsApplied: string[]
}

// --- Full Quote Result ---
export interface QuoteResult {
  id: string
  type: "auto" | "homeowners"
  vaName: string
  customerName: string
  createdAt: string
  input: AutoQuoteInput | HomeownersQuoteInput
  quotes: CarrierQuote[]
  selectedCarrierId?: string
}

// --- VA User ---
export interface VAUser {
  name: string
  email: string
  loginCount: number
  lastLogin: string
  createdAt: string
}

// --- Pre-Quote Form ---
export interface PreQuoteForm {
  id: string
  vaName: string
  date: string
  trainerName: string
  teamLeaderName: string
  createdAt: string
}

// --- Driver Info (for Auto) ---
export interface DriverInfo {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: "male" | "female" | "non-binary" | ""
  maritalStatus: "single" | "married" | "divorced" | "widowed" | ""
  occupation: string
  relationshipToInsured: "self" | "spouse" | "child" | "other" | ""
  licenseNumber: string
  licenseState: string
  ageFirstLicensed: string
  licenseStatus: "valid" | "suspended" | "revoked" | "permit" | ""
  ticketsLast3Years: string
  accidentsLast5Years: string
  sr22Required: boolean
  goodStudent: boolean
  driversEducation: boolean
  awayAtSchool: boolean
}

// --- US States ---
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const
