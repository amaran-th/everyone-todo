"use client";

import { useMemberCreate } from "@/lib/hooks/useApi";
import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

export interface SignUpInfo {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpInfo = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("닉네임을 입력해주세요"),
  password: Yup.string().required("비밀번호를 입력해주세요"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 다시 입력해주세요"),
});
const SignUpForm = () => {
  const router = useRouter();
  const { mutate: createMember, isPending: isCreateMemberPending } =
    useMemberCreate();

  const handleSubmit = async (
    values: SignUpInfo,
    { setSubmitting }: FormikHelpers<SignUpInfo>
  ) => {
    createMember(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다.");
          router.push("/");
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <TextField
                name="username"
                type="text"
                label="아이디"
                className="flex-grow"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <div className="flex gap-2">
                <TextField
                  name="password"
                  type="password"
                  label="비밀번호"
                  className="flex-grow"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    style: { fontFamily: "Pretendard-Regular" },
                  }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  autoComplete="new-password"
                />
                <TextField
                  name="confirmPassword"
                  type="password"
                  label="비밀번호 확인"
                  className="flex-grow"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    style: { fontFamily: "Pretendard-Regular" },
                  }}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || isCreateMemberPending}
              >
                회원가입
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
