import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

declare var ZXing: any;

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private codeReader: any = null;
  private scanning = false;

  constructor(private languageService: LanguageService) {
    this.loadZXing();
  }

  private async loadZXing(): Promise<void> {
    if (typeof ZXing === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@zxing/library@latest';
      script.type = 'text/javascript';
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = () => resolve(true);
      });
    }
  }

  async startScan(videoElement: HTMLVideoElement, onResult: (code: string) => void): Promise<void> {
    try {
      if (!ZXing) {
        await this.loadZXing();
      }

      const codeReader = new ZXing.BrowserMultiFormatReader();
      this.codeReader = codeReader;
      this.scanning = true;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      videoElement.srcObject = stream;
      videoElement.play();

      codeReader.decodeFromVideoDevice(null, videoElement, (result: any, err: any) => {
        if (result) {
          this.stopScan();
          onResult(result.getText());
        }
      });
    } catch (error) {
      this.showNotification(this.languageService.translate('scanError') || 'Erro ao iniciar scanner');
    }
  }

  showNotification(arg0: string) {
    throw new Error('Method not implemented.');
  }

  stopScan(): void {
    this.scanning = false;
    if (this.codeReader) {
      this.codeReader.reset();
      this.codeReader = null;
    }
  }

  async fetchProductInfo(barcode: string): Promise<any> {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        const product = data.product;
        return {
          name: product.product_name || product.product_name_pt || product.product_name_en || barcode,
          price: null,
          description: product.generic_name || ''
        };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  isScanning(): boolean {
    return this.scanning;
  }
}