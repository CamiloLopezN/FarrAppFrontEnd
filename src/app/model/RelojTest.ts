const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

const dayNames2 = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'
];

const monthNames2 = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

function getStatus(posTime: number): string {

  let status: string;
  // Diferencia en segundos
  const timeDif: number = (Date.now() - posTime) / 1000;
  const statusName: string = getStatusName(timeDif);

  switch (statusName) {

    case 's':
      status = trunc(timeDif.toString()) + ' ' + statusName;
      break;

    case 'm':
      status = trunc((timeDif / 60).toString()) + ' ' + statusName;
      break;

    case 'h':
      status = trunc((timeDif / 3600).toString()) + ' ' + statusName;
      break;
    default:
      break;
  }


  return status;
}

function trunc(num: string): string {
  return num.split('.')[0];

}

function getStatusName(timeDif: number): string {

  if (timeDif < 60 && timeDif >= 0) {
    return 's';
  } else if (timeDif >= 60 && timeDif < 3600) {
    return 'm';
  } else {
    return 'h';
  }
}

export function isYesterday(date: Date): string {
  const dateActual = new Date();
  if (date.getFullYear() === dateActual.getFullYear()) {
    if (date.getMonth() < dateActual.getMonth()) {
      return monthNames[date.getMonth()] + ' ' + date.getDate();
    } else if (date.getMonth() === dateActual.getMonth()) {
      if (date.getDate() < dateActual.getDate()) {
        return monthNames[date.getMonth()] + ' ' + date.getDate();
      } else {
        return getStatus(date.getTime());
      }
    }
  } else {
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }
}

export function getStringActual(): string{
  const date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1)  + '-' + date.getDate();

}

export function isAdultF(date2: Date): boolean{
  const dateActual = new Date();
  const timeDif = (dateActual.getTime() - date2.getTime()) / 1000;
  return timeDif >= 568036800;
}

export function getDateTooltip(date: Date): string {
  // tslint:disable-next-line:max-line-length
  return dayNames[date.getDay()] + ', ' + date.getDate() + ' de ' + monthNames2[date.getMonth()] + ' de ' + date.getFullYear() + ' a las ' + date.getHours() + ':' + date.getMinutes();
}

export function getDateEvent(date: Date): string {
  // tslint:disable-next-line:max-line-length
  return dayNames[date.getDay()] + ', ' + date.getDate() + ' de ' + monthNames2[date.getMonth()];
}

export function getDateEventPerfil(date: Date): string {
  // tslint:disable-next-line:max-line-length
  return dayNames2[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

