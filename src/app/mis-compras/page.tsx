"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, DollarSign, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/componentes/header"
import ReciboModal from "@/componentes/recibo-modal"

interface Celular {
  id_celular: string
  imagenes: string
  modelo: string
  color: string
  almacenamiento: number
  ram: number
  estado: number
  detalles: string
  imei: string
  imei2: string
  precio_base: string
  precio_minimo: string
  precio: string
  estado_venta: number
  activo: boolean
  marca: string
  tienda: string
  vendedor: string
}

interface DetalleVenta {
  id_detalle_venta: string
  celular: Celular
  precio_unitario: string
  activo: boolean
  venta: string
}

interface Cliente {
  id_cliente: string
  nombre: string
  apellido: string
  email: string
  carnet: string
  password: string
  activo: boolean
}

interface Venta {
  id_venta: string
  detalle_venta: DetalleVenta[]
  cliente: Cliente
  fecha: string
  descuento: string
  total: string
  usuario: string
}

export default function MisComprasPage() {
  const [user, setUser] = useState<any>(null)
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVenta, setSelectedVenta] = useState<{ clienteId: string; ventaId: string } | null>(null)
  const [isReciboModalOpen, setIsReciboModalOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error al parsear user_data:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (!user?.id) return

    fetch(`http://127.0.0.1:8000/api/ventas/${user.id}/compras`)
      .then((res) => res.json())
      .then((data: Venta[]) => {
        console.log("Compras del usuario:", data)
        setVentas(data)
      })
      .catch((error) => {
        console.error("Error al obtener las compras:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  const getEstadoColor = (estado: number) => {
    switch (estado) {
      case 1:
        return "bg-green-100 text-green-800"
      case 0:
        return "bg-yellow-100 text-yellow-800"
      case 2:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoText = (estado: number) => {
    switch (estado) {
      case 1:
        return "Entregado"
      case 0:
        return "En Proceso"
      case 2:
        return "Cancelado"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-BO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleVerRecibo = (ventaId: string) => {
    if (user?.id) {
      setSelectedVenta({ clienteId: user.id, ventaId })
      setIsReciboModalOpen(true)
    }
  }

  // Calcular estadísticas
  const totalCompras = ventas.reduce((total, venta) => total + venta.detalle_venta.length, 0)
  const totalGastado = ventas.reduce((total, venta) => total + Number.parseFloat(venta.total), 0)
  const totalEntregados = ventas.reduce((total, venta) => {
    return total + venta.detalle_venta.filter((detalle) => detalle.celular.estado_venta === 1).length
  }, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus compras...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tus compras</p>
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
      <Header />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalCompras}</p>
                  <p className="text-sm text-gray-600">Total Productos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalGastado.toString())}</p>
                  <p className="text-sm text-gray-600">Total Gastado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalEntregados}</p>
                  <p className="text-sm text-gray-600">Recogidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ventas List */}
        <div className="space-y-6">
          {ventas.map((venta) => (
            <Card key={venta.id_venta} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Venta #{venta.id_venta.slice(0, 8)}...</h3>
                    <p className="text-sm text-gray-500">{formatDate(venta.fecha)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(venta.total)}</p>
                    {Number.parseFloat(venta.descuento) > 0 && (
                      <p className="text-sm text-green-600">Descuento: {formatPrice(venta.descuento)}</p>
                    )}
                  </div>
                </div>

                {/* Productos en esta venta */}
                <div className="space-y-4">
                  {venta.detalle_venta.map((detalle) => (
                    <div
                      key={detalle.id_detalle_venta}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <Image
                        src={
                          `http://127.0.0.1:8000${detalle.celular.imagenes || "/placeholder.svg"}` ||
                          "/placeholder.svg?height=80&width=80"
                        }
                        alt={detalle.celular.modelo}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{detalle.celular.modelo}</h4>
                        <p className="text-gray-600">{detalle.celular.color}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {detalle.celular.almacenamiento}GB
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {detalle.celular.ram}GB RAM
                          </Badge>
                          <Badge className={`text-xs ${getEstadoColor(detalle.celular.estado_venta)}`}>
                            {getEstadoText(detalle.celular.estado_venta)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">IMEI: {detalle.celular.imei}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(detalle.precio_unitario)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" onClick={() => handleVerRecibo(venta.id_venta)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Recibo
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes compras aún</h3>
              <p className="text-gray-600 mb-6">Explora nuestras tiendas y encuentra el celular perfecto para ti</p>
              <Link href="/#tiendas">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explorar Tiendas</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      {selectedVenta && (
        <ReciboModal
          isOpen={isReciboModalOpen}
          onClose={() => {
            setIsReciboModalOpen(false)
            setSelectedVenta(null)
          }}
          clienteId={selectedVenta.clienteId}
          ventaId={selectedVenta.ventaId}
        />
      )}
    </div>
  )
}
