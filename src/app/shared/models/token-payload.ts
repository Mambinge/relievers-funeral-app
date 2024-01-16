export interface TokenPayload {
  aud: string[];
  user_name: string;
  scope: string[];
  userAccountId: number;
  tenantId?: any;
  isAdmin: boolean;
  exp: number;
  authorities: unknown[];
  jti: string;
  email: string;
  client_id: string;
}
