export class DiaSemHorario {
  ano: number;
  mes: number;
  dia: number;

  constructor(data: { ano: number; mes: number; dia: number }) {
    this.ano = data.ano;
    this.mes = data.mes;
    this.dia = data.dia;
    if (this.mes > 11 || this.dia > 31) {
      throw new Error("Data inválida");
    }
    if (this.ano < 0 || this.mes < 0 || this.dia < 0) {
      throw new Error("Data inválida");
    }
  }

  toString() {
    return `${this.ano}-${(this.mes + 1).toString().padStart(2, "0")}-${this.dia
      .toString()
      .padStart(2, "0")}`;
  }

  static fromDate(data: Date) {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const dia = data.getDate();

    return new DiaSemHorario({ ano, mes, dia });
  }

  static fromString(data: string) {
    let parsed = data.match(/(\d\d\d\d)-(\d\d?)-(\d\d?)/);
    if (!parsed?.[0]) {
      throw new Error("Data inválida");
    }

    let [ano, mes, dia] = [parsed[1], parsed[2], parsed[3]].map(parseInt);
    return new DiaSemHorario({ ano, mes, dia });
  }
}
