// Import the jsonwebtoken module
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// Secret key for signing the JWT. Default to 'mysecretsshhhhh' if not provided in environment variables
const secret = process.env.SECRET || 'mysecretsshhhhh';
// Token expiration time
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    }),
  // Function to sign a JWT with customer information
  signToken: function ({ first_name, last_name, email, _id }) {
    // Payload containing the customer's first name, last name, email, and ID
    const payload = { first_name, last_name, email, _id };
    // Sign the token with the payload, secret, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Middleware function for authenticating a request
  authMiddleware: function ({ req }) {
    // Retrieve the token from the request body, query parameters, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is in the authorization header, extract the token part
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request object as is
    if (!token) {
      return req;
    }

    try {
      // Verify the token using the secret and expiration time
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Attach the decoded data to the request object
      req.customer = data;
    } catch {
      // Log an error message if the token is invalid
      console.log('Invalid token');
    }

    // Return the request object
    return req;
  },
};
