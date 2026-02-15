import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useLogin } from "./use-login.hook";
import { authUrls } from "../urls";

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const { mutateAsync: login, isPending, error } = useLogin();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: zod4Resolver(loginFormSchema),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const result = await login({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });

    if (result.success) {
      router.push(authUrls.home);
    } else {
      return { email: result.failure.message };
    }
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    isLoading: isPending,
    error,
  };
};
