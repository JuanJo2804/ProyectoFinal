import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smile from "../../../assets/smile.png";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/gallery");
    } catch (err) {
      const code = err.code || err.message || "";
      if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
        setError("Correo o contraseña incorrectos.");
      } else if (code.includes("too-many-requests")) {
        setError("Demasiados intentos. Intenta de nuevo más tarde.");
      } else if (code.includes("network-request-failed")) {
        setError("Error de conexión. Verifica tu internet.");
      } else {
        setError("Ocurrió un error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Header con Icono */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-4">
            <img src={smile} alt="Smile Icon" className="w-[64px] h-[64px]" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome!</h1>
          <p className="text-slate-400 text-lg">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* Input de Email */}
          <div className="relative group">
            <label className="block text-slate-400 text-lg mb-1 group-focus-within:text-blue-500 transition-colors">
              Email
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-10"
                placeholder="your@email.com"
              />
              <span className="absolute right-0 top-2 text-slate-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Input de Password */}
          <div className="relative group">
            <label className="block text-slate-400 text-lg mb-1 group-focus-within:text-blue-500 transition-colors">
              Password
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-10"
                placeholder="Enter your password"
              />
              <span 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Opciones de Remember y Forgot */}
          <div className="flex items-center justify-between text-slate-400">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 transition-all"
              />
              <span className="text-lg">remember me?</span>
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors text-lg">
              forgot password?
            </a>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-3/5 py-4 btn-dna hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-blue-200 active:scale-95 mx-auto"
          >
            <span className="text-xl">{loading ? "Logging in..." : "Login"}</span>
            {!loading && (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>

        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-slate-400">
          <p className="text-lg">
            Don't have an account? 
            <Link to="/register" className="text-blue-500 hover:text-blue-600 transition-colors ml-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;