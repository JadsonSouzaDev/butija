export interface Currency {
  value: number;
  format(): string;
}

export class BRL implements Currency {
  constructor(value: number) {
    this.value = value;
  }

  format(): string {
    return this.value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  value: number;
}
