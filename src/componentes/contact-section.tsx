import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contacto@trustphone.com",
    subtitle: "Respuesta en 24 horas",
    color: "blue",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+591 65673891",
    subtitle: "Lun - Vie: 9:00 - 18:00",
    color: "green",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "La Paz, Bolivia",
    subtitle: "Oficinas centrales",
    color: "purple",
  },
];

export default function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-lg text-gray-600">
            Estamos aquí para resolver todas tus dudas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                      {method.title}
                    </h3>
                    <p className="text-gray-700 font-medium">{method.value}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {method.subtitle}
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-6 rounded-xl">
                <a
                  href={`https://wa.me/+591 65673891`}
                  className="flex items-center"
                >
                  <div className="flex items-center mb-3">
                    <Phone className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="font-semibold text-gray-900">
                      Envianos un mensaje
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    ¿Necesitas ayuda inmediata? Chatea con nuestro equipo
                  </p>
                </a>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl border border-gray-100">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Envíanos un mensaje
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Asunto *
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
