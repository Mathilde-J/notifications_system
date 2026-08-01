export const isEmail = (value: string) => {
  const valueIsValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!valueIsValidEmail) return "Veuillez entrer une adresse email valide.";
};

export const isNotEmpty = (value: string | undefined) => {
  if (!value || value.trim() === "") return "Ce champ est requis.";
};
