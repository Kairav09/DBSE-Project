// Mock data layer — stands in for the MySQL + Express API until the backend is wired up.
// Every dashboard reads from here so the shapes already match what real API responses will look like.

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const currentDonor = {
  id: "DNR-1042",
  name: "Ananya Rao",
  bloodGroup: "O+",
  lastDonation: "2025-06-14",
  eligibleFrom: "2025-09-14",
  totalDonations: 6,
  city: "Hyderabad",
};

export const donationHistory = [
  { id: 1, date: "2025-06-14", location: "Apollo Blood Bank, Jubilee Hills", units: 1, status: "Completed" },
  { id: 2, date: "2025-02-02", location: "City Camp, Gachibowli", units: 1, status: "Completed" },
  { id: 3, date: "2024-09-18", location: "Apollo Blood Bank, Jubilee Hills", units: 1, status: "Completed" },
  { id: 4, date: "2024-05-05", location: "Care Hospital, Banjara Hills", units: 1, status: "Completed" },
];

export const matchAlertsForDonor = [
  {
    id: "REQ-7731",
    hospital: "Yashoda Hospital, Somajiguda",
    bloodGroup: "O+",
    urgency: "Critical",
    distanceKm: 4.2,
    unitsNeeded: 3,
    postedAt: "2025-09-11T08:40:00",
  },
  {
    id: "REQ-7728",
    hospital: "KIMS Hospital, Secunderabad",
    bloodGroup: "O+",
    urgency: "Routine",
    distanceKm: 11.6,
    unitsNeeded: 2,
    postedAt: "2025-09-10T14:05:00",
  },
];

// Extended list for the dedicated nearby-requests page
export const allNearbyRequests = [
  ...matchAlertsForDonor,
  {
    id: "REQ-7735",
    hospital: "Continental Hospital, Gachibowli",
    bloodGroup: "O+",
    urgency: "Urgent",
    distanceKm: 8.3,
    unitsNeeded: 2,
    postedAt: "2025-09-11T10:15:00",
  },
  {
    id: "REQ-7740",
    hospital: "Apollo Hospital, Jubilee Hills",
    bloodGroup: "O+",
    urgency: "Routine",
    distanceKm: 5.1,
    unitsNeeded: 1,
    postedAt: "2025-09-11T12:30:00",
  },
  {
    id: "REQ-7742",
    hospital: "Care Hospital, Banjara Hills",
    bloodGroup: "O+",
    urgency: "Critical",
    distanceKm: 3.7,
    unitsNeeded: 4,
    postedAt: "2025-09-11T14:00:00",
  },
  {
    id: "REQ-7745",
    hospital: "Sunshine Hospital, Paradise",
    bloodGroup: "O+",
    urgency: "Routine",
    distanceKm: 14.2,
    unitsNeeded: 1,
    postedAt: "2025-09-10T09:20:00",
  },
];

export const inventory = [
  { bloodGroup: "A+", units: 42, nearExpiryUnits: 3, earliestExpiry: "2025-09-16" },
  { bloodGroup: "A-", units: 11, nearExpiryUnits: 0, earliestExpiry: "2025-10-02" },
  { bloodGroup: "B+", units: 37, nearExpiryUnits: 5, earliestExpiry: "2025-09-14" },
  { bloodGroup: "B-", units: 6, nearExpiryUnits: 1, earliestExpiry: "2025-09-15" },
  { bloodGroup: "AB+", units: 14, nearExpiryUnits: 0, earliestExpiry: "2025-10-08" },
  { bloodGroup: "AB-", units: 3, nearExpiryUnits: 0, earliestExpiry: "2025-10-11" },
  { bloodGroup: "O+", units: 9, nearExpiryUnits: 2, earliestExpiry: "2025-09-13" },
  { bloodGroup: "O-", units: 4, nearExpiryUnits: 1, earliestExpiry: "2025-09-13" },
];

