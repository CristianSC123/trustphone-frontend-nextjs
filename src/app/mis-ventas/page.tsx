"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Calendar, DollarSign, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockVentas = [
  {
    id: "V001",
    fecha: "2024-01-15",
    celular: {
      modelo: "iPhone 14 Pro",
      color: "Morado Profundo",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    precio: "5950.00",
    comision: "297.50",
    estado: "completada",
    cliente: "Juan Pérez",
    tienda: "TechStore Pro",
  },
  {
    id: "V002",
    fecha: "2024-01-12",
    celular: {
      modelo: "Samsung Galaxy A54",
      color: "Violeta",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    precio: "1960.00",
    comision: "98.00",
    estado: "pendiente",
    cliente: "María García",
    tienda: "TechStore Pro",
  },
  {
    id: "V003",
    fecha: "2024-01-08",
    celular: {
      modelo: "Xiaomi 13 Pro",
      color: "Azul Cerámico",
      imagen: "/placeholder.svg?height=100&width=100",
    },
    precio: "3150.00",
    comision: "157.50",
    estado: "completada",
    cliente: "Carlos López",
    tienda: "TechStore Pro",
  },
]

export default function MisVentasPage() {
  const [user, setUser] = useState<any>(null)
  const [ventas] = useState(mockVentas)

  useEffect(() => {
    const userData = localStorage.getItem("user_data")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "completada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "completada":
        return "Completada"
      case "pendiente":
        return "Pendiente"
      case "cancelada":
        return "Cancelada"
      default:
        return "Desconocido"
    }
  }

  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price)
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 0,
    }).format(numPrice)
  }

  const totalVentas = ventas.reduce((total, venta) => total + Number.parseFloat(venta.precio), 0)
  const totalComisiones = ventas.reduce((total, venta) => total + Number.parseFloat(venta.comision), 0)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tus ventas</p>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Ventas</h1>
              <p className="text-gray-600">
                Hola {user.nombre}, aquí puedes ver el historial de tus ventas y comisiones
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total de ventas</p>
              <p className="text-2xl font-bold text-blue-600">{ventas.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{ventas.length}</p>
                  <p className="text-sm text-gray-600">Total Ventas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalVentas.toString())}</p>
                  <p className="text-sm text-gray-600">Total Vendido</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalComisiones.toString())}</p>
                  <p className="text-sm text-gray-600">Total Comisiones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {ventas.filter((v) => v.estado === "completada").length}
                  </p>
                  <p className="text-sm text-gray-600">Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ventas List */}
        <div className="space-y-6">
          {ventas.map((venta) => (
            <Card key={venta.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Image
                      src={venta.celular.imagen || "/placeholder.svg"}
                      alt={venta.celular.modelo}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{venta.celular.modelo}</h3>
                      <p className="text-gray-600">{venta.celular.color}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          ID: {venta.id}
                        </Badge>
                        <Badge className={`text-xs ${getEstadoColor(venta.estado)}`}>
                          {getEstadoText(venta.estado)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{formatPrice(venta.precio)}</p>
                      <p className="text-sm text-green-600 font-medium">Comisión: {formatPrice(venta.comision)}</p>
                    </div>
                    <p className="text-sm text-gray-500">Vendido el {venta.fecha}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Cliente:</strong> {venta.cliente}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Tienda:</strong> {venta.tienda}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {ventas.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes ventas aún</h3>
              <p className="text-gray-600 mb-6">Comienza a vender celulares y gana comisiones</p>
              <Link href="/#tiendas">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Ver Oportunidades</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
