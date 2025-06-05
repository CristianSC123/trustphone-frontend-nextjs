import { Phone, Facebook, Instagram, Twitter, Mail, MapPin, Shield } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  company: [
    { name: "Sobre Nosotros", href: "#" },
    { name: "Cómo Funciona", href: "#" },
    { name: "Carreras", href: "#" },
    { name: "Prensa", href: "#" },
  ],
  support: [
    { name: "Centro de Ayuda", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Términos y Condiciones", href: "#" },
    { name: "Garantías", href: "#" },
  ],
  services: [
    { name: "Comprar", href: "#" },
    { name: "Vender", href: "#" },
    { name: "Verificación", href: "#" },
    { name: "Seguros", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold">Trust Phone</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              La plataforma más confiable para comprar y vender teléfonos usados en La - Paz Bolivia. Compra sin miedo, vende
              sin riesgos.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">contacto@trustphone.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">La Paz, Bolivia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security Badge */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm text-gray-400">Sitio seguro y verificado</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Trust Phone. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
