import { Box } from "@mui/material";
import SignUpForm from "./components/SignUpForm";

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="mx-auto w-full max-w-sign">
        <div className="my-[88px] flex flex-col gap-6">
          <Box className="py-4">
            <div>
              <p className="text-xl">회원가입</p>
            </div>
            <div className="mt-2 border-b border-comment" />
          </Box>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
