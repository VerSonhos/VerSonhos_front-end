import api from '../../api/axiosConfig.js';

export async function registerUsuario(dadosUsuario) {
  try {
    const payload = {
      email: dadosUsuario.emailRegister,
      nomeCompleto: dadosUsuario.nomeRegister,
      telefone: dadosUsuario.phoneRegister.replace(/\D/g, ''),
      senha: dadosUsuario.passwordRegister,
      termosLgpd: dadosUsuario.termosLgpd,
    };
    
    const response = await api.post('/usuario', payload); 
    return response.data; 

  } catch (error) {
    console.error("Erro no cadastro de Usuário simples:", error.response || error);
    throw new Error(error.response?.data?.message || 'Falha ao cadastrar. Tente novamente.');
  }
}

export async function registerEmpresa(dadosEmpresa, idUsuario) {
  try {
    const payload = {
      idUsuario: idUsuario,
      nomeFantasia: dadosEmpresa.nomeFantasia,
      razaoSocial: dadosEmpresa.razaoSocial,
      cnpj: dadosEmpresa.cnpj.replace(/\D/g, ''),
      inscricaoEstadual: dadosEmpresa.numeroInscricao.replace(/\D/g, ''),
      cargoEmpresa: dadosEmpresa.cargoRegister,
      cep: dadosEmpresa.cepRegister.replace(/\D/g, ''),
      endereco: dadosEmpresa.enderecoRegister,
      cidade: dadosEmpresa.cidadeRegister,
      setorAtuacao: dadosEmpresa.setorRegister,
      portfolio: dadosEmpresa.socialRegister,
      objetivoCadastro: dadosEmpresa.objetivoRegister,
    };
    
    const response = await api.post('/empresa', payload);
    return response.data; 

  } catch (error) {
    console.error("Erro no cadastro de Empresa:", error.response || error);
    throw new Error(error.response?.data?.message || 'Falha ao cadastrar Empresa. Tente novamente.');
  }
}

export async function deleteUsuario(id) {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return response; 
  } catch (error) {
    console.error("Erro em deletar usuário:", error.response || error);
    throw new Error(error.response?.data?.message || 'Falha deletar usuário. Tente novamente.');
  }
}