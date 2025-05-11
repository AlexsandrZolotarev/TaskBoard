import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../UI/InputField";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { login } from "../store/slices/authSlice";


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
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const users = useSelector((state:RootState) => state.users);
  const navigate = useNavigate();

 const onSubmit = (data: LoginForm) => {
  const user = users.find(u => u.email === data.email && u.password === data.password)
  if (!user) {
    alert("Неверный email или пароль")
    return
  }
  dispatch(login(data.email))
  navigate("/")
}

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          {...formRegister("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Пароль"
          type="password"
          autoComplete="current-password"
          placeholder="Введите password"
          {...formRegister("password")}
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
