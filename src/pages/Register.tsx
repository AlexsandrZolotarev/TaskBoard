import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../UI/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль слишком короткий")
    .required("Пароль обязателен"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

type RegisterForm = yup.InferType<typeof schema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });
 const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data: RegisterForm) => {
    login(data.email);       
    navigate("/");
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Registration</h2>
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
        <InputField
          label="Подтвердите пароль"
          type="password"
          autoComplete="current-password"
          placeholder="Введите password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-medium transition"
        >
          Войти
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
  Есть аккаунт? <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
</p>
    </div>
  );
};