export const hospitalRequests = [
  { id: "REQ-7731", hospital: "Yashoda Hospital, Somajiguda", bloodGroup: "O+", units: 3, urgency: "Critical", status: "Matching", raisedAt: "2025-09-11T08:40:00", patientName: "Ramesh K.", ward: "ICU-4", notes: "Trauma case — road accident, requires immediate transfusion." },
  { id: "REQ-7729", hospital: "Care Hospital, Banjara Hills", bloodGroup: "AB-", units: 1, urgency: "Urgent", status: "Pending", raisedAt: "2025-09-11T06:12:00", patientName: "Fatima S.", ward: "Surgical-2", notes: "Scheduled surgery — cardiac bypass." },
  { id: "REQ-7728", hospital: "KIMS Hospital, Secunderabad", bloodGroup: "O+", units: 2, urgency: "Routine", status: "Matched", raisedAt: "2025-09-10T14:05:00", patientName: "Arjun M.", ward: "General-6", notes: "Post-operative recovery, routine transfusion." },
  { id: "REQ-7720", hospital: "Continental Hospital, Gachibowli", bloodGroup: "B+", units: 4, urgency: "Routine", status: "Fulfilled", raisedAt: "2025-09-08T09:30:00", patientName: "Sita D.", ward: "Maternity", notes: "Childbirth complications resolved." },
];

export const myHospitalRequests = hospitalRequests.filter((r) =>
  ["REQ-7731"].includes(r.id) === false ? r.hospital === "Yashoda Hospital, Somajiguda" : true
);

export const emergencyAlerts = [
  { id: "ALT-01", type: "Critical stock", detail: "O- has fallen to 4 units, below the 10-unit safety threshold.", severity: "Critical", raisedAt: "2025-09-11T07:00:00" },
  { id: "ALT-02", type: "Emergency request", detail: "Yashoda Hospital needs 3 units of O+ within 2 hours (trauma case).", severity: "Critical", raisedAt: "2025-09-11T08:40:00" },
  { id: "ALT-03", type: "Near expiry", detail: "5 units of B+ expire within 72 hours — prioritize for dispatch.", severity: "Warning", raisedAt: "2025-09-11T06:00:00" },
];

export const donorMatchesForRequest = [
  { donorId: "DNR-1042", name: "Ananya Rao", bloodGroup: "O+", distanceKm: 4.2, lastDonation: "2025-06-14", eligible: true },
  { donorId: "DNR-0981", name: "Vikram Shetty", bloodGroup: "O+", distanceKm: 6.8, lastDonation: "2025-05-02", eligible: true },
  { donorId: "DNR-1103", name: "Farah Khan", bloodGroup: "O+", distanceKm: 2.1, lastDonation: "2025-08-30", eligible: false },
  { donorId: "DNR-0877", name: "Rohit Menon", bloodGroup: "O+", distanceKm: 9.4, lastDonation: "2025-04-11", eligible: true },
];

// Cross-match records — blood compatibility testing between donor units and recipients
export const crossMatchRecords = [
  { id: "CM-2041", donorId: "DNR-1042", donorName: "Ananya Rao", donorGroup: "O+", recipientName: "Ramesh K.", recipientGroup: "O+", aboCompat: "Compatible", rhCompat: "Compatible", antibodyScreen: "Negative", crossMatchResult: "Compatible", testedBy: "Dr. Srinivas R.", testedAt: "2025-09-11T09:15:00", requestId: "REQ-7731" },
  { id: "CM-2040", donorId: "DNR-0981", donorName: "Vikram Shetty", donorGroup: "O+", recipientName: "Ramesh K.", recipientGroup: "O+", aboCompat: "Compatible", rhCompat: "Compatible", antibodyScreen: "Negative", crossMatchResult: "Compatible", testedBy: "Dr. Srinivas R.", testedAt: "2025-09-11T09:20:00", requestId: "REQ-7731" },
  { id: "CM-2039", donorId: "DNR-1103", donorName: "Farah Khan", donorGroup: "O+", recipientName: "Arjun M.", recipientGroup: "A+", aboCompat: "Compatible", rhCompat: "Compatible", antibodyScreen: "Negative", crossMatchResult: "Compatible", testedBy: "Dr. Meera P.", testedAt: "2025-09-10T14:45:00", requestId: "REQ-7728" },
  { id: "CM-2038", donorId: "DNR-0877", donorName: "Rohit Menon", donorGroup: "O+", recipientName: "Sita D.", recipientGroup: "B+", aboCompat: "Compatible", rhCompat: "Compatible", antibodyScreen: "Positive — Anti-Kell", crossMatchResult: "Incompatible", testedBy: "Dr. Meera P.", testedAt: "2025-09-08T10:10:00", requestId: "REQ-7720" },
  { id: "CM-2037", donorId: "DNR-0654", donorName: "Priya Nair", donorGroup: "B+", recipientName: "Sita D.", recipientGroup: "B+", aboCompat: "Compatible", rhCompat: "Compatible", antibodyScreen: "Negative", crossMatchResult: "Compatible", testedBy: "Dr. Srinivas R.", testedAt: "2025-09-08T10:30:00", requestId: "REQ-7720" },
];

