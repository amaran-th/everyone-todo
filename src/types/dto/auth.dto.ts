export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  user_id: number;
  access_token: string;
  refresh_token: string;
}
