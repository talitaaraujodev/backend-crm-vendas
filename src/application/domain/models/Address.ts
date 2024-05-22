export class Address {
  private _zipcode: string;
  private _street: string;
  private _number: string;
  private _bairro: string;
  private _city: string;
  private _complement: string;

  constructor(
    zipcode: string,
    street: string,
    number: string,
    bairro: string,
    city: string,
    complement: string,
  ) {
    this._zipcode = zipcode;
    this._street = street;
    this._number = number;
    this._bairro = bairro;
    this._city = city;
    this._complement = complement;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get bairro(): string {
    return this._bairro;
  }

  get city(): string {
    return this._city;
  }
  get complement(): string {
    return this._complement;
  }
}
