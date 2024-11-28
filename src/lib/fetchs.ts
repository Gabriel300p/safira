async function fetchAddressByCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) throw new Error("Erro ao buscar o CEP");
  return response.json();
}

export { fetchAddressByCep };