import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const member = { isAuth: false };
  return (
    <div className="fixed left-0 top-0 flex h-[62px] w-full items-center justify-between gap-8 border-b border-comment bg-white px-8">
      <Link href="/">
        <Image
          src="/images/logo/logo.svg"
          alt="todo_logo"
          width="188"
          height="32"
        />
      </Link>
      {member.isAuth ? (
        <button
          onClick={() => console.log("로그아웃")}
          className="font-bold text-comment"
        >
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
