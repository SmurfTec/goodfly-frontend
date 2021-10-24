const mongoose = require('mongoose');
const customTripSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Visitor',
  },
  image: String,
  title: { type: String, trim: true, unique: true },
  type: {
    type: String,
    enum: ['only', 'in-couple', 'family', 'friends', 'in-group'],
  },
  // * if In couple then
  type2: {
    type: String,
    enum: [
      'honey-moon',
      'wedding-aniversary',
      'holidays',
      'no-occasion',
      'other',
    ], //* Other is specified if not couple
  },
  numOfAdults: Number,
  numOfAdolescants: Number,
  numOfChildren: Number,
  numOfBabies: Number,
  // * If in a group
  groupType: {
    type: String,
    enum: ['enum-seminar', 'club', 'school', 'other'],
  },
  isTravelDates: { type: Boolean, default: false },
  departureDate: Date,
  desiredReturnOn: Date,
  flexibleDate: Date,
  year: Date,
  month: Date,
  duration: Number, //* in days
  flightsType: {
    type: String,
    enum: [
      'low-cost',
      'mid-range',
      'high-end',
      'private-end',
      'private-tourist-plane',
    ],
  },
  location: {
    // * To be decided
    // * Countries , Continents
    type: String,
    trim: true,
  },
  tripType: [String], //* categories
  accomodationType: [String], //* categories
  meals: {
    type: String,
    enum: ['breakfast', 'half-board', 'full-board', 'no-meals'],
  },
  transportOnSite: { type: Boolean, default: false },
  guideAccompany: {
    type: String,
    enum: ['always', 'sometimes', 'never'],
  },
  budgetPerPerson: Number, // * In Euros
  phoneTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'anytime'],
  },
  // * Contact Details
  pronoun: {
    type: String,
    enum: ['sir', 'madam'],
  },
  desires: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  birthDate: Date,
  address: { type: String, trim: true },
  zipCode: Number,
  city: { type: String, trim: true },
  country: { type: String, trim: true },
  email: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  subscribeNewsLetter: { type: Boolean, default: false }, //* sendNotify through email when true
  status: {
    type: String,
    enum: ['approved', 'pending'],
    default: 'pending',
  },
});
const CustomTrip = mongoose.model('CustomTrip', customTripSchema);
module.exports = CustomTrip;
