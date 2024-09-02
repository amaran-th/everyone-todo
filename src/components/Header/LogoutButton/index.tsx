"use client";

import { useAppDispatch } from "@/lib/hooks/redux";
import { logout } from "@/store/auth.slice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(logout())}
      className="font-bold text-comment"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
