import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { InputField } from "../UI/InputField";

const schema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Не менее 6 символов")
    .required("Пароль обязателен"),
});

type LoginForm = yup.InferType<typeof schema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login data:", data);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          {...register("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Пароль"
          type="password"
          autoComplete="current-password"
          placeholder="Введите password"
          {...register("password")}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-medium transition"
        >
          Войти
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Нет аккаунта?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};
