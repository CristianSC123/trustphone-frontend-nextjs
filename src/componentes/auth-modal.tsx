"use client";
declare global {
  interface Window {
    google: any;
  }
}
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  // Estados para formularios
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [clienteData, setClienteData] = useState({
    nombre: "",
    apellido: "",
    carnet: "",
    email: "",
    password: "",
  });

  // Cargar script de Google
  useEffect(() => {
    if (!isOpen) return;

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleScriptLoaded(true);
      script.onerror = () => console.error("Error al cargar Google API");
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setGoogleScriptLoaded(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !googleScriptLoaded || !window.google) return;

    const handleGoogleAuth = async (response: any) => {
      const jwt = response.credential;
      const userData = parseJwt(jwt);

      console.log(userData);

      const clienteData = {
        nombre: userData.given_name || "",
        apellido: userData.family_name || "",
        carnet: userData.sub,
        email: userData.email,
        password: userData.sub,
      };

      console.log(clienteData);

      try {
        const response = await fetch('http://localhost:8000/api/clientes/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteData),
        });

        if (!response.ok) {
          throw new Error('Error al registrar cliente');
        }

        const data = await response.json();
        
        localStorage.setItem("user_token", jwt);
        localStorage.setItem("user_data", JSON.stringify(data.cliente));
        onSuccess(data.cliente);
      } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar con Google. Por favor, intenta de nuevo.');
      }
    };

    window.google.accounts.id.initialize({
      client_id: "954053519161-vs20scgkuo4r9eahgat4ug3nppbf7c6p.apps.googleusercontent.com",
      callback: handleGoogleAuth,
    });

    const renderButtons = () => {
      const googleButton = document.getElementById("google-button");
      const googleButtonRegister = document.getElementById("google-button-register");

      if (googleButton && !googleButton.hasChildNodes()) {
        window.google.accounts.id.renderButton(googleButton, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "pill",
        });
      }

      if (googleButtonRegister && !googleButtonRegister.hasChildNodes()) {
        window.google.accounts.id.renderButton(googleButtonRegister, {
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "pill",
        });
      }
    };

    renderButtons();
    window.google.accounts.id.prompt();

    const observer = new MutationObserver(renderButtons);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, [isOpen, googleScriptLoaded, onSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/clientes/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem("user_data", JSON.stringify(data.cliente));
      onSuccess(data.cliente);
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/clientes/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrarse');
      }

      const data = await response.json();
      localStorage.setItem("user_data", JSON.stringify(data.cliente));
      onSuccess(data.cliente);
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al registrarse: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Bienvenido a TrustPhone
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <div className="flex justify-center mb-4">
                <div id="google-button" className="w-full flex justify-center"></div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    O continúa con
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Correo Electrónico</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password">Contraseña</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      placeholder="Tu contraseña"
                      className="pl-10 pr-10"
                      required
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <div className="flex justify-center mb-4">
                <div id="google-button-register" className="w-full flex justify-center"></div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    O continúa con
                  </span>
                </div>
              </div>

              <form onSubmit={handleRegisterCliente} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cliente-nombre">Nombre *</Label>
                    <Input
                      id="cliente-nombre"
                      value={clienteData.nombre}
                      onChange={(e) =>
                        setClienteData({
                          ...clienteData,
                          nombre: e.target.value,
                        })
                      }
                      placeholder="Juan"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cliente-apellido">Apellido *</Label>
                    <Input
                      id="cliente-apellido"
                      value={clienteData.apellido}
                      onChange={(e) =>
                        setClienteData({
                          ...clienteData,
                          apellido: e.target.value,
                        })
                      }
                      placeholder="Pérez"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cliente-carnet">Carnet de Identidad</Label>
                  <div className="relative mt-1">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="cliente-carnet"
                      value={clienteData.carnet}
                      onChange={(e) =>
                        setClienteData({
                          ...clienteData,
                          carnet: e.target.value,
                        })
                      }
                      placeholder="12345678 (Opcional)"
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cliente-email">Correo Electrónico *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="cliente-email"
                      type="email"
                      value={clienteData.email}
                      onChange={(e) =>
                        setClienteData({
                          ...clienteData,
                          email: e.target.value,
                        })
                      }
                      placeholder="tu@email.com"
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cliente-password">Contraseña *</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="cliente-password"
                      type={showPassword ? "text" : "password"}
                      value={clienteData.password}
                      onChange={(e) =>
                        setClienteData({
                          ...clienteData,
                          password: e.target.value,
                        })
                      }
                      placeholder="Tu contraseña"
                      className="pl-10 pr-10"
                      required
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registrándose...
                    </>
                  ) : (
                    "Registrarse como Cliente"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}