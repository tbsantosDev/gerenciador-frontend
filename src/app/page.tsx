"use client"
import PageSpinner from "@/components/common/pageSpinner";
import loginService from "@/services/loginService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleLogin = async (event: FormEvent) => {
      event.preventDefault()
      setLoading(true);
  
      try {
        const params = { email, password }
        const { status } = await loginService.login(params)
  
        if(status === 200) {
          sessionStorage.getItem("gerenciadorToken")
          router.push("/home")
        } else {
          toast.error("Credenciais inválidas!")
        }
      } catch (error) {
        toast.error("Ocorreu um erro, por favor, tente novamente.")
        console.log("Ocorreu um erro:", error)
      } finally {
        setLoading(false);
      }
    }


  return (
    <main>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {loading && <PageSpinner />}
        <div className="relative">
          <Image src={"/login.jpeg"} fill alt="imagem tela de login" className="object-cover"/>
        </div>
        <div className="flex items-center justify-center p-10">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amarelo text-white p-3 rounded-md hover:bg-yellow-500"
          >
            Entrar
          </button>

          <p className="mt-4 text-center text-sm"> Não possui conta?{' '}
            <a href="/register" className="text-red-600 hover:underline">
              Cadastre-se aqui!
            </a>
          </p>
        </form>
      </div>
      </div>
    </main>

  );
}
