const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Fakad Infotech Centre Management API',
    description: `API documentation for the Fakad Management API. This API is designed to help you manage student applications, contact messages, and user accounts efficiently. Whether you need to create, retrieve, update, or delete records, this API has got you covered. With a user-friendly interface and comprehensive functionality, you can seamlessly integrate these management tasks into your applications.

**Key Features:**

- **Create Student Applications:** Use the POST endpoint to add new student applications to your database, providing details like name, contact information, guardian details, and choice of training programme.

- **Retrieve Student Applications:** The GET endpoint allows you to fetch a list of all student applications or retrieve a specific application by its unique ID.

- **Update Student Applications:** Easily update student application information using the PUT endpoint. Send the updated details in JSON format to modify existing applications.

- **Delete Student Applications:** Remove student applications from your database using the DELETE endpoint. Specify the application's ID to delete a specific entry.

- **Create Contact Messages:** Use the POST endpoint to add new contact messages to your database, providing details like name, email, phone, subject, and message.

- **Retrieve Contact Messages:** The GET endpoint allows you to fetch a list of all contact messages or retrieve a specific message by its unique ID.

- **Update Contact Messages:** Easily update contact message information using the PUT endpoint. Send the updated details in JSON format to modify existing messages.

- **Delete Contact Messages:** Remove contact messages from your database using the DELETE endpoint. Specify the message's ID to delete a specific entry.

- **Create User Accounts:** Use the POST endpoint to add new user accounts to your database, providing details like full name, username, password, email, phone number, date of birth, and gender.

- **Retrieve User Accounts:** The GET endpoint allows you to fetch a list of all user accounts or retrieve a specific account by its unique ID.

- **Update User Accounts:** Easily update user account information using the PUT endpoint. Send the updated details in JSON format to modify existing accounts.

- **Delete User Accounts:** Remove user accounts from your database using the DELETE endpoint. Specify the account's ID to delete a specific entry.

**Sample Requests and Responses:** We've provided sample JSON requests and responses for each endpoint to help you understand how to interact with the API effectively.

**Error Handling:** The API includes error responses and status codes to guide you in case of any issues.

**API Documentation:** Explore the detailed API documentation below to learn how to use each endpoint, the expected request structures, and response formats.

Start managing your student applications, contact messages, and user accounts effortlessly with the Fakad Infotech Centre Management API. Integrate it into your applications to streamline these management tasks and enhance user experiences.`
  },
  // Production
  host: 'fakad-student-application.onrender.com',
  schemes: ['https'],

  // Develpoment
  host: process.env.HOST || 'localhost:8080',
  schemes: [process.env.SCHEMES || 'http'],

  definitions: {
    StudentApplication: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        middleName: { type: 'string' },
        lastName: { type: 'string' },
        gender: { type: 'string' },
        dateOfBirth: { type: 'string', format: 'date' },
        maritalStatus: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        contactAddress: { type: 'string' },
        occupation: { type: 'string' },
        placeOfBirth: { type: 'string' },
        stateOfOrigin: { type: 'string' },
        localGovtArea: { type: 'string' },
        homeTown: { type: 'string' },
        villageAddress: { type: 'string' },
        previousTraining: { type: 'string' },
        previousTrainingDetails: { type: 'string' },
        choiceOfTrainingProgramme: { type: 'string' },
        passportPhotograph: { type: 'string' },
        guardian: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            middleName: { type: 'string' },
            lastName: { type: 'string' },
            gender: { type: 'string' },
            maritalStatus: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' },
            contactAddress: { type: 'string' },
            occupation: { type: 'string' },
            placeOfBirth: { type: 'string' },
            stateOfOrigin: { type: 'string' },
            localGovtArea: { type: 'string' },
            homeTown: { type: 'string' },
            villageAddress: { type: 'string' },
            identificationType: { type: 'string' },
            identificationUpload: { type: 'string' },
            passportPhotograph: { type: 'string' }
          }
        },
        nextOfKin: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            middleName: { type: 'string' },
            lastName: { type: 'string' },
            gender: { type: 'string' },
            maritalStatus: { type: 'string' },
            relationship: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' },
            contactAddress: { type: 'string' },
            occupation: { type: 'string' },
            placeOfBirth: { type: 'string' },
            stateOfOrigin: { type: 'string' },
            localGovtArea: { type: 'string' },
            homeTown: { type: 'string' },
            villageAddress: { type: 'string' }
          }
        }
      }
    },
    ContactUs: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        subject: { type: 'string' },
        message: { type: 'string' }
      }
    },
    CreateAccount: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        confirmPassword: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        dob: { type: 'string', format: 'date' },
        gender: { type: 'string' },
        terms: { type: 'boolean' },
        privacy: { type: 'boolean' }
      }
    }
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Enter your bearer token in the format **Bearer <token>**"
    }
  },
  paths: {
    '/create-account': {
      post: {
        tags: ['Accounts'],
        summary: 'Create a new user account',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/CreateAccount'
            }
          }
        ],
        responses: {
          200: {
            description: 'Account created successfully'
          },
          400: {
            description: 'Invalid input'
          }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
console.log('Swagger runs successfully');