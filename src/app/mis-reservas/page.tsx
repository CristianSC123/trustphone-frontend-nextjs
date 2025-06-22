"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Calendar,
  DollarSign,
  Eye,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/componentes/header";

interface Cliente {
  id_cliente: string;
  nombre: string;
  apellido: string;
  email: string;
  carnet: string;
  password: string;
  activo: boolean;
}

interface Celular {
  id_celular: string;
  imagenes: string;
  modelo: string;
  color: string;
  almacenamiento: number;
  ram: number;
  estado: number;
  detalles: string;
  imei: string;
  imei2: string;
  precio_base: string;
  precio_minimo: string;
  precio: string;
  estado_venta: number;
  activo: boolean;
  marca: string;
  tienda: string;
  vendedor: string;
}

interface Reserva {
  id_reserva: string;
  comprobante: string;
  fecha: string;
  estado: string;
  cliente: Cliente;
  celular: Celular;
}

export default function MisReservasPage() {
  const [user, setUser] = useState<any>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear user_data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8000/api/reservas/${user.id}/`)
      .then((res) => res.json())
      .then((data: Reserva[]) => {
        console.log("Reservas del usuario:", data);
        setReservas(data);
      })
      .catch((error) => {
        console.error("Error al obtener las reservas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "terminada":
        return "bg-green-100 text-green-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoText = (estado: string) => {
    return estado.charAt(0).toUpperCase() + estado.slice(1);
  };

  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price);
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-BO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalReservas = reservas.length;
  const reservasPendientes = reservas.filter(
    (reserva) => reserva.estado.toLowerCase() === "pendiente"
  ).length;
  const reservasConfirmadas = reservas.filter(
    (reserva) => reserva.estado.toLowerCase() === "confirmada"
  ).length;
  const totalValor = reservas.reduce(
    (total, reserva) => total + Number.parseFloat(reserva.celular.precio),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus reservas...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Debes iniciar sesión para ver tus reservas
          </p>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalReservas}
                  </p>
                  <p className="text-sm text-gray-600">Total Reservas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reservasPendientes}
                  </p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reservasConfirmadas}
                  </p>
                  <p className="text-sm text-gray-600">Entregadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalValor.toString())}
                  </p>
                  <p className="text-sm text-gray-600">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservas List */}
        <div className="space-y-6">
          {reservas.map((reserva) => (
            <Card key={reserva.id_reserva} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Reserva #{reserva.id_reserva.slice(0, 8)}...
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(reserva.fecha)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getEstadoColor(reserva.estado)}`}>
                      {getEstadoText(reserva.estado)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(reserva.celular.precio)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Producto reservado */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Image
                    src={
                      `http://localhost:8000${reserva.celular.imagenes}` ||
                      "/placeholder.svg?height=80&width=80"
                    }
                    alt={reserva.celular.modelo}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {reserva.celular.modelo}
                    </h4>
                    <p className="text-gray-600">{reserva.celular.color}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {reserva.celular.almacenamiento}GB
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {reserva.celular.ram}GB RAM
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      IMEI: {reserva.celular.imei}
                    </p>
                    {reserva.celular.detalles &&
                      reserva.celular.detalles !== "Ninguno" && (
                        <p className="text-sm text-gray-600">
                          Detalles: {reserva.celular.detalles}
                        </p>
                      )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mt-1">
                      Monto pendiente
                    </p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm text-gray-500 line-through">
                        {formatPrice(reserva.celular.precio)}
                      </p>
                      <p className="font-bold text-blue-600">
                        {formatPrice(Number.parseFloat(reserva.celular.precio) - 100)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comprobante */}
                {reserva.comprobante && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Comprobante adjunto
                      </span>
                      <Link
                        href={`http://localhost:8000${reserva.comprobante}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-700 text-sm underline ml-auto"
                      >
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Comprobante
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {reservas.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tienes reservas aún
              </h3>
              <p className="text-gray-600 mb-6">
                Explora nuestras tiendas y reserva el celular perfecto para ti
              </p>
              <Link href="/#tiendas">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explorar Tiendas
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
