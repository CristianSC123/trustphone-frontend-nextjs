"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StoreCard from "./store-card"
import { useEffect, useState } from "react"

interface Encargado {
  id_encargado: string
  nombre: string
  apellido: string
  telefono: string
  correo: string
  carnet: string
  activo: boolean
}

interface Store {
  id_tienda: string
  encargado: Encargado
  nombre: string
  direccion: string
  detalles: string
  fotografia: string
  activo: boolean
}

export default function StoresSection() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:8000/api/tiendas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar las tiendas")
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setStores(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching stores:", error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="tiendas" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando tiendas...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="tiendas" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tiendas" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 px-4 py-2 rounded-full">
            Tiendas Destacadas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tiendas Verificadas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre tiendas confiables con los mejores teléfonos usados. Todas nuestras tiendas están verificadas y
            garantizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stores.map((store) => {
            return (
              <StoreCard
                key={store.id_tienda}
                id={store.id_tienda}
                name={store.nombre}
                specialty={store.detalles}
                description={`Ubicado en ${store.direccion}. Encargado: ${store.encargado.nombre} ${store.encargado.apellido}`}
                rating={4.8}
                sales={Math.floor(Math.random() * 300) + 50}
                verified={store.activo}
                image={store.fotografia}
                phone={store.encargado.telefono}
                email={store.encargado.correo}
              />
            );
          })}
        </div>


        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
            Ver Todas las Tiendas ({stores.length})
          </Button>
        </div>
      </div>
    </section>
  )
}
