"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"
import { apiService } from "@/lib/api"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiService.adminLogin(formData.email, formData.password)

      // Guardar token en localStorage
      localStorage.setItem("admin_token", response.token)
      localStorage.setItem("admin_user", JSON.stringify(response.user))

      // Redirigir al panel de admin
      window.location.href = "/admin"
    } catch (error) {
      console.error("Error en login de admin:", error)
      alert("Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold text-white">TrustPhone</span>
              <p className="text-blue-300 text-sm">Admin Panel</p>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Acceso Administrativo</CardTitle>
            <p className="text-gray-600">Panel de administración de tienda</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@trustphone.com"
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  "Acceder al Panel"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Eres cliente o vendedor?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  )
}
