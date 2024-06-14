// Import Mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the 'students' collection
const faka_info_techsSchema = new mongoose.Schema({
  // Student Information
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  contactAddress: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  placeOfBirth: {
    type: String,
    required: true
  },
  stateOfOrigin: {
    type: String,
    required: true
  },
  localGovtArea: {
    type: String,
    required: true
  },
  homeTown: {
    type: String,
    required: true
  },
  villageAddress: {
    type: String,
    required: true
  },
  previousTraining: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  previousTrainingDetails: {
    // Nested object for previous training details
    trainingPlaceName: {
      type: String,
      required: function() {
        return this.previousTraining === 'Yes';
      }
    },
    trainingAddress: {
      type: String,
      required: function() {
        return this.previousTraining === 'Yes';
      }
    },
    trainingDuration: {
      type: String,
      required: function() {
        return this.previousTraining === 'Yes';
      }
    }
  },
  choiceOfTrainingProgramme: {
    type: String,
    enum: ['Diploma', 'Certificate'],
    required: true
  },
  passportPhotograph: {
    type: String,
    required: true
  },

  // Guardian Information
  guardian: {
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced'],
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contactAddress: {
      type: String,
      required: true
    },
    occupation: {
      type: String,
      required: true
    },
    placeOfBirth: {
      type: String,
      required: true
    },
    stateOfOrigin: {
      type: String,
      required: true
    },
    localGovtArea: {
      type: String,
      required: true
    },
    homeTown: {
      type: String,
      required: true
    },
    villageAddress: {
      type: String,
      required: true
    },
    identificationType: {
      type: String,
      enum: ['National ID', 'International Passport', "Voter's Card"],
      required: true
    },
    identificationUpload: {
      type: String,
      required: true
    },
    passportPhotograph: {
      type: String,
      required: true
    }
  },

  // Next of Kin Information
  nextOfKin: {
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced'],
      required: true
    },
    relationship: {
      type: String,
      enum: ['Brother', 'Sister', 'Mother', 'Father'],
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contactAddress: {
      type: String,
      required: true
    },
    occupation: {
      type: String,
      required: true
    },
    placeOfBirth: {
      type: String,
      required: true
    },
    stateOfOrigin: {
      type: String,
      required: true
    },
    localGovtArea: {
      type: String,
      required: true
    },
    homeTown: {
      type: String,
      required: true
    },
    villageAddress: {
      type: String,
      required: true
    }
  }
});

// Create and export a Mongoose model for the 'students' collection
module.exports = mongoose.model('faka_info_techs', faka_info_techsSchema);


// // Import Mongoose library
// const mongoose = require('mongoose');

// // Define a Mongoose schema for the 'faka_info_techs' collection
// const faka_info_techsSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   middleName: {
//     type: String,
//     required: false // Optional field
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true
//   },
//   specifiedGender: {
//     type: String,
//     required: false //Optional, only if the gender is 'other'.
//   },
//   occupation: {
//     type: String,
//     required: true
//   },
//   position: {
//     type: String,
//     required: true
//   },
//   officeAddress: {
//     type: String,
//     required: true
//   },
//   headquartersLocation: {
//     type: String,
//     required: true
//   },
//   subBusinessBranches: {
//     type: String,
//     required: true
//   },
//   contactNumber: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   socialMediaHandles: {
//     type: String,
//     required: true
//   },
//   passportPhotograph: {
//     type: String,
//     required: true
//   }
// });

// // Create and export a Mongoose model for the 'faka_info_techs' collection
// module.exports = mongoose.model('faka_info_techs', faka_info_techsSchema);
