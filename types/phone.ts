export interface Phone {
  id_celular: string
  imagenes: string
  modelo: string
  color: string
  almacenamiento: number
  ram: number
  estado: number
  detalles: string
  imei: string
  imei2: string
  precio_base: string
  precio_minimo: string
  precio: string
  activo: boolean
  marca: string
  tienda: string
  estado_venta: number
  vendedor: string
}

export interface Store {
  id_tienda: string
  encargado: {
    id_encargado: string
    nombre: string
    apellido: string
    telefono: string
    correo: string
    carnet: string
    activo: boolean
  }
  nombre: string
  direccion: string
  detalles: string
  fotografia: string
  activo: boolean
}
