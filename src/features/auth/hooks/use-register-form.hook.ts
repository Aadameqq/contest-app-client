import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useRegister } from "./use-register.hook";
import { authUrls } from "../urls";

const registerFormSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const useRegisterForm = () => {
  const router = useRouter();
  const { mutateAsync: register, isPending, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zod4Resolver(registerFormSchema),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    const result = await register({
      email: values.email,
      password: values.password,
    });

    if (result.success) {
      router.push(authUrls.login);
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
