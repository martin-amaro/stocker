export function validateInput(value, previousValue=null) {
  value = value.trim();
  if (!value) return "El campo es obligatorio.";
  if (value.length < 3) return "Debe tener al menos 3 caracteres.";
  if (previousValue && value === previousValue) return true;
  return null;
}
export function isValidEmail(email) {
  if (typeof email !== "string") return false;

  // Expresión regular robusta para validar correos electrónicos
  const emailRegex = new RegExp(
    `^(?!\\.)[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+` +  // local-part (sin punto al inicio)
    `(?:\\.[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+)*` +  // puntos en el medio permitidos
    `(?<!\\.)@` +                                  // no punto antes del @
    `[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?` + // dominio (sin guión al inicio/final)
    `(?:\\.[a-zA-Z]{2,})+$`                        // TLD (mínimo 2 letras, permite subdominios)
  );

  return emailRegex.test(email);
}
