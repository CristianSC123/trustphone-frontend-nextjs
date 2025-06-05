import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, Star, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface StoreCardProps {
  id: string
  name: string
  specialty: string
  description: string
  rating: number
  sales: number
  verified: boolean
  image?: string
  phone?: string
  email?: string
}

export default function StoreCard({
  id,
  name,
  specialty,
  description,
  rating,
  sales,
  verified,
  image,
  phone,
  email,
}: StoreCardProps) {
  const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL || "http://localhost:8000"

  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 overflow-hidden">
      {/* Store Image */}
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={`${IMG_BASE_URL}${image}`}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=200&width=300"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200">
            <Store className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{specialty}</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700 ml-1 font-medium">{rating}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">{description}</p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {phone && (
            <div className="flex items-center text-gray-500 text-xs">
              <Phone className="w-3 h-3 mr-2" />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center text-gray-500 text-xs">
              <Mail className="w-3 h-3 mr-2" />
              <span className="truncate">{email}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          {verified && <Badge className="bg-green-100 text-green-700 text-xs hover:bg-green-100">✓ Verificado</Badge>}
          <span className="text-sm text-gray-500 font-medium">+{sales} ventas</span>
        </div>

        <Link href={`/tienda/${id}`}>
          <Button
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Ver Tienda
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
