import { Shield, Users, Star, Zap, Award, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Todas las transacciones están protegidas y verificadas",
    color: "blue",
  },
  {
    icon: Users,
    title: "Comunidad Confiable",
    description: "Usuarios verificados y tiendas certificadas",
    color: "green",
  },
  {
    icon: Star,
    title: "Mejor Precio",
    description: "Encuentra las mejores ofertas del mercado",
    color: "yellow",
  },
  {
    icon: Zap,
    title: "Proceso Rápido",
    description: "Compra y vende en minutos con nuestro sistema optimizado",
    color: "purple",
  },
  {
    icon: Award,
    title: "Garantía Total",
    description: "Todos los productos cuentan con garantía de calidad",
    color: "orange",
  },
  {
    icon: HeartHandshake,
    title: "Soporte 24/7",
    description: "Atención al cliente disponible cuando lo necesites",
    color: "pink",
  },
]

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
  green: "bg-green-100 text-green-600 group-hover:bg-green-200",
  yellow: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200",
  purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
  orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
  pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-200",
}

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Trust Phone?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia en compra y venta de teléfonos usados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
              <div
                className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors shadow-lg`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
