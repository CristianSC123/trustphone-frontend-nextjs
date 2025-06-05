"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Store, Star, MapPin, PhoneIcon, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import PhoneCardApi from "@/componentes/phone-card-api"
import type { Phone, Store as StoreType } from "@/../types/phone"

interface StorePageProps {
  params: {
    storeId: string
  }
}

export default function StorePage({ params }: StorePageProps) {
  const [store, setStore] = useState<StoreType | null>(null)
  const [phones, setPhones] = useState<Phone[]>([])
  const [loading, setLoading] = useState(true)
  const [phonesLoading, setPhonesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch store data
  useEffect(() => {
    fetch("http://localhost:8000/api/tiendas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar la tienda")
        }
        return response.json()
      })
      .then((data: StoreType[]) => {
        const foundStore = data.find((s) => s.id_tienda === params.storeId)
        if (!foundStore) {
          throw new Error("Tienda no encontrada")
        }
        setStore(foundStore)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching store:", error)
        setError(error.message)
        setLoading(false)
      })
  }, [params.storeId])

  // Fetch phones data
  useEffect(() => {
    fetch(`http://localhost:8000/api/tiendas/${params.storeId}/celulares/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los celulares")
        }
        return response.json()
      })
      .then((data: Phone[]) => {
        setPhones(data)
        setPhonesLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching phones:", error)
        setPhonesLoading(false)
      })
  }, [params.storeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando tienda...</p>
        </div>
      </div>
    )
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || "Tienda no encontrada"}</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL || "http://localhost:8000"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                {store.fotografia ? (
                  <img
                    src={`${IMG_BASE_URL}${store.fotografia}`}
                    alt={store.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      e.currentTarget.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <Store className="w-8 h-8 text-blue-600 hidden" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{store.nombre}</h1>
                <p className="text-gray-600">{store.detalles}</p>
                <p className="text-sm text-gray-500">{store.direccion}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8</span>
                  <span className="text-sm text-gray-500 ml-2">• Tienda verificada</span>
                  {store.activo && <Badge className="bg-green-100 text-green-700 text-xs ml-2">✓ Activa</Badge>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <PhoneIcon className="w-4 h-4 mr-2" />
                {store.encargado.telefono}
              </Button>
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Ubicación
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Store Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información de la tienda</h3>
              <p className="text-gray-700 leading-relaxed">{store.detalles}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Dirección:</strong> {store.direccion}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Encargado</h3>
              <p className="text-gray-700">
                {store.encargado.nombre} {store.encargado.apellido}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Teléfono:</strong> {store.encargado.telefono}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {store.encargado.correo}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
            Catálogo {phonesLoading ? "" : `(${phones.length} productos)`}
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Ordenar por precio</option>
              <option>Menor a mayor precio</option>
              <option>Mayor a menor precio</option>
              <option>Más recientes</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {phonesLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : phones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay productos disponibles en esta tienda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phones.map((phone) => (
              <PhoneCardApi key={phone.id_celular} phone={phone} />
            ))}
          </div>
        )}

        {/* Load More */}
        {phones.length > 0 && (
          <div className="text-center mt-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
              Cargar más productos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
