//CONSTANTS
const UPDATE_USER_ACCESS = "UPDATE_USER_ACCESS";
const UPDATE_PROJECT_LOCATION = "UPDATE_PROJECT_LOCATION";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const UPDATE_TYPE_OF_FACILITY = "UPDATE_TYPE_OF_FACILITY";
const UPDATE_SQUARE_FOOTAGE = "UPDATE_SQUARE_FOOTAGE";
const UPDATE_AMOUNT = "UPDATE_AMOUNT";
const UPDATE_TYPE_OF_INDUSTRY = "UPDATE_TYPE_OF_INDUSTRY";
const UPDATE_ANNUAL = "UPDATE_ANNUAL";

// ACTION BUILDERS
export function updateUserPermission(permission) {
  return {
    type: UPDATE_USER_ACCESS,
    payload: permission
  };
}
export function updateProjectLocation(projectLocation) {
  return {
    type: UPDATE_PROJECT_LOCATION,
    payload: projectLocation
  };
}
export function updateAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    payload: address
  };
}
export function updateFacility(facility) {
  return {
    type: UPDATE_TYPE_OF_FACILITY,
    payload: facility
  };
}
export function updateIndustryType(industry) {
  return {
    type: UPDATE_TYPE_OF_INDUSTRY,
    payload: industry
  };
}
export function updateSquareFootage(squareFootage) {
  return {
    type: UPDATE_SQUARE_FOOTAGE,
    payload: squareFootage
  };
}
export function updateAmount(amount) {
  amount = amount.replace("$", "");
  return {
    type: UPDATE_AMOUNT,
    payload: amount
  };
}
export function updateAnnualCost(total) {
  console.log("Hit action creator", total);
  return {
    type: UPDATE_ANNUAL,
    payload: total
  };
}

let initialState = {
  access: undefined,
  annualCost: "",
  projectLocation: "",
  address: "",
  facility: "",
  squareFootage: "",
  amount: "",
  industry: "",
  commercialHeaders: [
    "Other uses",
    "Appliances and Electronics",
    "HVAC",
    "Lighting",
    "Water Heating"
  ],
  petroleumHeaders: [
    "Process Heating",
    "Drivepower",
    "CHP/ Cogeneration Proceess",
    "Boiler use",
    "Other",
    "Facility HVAC"
  ],
  chemicalHeaders: [
    "Process Heating",
    "Drivepower",
    "CHP/ Cogeneration Proceess",
    "Boiler use",
    "Other",
    "Facility HVAC"
  ],
  paperHeaders: [
    "Process Heating",
    "Drivepower",
    "CHP/ Cogeneration Proceess",
    "Boiler use",
    "Other",
    "Facility HVAC"
  ],
  foodHeaders: [
    "Process Heating",
    "Drivepower",
    "CHP/ Cogeneration Proceess",
    "Boiler use",
    "Other",
    "Facility HVAC",
    "Cooling and Refrigeration"
  ],
  metalsHeader: [
    "Process Heating",
    "Drivepower",
    "CHP/ Cogeneration Proceess",
    "Boiler use",
    "Other",
    "Facility HVAC",
    "Electro-chemical Processes"
  ]
};
//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ACCESS:
      return Object.assign({}, state, { access: action.payload });
    case UPDATE_PROJECT_LOCATION:
      return Object.assign({}, state, { projectLocation: action.payload });
    case UPDATE_ADDRESS:
      return Object.assign({}, state, { address: action.payload });
    case UPDATE_TYPE_OF_FACILITY:
      return Object.assign({}, state, { facility: action.payload });
    case UPDATE_SQUARE_FOOTAGE:
      return Object.assign({}, state, { squareFootage: action.payload });
    case UPDATE_AMOUNT:
      return Object.assign({}, state, { amount: action.payload });
    case UPDATE_TYPE_OF_INDUSTRY:
      console.log("hit industry");
      return Object.assign({}, state, { industry: action.payload });
    case UPDATE_ANNUAL:
      console.log("Hit type in reducer function");
      return Object.assign({}, state, { annualCost: action.payload });
    default:
      return state;
  }
}
