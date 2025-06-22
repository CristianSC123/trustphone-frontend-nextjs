"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Upload,
  QrCode,
  Calendar,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Phone } from "@/../types/phone";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: Phone;
}

export default function ReservationModal({
  isOpen,
  onClose,
  phone,
}: ReservationModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const IMG_BASE_URL =
    process.env.NEXT_PUBLIC_IMG_BASE_URL || "http://localhost:8000";

  const formatPrice = (price: string) => {
    const numPrice = Number.parseFloat(price);
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona solo archivos de imagen");
        return;
      }
      // Validar tamaño (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert("El archivo es muy grande. Máximo 10MB");
        return;
      }
      setSelectedFile(file);
      setUploadSuccess(false);
    }
  };

  const handleSubmitReceipt = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un comprobante de pago");
      return;
    }

    setUploading(true);

    const storedUser = localStorage.getItem("user_data");
    if (!storedUser) {
      alert(
        "No se encontró información del usuario. Por favor, inicia sesión."
      );
      setUploading(false);
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      const formData = new FormData();
      formData.append("comprobante", selectedFile);
      formData.append("celular", phone.id_celular);

      // Construir URL completa
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const fullUrl = `${apiUrl}/api/reservas/${userData.id}/crear/`;

      console.log("Intentando conectar a:", fullUrl); // Para debugging

      const response = await fetch(fullUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Crear una copia de la respuesta para poder leerla dos veces
        const clonedResponse = response.clone();

        // Intentar obtener el error como JSON primero
        try {
          const errorData = await clonedResponse.json();
          throw new Error(
            errorData.detail || errorData.error || "Error al crear la reserva"
          );
        } catch {
          // Si no es JSON, obtener el texto
          const errorText = await response.text();
          throw new Error(
            `Error del servidor: ${errorText.substring(0, 100)}...`
          );
        }
      }

      setUploading(false);
      setUploadSuccess(true);
    } catch (error) {
      setUploading(false);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      alert(`Error al crear la reserva: ${errorMessage}`);
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      onClose();
      setSelectedFile(null);
      setUploadSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Reservar Celular
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-1"
            disabled={uploading}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success State */}
          {uploadSuccess && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¡Tu reserva ha sido exitosa!
              </h3>
              <p className="text-gray-600">
                Tu reserva ha sido procesada exitosamente.
              </p>
              <Button
                className="flex-1 bg-blue-600 mt-4 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                variant="default"
                onClick={() => (window.location.href = "/mis-reservas")}
              >
                Ver Reserva
              </Button>
            </div>
          )}

          {/* Normal State */}
          {!uploadSuccess && (
            <>
              {/* Phone Info */}
              <Card className="mb-6 border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${IMG_BASE_URL}${phone.imagenes}`}
                      alt={phone.modelo}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=80&width=80";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {phone.modelo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {phone.color} • {phone.almacenamiento}GB • {phone.ram}GB
                        RAM
                      </p>
                      <div className="text-lg font-bold text-blue-600 mt-1">
                        {formatPrice(phone.precio)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reservation Instructions */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">
                    Instrucciones de Reserva
                  </h3>
                </div>
                <div className="text-sm text-blue-800 space-y-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Reserva válida por 24 horas</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="font-bold italic">
                      Nota: Las reservas solo se hacen con un adelanto de Bs 100
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <QrCode className="w-5 h-5 text-gray-700 mr-2" />
                  <h3 className="font-semibold text-gray-900">
                    Escanea el QR para pagar
                  </h3>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Image
                      src="/qrPago.jpg"
                      alt="QR Code para pago"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    Monto: Bs 100
                  </Badge>
                </div>
              </div>

              {/* Upload Receipt Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Subir Comprobante
                </h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="receipt-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="receipt-upload"
                    className={`cursor-pointer ${
                      uploading ? "pointer-events-none" : ""
                    }`}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedFile
                        ? selectedFile.name
                        : "Haz clic para subir tu comprobante"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-700">
                      <Upload className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        Archivo seleccionado: {selectedFile.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={uploading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitReceipt}
                  disabled={!selectedFile || uploading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Comprobante"
                  )}
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  ¿Tienes dudas? Contáctanos al{" "}
                  <span className="font-semibold text-blue-600">
                    +591 70123456
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
