export async function getCidadesSP() {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios');
    if (!response.ok) throw new Error('Erro ao buscar cidades');
    const data = await response.json();
    return data.map((cidade) => cidade.nome).sort();
  } catch (error) {
    console.error('Erro ao carregar cidades do IBGE:', error);
    return [];
  }
}
