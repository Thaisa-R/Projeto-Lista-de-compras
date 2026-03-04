import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ScannerService } from '../../services/scanner.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modal.component.html',
  styleUrls: ['./scanner-modal.component.css']
})
export class ScannerModalComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  isOpen = false;
  scanning = false;
  loading = false;

  constructor(
    public languageService: LanguageService,
    private scannerService: ScannerService,
    private productService: ProductService,
    private notificationService: NotificationService,
  ) {}

  open(): void {
    this.isOpen = true;
  }

  ngAfterViewInit(): void {}

  close(): void {
    this.stopScan();
    this.isOpen = false;
  }

  async startScan(): Promise<void> {
    if (!this.videoElement) return;
    
    this.scanning = true;
    this.loading = true;

    try {
      await this.scannerService.startScan(
        this.videoElement.nativeElement,
        async (code: string) => {
          this.loading = true;
          await this.handleScannedCode(code);
          this.loading = false;
        }
      );
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.scanning = false;
    }
  }

  stopScan(): void {
    this.scanning = false;
    this.scannerService.stopScan();
    if (this.videoElement?.nativeElement?.srcObject) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  private async handleScannedCode(code: string): Promise<void> {
    try {
      const productInfo = await this.scannerService.fetchProductInfo(code);
      
      const newProduct: Product = {
        item: productInfo?.name || code,
        categoria: 'outros',
        quantidade: 1,
        preco: productInfo?.price || 0,
        total: 0
      };

      this.productService.addProduct(newProduct);
      this.close();
      
      if (!productInfo) {
        this.notificationService.notify('productNotFound');
      }
    } catch (error) {
      this.notificationService.notify('scanError');
    }
  }
}