"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { apiService } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    carnet: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiService.login(loginData.email, loginData.password)

      // Guardar token en localStorage
      localStorage.setItem("user_token", response.token)
      localStorage.setItem("user_data", JSON.stringify(response.user))

      // Redirigir a la página principal
      window.location.href = "/"
    } catch (error) {
      console.error("Error en login:", error)
      alert("Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiService.register(registerData)

      // Guardar token en localStorage
      localStorage.setItem("user_token", response.token)
      localStorage.setItem("user_data", JSON.stringify(response.user))

      // Redirigir a la página principal
      window.location.href = "/"
    } catch (error) {
      console.error("Error en registro:", error)
      alert("Error al registrarse. Verifica los datos.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Aquí iría la lógica de Google OAuth
    console.log("Google login")
    alert("Funcionalidad de Google OAuth próximamente")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Phone className="w-12 h-12 text-blue-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">TrustPhone</span>
          </div>
          <p className="text-gray-600">Plataforma de Clientes y Vendedores</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  <User className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="register">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                {/* Google Login */}
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:bg-gray-50"
                  disabled={loading}
                >
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  Continuar con Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">O continúa con</span>
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
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        value={registerData.nombre}
                        onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                        placeholder="Juan"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input
                        id="apellido"
                        value={registerData.apellido}
                        onChange={(e) => setRegisterData({ ...registerData, apellido: e.target.value })}
                        placeholder="Pérez"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="carnet">Carnet de Identidad</Label>
                    <Input
                      id="carnet"
                      value={registerData.carnet}
                      onChange={(e) => setRegisterData({ ...registerData, carnet: e.target.value })}
                      placeholder="12345678"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Correo Electrónico</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                      "Crear Cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                ¿Eres administrador de tienda?{" "}
                <Link href="/admin/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Acceso administrativo
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  )
}
