"use client";

import useAuthStore from "@/store/auth.store";

const LogoutButton = () => {
  const { logout } = useAuthStore();

  return (
    <button onClick={logout} className="font-bold text-comment">
      로그아웃
    </button>
  );
};

export default LogoutButton;
