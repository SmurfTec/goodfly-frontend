import uuid from 'uuid/dist/v4';

//? Data Of Dropdowns
const participantsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomData = [0, 1, 2, 3, 4, 5, 6];
const occasionData = ['Occasion 1', 'Occasion 2'];
const travelYearData = ['Year 2021', 'Year 2022'];
const travelMonthData = ['January 2021', 'February 2021'];
const flightTypeData = ['Top of the Line', 'Middle'];

//? It is done becuase react select requires specific format for options (dropdown)
//? React-select requires options in array of objects having Value and Label fields
//? So, we need to format the data
export const participants = participantsData.map(function (p) {
   return { value: p, label: p };
});
export const random = randomData.map(function (p) {
   return { value: p, label: p };
});

export const occasion = occasionData.map(function (p) {
   return { value: p.replace(/\s/g, '_'), label: p };
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

export const tripAccomodation = [
   {
      value: uuid(),
      label: 'Budget hotel',
   },
   {
      value: uuid(),
      label: 'Villa',
   },
   {
      value: uuid(),
      label: 'Appartment / House',
   },
   {
      value: uuid(),
      label: 'Camping',
   },
   {
      value: uuid(),
      label: 'Exceptional accomodation',
   },
   {
      value: uuid(),
      label: 'Luxurious hotel',
   },
   {
      value: uuid(),
      label: 'Superior hotel',
   },
   {
      value: uuid(),
      label: 'Standard hotel',
   },
];

export const meals = [
   {
      value: uuid(),
      label: 'Full Board',
   },
   {
      value: uuid(),
      label: 'Half Board',
   },
];
export const transportOnSite = [
   {
      value: uuid(),
      label: 'Without transport',
   },
   {
      value: uuid(),
      label: 'With transport',
   },
];
export const guideAccompained = [
   {
      value: uuid(),
      label: 'Always',
   },
   {
      value: uuid(),
      label: 'Sometimes',
   },
];

export const timeToReachClient = [
   {
      value: uuid(),
      label: 'In the morning',
   },
   {
      value: uuid(),
      label: 'In the afternoon',
   },
   {
      value: uuid(),
      label: 'At the start of evening',
   },
   {
      value: uuid(),
      label: 'No matter',
   },
];

export const clientCivility = [
   {
      value: uuid(),
      label: 'Civility',
   },
   {
      value: uuid(),
      label: 'Civility1',
   },
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
