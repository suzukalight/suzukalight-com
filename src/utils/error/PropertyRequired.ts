import { ValidationError } from './Validation';

export class PropertyRequiredError extends ValidationError {
  public property: string;

  constructor(property: string) {
    super(`${property} は必須のパラメータです`);

    Object.setPrototypeOf(this, PropertyRequiredError.prototype);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}
