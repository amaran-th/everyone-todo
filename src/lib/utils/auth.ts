import { cookies } from "next/headers";

import { LoginResponseDto } from "@/types/dto/auth.dto";

export const getAuthFromCookie = (): LoginResponseDto => {
  const authJSON = cookies().get("auth")?.value;
  const auth: LoginResponseDto = JSON.parse(
    authJSON || '{"user_id": -1, "access_token": "", "refresh_token": ""}'
  );
  return auth;
};
