import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private nService: NotificationsService) {
  }

  sucessLogin(): void {
    this.nService.success('Estado de cuenta', 'Ha iniciado sesión con éxito', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  logOut(): void {
    this.nService.error('Estado de cuenta', 'Ha salido de la sesión.', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  logOutDesact(): void {
    this.nService.error('Estado de cuenta', 'Su cuenta está en proceso desactivación.', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  logOutExpired(): void {
    this.nService.warn('Estado de cuenta', 'Su sesión ha expirado', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesEditClient(): void {
    this.nService.success('Estado del cliente', 'Cliente editado correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
  succesChangePass(): void {
    this.nService.success('Estado del cliente', '¡Contraseña cambiada correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

}
