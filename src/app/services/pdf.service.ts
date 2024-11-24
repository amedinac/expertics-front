import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private pdfApiUrl = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) { }

  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.pdfApiUrl}/${id}`, {
      responseType: 'blob'
    });
  }

  downloadPdf(blob: Blob, fileName: string = 'documento.pdf'): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  openPdfInNewTab(id: number): void {
    this.http.get(`${this.pdfApiUrl}/${id}`, {
      responseType: 'blob'
    }).subscribe(blob => {
      // Crear URL del blob
      const url = window.URL.createObjectURL(blob);
      // Abrir en nueva pestaña
      window.open(url, '_blank');
      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    });
  }


}