// Blood donation camps
export const donationCamps = [
  { id: "CAMP-301", name: "Rotary Mega Blood Drive", location: "Gachibowli Stadium, Hyderabad", organizer: "Rotary Club Hyderabad", date: "2025-09-20", time: "09:00 – 17:00", status: "Upcoming", expectedDonors: 200, unitsCollected: null, contactPhone: "+91 98765 43210" },
  { id: "CAMP-300", name: "JNTU Awareness Camp", location: "JNTU Campus, Kukatpally", organizer: "NSS Unit, JNTU", date: "2025-09-18", time: "10:00 – 15:00", status: "Upcoming", expectedDonors: 120, unitsCollected: null, contactPhone: "+91 91234 56789" },
  { id: "CAMP-299", name: "Independence Day Drive", location: "People's Plaza, Necklace Road", organizer: "Red Cross Society", date: "2025-08-15", time: "08:00 – 16:00", status: "Completed", expectedDonors: 300, unitsCollected: 247, contactPhone: "+91 87654 32100" },
  { id: "CAMP-298", name: "Corporate Wellness Camp", location: "Infosys Campus, Pocharam", organizer: "Infosys CSR + City Blood Bank", date: "2025-08-02", time: "10:00 – 14:00", status: "Completed", expectedDonors: 150, unitsCollected: 112, contactPhone: "+91 80123 45678" },
  { id: "CAMP-297", name: "World Blood Donor Day", location: "Tank Bund, Hyderabad", organizer: "TS State Blood Transfusion Council", date: "2025-06-14", time: "07:00 – 18:00", status: "Completed", expectedDonors: 500, unitsCollected: 423, contactPhone: "+91 77889 90011" },
];

// Report/analytics summary data
export const reportStats = {
  monthlyCollections: [
    { month: "Apr", collected: 186, distributed: 172 },
    { month: "May", collected: 203, distributed: 195 },
    { month: "Jun", collected: 247, distributed: 221 },
    { month: "Jul", collected: 178, distributed: 189 },
    { month: "Aug", collected: 359, distributed: 302 },
    { month: "Sep", collected: 126, distributed: 98 },
  ],
  groupDistribution: [
    { group: "A+", percentage: 27 },
    { group: "A-", percentage: 6 },
    { group: "B+", percentage: 25 },
    { group: "B-", percentage: 5 },
    { group: "AB+", percentage: 8 },
    { group: "AB-", percentage: 2 },
    { group: "O+", percentage: 21 },
    { group: "O-", percentage: 6 },
  ],
  expiryWastePercent: 3.2,
  avgFulfillmentHours: 6.4,
  topRequestingHospitals: [
    { name: "Yashoda Hospital, Somajiguda", requests: 38, unitsFulfilled: 62 },
    { name: "KIMS Hospital, Secunderabad", requests: 31, unitsFulfilled: 48 },
    { name: "Care Hospital, Banjara Hills", requests: 27, unitsFulfilled: 41 },
    { name: "Continental Hospital, Gachibowli", requests: 22, unitsFulfilled: 35 },
    { name: "Apollo Hospital, Jubilee Hills", requests: 19, unitsFulfilled: 29 },
  ],
};

