import { LoginResponseDto } from "@/types/dto/auth.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  auth: LoginResponseDto | null | undefined;
  login: (auth: LoginResponseDto | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: undefined,
      login: (auth) => set({ auth: auth }),
      logout: () => set({ auth: undefined }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
