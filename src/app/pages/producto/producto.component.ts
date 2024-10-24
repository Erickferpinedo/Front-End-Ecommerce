import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto, Review } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosSimilaresComponent } from '../../components/productos-similares/productos-similares.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  imports: [CommonModule, FormsModule, ProductosSimilaresComponent],
})
export class ProductComponent implements OnInit {
  product: Producto | null = null;
  reviews: Review[] = [];  
  newReview = { nombreRevisor: '', calificacion: null, comentario: '' };
  selectedImage: string = '';
  quantity: number = 1;  
  showReviewForm: boolean = false; // Control para mostrar/ocultar el formulario de reseñas

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log('Product ID:', productId);
      
      if (productId) {
        this.cargarProducto(productId);
      }
    });
  }

  private cargarProducto(productId: string): void {
    this.productoService.obtenerProductoPorId(productId).subscribe(
      (producto: Producto) => {
        console.log('Producto recibido:', producto);
        this.product = producto;

        if (producto.images && producto.images.length > 0) {
          this.selectedImage = producto.images[0];
        } else {
          console.warn('No hay imágenes disponibles para este producto');
        }

        this.cargarResenas(productId);
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  private cargarResenas(productId: string): void {
    this.productoService.obtenerReviewsPorProductoId(productId).subscribe(
      (resenas) => {
        console.log('Reseñas recibidas:', resenas);
        this.reviews = resenas;
      },
      (error) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (this.product) {
      console.log(`Añadir al carrito: ${this.product.nombre}, Cantidad: ${this.quantity}`);
    }
  }

  // Método para mostrar/ocultar el formulario de reseñas
  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview() {
    if (this.product && this.newReview.nombreRevisor && this.newReview.calificacion !== null && this.newReview.comentario) {
      if (this.product._id) {
        const reviewWithProductId = {
          ...this.newReview,
          productoId: this.product._id,
        };
  
        this.productoService.addReview(reviewWithProductId).subscribe(
          (response) => {
            this.reviews.push(response);
            this.newReview = { nombreRevisor: '', calificacion: null, comentario: '' };
          },
          (error) => {
            console.error('Error al enviar la reseña', error);
          }
        );
      } else {
        console.error('El ID del producto es indefinido.');
      }
    } else {
      console.error('Por favor completa todos los campos de la reseña.');
    }
  }
}
