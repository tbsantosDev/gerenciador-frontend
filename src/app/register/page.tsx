"use client";
import authService from "@/services/loginService";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = { name, email, password };

    try {
      const res = await authService.register(params);

      if (res.status === 200 && res.data.status === true) {
        toast.success(
          "Usuário criado com sucesso, por favor acesse seu e-mail para confirma-lo!"
        );
        router.push("/");
      } else {
        toast.error(res.data.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.log("Ocorreu um erro:", error);
      toast.error("Erro no servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center p-10">
        {loading && "loading..."}
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md p-8 shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Primeiro e último nome"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="mt-1 w-full p-3 pr-10 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-10 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-amarelo text-white p-3 rounded-md hover:bg-yellow-500"
          >
            Criar conta
          </button>
        </form>
      </div>
    </main>
  );
}
