"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"
import Image from "next/image"

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
  usuario: Usuario
}

interface Usuario {
  id_usuario: string
  nombre: string
  email: string
  password: string
  rol: string
  activo: boolean
  tienda: string
}

interface Encargado {
  id_encargado: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
  carnet: string
  activo: boolean
}

interface Tienda {
  id_tienda: string
  encargado: Encargado
  nombre: string
  direccion: string
  detalles: string
  fotografia: string
  activo: boolean
}

interface ReciboData {
  venta: Venta
  usuario: Usuario
  tienda: Tienda
}

interface ReciboModalProps {
  isOpen: boolean
  onClose: () => void
  clienteId: string
  ventaId: string
}

export default function ReciboModal({ isOpen, onClose, clienteId, ventaId }: ReciboModalProps) {
  const [reciboData, setReciboData] = useState<ReciboData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && clienteId && ventaId) {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_IMG_BASE_URL}/api/ventas/${clienteId}/compras/${ventaId}`)
        .then((res) => res.json())
        .then((data: { venta: Venta; usuario: Usuario; tienda: Tienda }) => {
          console.log("Datos del recibo:", data)
          setReciboData(data)
        })
        .catch((error) => {
          console.error("Error al obtener el recibo:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isOpen, clienteId, ventaId])

  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price)
    return `Bs ${numPrice.toFixed(2)}`
  }

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!reciboData) {
    return null
  }

  const { venta, tienda, usuario } = reciboData

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-full">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden m-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white text-center py-8 px-6 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                {tienda.fotografia && (
                  <img
                    src={`http://localhost:8000${tienda.fotografia}`}
                    alt="Logo tienda"
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-white/30 shadow-lg object-cover"
                  />
                )}
                <h1 className="text-3xl font-light tracking-wider mb-4 drop-shadow-lg">RECIBO DE VENTA</h1>
                <p className="text-lg mb-2 opacity-90">
                  <strong>N° Venta:</strong> {venta.id_venta}
                </p>
                <p className="text-lg opacity-90">
                  <strong>Fecha:</strong> {venta.fecha}
                </p>
              </div>
              {/* Decorative arrow */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-indigo-800"></div>
            </div>

            <div className="p-8">
              {/* Client Info Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 mb-6 shadow-sm">
                <p className="text-gray-700 text-lg">
                  <strong className="text-blue-700">Cliente:</strong> {venta.cliente.nombre} {venta.cliente.apellido}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong className="text-blue-700">Usuario:</strong> {usuario.nombre}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong className="text-blue-700">Tienda:</strong> {tienda.nombre}
                </p>
              </div>

              {/* Decorative Line */}
              <div className="relative my-8">
                <div className="border-t-2 border-dashed border-blue-200"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <span className="text-blue-500 text-xl">✦</span>
                </div>
              </div>

              {/* Products Title */}
              <h3 className="text-2xl font-semibold text-center text-blue-700 mb-6 relative">
                Detalle de productos
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </h3>

              {/* Products Table */}
              <div className="overflow-hidden rounded-xl shadow-lg mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <th className="py-4 px-6 text-left font-semibold tracking-wide uppercase text-sm">Producto</th>
                      <th className="py-4 px-6 text-left font-semibold tracking-wide uppercase text-sm">Descripción</th>
                      <th className="py-4 px-6 text-left font-semibold tracking-wide uppercase text-sm">
                        Precio unitario
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {venta.detalle_venta.map((detalle) => (
                      <tr
                        key={detalle.id_detalle_venta}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 text-gray-700">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_BASE_URL}${detalle.celular.imagenes}`}
                            alt={detalle.celular.modelo}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-4 px-6 text-gray-700 font-medium">
                          {detalle.celular.modelo} {detalle.celular.color} / {detalle.celular.almacenamiento}+
                          {detalle.celular.ram}Gb
                        </td>
                        <td className="py-4 px-6 text-gray-700 font-medium">{formatPrice(detalle.precio_unitario)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Section */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 text-right mb-6">
                <p className="text-lg text-gray-700 mb-3">
                  <strong className="text-blue-700">Descuento:</strong> {formatPrice(venta.descuento)}
                </p>
                <div className="border-t-2 border-blue-300 pt-4 mt-4">
                  <p className="text-2xl font-bold text-blue-800">
                    <strong>Total: {formatPrice(venta.total)}</strong>
                  </p>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="relative my-8">
                <div className="border-t-2 border-dashed border-blue-200"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                  <span className="text-blue-500 text-xl">✦</span>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="text-center bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl border-2 border-dashed border-blue-400">
                <p className="text-xl font-semibold text-blue-700">¡Gracias por tu compra!</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={onClose} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cerrar
                </Button>
                <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
