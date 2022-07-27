import * as AWS from 'aws-sdk';

class Cognito {
    async singup(userId, email, password) {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const signParams = {
      ClientId: process.env.CLIENT_ID,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        }
      ],
    };

    await cognito.signUp(signParams).promise();
  }

  async signin(email, password) {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.CLIENT_ID,
      AuthParameters: {
        EMAIL: email,
        PASSWORD: password,
      },
    };
    const accessKeys = await cognito.initiateAuth(params).promise();
    const response = {
      access_token: accessKeys.AuthenticationResult.IdToken,
      refresh_token: accessKeys.AuthenticationResult.RefreshToken,
      expires_in: accessKeys.AuthenticationResult.ExpiresIn,
      token_type: accessKeys.AuthenticationResult.TokenType,
    };
    return response;
  }
}

const HEADERS = {
    DEFAULT_HEADER: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
      'Access-Control-Allow-Credentials': true,
    },
};

class AuthBusiness {
    async signup(signup) {
      const cognito = new Cognito();
      await cognito.singup(signup.user_id, signup.email, signup.password);
    }
  
    async signin(signin) {
      const cognito = new Cognito();
      const authenticationToken = await cognito.signin(signin.user_id, signin.password);
      return authenticationToken;
    }
}

export const signup = async (event) => {
    const requestBody = await JSON.parse(event.body)
    const authBusiness = new AuthBusiness();
    await authBusiness.signup(requestBody);
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuário criado com sucesso!' }),
      headers: HEADERS.DEFAULT_HEADER,
    };
    return response;
  };
  
  export const signin = async (event) => {
    const requestBody = JSON.parse(event.body);
    const authBusiness = new AuthBusiness();
    const authenticationToken = await authBusiness.signin(requestBody);
    const response = {
      statusCode: 200,
      body: JSON.stringify(authenticationToken),
      headers: HEADERS.DEFAULT_HEADER,
    };
    return response;
  };
  