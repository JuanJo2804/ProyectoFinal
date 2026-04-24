import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smile from "../../../assets/smile.png";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordValidate: "",
    celphone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordValidate, setShowPasswordValidate] = useState(false);

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

    // Validaciones
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.passwordValidate) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, {
        name: formData.name,
        celphone: formData.celphone,
        address: formData.address,
      });
      navigate("/gallery");
    } catch (err) {
      setError(err.message || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <img src={smile} alt="Smile Icon" className="w-[64px] h-[64px]" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Join Us!</h1>
          <p className="text-slate-400 text-lg">Create your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>

          {/* Name Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Name
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="Your full name"
              />
              <span className="absolute right-0 top-2 text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Email
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="your@email.com"
              />
              <span className="absolute right-0 top-2 text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Password
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="Min 8 characters"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Confirm Password
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type={showPasswordValidate ? "text" : "password"}
                name="passwordValidate"
                value={formData.passwordValidate}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="Repeat password"
              />
              <span
                onClick={() => setShowPasswordValidate(!showPasswordValidate)}
                className="absolute right-0 top-2 text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Phone Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Phone
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type="tel"
                name="celphone"
                value={formData.celphone}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="+1 (555) 123-4567"
              />
              <span className="absolute right-0 top-2 text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Address Input */}
          <div className="relative group">
            <label className="block text-slate-400 text-sm mb-1 group-focus-within:text-blue-500 transition-colors">
              Address
            </label>
            <div className="relative border-b border-gray-200 group-focus-within:border-blue-500 transition-all">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full py-2 bg-transparent focus:outline-none text-slate-700 pr-8 text-sm"
                placeholder="Street, number, postal code"
              />
              <span className="absolute right-0 top-2 text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Terms and Conditions - Full Width */}
          <div className="col-span-2 flex items-center space-x-3 text-slate-400 mt-2">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 transition-all cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the terms and conditions
            </label>
          </div>

          {/* Sign Up Button - Full Width */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 py-3 btn-dna hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-blue-200 active:scale-95 mt-2"
          >
            <span className="text-lg">{loading ? "Signing Up..." : "Sign Up"}</span>
            {!loading && (
              <svg
                className="w-5 h-5"
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

        {/* Login Link */}
        <div className="mt-6 text-center text-slate-400">
          <p className="text-sm">
            Already have an account?
            <Link to="/" className="text-blue-500 hover:text-blue-600 transition-colors ml-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;