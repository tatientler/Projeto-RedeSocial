/* eslint-disable import/prefer-default-export */
import Cognito from './cognito';

export class AuthBusiness {
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
