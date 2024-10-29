import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { Producto, Review } from '../../models/producto.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosSimilaresComponent } from '../../components/productos-similares/productos-similares.component';
import { HttpErrorResponse } from '@angular/common/http'; // Importar para manejar errores
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar AuthService
import { CartService } from '../../services/cartService';

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
  newReview: Review = { nombreRevisor: '', calificacion: null, comentario: '', productoId: '' };
  selectedImage: string = '';
  quantity: number = 1;  
  showReviewForm: boolean = false;
  user: User | null = null;
  isLoading: boolean = true; // Estado de carga
  userAvatar: string = ''; // Propiedad para almacenar la URL del avatar

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private userService = inject(UserService);
  private authService = inject(AuthService); // Inyectar AuthService

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log('Product ID:', productId);
      
      if (productId) {
        this.cargarProducto(productId);
      } else {
        console.error('Product ID is invalid.');
      }
    });

    this.fetchUserProfile(); // Llamar a fetchUserProfile aquí
  }

  fetchUserProfile(): void {
    const userId = this.authService.getUserId(); // Obtener el userId desde AuthService
    if (userId) {
      this.userService.fetchUserProfile(userId).subscribe(
        (userData: User) => {
          this.user = userData;
          console.log('Usuario cargado:', this.user); // Verifica que el avatar esté presente

          if (this.user && this.user.avatar) {
            this.userAvatar = `http://localhost:3000/api/uploads/avatar/${this.user.avatar}`; // Corrige la ruta si es necesario
          } else {
            this.userAvatar = 'path/to/default/avatar.png'; // Avatar por defecto
          }
        },
        (error: any) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el userId');
    }
  }

  private cargarProducto(productId: string): void {
    this.isLoading = true; // Comienza a cargar
    this.productoService.obtenerProductoPorId(productId).subscribe(
      (producto: Producto) => {
        this.isLoading = false; // Finaliza la carga
        console.log('Producto recibido:', producto);
        this.product = producto;

        if (producto.images && producto.images.length > 0) {
          this.selectedImage = producto.images[0];
        } else {
          console.warn('No hay imágenes disponibles para este producto');
        }

        this.cargarReviews(productId);
      },
      (error: HttpErrorResponse) => { // Tipado del error
        this.isLoading = false; // Finaliza la carga
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  private cargarReviews(productId: string): void {
    this.productoService.obtenerReviewsPorProductoId(productId).subscribe(
      (reviews: Review[]) => {
        console.log('Reseñas recibidas:', reviews);
        this.reviews = reviews;
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  // addToCart(): void {
  //   if (this.product) {
  //     console.log(`Añadir al carrito: ${this.product.nombre}, Cantidad: ${this.quantity}`);
  //     // Lógica para añadir al carrito aquí
  //   }
  // }

  constructor(private cartService: CartService) {}

  addToCart(): void {
    if (this.product) {
      console.log(`Adding to cart: ${this.product.nombre}, Quantity: ${this.quantity}`);
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
  

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview(): void {
    if (this.newReview.nombreRevisor && this.newReview.calificacion !== null && this.newReview.comentario) {
      this.newReview.productoId = this.product?._id || '';
      const token = localStorage.getItem('token') || '';

      console.log('Enviando reseña:', this.newReview);

      this.productoService.addReview(this.newReview, token).subscribe(
        (response: any) => {
          console.log('Reseña enviada con éxito:', response);
          this.reviews.push(response.review);
          this.resetReviewForm();
          this.showReviewForm = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error al enviar la reseña:', error);
        }
      );
    } else {
      console.log('Por favor completa todos los campos');
    }
  }

  private resetReviewForm(): void {
    this.newReview = { nombreRevisor: '', calificacion: null, comentario: '', productoId: '' };
  }
}

export default ProductComponent;