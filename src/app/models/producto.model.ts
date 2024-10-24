
export interface Producto {
  _id?: string;
  nombre: string;
  precio: number;
  images: string[];
  descripcion: string;
  categoriaId?: string;
  material?: string;
  dimensions?: string;
  stock?: number;
  shippingTime?: string;
  marca?: string; // Nueva propiedad
  fechaDeLanzamiento?: Date; // Nueva propiedad
}

export interface Review {
  nombreRevisor: string;
  calificacion: number | null;
  comentario: string;
  productoId: string; // o puedes usar 'mongoose.Types.ObjectId' si estás usando Mongoose
}

