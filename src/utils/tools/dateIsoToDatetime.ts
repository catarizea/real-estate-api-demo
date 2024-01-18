const dateIsoToDatetime = (dateIso: string): string =>
  dateIso.slice(0, 19).replace('T', ' ');

export default dateIsoToDatetime;
