"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import AuthModal from "./auth-modal"
import UserMenu from "./user-menu"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar si hay usuario logueado
    const userData = localStorage.getItem("user_data")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/trust-phone-logo.png"
                alt="Trust Phone Logo"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="#inicio"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Inicio
                </Link>
                <Link
                  href="#tiendas"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Tiendas
                </Link>
                <Link
                  href="#contacto"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Contacto
                </Link>

                {/* Auth Button */}
                {user ? (
                  <UserMenu user={user} onLogout={handleLogout} />
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Registrarse
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-3">
                <Link
                  href="#inicio"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="#tiendas"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tiendas
                </Link>
                <Link
                  href="#contacto"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </Link>

                {user ? (
                  <UserMenu user={user} onLogout={handleLogout} />
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white mx-3 rounded-full shadow-lg"
                  >
                    Registrarse
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(userData) => {
          setUser(userData)
          setShowAuthModal(false)
        }}
      />
    </>
  )
}
