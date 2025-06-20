// Tipos actualizados basados en tu API de Django

export interface Cliente {
    id_cliente: string
    nombre: string
    apellido: string
    carnet: string
    activo: boolean
  }
  
  export interface Marca {
    id_marca: string
    nombre: string
    activo: boolean
  }
  
  export interface Celular {
    id_celular: string
    imagen_principal: string
    modelo: string
    color: string
    almacenamiento: number // 8, 16, 32, 64, 128, 256, 512, 1024
    ram: number // 4, 6, 8, 12, 16
    estado: number // 0=Como nuevo, 1=Detalles estéticos, 2=Detalles Fuertes
    detalles: string // max 500 caracteres
    imei: string
    imei2: string | null
    precio_base: number
    precio_minimo: number
    precio: number
    marca: string // UUID
    tienda: string // UUID
    vendedor: string // UUID
    activo: boolean
  }
  
  export interface ImagenCelular {
    id_imagen: string
    celular: string
    imagen: string
    orden: number
    activo: boolean
  }
  
  export interface Venta {
    id_venta: string
    fecha: string
    descuento: number
    total: number
    metodo_pago?: string // "efectivo", "transferencia", "qr"
    estado_venta?: string // "pendiente", "completada", "cancelada"
    usuario: string
    cliente: string
  }
  
  export interface DetalleVenta {
    id_detalle_venta: string
    venta: string
    celular: string
    precio_unitario: number
    activo: boolean
  }
  
  export interface Vendedor {
    id_vendedor: string
    nombre: string
    apellido: string
    telefono: string
    correo: string
    activo: boolean
  }
  
  export interface Tienda {
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
  