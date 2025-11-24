export function applyMask(value, type) {
  if (!value) return "";

  value = value.replace(/\D/g, "");

  switch (type) {
    case "cpf":
      if (value.length <= 3) return value;
      if (value.length <= 6) return value.replace(/(\d{3})(\d+)/, "$1.$2");
      if (value.length <= 9) return value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").substring(0, 14);

    case "cnpj":
      if (value.length <= 2) return value;
      if (value.length <= 5) return value.replace(/(\d{2})(\d+)/, "$1.$2");
      if (value.length <= 8) return value.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3");
      if (value.length <= 12) return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4");
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5").substring(0, 18);

    case "cep":
      return value.replace(/^(\d{5})(\d{0,3})/, "$1-$2").substring(0, 9);

    case "phone":
      if (value.length <= 2) return `(${value}`;
      if (value.length <= 6) return value.replace(/^(\d{2})(\d+)/, "($1) $2");
      if (value.length <= 10)
        return value.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3").substring(0, 14);
      return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3").substring(0, 15);

    case "inscricao":
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/, "$1.$2.$3.$4")
        .substring(0, 15);

    default:
      return value;
  }
}