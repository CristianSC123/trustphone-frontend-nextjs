"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, HardDrive, Cpu, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import ReservationModal from "./reservation-modal"
import type { Phone } from "@/../types/phone"

interface PhoneCardApiProps {
  phone: Phone
}

export default function PhoneCardApi({ phone }: PhoneCardApiProps) {
  const [showReservationModal, setShowReservationModal] = useState(false)
  const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL || "http://localhost:8000"

  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price)
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 0,
    }).format(numPrice)
  }

  const getConditionText = (estado: number) => {
    switch (estado) {
      case 0:
        return "Excelente"
      case 1:
        return "Muy Bueno"
      case 2:
        return "Bueno"
      case 3:
        return "Regular"
      default:
        return "Sin especificar"
    }
  }

  const getConditionColor = (estado: number) => {
    switch (estado) {
      case 0:
        return "border-green-500 text-green-700"
      case 1:
        return "border-blue-500 text-blue-700"
      case 2:
        return "border-yellow-500 text-yellow-700"
      case 3:
        return "border-orange-500 text-orange-700"
      default:
        return "border-gray-500 text-gray-700"
    }
  }

  const discountPercentage = Math.round(
    ((Number.parseFloat(phone.precio_base) - Number.parseFloat(phone.precio)) / Number.parseFloat(phone.precio_base)) *
      100,
  )

  return (
    <>
      <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 overflow-hidden">
        <div className="relative">
          <Image
            src={`${IMG_BASE_URL}${phone.imagenes}`}
            alt={phone.modelo}
            width={200}
            height={300}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=300&width=200"
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {phone.activo && (
              <Badge className="bg-green-500 text-white text-xs hover:bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Disponible
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white text-xs hover:bg-red-500">-{Math.abs(discountPercentage)}%</Badge>
            )}
          </div>

          {/* Stock status */}
          <div className="absolute top-3 right-3">
            {!phone.activo && (
              <Badge variant="secondary" className="bg-gray-500 text-white text-xs">
                No Disponible
              </Badge>
            )}
          </div>

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">Samsung</span>
              <Badge variant="outline" className={`text-xs ${getConditionColor(phone.estado)}`}>
                {getConditionText(phone.estado)}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{phone.modelo}</h3>
            <p className="text-sm text-gray-600">{phone.color}</p>
          </div>

          {/* Specifications */}
          <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
            <div className="flex items-center">
              <HardDrive className="w-3 h-3 mr-1" />
              <span>{phone.almacenamiento}GB</span>
            </div>
            <div className="flex items-center">
              <Cpu className="w-3 h-3 mr-1" />
              <span>{phone.ram}GB RAM</span>
            </div>
          </div>

          {/* IMEI Info */}
          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">
              <div>IMEI: {phone.imei}</div>
              {phone.imei2 && phone.imei2 !== phone.imei && <div>IMEI2: {phone.imei2}</div>}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">{formatPrice(phone.precio)}</span>
              {Number.parseFloat(phone.precio_base) !== Number.parseFloat(phone.precio) && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(phone.precio_base)}</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">Precio mínimo: {formatPrice(phone.precio_minimo)}</div>
          </div>

          {/* Details */}
          {phone.detalles && phone.detalles !== "Ninguno" && (
            <div className="mb-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
              <strong>Detalles:</strong> {phone.detalles}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              disabled={!phone.activo}
              onClick={() => setShowReservationModal(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {phone.activo ? "Reservar" : "No Disponible"}
            </Button>
            <Button
              variant="outline"
              className="px-3 border-blue-600 text-blue-600 hover:bg-blue-50"
              disabled
              title="Próximamente disponible"
            >
              Ver
            </Button>
          </div>
        </CardContent>
      </Card>

      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} phone={phone} />
    </>
  )
}
