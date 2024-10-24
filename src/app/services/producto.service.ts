import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto, Review } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/products'; // Cambia esto según tu configuración
  private apiUrl1 = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  obtenerProductosPorCategoria(categoriaId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoriaId}`)
      .pipe(
        tap((productos: Producto[]) => console.log('Productos recibidos:', productos)),
        catchError(error => {
          console.error('Error al obtener productos por categoría:', error);
          return throwError(error);
        })
      );
  }

  obtenerReviewsPorProductoId(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl1}/reviews/${productId}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener reseñas:', error);
          return throwError(error);
        })
      );
  }

  // Nuevo método para agregar reseñas
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl1}/reviews`, review)
      .pipe(
        catchError(error => {
          console.error('Error al agregar la reseña:', error);
          return throwError(error);
        })
      );
  }
  
  getReseñasPorProducto(productoId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/producto/${productoId}`);
  }
}
