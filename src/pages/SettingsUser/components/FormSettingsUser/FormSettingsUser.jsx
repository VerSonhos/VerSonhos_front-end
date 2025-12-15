import { useState, useEffect } from 'react';
import ModalEditUser from "../ModalEditUser/ModalEditUser"
import { IoIosMail, IoIosPaper } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { TbPencilStar, TbNumber } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi";
import { FaUser, FaCity, FaWifi } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";
import { applyMask } from "@/utils/masks";
import { fetchUserProfileByEmail, updateProfileField, updateCompanyField, deleteUserProfile } from '@/services/profileServiceUser';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert';

const FormPerfil = ({ data, handleSave, isLoading }) => (
    <>
        {isLoading ? <p className="text-gray-600">Carregando dados do perfil...</p> : (
            <>
                {/* 1. Nome Completo */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="nomeCompletoEdit" className='text-black-custom-500 font-semibold'>Nome completo:</label>
                    <div className='w-full flex relative'>
                        <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input 
                            type="text" 
                            placeholder='Digite...' 
                            disabled 
                            name="nomeCompletoEdit" 
                            id="nomeCompletoEdit" 
                            value={data.nomeCompleto || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar nome completo"
                            label="Novo nome completo:"
                            initialValue={data.nomeCompleto || ''} 
                            onSave={(newValue) => handleSave('nomeCompleto', newValue)}
                            icon={FaUser}
                        />
                    </div>
                </div>

                {/* 2. Telefone */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="telefoneEdit" className='text-black-custom-500 font-semibold'>Telefone:</label>
                    <div className='w-full flex relative'>
                        <FaPhoneAlt className='text-md text-black-custom-400 absolute left-2 top-2.5'/>
                        <input 
                            type="text" 
                            placeholder='Digite...' 
                            disabled 
                            name="telefoneEdit" 
                            id="telefoneEdit" 
                            value={data.telefone ? applyMask(data.telefone, 'phone') : ''}
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar telefone"
                            label="Novo telefone:"
                            initialValue={data.telefone || ''}
                            onSave={(newValue) => handleSave('telefone', newValue)}
                            icon={FaPhoneAlt}
                            maskType="phone"
                        />
                    </div>
                </div>

                {/* 3. E-mail (Normalmente não editável, mas incluído para completude) */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="emailEdit" className='text-black-custom-500 font-semibold'>E-mail:</label>
                    <div className='w-full flex relative'>
                        <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input 
                            type="text" 
                            placeholder='Digite...' 
                            disabled 
                            name="emailEdit" 
                            id="emailEdit" 
                            value={data.email || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar e-mail"
                            label="Novo e-mail:"
                            typeInput="email"
                            initialValue={data.email || ''}
                            onSave={(newValue) => handleSave('email', newValue)}
                            icon={IoIosMail}
                        />
                    </div>
                </div>
            </>
        )}
    </>
);

const FormEmpresa = ({ data, handleSave, isLoading }) => (
    <>
        {isLoading ? <p className="text-gray-600">Carregando dados da empresa...</p> : (
            <>
                {/* 1. Razão social */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
                    <div className='w-full flex relative'>
                        <IoDocumentText className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="razaoSocial" id="razaoSocial" 
                            value={data.empresa.razaoSocial || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar razão social"
                            label="Nova razão social:"
                            initialValue={data.empresa.razaoSocial || ''}
                            onSave={(newValue) => handleSave('razaoSocial', newValue)}
                            icon={IoDocumentText}
                        />
                    </div>
                </div>

                {/* 2. Nome fantasia */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="nomeFantasia" className='text-black-custom-500 font-semibold'>Nome fantasia:</label>
                    <div className='w-full flex relative'>
                        <TbPencilStar className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="nomeFantasia" id="nomeFantasia" 
                            value={data.empresa.nomeFantasia || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar nome fantasia"
                            label="Novo nome fantasia:"
                            initialValue={data.empresa.nomeFantasia || ''}
                            onSave={(newValue) => handleSave('nomeFantasia', newValue)}
                            icon={TbPencilStar}
                        />
                    </div>
                </div>

                {/* 3. CNPJ */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="cnpj" className='text-black-custom-500 font-semibold'>CNPJ:</label>
                    <div className='w-full flex relative'>
                        <IoIosPaper className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="cnpj" id="cnpj" 
                            value={data.empresa.cnpj ? applyMask(data.empresa.cnpj, 'cnpj') : ''}
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar CNPJ"
                            label="Novo CNPJ:"
                            initialValue={data.empresa.cnpj || ''}
                            onSave={(newValue) => handleSave('cnpj', newValue)}
                            icon={IoIosPaper}
                            maskType="cnpj"
                        />
                    </div>
                </div>

                {/* 4. Inscrição estadual/municipal */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="inscricaoEstadual" className='text-black-custom-500 font-semibold'>Inscrição estadual/municipal:</label>
                    <div className='w-full flex relative'>
                        <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="inscricaoEstadual" id="inscricaoEstadual" 
                            value={data.empresa.inscricaoEstadual ? applyMask(data.empresa.inscricaoEstadual, 'inscricao') : ''}
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar inscrição estadual/municipal"
                            label="Nova inscrição estadual/municipal:"
                            initialValue={data.empresa.inscricaoEstadual || ''}
                            onSave={(newValue) => handleSave('inscricaoEstadual', newValue)}
                            icon={TbNumber}
                            maskType="inscricao"
                        />
                    </div>
                </div>

                {/* 5. CEP */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="cep" className='text-black-custom-500 font-semibold'>CEP:</label>
                    <div className='w-full flex relative'>
                        <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="cep" id="cep" 
                            value={data.empresa.cep ? applyMask(data.empresa.cep, 'cep') : ''}
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar CEP"
                            label="Novo CEP:"
                            initialValue={data.empresa.cep || ''}
                            onSave={(newValue) => handleSave('cep', newValue)}
                            icon={TbNumber}
                            maskType="cep"
                        />
                    </div>
                </div>

                {/* 6. Endereço */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="endereco" className='text-black-custom-500 font-semibold'>Endereço:</label>
                    <div className='w-full flex relative'>
                        <FaLocationDot className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="endereco" id="endereco" 
                            value={data.empresa.endereco || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar endereço"
                            label="Novo endereço:"
                            initialValue={data.empresa.endereco || ''}
                            onSave={(newValue) => handleSave('endereco', newValue)}
                            icon={FaLocationDot}
                        />
                    </div>
                </div>

                {/* 7. Cidade */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="cidade" className='text-black-custom-500 font-semibold'>Cidade:</label>
                    <div className='w-full flex relative'>
                        <FaCity className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="cidade" id="cidade" 
                            value={data.empresa.cidade || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar cidade"
                            label="Nova cidade:"
                            initialValue={data.empresa.cidade || ''}
                            onSave={(newValue) => handleSave('cidade', newValue)}
                            icon={FaCity}
                        />
                    </div>
                </div>

                {/* 8. Setor de atuação */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="setorAtuacao" className='text-black-custom-500 font-semibold'>Setor de atuação:</label>
                    <div className='w-full flex relative'>
                        <RiFilePaper2Line className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="setorAtuacao" id="setorAtuacao" 
                            value={data.empresa.setorAtuacao || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar setor de atuação"
                            label="Novo setor de atuação:"
                            initialValue={data.empresa.setorAtuacao || ''}
                            onSave={(newValue) => handleSave('setorAtuacao', newValue)}
                            icon={RiFilePaper2Line}
                        />
                    </div>
                </div>

                {/* 9. Cargo/Função na empresa */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="cargoEmpresa" className='text-black-custom-500 font-semibold'>Cargo/Função na empresa:</label>
                    <div className='w-full flex relative'>
                        <BiTargetLock className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="cargoEmpresa" id="cargoEmpresa" 
                            value={data.empresa.cargoEmpresa || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar cargo/Função na empresa"
                            label="Novo cargo/Função na empresa:"
                            initialValue={data.empresa.cargoEmpresa || ''}
                            onSave={(newValue) => handleSave('cargoEmpresa', newValue)}
                            icon={BiTargetLock}
                        />
                    </div>
                </div>

                {/* 10. Site ou redes sociais oficiais */}
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="portfolio" className='text-black-custom-500 font-semibold'>Site ou redes sociais oficiais:</label>
                    <div className='w-full flex relative'>
                        <FaWifi className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="text" placeholder='Digite...' disabled name="portfolio" id="portfolio" 
                            value={data.empresa.portfolio || ''} 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} 
                        />
                        <ModalEditUser
                            dialogTitle="Editar site ou redes sociais oficiais"
                            label="Novo site ou redes sociais oficiais:"
                            initialValue={data.empresa.portfolio || ''}
                            onSave={(newValue) => handleSave('portfolio', newValue)}
                            icon={FaWifi}
                        />
                    </div>
                </div>
            </>
        )}
    </>
);

const FormSeguranca = ({ handleSave, isLoading }) => (
    <>
        {isLoading ? <p>Carregando...</p> : (
            <>
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="senhaEdit" className='text-black-custom-500 font-semibold'>Senha:</label>
                    <div className='w-full flex relative'>
                        <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="password" placeholder='*************' disabled name="senhaEdit" id="senhaEdit" 
                            className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                        <ModalEditUser
                            dialogTitle="Editar senha"
                            label="Nova senha:"
                            typeInput="password"
                            initialValue={"**********"}
                            onSave={(newValue) => handleSave('senha', newValue)} 
                            icon={RiLockPasswordFill}
                        />
                    </div>
                </div>
            </>
        )}
    </>
);

const SectionConta = ({ setNotification, forceLogout, idUsuario }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        if (!idUsuario) {
             setNotification({ isVisible: true, message: "ID do usuário não encontrado. Não é possível deletar.", isError: true });
             return;
        }

        setIsDeleting(true);
        
        try {
            await deleteUserProfile(idUsuario); 

            setNotification({
                isVisible: true,
                message: "Sua conta foi excluída permanentemente. Redirecionando...",
                isError: false,
            });
            
            // Força o logout e redireciona após 3 segundos
            setTimeout(forceLogout, 3000);

        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            setNotification({
                isVisible: true,
                message: error.message || "Erro ao solicitar a exclusão da conta. Tente novamente.",
                isError: true,
            });
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 px-4 font-inter">
            {/* ... (Seu JSX de aviso) */}
            <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-1">Exclusão Permanente da Conta</h3>
                <p className="text-gray-600">Gerencie o encerramento definitivo da sua conta na plataforma <strong>VerSonhos</strong>.</p>
            </div>
            
            <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                <h4 className="text-lg font-semibold text-red-700 mb-2">⚠️ Importante: O que acontece ao apagar sua conta?</h4>
                
                <p className="text-gray-700">
                    Ao prosseguir com a exclusão, você declara que compreende que esta ação é <strong>irreversível</strong>. O objetivo desta seção é garantir que você tenha total ciência das consequências.
                </p>
                
                <ul className="list-disc list-inside mt-3 text-sm text-gray-700 space-y-1 ml-4">
                    <li>Seus <strong>dados pessoais</strong> serão removidos permanentemente de nossos servidores.</li>
                    <li>Todo o seu <strong>histórico de agendamentos</strong> e configurações será perdido.</li>
                    <li>Você perderá o acesso a todos os <strong>serviços associados</strong> à conta.</li>
                    <li>A reativação da conta com o mesmo e-mail e dados não será possível.</li>
                </ul>

                <p className="mt-4 text-sm font-medium text-red-700">
                    <strong>Recomendamos</strong> que revise todos os seus dados e agendamentos antes de confirmar a exclusão.
                </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-start gap-4">
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition hover:bg-red-700 focus:outline-none border-0 cursor-pointer focus:ring-2 w-full sm:w-auto disabled:bg-red-400 disabled:cursor-not-allowed"
                    type="button"
                    onClick={handleDeleteAccount} // ⬅️ AÇÃO AGORA VINCULADA
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Excluindo conta...' : 'Solicitar Exclusão Permanente da Conta'}
                </button>
            </div>
        </div>
    );
};

export default function FormSettingsUser({ activeItem }) {
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0); 
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
        isError: false,
    });

    const hideNotification = () => {
        setNotification({ isVisible: false, message: '', isError: false });
    };

    const forceLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authEmail");
        localStorage.removeItem("authName");
        window.location.href = '/login'; 
    };
    
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const userEmail = localStorage.getItem('authEmail');
            if (userEmail) {
                try {
                    const data = await fetchUserProfileByEmail(userEmail);
                    setProfileData(data);
                } catch (error) {
                    console.error("Erro ao carregar perfil:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        loadData();
    }, [refreshKey]); 
    
    const handleSave = async (fieldName, newValue) => {
        if (!newValue.trim()) {
            setNotification({
                isVisible: true,
                message: "O valor não pode ser vazio.",
                isError: true,
            });
            setTimeout(hideNotification, 4000);
            return;
        }

        try {
            const updatedUser = await updateProfileField(fieldName, newValue);

            setProfileData(updatedUser);

            setNotification({
                isVisible: true,
                message: `Atualizado com sucesso!`,
                isError: false,
            });
            setTimeout(hideNotification, 4000);
            
            if (fieldName === 'nomeCompleto' && updatedUser?.nomeCompleto) {
                localStorage.setItem("authName", updatedUser.nomeCompleto);
            }
            if (fieldName === 'email' && updatedUser?.email) {
                localStorage.setItem("authEmail", updatedUser.email);
            }

            setRefreshKey(prev => prev + 1); 
            
        } catch (error) {
            setNotification({
                isVisible: true,
                message: error.message || "Erro ao salvar alteração.",
                isError: true,
            });
            setTimeout(hideNotification, 6000);
        }
    };

    const handleSaveCompany = async (fieldName, newValue) => {
        if (!newValue.trim()) {
            setNotification({
                isVisible: true,
                message: "O valor não pode ser vazio.",
                isError: true,
            });
            setTimeout(hideNotification, 4000);
            return;
        }

        const idEmpresa = profileData.empresa?.idEmpresa;

        if (!idEmpresa) {
             setNotification({
                isVisible: true,
                message: "ID da Empresa não encontrado para atualização.",
                isError: true,
            });
            setTimeout(hideNotification, 6000);
            return;
        }

        try {
            await updateCompanyField(idEmpresa, fieldName, newValue); 

            setNotification({
                isVisible: true,
                message: `Empresa atualizada com sucesso!`,
                isError: false,
            });
            setTimeout(hideNotification, 4000);

            setRefreshKey(prev => prev + 1); 
            
        } catch (error) {
            setNotification({
                isVisible: true,
                message: error.message || "Erro ao salvar alteração da empresa.",
                isError: true,
            });
            setTimeout(hideNotification, 6000);
        }
    };

    let ConteudoAtual;

    const commonProps = { data: profileData, isLoading };

    switch (activeItem) {
        case 'Meu perfil':
            ConteudoAtual = <FormPerfil {...commonProps} handleSave={handleSave} />;
            break;
        case 'Empresa':
            ConteudoAtual = <FormEmpresa {...commonProps} handleSave={handleSaveCompany} />;
            break;
        case 'Segurança':
            ConteudoAtual = <FormSeguranca {...commonProps} handleSave={handleSave} />;
            break;
        case 'Conta':
            ConteudoAtual = <SectionConta 
                setNotification={setNotification} 
                forceLogout={forceLogout} 
                idUsuario={profileData.idUsuario}
            />;
            break;
        default:
            ConteudoAtual = <p>Selecione uma opção nas configurações.</p>;
            break;
    }

    return (
        <article className="w-full md:w-[70%] border-0 shadow-custom-sm rounded-lg">
            {notification.isVisible && (
                <SuccessAlert 
                    message={notification.message}
                    isError={notification.isError}
                    onClose={hideNotification}
                />
            )}
            
            <h2 className="w-full flex items-center bg-tertiary py-2 px-3 gap-2 text-white text-2xl font-fredoka font-medium rounded-t-md">
                <HiInformationCircle />
                Informações: {activeItem}
            </h2>

            <div className="py-5 px-5 flex flex-col gap-5 font-inter">
                <form className="flex flex-col gap-5">
                    {ConteudoAtual}
                </form>
            </div>
        </article>
    )
}