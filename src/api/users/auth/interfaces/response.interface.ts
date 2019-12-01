export interface LoginResponse {
  readonly token: string;
  readonly data: any;
  readonly success: boolean;
  readonly message: string;
}
