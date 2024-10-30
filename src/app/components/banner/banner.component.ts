import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  imageUrl: string =
    'https://images.unsplash.com/photo-1551892644-51a6e2e8fc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1bXBsZWElQzMlQjFvc3xlbnwwfHwwfHx8MA%3D%3D';
}
