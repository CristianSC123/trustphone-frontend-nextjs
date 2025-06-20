import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Shield, CheckCircle, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
      }}
    >
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-800/80"></div>

      {/* Crypto-style floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-400/15 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 hover:from-blue-500/30 hover:to-cyan-500/30 mb-6 px-4 py-2 rounded-full backdrop-blur-sm border border-cyan-400/30">
              🚀 Plataforma #1 en Bolivia
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Trust Phone</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-cyan-200 drop-shadow-xl">es confianza</span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-100 font-semibold mb-6 drop-shadow-lg">
              Compra sin miedo, vende sin riesgos
            </p>

            <div className="flex justify-center lg:justify-start mb-8">
              <p className="text-lg text-slate-200 max-w-lg leading-relaxed drop-shadow-sm text-center lg:text-left">
                La plataforma más confiable para comprar y vender teléfonos usados. Conectamos compradores y vendedores
                con total seguridad y garantía.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
              <div className="text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                <div className="text-2xl font-bold text-cyan-300">10+</div>
                <div className="text-sm text-slate-300">Tiendas verificadas</div>
              </div>
              <div className="text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                <div className="text-2xl font-bold text-cyan-300">100+</div>
                <div className="text-sm text-slate-300">Usuarios activos</div>
              </div>
              <div className="text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                <div className="text-2xl font-bold text-cyan-300">98%</div>
                <div className="text-sm text-slate-300">Satisfacción</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#tiendas">
              <Button variant="outline" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 text-lg font-semibold">
                Explorar Tiendas
              </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">

              <div className="w-72 h-96 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300 border border-slate-300/50">
                <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-white border border-slate-700">
                  <Phone className="w-16 h-16 text-cyan-400 mb-4" />
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2 text-slate-200">iPhone 14 Pro</div>
                    <div className="text-xs text-slate-400 mb-3">Excelente estado</div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                      Verificado
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl animate-bounce border border-cyan-400/30">
                <Shield className="w-8 h-8 text-cyan-300" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-emerald-400/30">
                <CheckCircle className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-yellow-400/30">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
