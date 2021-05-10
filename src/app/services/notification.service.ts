import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  success(title: string, desc: string): void {
    this.nService.success(title, desc, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

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

  sucessEditCompany(): void {
    this.nService.success('Estado de la empresa', 'Empresa editada correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesEditAdmin(): void {
    this.nService.success('Estado del administrador', 'Administrador editado correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesChangePass(): void {
    this.nService.success('Estado de cuenta', 'Contraseña editada con éxito', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessActivateCompany(): void {
    this.nService.success('Estado de la empresa', 'Empresa activada correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessDesactivateCompany(): void {
    this.nService.success('Estado de la empresa', 'Empresa desactivada correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessDesactivateClient(): void {
    this.nService.success('Estado del cliente', 'Cliente desactivado correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesActivateClient(): void {
    this.nService.success('Estado del cliente', 'Cliente activado correctamente', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  emailExist(): void {
    this.nService.warn('Estado del correo', '¡Ya existe una cuenta enlazada al correo ingresado!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  nameExist(): void {
    this.nService.warn('Estado del nombre', '¡Ya existe una empresa con ese nombre!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesRegisterClient(): void {
    this.nService.success('Estado del cliente', '¡Se ha creado el cliente correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesRegisterCompany(): void {
    this.nService.success('Estado de la empresa', '¡Se ha creado la compañia correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessRetreivePass(): void {
    this.nService.info('Estado de la cuenta', '¡Se ha enviado a su correo los pasos para recuperar la contraseña!', {
      timeOut: 5000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesRegisterAdmin(): void {
    this.nService.success('Estado del administrador', '¡Se ha registrado la cuenta de administrador correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesFavorite(tittleEvent): void {
    this.nService.success(tittleEvent, 'Añadido a favoritos', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesNotFavorite(tittleEvent): void {
    this.nService.error(tittleEvent, 'Eliminado de favoritos', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesEstablishmentCreated(): void {
    this.nService.success('Estado del establecimiento', '¡Se ha registrado el establecimiento correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  warnNotEstablishment(): void {
    this.nService.warn('¡Advertencia!', 'Debes tener mínimo un establecimiento para crear un evento', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessRegisterEvent(): void {
    this.nService.success('Estado del evento', '¡Se ha registrado el evento correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessPublish(eventName: string): void {
    this.nService.success(eventName, 'Evento publicado', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessHide(eventName: string): void {
    this.nService.error(eventName, 'Evento ocultado', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessRemoveEstablishment(name: string): void {
    this.nService.error(name, 'Establecimiento eliminado correctamente', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  sucessRemoveEvent(name: string): void {
    this.nService.error(name, 'Evento eliminado correctamente', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  serverError(): void {
    this.nService.warn('Servidor', 'Error interno en el servidor.', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  succesEstablishmentEdited(): void {
    this.nService.success('Estado del establecimiento', '¡Se ha editado el establecimiento correctamente!', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  disapprovedSub(): void {
    this.nService.error('Estado de transacción', 'La transacción no ha sido aprobada.', {
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }
}
