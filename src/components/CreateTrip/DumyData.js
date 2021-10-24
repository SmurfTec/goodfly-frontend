import uuid from 'uuid/dist/v4';

//? Data Of Dropdowns
const participantsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomData = [0, 1, 2, 3, 4, 5, 6];
const typeData = [
  'only',
  'in-couple',
  'family',
  'friends',
  'in-group',
];
const type2Data = [
  'honeymoon',
  'wedding-aniversary',
  'holidays',
  'no-occasion',
  'other',
];

const groupTypeData = ['company-seminar', 'club', 'school', 'other'];
const travelYearData = ['Year 2021', 'Year 2022'];
const travelMonthData = ['January 2021', 'February 2021'];
const flightTypeData = [
  'low-cost',
  'mid-range',
  'high-end',
  'private-end',
  'private-tourist-plane',
];

const mealsData = [
  'breakfast',
  'half-board',
  'full-board',
  'no-meals',
];

//? It is done becuase react select requires specific format for options (dropdown)
//? React-select requires options in array of objects having Value and Label fields
//? So, we need to format the data
export const participants = participantsData.map(function (p) {
  return { value: p, label: p };
});
export const random = randomData.map(function (p) {
  return { value: p, label: p };
});

export const type = typeData.map(function (p) {
  return { value: p, label: p };
});
export const meals = mealsData.map(function (p) {
  return { value: p, label: p };
});
export const groupType = groupTypeData.map(function (p) {
  return { value: p, label: p };
});

export const type2 = type2Data.map(function (p) {
  return {
    value: p,
    label: p.replace(/\s/g, '-'),
  };
});

export const travelYear = travelYearData.map(function (p) {
  return { value: p.replace(/\s/g, '_'), label: p };
});
export const travelMonth = travelMonthData.map(function (p) {
  return { value: p.replace(/\s/g, '_'), label: p };
});
export const desiredDuration = participantsData.map(function (p) {
  return { value: p, label: `${p} days` };
});
export const flightType = flightTypeData.map(function (p) {
  return { value: p.replace(/\s/g, '_'), label: p };
});

export const tripTheme = [
  {
    value: uuid(),
    label: 'Organic and Ecological Travel (Solidarity)',
  },
  {
    value: uuid(),
    label: 'Altitude / Mountain Travel',
  },
  {
    value: uuid(),
    label: 'City / Urban Travel',
  },
  {
    value: uuid(),
    label: 'City Break / Trip Travel',
  },
  {
    value: uuid(),
    label: 'Safari trip',
  },
  {
    value: uuid(),
    label: 'Wellness / Relaxation Trip',
  },
  {
    value: uuid(),
    label: 'Romantic / Family Travel',
  },
  {
    value: uuid(),
    label: 'Halal Friendly',
  },
  {
    value: uuid(),
    label: 'Discovery / Nature / Cultural Trip',
  },
  {
    value: uuid(),
    label: 'Travel Trek & Hiking / Trails',
  },
];

const tripAccomodationData = [
  'Budget hotel',
  'Villa',
  'Appartment/House',
  'Camping',
  'Exceptional accomodation',
  'Luxurious hotel',
  'Superior hotel',
  'Standard hotel',
];

export const tripAccomodation = tripAccomodationData.map((p) => {
  return { value: p.replace(/\s/g, '_'), label: p };
});

export const transportOnSite = [
  {
    value: false,
    label: 'Without transport',
  },
  {
    value: true,
    label: 'With transport',
  },
];
export const guideAccompained = [
  {
    value: 'always',
    label: 'always',
  },
  {
    value: 'sometimes',
    label: 'sometimes',
  },
  {
    value: 'never',
    label: 'never',
  },
];

export const timeToReachClient = [
  {
    value: 'morning',
    label: 'In the morning',
  },
  {
    value: 'afternoon',
    label: 'In the afternoon',
  },
  {
    value: 'evening',
    label: 'At the start of evening',
  },
  {
    value: 'anytime',
    label: 'Anytime',
  },
];

export const clientCivility = [
  {
    value: 'sir',
    label: 'Sir',
  },
  {
    value: 'madam',
    label: 'Madam',
  },
];

export const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];
const generateYear = (num) => new Date().getFullYear() + num;
export const year = [
  { value: generateYear(0), label: generateYear(0) },
  { value: generateYear(1), label: generateYear(1) },
  { value: generateYear(2), label: generateYear(2) },
];

export const numberCode = [
  {
    value: uuid(),
    label: '+33',
  },
  {
    value: uuid(),
    label: '+34',
  },
  {
    value: uuid(),
    label: '+35',
  },
  {
    value: uuid(),
    label: '+36',
  },
];

export const reactSelectFields = [
  'numOfParticipants',
  'type',
  'type2',
  'groupType',
  'numOfAdults',
  'numOfAdolescents',
  'numOfChildren',
  'numOfBabies',
  'flightsType',
  'meals',
  'pronoun',
  'transportOnSite',
  'guideAccompany',
  'numberCode',
];
