"use client";

import useAuthStore from "@/store/auth.store";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { auth, logout } = useAuthStore();
  return (
    <div className="fixed left-0 top-0 flex h-[62px] w-[100vw] items-center justify-between gap-8 border-b border-comment bg-white px-8">
      <Link href="/">
        <Image
          src="/images/logo/logo.svg"
          alt="todo_logo"
          width="188"
          height="32"
        />
      </Link>
      {auth ? (
        <button onClick={logout} className="font-bold text-comment">
          로그아웃
        </button>
      ) : (
        <Link href="/login" className="font-bold text-comment">
          로그인
        </Link>
      )}
    </div>
  );
};

export default Header;
