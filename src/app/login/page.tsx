import { Box, Button, Divider } from "@mui/material";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import Image from "next/image";
import KakaoSymbol from "@/assets/images/login/kakao_symbol.svg";

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-sign w-full">
        <div className="my-[88px] flex flex-col gap-6">
          <Box className="py-4">
            <div>
              <p className="text-xl">로그인</p>
            </div>
            <div className="mt-2 border-b border-comment" />
          </Box>
          <div className="flex flex-col gap-8">
            <LoginForm />
          </div>
          <Divider orientation="horizontal" variant="fullWidth" flexItem />
          <Button
            color="secondary"
            variant="contained"
            size="large"
            startIcon={<KakaoSymbol className="w-5 h-5" />}
          >
            카카오로 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
