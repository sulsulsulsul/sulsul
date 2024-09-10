export interface AuthDTO {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshAuthDTO {
  accessToken: string;
  refreshToken: string;
}
