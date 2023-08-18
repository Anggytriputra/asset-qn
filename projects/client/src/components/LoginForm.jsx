import { useState } from "react";
import logo from "../assets/logo.jpg";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  console.log("username", username);
  const [password, setPassword] = useState("");
  console.log("password", password);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Memanggil onLogin dari prop dan meneruskan username dan password
    onLogin(username, password);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to Quantum Nusatama
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  username
                </label>
                <div className="mt-1">
                  <input
                    name="username"
                    type="username"
                    autoComplete="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  ></label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
