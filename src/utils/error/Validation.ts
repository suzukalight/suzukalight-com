export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || 'バリデーションに失敗しました');

    Object.setPrototypeOf(this, ValidationError.prototype);
    this.name = 'ValidationError';
  }
}
