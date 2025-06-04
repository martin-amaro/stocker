export function validateInput(value, previousValue=null) {
  value = value.trim();
  if (!value) return "El campo es obligatorio.";
  if (value.length < 3) return "Debe tener al menos 3 caracteres.";
  if (previousValue && value === previousValue) return true;
  return null;
}
