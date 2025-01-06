import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <Image src={"/login.jpeg"} fill alt="imagem tela de login" className="object-cover"/>
        </div>
        <div className="flex items-center justify-center p-10">
        <form className="w-full max-w-md p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
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
