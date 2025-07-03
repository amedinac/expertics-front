import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'shared-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery = new FormControl('');
  clientSelected: any = '';
  isLoading = false;
  isModalOpen = false;
  clients: Client[] = [];
  private destroy$ = new Subject<void>();

  // Configuración de búsqueda
  private readonly MIN_SEARCH_LENGTH = 2;
  private readonly DEBOUNCE_TIME = 1000;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private clientService: ClientService
  ) {}

  // Escuchar tecla ESC para cerrar modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }

  // Prevenir scroll en body cuando modal está abierto
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isModalOpen && event.key === 'Tab') {
      // Aquí podrías implementar navegación por teclado si es necesario
    }
  }

  /**
   * Abre el modal con animación y mejoras de UX
   */
  openModal(): void {
    if (this.clients.length === 0) {
      return;
    }

    this.isModalOpen = true;

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Compensar scrollbar

    // Focus management
    setTimeout(() => {
      const modal = document.getElementById('select-modal');
      if (modal) {
        modal.focus();
      }
    }, 100);

    console.log('Modal opened with', this.clients.length, 'clients');
  }

  /**
   * Cierra el modal con limpieza adecuada
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.clientSelected = ''; // Reset selection

    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';

    // Return focus to search input
    setTimeout(() => {
      const searchInput = document.getElementById('default-search');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }

  /**
   * Maneja el click en el botón de búsqueda
   */
  handleSearchClick(): void {
    const searchTerm = this.searchQuery.value?.trim();

    if (!searchTerm || searchTerm.length < this.MIN_SEARCH_LENGTH) {
      this.showToast('Please enter at least 2 characters to search', 'warning');
      return;
    }

    if (this.clients.length > 0) {
      this.openModal();
    } else {
      this.performSearch(searchTerm);
    }
  }

  /**
   * Realiza la búsqueda manual
   */
  private performSearch(searchTerm: string): void {
    this.isLoading = true;

    this.clientService.searchClients(searchTerm)
      .subscribe({
        next: (clients) => {
          this.clients = clients;
          this.isLoading = false;

          if (clients.length > 0) {
            this.openModal();
          } else {
            this.showToast('No clients found for your search', 'info');
          }
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.clients = [];
          this.isLoading = false;
          this.showToast('Error occurred while searching. Please try again.', 'error');
        }
      });
  }

  /**
   * Obtiene las iniciales del nombre del cliente
   */
  getInitials(name: string): string {
    if (!name) return '??';

    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  /**
   * TrackBy function para mejorar performance en ngFor
   */
  trackByClientId(index: number, client: Client): any {
    return client.id;
  }

  /**
   * Obtiene el cliente seleccionado y ejecuta la acción
   */
  getClientSelected(): void {
    if (!this.clientSelected) {
      this.showToast('Please select a client first', 'warning');
      return;
    }

    const selectedClient = this.clients.find(c => c.id == this.clientSelected);

    if (!selectedClient) {
      this.showToast('Selected client not found', 'error');
      return;
    }

    try {
      const id = Number(this.clientSelected);
      this.clientService.selectClient(id);

      this.showToast(`Client "${selectedClient.name}" selected successfully`, 'success');
      this.closeModal();

      // Opcional: limpiar búsqueda después de seleccionar
      // this.searchQuery.reset();
      // this.clients = [];

    } catch (error) {
      console.error('Error selecting client:', error);
      this.showToast('Error selecting client. Please try again.', 'error');
    }
  }

  /**
   * Muestra mensajes toast/notificaciones (implementación básica)
   */
  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    // Aquí puedes integrar tu sistema de notificaciones preferido
    // Por ahora solo console.log con colores
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      info: '\x1b[36m'
    };

    console.log(`${colors[type]}%s\x1b[0m`, `[${type.toUpperCase()}] ${message}`);

    // También podrías mostrar un alert temporal o usar una librería como ngx-toastr
    // alert(message);
  }

  /**
   * Limpia los resultados de búsqueda
   */
  clearSearch(): void {
    this.searchQuery.reset();
    this.clients = [];
    this.clientSelected = '';
    this.closeModal();
  }

  /**
   * Verifica si hay una búsqueda activa
   */
  get hasActiveSearch(): boolean {
    return !!(this.searchQuery.value?.trim());
  }

  /**
   * Verifica si hay resultados
   */
  get hasResults(): boolean {
    return this.clients.length > 0;
  }

  ngOnInit(): void {
    this.setupSearchSubscription();
  }

  /**
   * Configura la suscripción a cambios en el campo de búsqueda
   */
  private setupSearchSubscription(): void {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_TIME),
        distinctUntilChanged(),
        switchMap(searchTerm => {
          // Limpiar resultados si la búsqueda es muy corta
          if (!searchTerm || searchTerm.trim().length < this.MIN_SEARCH_LENGTH) {
            this.clients = [];
            this.closeModal();
            return of([]);
          }

          this.isLoading = true;
          return this.clientService.searchClients(searchTerm.trim());
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (clients) => {
          this.clients = clients;
          this.isLoading = false;

          // Auto-abrir modal solo si hay resultados y no está ya abierto
          if (clients.length > 0 && !this.isModalOpen) {
            this.openModal();
          } else if (clients.length === 0 && this.isModalOpen) {
            this.closeModal();
          }
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.clients = [];
          this.isLoading = false;
          this.showToast('Error occurred during search', 'error');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Limpiar estilos del body al destruir el componente
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }
}
