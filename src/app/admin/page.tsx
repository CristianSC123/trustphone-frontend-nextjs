"use client"

import { useState } from "react"
import AdminSidebar from "@/componentes/admin/admin-sidebar"
import AdminHeader from "@/componentes/admin/admin-header"
import Dashboard from "@/componentes/admin/dashboard"
import ClientesModule from "@/componentes/admin/clientes-module"
import VendedoresModule from "@/componentes/admin/vendedores-module"
import CelularesModule from "@/componentes/admin/celulares-module"
import VentasModule from "@/componentes/admin/ventas-module"
import AjustesModule from "@/componentes/admin/ajustes-module"

export default function AdminPage() {
  const [activeModule, setActiveModule] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />
      case "clientes":
        return <ClientesModule />
      case "vendedores":
        return <VendedoresModule />
      case "celulares":
        return <CelularesModule />
      case "ventas":
        return <VentasModule />
      case "ajustes":
        return <AjustesModule />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{renderModule()}</main>
      </div>
    </div>
  )
}
