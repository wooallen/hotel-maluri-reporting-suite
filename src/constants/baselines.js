// Hotel Maluri H1 2026 Authoritative Baselines & Chart of Accounts Mapping

export const CHART_OF_ACCOUNTS = {
  ROOM_REVENUE_TOTAL: '500-1000',
  ROOM_REVENUE_SC: '500-1001',
  ROOM_REVENUE_NSC: '500-1002',
  ROOM_EXTRA_CHARGES: '500-1003', // Extended use / extra charges
  LAUNDRY_GUEST: '500-1004',
  ROOM_SERVICE_CHARGE: '500-RMSC',
  
  FB_REVENUE_TOTAL: '500-2000',
  BREAKFAST_PACKAGE: '500-BF01',
  SERAMBI_FB: '500-SR01',
  GAJAH3_CAFE_LEASE: '540-1000',
  BANQUET_REVENUE: '500-3000',
  
  COST_GUEST_ROOM: '610-0001',
  COST_ROOM_SUPPLIES: '610-1000',
  COST_ROOM_LAUNDRY: '610-4000',
  
  PAYROLL_SALARY: '901-1001',
  PAYROLL_EPF: '901-1002',
  PAYROLL_SOCSO: '901-1003',
  PAYROLL_EIS: '901-1004',
  PAYROLL_OUTSOURCED_LABOUR: '901-2002',
  
  UTILITIES_ELECTRICITY: '904-U001',
  UTILITIES_WATER: '904-U002',
  UTILITIES_SEWERAGE: '904-U004',
  UTILITIES_GAS: '904-U005',
  
  RENOVATION_CAPEX: '200-1000',
  
  IT_SUPPORT_SERVICES: '904-ITST', // SC Systems Sdn Bhd
  COST_PARKING_SYSTEM: '610-5000'  // BGD Access Sdn Bhd
};

export const FIXED_BASELINES = {
  SEWERAGE_MONTHLY: 5967.60,
  GAS_MIN_MONTHLY: 2300.00,
  GAS_MAX_MONTHLY: 2950.00,
  IT_SUPPORT_SC_SYSTEMS: 5400.00,
  PARKING_BGD_ACCESS: 1940.00,
  GAJAH3_RENTAL: 2500.00
};

