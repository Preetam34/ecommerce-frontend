export const WHITE_SPACES_REGEX_PASSWORD = /^(\S+$)/g;

export const NEW_PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[*.!@#$^&_+-])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const MOBILE_NUMBER_REGEX = /^\d{6,10}$/;

export const EMAIL_REGEX =
  /^([0-9a-zA-Z]+['\-._+]?)+[0-9a-zA-Z]+[@]([0-9a-zA-Z]+[-]?){2,}[.](([a-zA-Z]+[-]?){2,}[.]){0,2}[a-zA-Z]{2,}$/;

export const tests = {
  lowerCase: /[a-z]+/,
  upperCase: /[A-Z]+/,
  digits: /\d+/,
  symbol: /[*.!@#$^&_+-]+/,
  length: /^.{6,20}$/,
};

export const createUserOptions = [
  {
    label: "0.5 Kg",
    value: "0.5 Kg",
  },
  {
    label: "1 Kg",
    value: "1 Kg",
  },
  {
    label: "2 Kg",
    value: "2 Kg",
  },
];

export const egglessOrNot = [
  {
    label: "Eggless",
    value: "Eggless",
  },
  {
    label: "With Egg",
    value: "With Egg",
  },
];

export const trainingAndConformanceStatus = [
  {
    label: "Pending",
    id: "PENDING",
  },
  {
    label: "Ongoing",
    id: "ONGOING",
  },
  {
    label: "Completed",
    id: "COMPLETED",
  },
];

export const StandardDelivery = [
  { id: 0, value: "23", label: "Select Time Slot" },
  {
    id: 1,
    value: "14",
    label: "10 AM - 2 PM",
  },
  {
    id: 2,
    value: "18",
    label: "2 PM - 6 PM",
  },
  {
    id: 3,
    value: "22",
    label: "6 PM - 10 PM",
  },

];

// export const FixedDelivery = [
//   { id: 0, label: "Fixed Delivery" },
//   { id: 1, label: "10 AM - 1 PM", startTime: "10", endTime: "13" },
//   { id: 2, label: "1 PM - 4 PM", startTime: "13", endTime: "16" },
//   { id: 3, label: "4 PM - 7 PM", startTime: "16", endTime: "19" },
//   { id: 4, label: "7 PM - 10 PM", startTime: "19", endTime: "22" },
// ];

// export const ExpressDelivery = [
//   { id: 0, label: "Express Delivery" },
//   { id: 1, label: "10 AM - 11 AM" },
//   { id: 2, label: "11 AM - 12 PM" },
//   { id: 3, label: "12 AM - 1 PM" },
//   {
//     id: 4,
//     label: "1 PM - 2 PM",
//   },
//   { id: 5, label: "2 PM - 3 PM" },
//   { id: 6, label: "3 PM - 4 PM" },
//   { id: 7, label: "4 PM - 5 PM" },
//   { id: 8, label: "5 PM - 6 PM" },
//   { id: 9, label: "6 PM - 7 PM" },
//   { id: 10, label: "7 PM - 8 PM" },
//   { id: 11, label: "8 PM - 9 PM" },
//   { id: 12, label: "9 PM - 10 PM" },
// ];


export const ExpressDelivery = [
  { id: 0, value: "23", label: "Select Time Slot" },
  {
    id: 1,
    value: "13",
    label: "10 AM - 1 PM",
  },
  {
    id: 2,
    value: "16",
    label: "1 PM - 4 PM",
  },
  {
    id: 3,
    value: "19",
    label: "4 PM - 7 PM",
  },

  {
    id: 4,
    value: "22",
    label: "7 PM - 10 PM",
  },

];

export const FixedDelivery = [
  { id: 0, value: "22", label: "Select Time Slot" },
  {
    id: 1,
    value: "10",
    label: "10 AM - 11 AM",
  },
  {
    id: 2,
    value: "11",
    label: "11 AM - 12 PM",
  },
  {
    id: 3,
    value: "12",
    label: "12 AM - 1 PM",
  },

  {
    id: 4,
    value: "13",
    label: "1 PM - 2 PM",
  },
  {
    id: 5,
    value: "14",
    label: "2 PM - 3 PM",
  },
  {
    id: 6,
    value: "15",
    label: "3 PM - 4 PM",
  },

  {
    id: 7,
    value: "16",
    label: "4 PM - 5 PM",
  },
  {
    id: 8,
    value: "17",
    label: "5 PM - 6 PM",
  },
  {
    id: 9,
    value: "18",
    label: "6 PM - 7 PM",
  },

  {
    id: 10,
    value: "19",
    label: "7 PM - 8 PM",
  },
  {
    id: 11,
    value: "20",
    label: "8 PM - 9 PM",
  },
  {
    id: 12,
    value: "21",
    label: "9 PM - 10 PM",
  },

];

export const locationHomeOrOffice = [
  {
    label: "Home",
    value: "Home",
  },

  {
    label: "Office",
    value: "Office",
  },
];

export const quantityOpt = [
  { id: 0, label: "Select Qty" },
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
];


