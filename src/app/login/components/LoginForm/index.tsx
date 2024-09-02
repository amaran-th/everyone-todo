"use client";

import { useAppDispatch } from "@/lib/hooks/redux";
import { useLogin } from "@/lib/hooks/useApi";
import { login } from "@/store/auth.slice";
import { LoginRequestDto, LoginResponseDto } from "@/types/dto/auth.dto";
import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialValues: LoginRequestDto = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: getMemberAuth } = useLogin();

  const handleSubmit = (
    values: LoginRequestDto,
    { setSubmitting }: FormikHelpers<LoginRequestDto>
  ) => {
    getMemberAuth(
      { username: values.username, password: values.password },
      {
        onSuccess: (data: LoginResponseDto | null) => {
          dispatch(
            login({
              user_id: data?.user_id ?? -1,
              access_token: data?.access_token ?? "",
              refresh_token: data?.refresh_token ?? "",
            })
          );
          setSubmitting(false);
          setTimeout(() => {
            router.push("/");
          }, 0);
        },
        onError: (e) => {
          toast.error(e.message);
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-4">
          <TextField
            type="text"
            name="username"
            label="닉네임"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            type="password"
            name="password"
            InputProps={{
              style: { fontFamily: "Pretendard-Regular" },
            }}
            label="비밀번호"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="flex flex-col">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              로그인
            </Button>
            <div className="mt-3 flex flex-wrap justify-center gap-x-2 text-comment">
              모두의 TODO에 등록되어 있지 않나요?
              <Link href="/sign-up" className="font-bold underline">
                회원가입하기
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
