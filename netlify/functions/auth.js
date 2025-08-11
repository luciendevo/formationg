const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'formation-g-secret-2022';

const ADMIN_CREDENTIALS = {
  email: 'admin@formationg.fr',
  password: 'Admin@2022',
  role: 'admin',
  name: 'Administrateur Formation G'
};

const USER_CREDENTIALS = {
  email: 'user@formationg.fr',
  password: 'User@2022',
  role: 'user',
  name: 'Utilisateur Test'
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { action, email, password, token } = JSON.parse(event.body);

    switch (action) {
      case 'login':
        // Authenticate user
        let user = null;
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          user = ADMIN_CREDENTIALS;
        } else if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
          user = USER_CREDENTIALS;
        }

        if (!user) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Identifiants invalides' }),
          };
        }

        // Generate JWT token
        const authToken = jwt.sign(
          { 
            email: user.email, 
            role: user.role, 
            name: user.name,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24h expiry
          },
          JWT_SECRET
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token: authToken,
            user: {
              email: user.email,
              role: user.role,
              name: user.name
            }
          }),
        };

      case 'verify':
        // Verify JWT token
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              valid: true,
              user: {
                email: decoded.email,
                role: decoded.role,
                name: decoded.name
              }
            }),
          };
        } catch (error) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ valid: false, error: 'Token invalide' }),
          };
        }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Action non supportée' }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur serveur' }),
    };
  }
};