export const H1_2026_MONTHLY_DATA = [
  {
    monthKey: '2026-01',
    monthName: 'January 2026',
    isH1Baseline: true,
    roomsAvailable: 4588,
    roomsSold: 2681,
    occupancyPct: 58.44,
    adr: 157.12,
    revpar: 91.81,
    roomRevenueTotal: 435957.26,
    roomRevenueSC: 72341.52,
    roomRevenueNSC: 348894.12,
    roomExtraCharges: 2122.90,
    guestLaundry: 308.01,
    roomDirectCost: 54076.44,
    otaCommissionBooking: 19537.59,
    
    // Payroll & Staff Costs
    payrollSalary: 304141.14,
    payrollEPF: 243143.13,
    payrollSocsoEis: 3886.50,
    outsourcedLabour: 34119.25,
    staffWelfare: 10433.09,
    totalPayroll: 595723.11,
    
    sewerage: 5967.60,
    gas: 2381.95,
    electricity: 51115.40,
    water: 12184.30,
    security: 14463.36,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 8556.60,
    banquetRevenue: 45334.79,
    serambiFB: 12187.13,
    breakfastPackage: 6606.96,
    netProfit: -192045.33,
    renovationCapex: [
      {
            "id": "CAPEX-01",
            "date": "2026-01-01",
            "docNo": "13106",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO DISMANTLE EXISTING FCU INCOMING AND MOTORISE VALE CONTROL",
            "amount": 3000.0
      },
      {
            "id": "CAPEX-02",
            "date": "2026-01-01",
            "docNo": "13106",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO INSTALL NEW 3 CORE WIRING FOR INCOMING AND MOTORISE VALE CONTROL",
            "amount": 9000.0
      },
      {
            "id": "CAPEX-03",
            "date": "2026-01-01",
            "docNo": "13108",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO DISMANTLE EXISTING 1.5HP AND INSTALL 2.5HP FCU UNITS C/W FABRICATE NEW DUCTING HEADER ETC",
            "amount": 6000.0
      },
      {
            "id": "CAPEX-04",
            "date": "2026-01-01",
            "docNo": "13108",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO REPLACE OF FCU BLOWER FAN MOTOR C/W TEST RUN UNIT IN ORDER",
            "amount": 300.0
      },
      {
            "id": "CAPEX-05",
            "date": "2026-01-01",
            "docNo": "IV-2511/03",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "RENTAL OF RORO BIN (4FT HEIGHT)",
            "amount": 760.0
      },
      {
            "id": "CAPEX-06",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR SQUARE NIGHT STAND",
            "amount": 440.0
      },
      {
            "id": "CAPEX-07",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR TABLE TOP 450MM X 395 (D SHAPE)",
            "amount": 250.0
      },
      {
            "id": "CAPEX-08",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR TABEL TOP 900MM (ROOM 466)",
            "amount": 390.0
      },
      {
            "id": "CAPEX-09",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR TABEL TOP 800MM (ROOM 366)",
            "amount": 290.0
      },
      {
            "id": "CAPEX-10",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR TABEL TOP 900MM (ROOM 507)",
            "amount": 390.0
      },
      {
            "id": "CAPEX-11",
            "date": "2026-01-01",
            "docNo": "IV-2512/08",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLT & INSTALL TEMPERED CLEAR GLASS FOR TABEL TOP 610MM (ROOM 507)",
            "amount": 660.0
      },
      {
            "id": "CAPEX-12",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO HACK OFF EXISTING WALL AT 201 AND OFFICE AND MAKE GOOD",
            "amount": 2000.0
      },
      {
            "id": "CAPEX-13",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO CONSTRUCT NEW ENTRANCE FOR ROOM 201",
            "amount": 2500.0
      },
      {
            "id": "CAPEX-14",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY & INSTALL VINYL TILES TO FLOOR",
            "amount": 2500.0
      },
      {
            "id": "CAPEX-15",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO CONSTRUCT NEW FULL HEIGHT 75MM DRYWALL PARTITION",
            "amount": 1500.0
      },
      {
            "id": "CAPEX-16",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TP SUPPLY & INSTALL FRAMELESS GLASS DOOR",
            "amount": 3500.0
      },
      {
            "id": "CAPEX-17",
            "date": "2026-01-01",
            "docNo": "IV-2512/09",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "PERIODUCALLY CLEANING, PROTECTION, PAINTING & MAKE GOOD",
            "amount": 220.0
      },
      {
            "id": "CAPEX-18",
            "date": "2026-01-12",
            "docNo": "2025121023",
            "vendor": "ZULKIFLI BIN SAAD",
            "description": "SAMPLE BATIK - BATIK PRINTING SIZE 3FT X 6FT INC DELIVERY CHARGES",
            "amount": 80.0
      },
      {
            "id": "CAPEX-19",
            "date": "2026-01-12",
            "docNo": "2025121023",
            "vendor": "ZULKIFLI BIN SAAD",
            "description": "48 BATIK PRINTING SIZE 3FT X 6FT PER ROOMS INC DELIVERY CHARGES",
            "amount": 850.0
      },
      {
            "id": "CAPEX-20",
            "date": "2026-01-19",
            "docNo": "13119",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO INSULATE  CHWS & CHWR PIPE WITH NEW PU CHEMICAL JACKETING INSULATION & GI COVER",
            "amount": 136800.0
      },
      {
            "id": "CAPEX-21",
            "date": "2026-01-19",
            "docNo": "13119",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "REPLACE CORRIDOR FCU GATE VALVE BEFORE BYPASS OF CHILLED WATER PIPE FOR LVL 2- 5",
            "amount": 8500.0
      },
      {
            "id": "CAPEX-22",
            "date": "2026-01-19",
            "docNo": "13119",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "DISMANTLE EXISTING INSULATION",
            "amount": 30400.0
      },
      {
            "id": "CAPEX-23",
            "date": "2026-01-30",
            "docNo": "IV-2601/03",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "PROGRESSIVE CLAIM NO. 5 (RETENTION) FOR 148 GUEST ROOM REFURNISHMENT WORKS - RETENTION SUM 2.5%",
            "amount": 15750.0
      },
      {
            "id": "CAPEX-24",
            "date": "2026-01-30",
            "docNo": "IV-2601/04",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "PROGRESSIVE CLAIM NO. 5 (RETENTION) FOR RENOVATION WORKS AT LIFT LOBBY - RETENTION SUM 2.5%",
            "amount": 2106.88
      },
      {
            "id": "CAPEX-25",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "GUEST ROOM DOOR PAINTING",
            "amount": 14800.0
      },
      {
            "id": "CAPEX-26",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "WIRING WORKS - ADDITIONAL POWER SOCKET TO AIR COND WALL",
            "amount": 6660.0
      },
      {
            "id": "CAPEX-27",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "WIRING WORKS -  INSTALLATION OF WALL LIGHT",
            "amount": 2500.0
      },
      {
            "id": "CAPEX-28",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "WIRING WORKS - WALL LIGHT ADJUSTMENT",
            "amount": 900.0
      },
      {
            "id": "CAPEX-29",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "WIRING WORKS - TO SUPPLY KELUAR SIGN (RECESSED)",
            "amount": 1880.0
      },
      {
            "id": "CAPEX-30",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "WIRING WORKS - TO SUPPLY EMERGENCY LIGHT",
            "amount": 1680.0
      },
      {
            "id": "CAPEX-31",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "GUEST ROOM TABLE TOP 15MM POLISHED - MINI BAR TOP",
            "amount": 900.0
      },
      {
            "id": "CAPEX-32",
            "date": "2026-01-30",
            "docNo": "IV-2601/05",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "GUEST ROOM TABLE TOP 15MM POLISHED - MINI BAR FLOOR",
            "amount": 400.0
      }
]
  },
  {
    monthKey: '2026-02',
    monthName: 'February 2026',
    isH1Baseline: true,
    roomsAvailable: 4144,
    roomsSold: 2313,
    occupancyPct: 55.82,
    adr: 160.27,
    revpar: 89.46,
    roomRevenueTotal: 381267.35,
    roomRevenueSC: 41920.27,
    roomRevenueNSC: 328793.52,
    roomExtraCharges: 1652.62,
    guestLaundry: 178.98,
    roomDirectCost: 40039.14,
    otaCommissionBooking: 11241.18,
    
    // Payroll & Staff Costs
    payrollSalary: 254112.29,
    payrollEPF: 184801.00,
    payrollSocsoEis: 3987.60,
    outsourcedLabour: 34376.93,
    staffWelfare: 7871.66,
    totalPayroll: 485149.48,

    sewerage: 5967.60,
    gas: 2302.80,
    electricity: 55222.80,
    water: 11240.90,
    security: 13063.68,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 4878.29,
    banquetRevenue: 43000.03,
    serambiFB: 20979.76,
    breakfastPackage: 6051.21,
    netProfit: -182643.76,
    renovationCapex: [
      {
            "id": "CAPEX-01",
            "date": "2026-02-10",
            "docNo": "466221226M",
            "vendor": "GREEN RYAN PATRICK",
            "description": "CAPEX - RENOVATION LEVEL 2 (LIFT GRAPHICS AND INSTALLATION)",
            "amount": 1025.0
      },
      {
            "id": "CAPEX-02",
            "date": "2026-02-12",
            "docNo": "IV-06667",
            "vendor": "VENTINO CORPORATION SDN BHD",
            "description": "Coolmate 40L Silent Minibar (Solid Door)",
            "amount": 3300.0
      }
]
  },
  {
    monthKey: '2026-03',
    monthName: 'March 2026',
    isH1Baseline: true,
    roomsAvailable: 4588,
    roomsSold: 2085,
    occupancyPct: 45.44,
    adr: 154.34,
    revpar: 70.14,
    roomRevenueTotal: 333767.10,
    roomRevenueSC: 47216.20,
    roomRevenueNSC: 274584.53,
    roomExtraCharges: 2279.74,
    guestLaundry: 0.00,
    roomDirectCost: 37963.67,
    otaCommissionBooking: 8667.71,
    
    // Payroll & Staff Costs
    payrollSalary: 236623.04,
    payrollEPF: 173083.23,
    payrollSocsoEis: 3964.60,
    outsourcedLabour: 31650.07,
    staffWelfare: 18361.42,
    totalPayroll: 463682.36,

    sewerage: 5967.60,
    gas: 914.65,
    electricity: 51298.33,
    water: 9968.05,
    security: 14463.36,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 4501.88,
    banquetRevenue: 47369.48,
    serambiFB: 101489.71,
    breakfastPackage: 8556.01,
    netProfit: -165774.49,
    renovationCapex: [
      {
            "id": "CAPEX-01",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO DISMANTLE GUESTROOM CEILING INCLUDING CART AWAY DEBRIS & PROTECTION",
            "amount": 7920.0
      },
      {
            "id": "CAPEX-02",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO MAKE GOOD OF CEILING",
            "amount": 1400.0
      },
      {
            "id": "CAPEX-03",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO DISMANTLE WALKWAY CARPET",
            "amount": 3500.0
      },
      {
            "id": "CAPEX-04",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO CUT CORRIDOR CEILING FOR AIR COND WORKS",
            "amount": 880.0
      },
      {
            "id": "CAPEX-05",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY 2 COATS NIPPON SATINGLO CORRIDOR &  EMULSION PAINT CEILING",
            "amount": 14000.0
      },
      {
            "id": "CAPEX-06",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY 2 COATS NIPPON SATINGLO LIFT LOBBY, EMULSION PAINT CEILING & GLASS ENAMEL PAINT ",
            "amount": 1200.0
      },
      {
            "id": "CAPEX-07",
            "date": "2026-03-17",
            "docNo": "IV-2603/01",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY & INSTALL VINYL TILES WITH GLUEDOWN SYSTEM C/W PVC SKIRTING",
            "amount": 38000.0
      },
      {
            "id": "CAPEX-08",
            "date": "2026-03-17",
            "docNo": "IV-2603/02",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY 2 COATS NIPPON SATINGLO TO STAFF LIFT LOBBY",
            "amount": 4800.0
      },
      {
            "id": "CAPEX-09",
            "date": "2026-03-17",
            "docNo": "IV-2603/02",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY 2 COATS EMULSION PAINT TO HK CUPBOARD",
            "amount": 4600.0
      },
      {
            "id": "CAPEX-10",
            "date": "2026-03-17",
            "docNo": "IV-2603/02",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY UNDERCOAT + 2 COATS OF GLOSS ENAMEL PAINT TO FIRE RATED DOOR FRAME AND DOOR",
            "amount": 4960.0
      },
      {
            "id": "CAPEX-11",
            "date": "2026-03-17",
            "docNo": "IV-2603/02",
            "vendor": "JC2 DESIGN SDN BHD",
            "description": "TO SUPPLY AND APPLY 2 COATS EMULSION PAINT FIRE STAIRS, ABCD WALL & CEILING, GLASS ENAMEL PAINT",
            "amount": 20700.0
      },
      {
            "id": "CAPEX-12",
            "date": "2026-03-24",
            "docNo": "13132",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO FABRICATE AND INSTALL NEW DUCTING HEADER C/W EXTERNAL DRAIN PAN AND PE INSULATION",
            "amount": 9000.0
      },
      {
            "id": "CAPEX-13",
            "date": "2026-03-24",
            "docNo": "13132",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "TO INSTALL NEW FCU UNIT C/W CHWS & CHWR PIPING CONNECTION INSULATION OF PU JACKETING ETC",
            "amount": 10800.0
      },
      {
            "id": "CAPEX-14",
            "date": "2026-03-24",
            "docNo": "13133",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "DISMANTLE FCU UNITS CORRIDOR 3 NOS STOREROOOM - MAKE OPEN AT EXISTING PLASTER CEILING FOR DISMANTLE",
            "amount": 36400.0
      },
      {
            "id": "CAPEX-15",
            "date": "2026-03-24",
            "docNo": "13133",
            "vendor": "WINTER AIR-CONDITIONING SDN BHD",
            "description": "DISMANTLE FCU UNITS CORRIDOR 3 NOS STOREROOOM - INSULATE BACK BOTH CHWS & CHWR PIPES",
            "amount": 15600.0
      }
]
  },
  {
    monthKey: '2026-04',
    monthName: 'April 2026',
    isH1Baseline: true,
    roomsAvailable: 4440,
    roomsSold: 2418,
    occupancyPct: 54.46,
    adr: 152.51,
    revpar: 83.05,
    roomRevenueTotal: 384752.75,
    roomRevenueSC: 64930.40,
    roomRevenueNSC: 303828.01,
    roomExtraCharges: 1355.96,
    guestLaundry: 56.82,
    roomDirectCost: 31837.16,
    otaCommissionBooking: 9638.35,
    
    // Payroll & Staff Costs
    payrollSalary: 224355.77,
    payrollEPF: 175613.76,
    payrollSocsoEis: 3906.90,
    outsourcedLabour: 32460.90,
    staffWelfare: 4828.64,
    totalPayroll: 441165.97,

    sewerage: 5967.60,
    gas: 2951.95,
    electricity: 59813.12,
    water: 12825.25,
    security: 13996.80,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 8695.28,
    banquetRevenue: 79461.97,
    serambiFB: 4494.45,
    breakfastPackage: 6467.97,
    netProfit: -84308.10,
    renovationCapex: []
  },
  {
    monthKey: '2026-05',
    monthName: 'May 2026',
    isH1Baseline: true,
    roomsAvailable: 4588,
    roomsSold: 2469,
    occupancyPct: 53.81,
    adr: 160.78,
    revpar: 86.52,
    roomRevenueTotal: 406390.26,
    roomRevenueSC: 39865.17,
    roomRevenueNSC: 357100.78,
    roomExtraCharges: 1813.62,
    guestLaundry: 146.99,
    roomDirectCost: 37307.22,
    otaCommissionBooking: 16125.72,
    
    // Payroll & Staff Costs
    payrollSalary: 216934.88,
    payrollEPF: 166190.98,
    payrollSocsoEis: 3782.00,
    outsourcedLabour: 32640.27,
    staffWelfare: 4415.75,
    totalPayroll: 423963.88,

    sewerage: 5967.60,
    gas: 2796.60,
    electricity: 57878.55,
    water: 11935.95,
    security: 18527.10,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 5929.24,
    banquetRevenue: 32711.92,
    serambiFB: 6027.17,
    breakfastPackage: 3578.89,
    netProfit: -128107.24,
    renovationCapex: []
  },
  {
    monthKey: '2026-06',
    monthName: 'June 2026',
    isH1Baseline: true,
    roomsAvailable: 4440,
    roomsSold: 2397,
    occupancyPct: 53.99,
    adr: 153.36,
    revpar: 82.79,
    roomRevenueTotal: 380114.73,
    roomRevenueSC: 45375.88,
    roomRevenueNSC: 322233.15,
    roomExtraCharges: 1881.40,
    guestLaundry: 123.01,
    roomDirectCost: 39470.19,
    otaCommissionBooking: 11908.78,
    
    // Payroll & Staff Costs
    payrollSalary: 219465.63,
    payrollEPF: 166515.38,
    payrollSocsoEis: 4934.05,
    outsourcedLabour: 37685.16,
    staffWelfare: 4128.96,
    totalPayroll: 432729.18,

    sewerage: 12.00, // ANOMALY: Missing Accrual in June!
    gas: 2809.25,
    electricity: 63944.21,
    water: 13569.05,
    security: 18499.10,
    itSupportSC: 5400.00,
    parkingBGD: 1940.00,
    gajah3Rent: 2500.00,
    carParkRevenue: 3860.37,
    banquetRevenue: 57628.85,
    serambiFB: 8834.33,
    breakfastPackage: 9060.81,
    netProfit: -124230.70,
    renovationCapex: []
  }
];
