import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
            authority: 'https://dev-lbkrsas7y7ixgop3.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'T2WM3T300me4liu06dM0N8c3peMge1Ma',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
}
