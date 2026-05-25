import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Settings = () => {
  const { user, getUserData, updateUserData, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    celphone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
          setFormData({
            name: data.name || "",
            celphone: data.celphone || "",
            address: data.address || "",
          });
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user, getUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    if (!formData.name.trim()) {
      setError("El nombre es obligatorio");
      setSaving(false);
      return;
    }

    try {
      await updateUserData(user.uid, {
        name: formData.name.trim(),
        celphone: formData.celphone.trim(),
        address: formData.address.trim(),
      });
      setSuccess("¡Perfil actualizado correctamente!");
      // Update local userData
      setUserData((prev) => ({
        ...prev,
        name: formData.name.trim(),
        celphone: formData.celphone.trim(),
        address: formData.address.trim(),
      }));
    } catch (err) {
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setError("Ingresa tu contraseña para confirmar");
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await deleteAccount(deletePassword);
      navigate("/");
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Contraseña incorrecta. Intenta de nuevo.");
      } else {
        setError(msg || "Error al eliminar la cuenta");
      }
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-lg">Cargando ajustes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al perfil
          </button>
          <h2 className="text-lg font-semibold text-slate-700">Ajustes</h2>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Edit Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Editar Perfil</h3>
                <p className="text-sm text-slate-400">Actualiza tu información personal</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mx-8 mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && !showDeleteModal && (
            <div className="mx-8 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSave} className="px-8 pb-8 space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
                placeholder="Tu nombre completo"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Email</label>
              <input
                type="email"
                value={userData?.email || user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1">El email no se puede modificar</p>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Teléfono</label>
              <input
                type="tel"
                name="celphone"
                value={formData.celphone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
                placeholder="Calle, número, código postal"
              />
            </div>

            {/* Save Button */}
            <button
              id="btn-save-profile"
              type="submit"
              disabled={saving}
              className="w-full py-3.5 btn-dna hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 active:scale-95 mt-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 overflow-hidden">
          <div className="px-8 py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-600">Zona de Peligro</h3>
                <p className="text-sm text-slate-400">Acciones irreversibles</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Al eliminar tu cuenta, se borrarán permanentemente todos tus datos, incluyendo tu perfil
              e información personal. <strong className="text-red-500">Esta acción no se puede deshacer.</strong>
            </p>

            <button
              id="btn-delete-account"
              onClick={() => {
                setShowDeleteModal(true);
                setError("");
                setDeletePassword("");
              }}
              className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-300 active:scale-95"
            >
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowDeleteModal(false);
              setError("");
            }}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[fadeIn_0.2s_ease-out]">
            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
              ¿Eliminar tu cuenta?
            </h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              Ingresa tu contraseña para confirmar. Todos tus datos serán eliminados permanentemente.
            </p>

            {/* Error in modal */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Password Input */}
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => {
                setDeletePassword(e.target.value);
                setError("");
              }}
              placeholder="Tu contraseña actual"
              className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all text-slate-700 mb-6"
            />

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setError("");
                }}
                className="flex-1 py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-95"
              >
                Cancelar
              </button>
              <button
                id="btn-confirm-delete"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Eliminando...</span>
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
