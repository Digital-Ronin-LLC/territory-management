// Mock data for dashboard components

export const mockData = {
  // Quote and Premium data
  quotePremium: {
    quoteCount: 854000,
    quotePremium: 1600000000,
    appCount: 94000,
    appPremium: 168000000
  },
  
  // Call Average data
  callAverage: {
    average: 5.7,
    data: [
      { name: 'Month 1', value: 5.7 },
      { name: 'Month 2', value: 6.3 },
      { name: 'Month 3', value: 5.1 },
      { name: 'Month 4', value: 6.2 },
      { name: 'Month 5', value: 5.4 }
    ]
  },
  
  // Sales Activities data
  salesActivities: {
    total: 11000,
    breakdown: [
      { name: 'Field', value: 35, color: '#5aaafa' },
      { name: 'Phone', value: 45, color: '#8cd211' },
      { name: 'Virtual', value: 20, color: '#ba8ff7' }
    ]
  },
  
  // Call Notes by LOB
  callNotesByLOB: [
    { name: 'PPA/BA/CON', AK: 1, CA: 1, FL: 15, TX: 3, VA: 1 },
    { name: 'Truck', AK: 4, CA: 10, OH: 13 },
    { name: 'Truck PPA/BA/CON', CA: 1, FL: 4, OH: 4 }
  ],
  
  // AMSP Not Updated data
  amspNotUpdated: [
    { name: 'AZ', value: 12 },
    { name: 'AK', value: 11 },
    { name: 'AR', value: 1 },
    { name: 'AL', value: 2 },
    { name: 'CA', value: 10 },
    { name: 'CO', value: 3 },
    { name: 'CT', value: 1 },
    { name: 'FL', value: 84 },
    { name: 'GA', value: 18 },
    { name: 'IA', value: 3 }
  ],
  
  // Agencies Not Reached with Field
  agenciesNotReached: [
    { name: 'Angela Rota', value: 91 },
    { name: 'Ashley Shockley', value: 16 },
    { name: 'Beau Knoppers', value: 54 },
    { name: 'Brandon Bazile', value: 87 },
    { name: 'Brian Gifford', value: 126 },
    { name: 'Chara Kautz', value: 10 },
    { name: 'Christopher Nappi', value: 27 },
    { name: 'Cody Wiswasser', value: 38 },
    { name: 'Colton Watson', value: 41 },
    { name: 'Daniel Becnel', value: 22 }
  ],
  
  // Open Commitments data
  openCommitments: [
    { name: 'PPA/BA/CON - AK', value: 100 },
    { name: 'PPA/BA/CON - FL', value: 15 },
    { name: 'PPA/BA/CON - OH', value: 100 },
    { name: 'Truck - AK', value: 10 },
    { name: 'Truck - CA', value: 20 }
  ],
  
  // Review Locations data
  reviewLocations: {
    total: 4,
    onTime: 0,
    overdue: 4,
  },
  
  // Onboarding Task data
  onboardingTask: {
    total: 135,
    onTime: 1,
    overdue: 134,
  },
  
  // Field Visit data
  fieldVisit: {
    totalAgencies: 4100, 
    contactedAgencies: 1700,
    notContactedAgencies: 2400,
  },
  
  // AMSP Task Completion data
  amspTaskCompletion: {
    total: 3,
    overdue: 3,
  },
  
  // Field Visit within 90 days
  fieldVisitIn90Days: {
    total: 335,
    visitInLast90: 111,
    noVisitInLast90: 224,
  },
  
  // Prospect Agent Conversion data
  prospectConversion: [
    { 
      name: 'New', 
      'High Priority Truck Prospects': 7, 
      'Other': 23, 
      'High Priority PPA Prospects': 60,
      '-': 38
    },
    { 
      name: 'Solicitation Email Sent', 
      'High Priority Truck Prospects': 2, 
      'High Priority PPA Prospects': 69
    },
    { 
      name: 'Appointed - New', 
      'Other': 1041,
      '-': 4
    },
    { 
      name: 'Appointed - Converted', 
      'High Priority Truck Prospects': 2, 
      'Other': 1,
      'High Priority PPA Prospects': 6,
      '-': 1
    },
    { 
      name: 'Terminated', 
      'Other': 2,
      'High Priority PPA Prospects': 1
    }
  ],
  
  // Agency Production Commitments data
  agencyProdCommitments: [
    { name: 'With Commitments', value: 35, color: '#4CAF50' },
    { name: 'No Commitments', value: 65, color: '#FF9800' }
  ],
  
  // Update AMSP Task data
  updateAmspTask: {
    total: 10,
    onTime: 2,
    overdue: 8
  }
};

export default mockData;
