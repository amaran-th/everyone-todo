import { Box } from "@mui/material";
import LoginForm from "./components/LoginForm";

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
        </div>
      </div>
    </div>
  );
};

export default Page;
