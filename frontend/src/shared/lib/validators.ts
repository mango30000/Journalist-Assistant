export type Validator = (value: string) => string | null;

export const required = (message = "Обязательное поле"): Validator => (v) => (v.trim() ? null : message);
export const minLength = (n: number): Validator => (v) => (v.trim().length >= n ? null : `Минимум ${n} символов`);
export const maxLength = (n: number): Validator => (v) => (v.length <= n ? null : `Максимум ${n} символов`);
export const email: Validator = (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Введите корректный e-mail");

/** Проверяет по очереди, возвращает первую найденную ошибку. */
export const compose =
  (...validators: Validator[]): Validator =>
  (v) => {
    for (const validate of validators) {
      const message = validate(v);
      if (message) return message;
    }
    return null;
  };
