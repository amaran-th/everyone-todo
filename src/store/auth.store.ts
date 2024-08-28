import { LoginResponseDto } from "@/types/dto/auth.dto";
import cookie from "react-cookies";
import { create } from "zustand";

interface AuthState {
  auth: LoginResponseDto | null | undefined;
  login: (auth: LoginResponseDto | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  auth: undefined,
  login: (auth) => {
    cookie.save("auth", JSON.stringify(auth), {});
    set({ auth: auth });
  },
  logout: () => {
    cookie.remove("auth");
    set({ auth: undefined });
  },
}));

export default useAuthStore;
