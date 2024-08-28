import { getAuthFromCookie } from "@/lib/utils/auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const auth = getAuthFromCookie();
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
      {auth.access_token ? (
        <LogoutButton />
      ) : (
        <Link href="/login" className="font-bold text-comment">
          로그인
        </Link>
      )}
    </div>
  );
};

export default Header;