// Mocked output shape for the AI demand-prediction module — the model will
// eventually populate this from historical request + seasonal data.
export const demandForecast = {
  "O+": [
    { day: "Mon", actual: 18, predicted: 19 },
    { day: "Tue", actual: 22, predicted: 21 },
    { day: "Wed", actual: 19, predicted: 20 },
    { day: "Thu", actual: 25, predicted: 24 },
    { day: "Fri", actual: 21, predicted: 23 },
    { day: "Sat", actual: null, predicted: 27 },
    { day: "Sun", actual: null, predicted: 24 },
  ],
  "O-": [
    { day: "Mon", actual: 6, predicted: 7 },
    { day: "Tue", actual: 8, predicted: 7 },
    { day: "Wed", actual: 5, predicted: 6 },
    { day: "Thu", actual: 9, predicted: 8 },
    { day: "Fri", actual: 7, predicted: 8 },
    { day: "Sat", actual: null, predicted: 10 },
    { day: "Sun", actual: null, predicted: 9 },
  ],
  "A+": [
    { day: "Mon", actual: 12, predicted: 13 },
    { day: "Tue", actual: 15, predicted: 14 },
    { day: "Wed", actual: 11, predicted: 12 },
    { day: "Thu", actual: 14, predicted: 15 },
    { day: "Fri", actual: 13, predicted: 14 },
    { day: "Sat", actual: null, predicted: 16 },
    { day: "Sun", actual: null, predicted: 13 },
  ],
  "A-": [
    { day: "Mon", actual: 3, predicted: 3 },
    { day: "Tue", actual: 4, predicted: 4 },
    { day: "Wed", actual: 2, predicted: 3 },
    { day: "Thu", actual: 5, predicted: 4 },
    { day: "Fri", actual: 3, predicted: 4 },
    { day: "Sat", actual: null, predicted: 5 },
    { day: "Sun", actual: null, predicted: 4 },
  ],
  "B+": [
    { day: "Mon", actual: 14, predicted: 15 },
    { day: "Tue", actual: 17, predicted: 16 },
    { day: "Wed", actual: 13, predicted: 14 },
    { day: "Thu", actual: 19, predicted: 18 },
    { day: "Fri", actual: 16, predicted: 17 },
    { day: "Sat", actual: null, predicted: 20 },
    { day: "Sun", actual: null, predicted: 17 },
  ],
  "B-": [
    { day: "Mon", actual: 2, predicted: 2 },
    { day: "Tue", actual: 3, predicted: 3 },
    { day: "Wed", actual: 2, predicted: 2 },
    { day: "Thu", actual: 4, predicted: 3 },
    { day: "Fri", actual: 3, predicted: 3 },
    { day: "Sat", actual: null, predicted: 4 },
    { day: "Sun", actual: null, predicted: 3 },
  ],
  "AB+": [
    { day: "Mon", actual: 4, predicted: 5 },
    { day: "Tue", actual: 6, predicted: 5 },
    { day: "Wed", actual: 3, predicted: 4 },
    { day: "Thu", actual: 5, predicted: 5 },
    { day: "Fri", actual: 4, predicted: 5 },
    { day: "Sat", actual: null, predicted: 6 },
    { day: "Sun", actual: null, predicted: 5 },
  ],
  "AB-": [
    { day: "Mon", actual: 1, predicted: 1 },
    { day: "Tue", actual: 2, predicted: 1 },
    { day: "Wed", actual: 1, predicted: 1 },
    { day: "Thu", actual: 2, predicted: 2 },
    { day: "Fri", actual: 1, predicted: 2 },
    { day: "Sat", actual: null, predicted: 2 },
    { day: "Sun", actual: null, predicted: 1 },
  ],
};

// Shortage risk assessment per blood group (for AI forecast dashboard)
export const shortageRisk = [
  { group: "O+", currentStock: 9, predictedWeeklyDemand: 158, daysOfSupply: 0.4, risk: "Critical" },
  { group: "O-", currentStock: 4, predictedWeeklyDemand: 56, daysOfSupply: 0.5, risk: "Critical" },
  { group: "A+", currentStock: 42, predictedWeeklyDemand: 97, daysOfSupply: 3.0, risk: "Warning" },
  { group: "A-", currentStock: 11, predictedWeeklyDemand: 27, daysOfSupply: 2.9, risk: "Warning" },
  { group: "B+", currentStock: 37, predictedWeeklyDemand: 117, daysOfSupply: 2.2, risk: "Warning" },
  { group: "B-", currentStock: 6, predictedWeeklyDemand: 20, daysOfSupply: 2.1, risk: "Warning" },
  { group: "AB+", currentStock: 14, predictedWeeklyDemand: 35, daysOfSupply: 2.8, risk: "Routine" },
  { group: "AB-", currentStock: 3, predictedWeeklyDemand: 10, daysOfSupply: 2.1, risk: "Warning" },
];

// Restock recommendations from the AI module
export const restockRecommendations = [
  { group: "O+", action: "Urgent: Activate emergency donor pool and request from neighboring banks", targetUnits: 50, priority: "Critical" },
  { group: "O-", action: "Urgent: Contact universal donors, schedule emergency camp", targetUnits: 30, priority: "Critical" },
  { group: "B+", action: "Schedule targeted camp within 48 hours", targetUnits: 25, priority: "Warning" },
  { group: "AB-", action: "Monitor closely — request 5 units from regional reserve", targetUnits: 10, priority: "Warning" },
];

export const adminStats = {
  totalDonors: 1284,
  totalUnitsInStock: 126,
  pendingRequests: hospitalRequests.filter((r) => r.status === "Pending" || r.status === "Matching").length,
  activeAlerts: emergencyAlerts.length,
};

export function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
