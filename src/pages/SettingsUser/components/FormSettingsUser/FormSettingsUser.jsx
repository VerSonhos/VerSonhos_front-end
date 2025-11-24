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

const FormPerfil = () => (
    <>
        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="nomeCompletoEdit" className='text-black-custom-500 font-semibold'>Nome completo:</label>
            
            <div className='w-full flex relative'>
                <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="nomeCompletoEdit" id="nomeCompletoEdit" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar nome completo"
                    label="Novo nome completo:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaUser}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="telefoneEdit" className='text-black-custom-500 font-semibold'>Telefone:</label>
            
            <div className='w-full flex relative'>
                <FaPhoneAlt className='text-md text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="telefoneEdit" id="telefoneEdit" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar telefone"
                    label="Novo telefone:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaPhoneAlt}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="emailEdit" className='text-black-custom-500 font-semibold'>E-mail:</label>
            
            <div className='w-full flex relative'>
                <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="emailEdit" id="emailEdit" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar e-mail"
                    label="Novo e-mail:"
                    typeInput="email"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={IoIosMail}
                />
            </div>
        </div>
    </>
);

const FormEmpresa = () => (
    <>
        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <IoDocumentText className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar razão social"
                    label="Nova razão social:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={IoDocumentText}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="nomeFantasia" className='text-black-custom-500 font-semibold'>Nome fantasia:</label>
            
            <div className='w-full flex relative'>
                <TbPencilStar className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="nomeFantasia" id="nomeFantasia" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar nome fantasia"
                    label="Novo nome fantasia:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={TbPencilStar}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="cnpj" className='text-black-custom-500 font-semibold'>CNPJ::</label>
            
            <div className='w-full flex relative'>
                <IoIosPaper className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="cnpj" id="cnpj" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar CNPJ"
                    label="Novo CNPJ:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={IoIosPaper}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="numeroInscricao" className='text-black-custom-500 font-semibold'>Inscrição estadual/municipal:</label>
            
            <div className='w-full flex relative'>
                <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="numeroInscricao" id="numeroInscricao" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar inscrição estadual/municipal"
                    label="Nova inscrição estadual/municipal:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={TbNumber}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="cep" className='text-black-custom-500 font-semibold'>CEP:</label>
            
            <div className='w-full flex relative'>
                <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="cep" id="cep" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar CEP"
                    label="Novo CEP:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={TbNumber}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="endereco" className='text-black-custom-500 font-semibold'>Endereço:</label>
            
            <div className='w-full flex relative'>
                <FaLocationDot className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="endereco" id="endereco" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar endereço"
                    label="Novo endereço:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaLocationDot}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="cidade" className='text-black-custom-500 font-semibold'>Cidade:</label>
            
            <div className='w-full flex relative'>
                <FaCity className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="cidade" id="cidade" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar cidade"
                    label="Nova cidade:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaCity}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="setorAtuacao" className='text-black-custom-500 font-semibold'>Setor de atuação:</label>
            
            <div className='w-full flex relative'>
                <RiFilePaper2Line className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="setorAtuacao" id="setorAtuacao" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar setor de atuação"
                    label="Novo setor de atuação:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={RiFilePaper2Line}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="cargoRepresentante" className='text-black-custom-500 font-semibold'>Cargo/Função na empresa:</label>
            
            <div className='w-full flex relative'>
                <BiTargetLock className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="cargoRepresentante" id="cargoRepresentante" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar cargo/Função na empresa"
                    label="Novo cargo/Função na empresa:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={BiTargetLock}
                />
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="portfolio" className='text-black-custom-500 font-semibold'>Site ou redes sociais oficiais:</label>
            
            <div className='w-full flex relative'>
                <FaWifi className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="portfolio" id="portfolio" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar site ou redes sociais oficiais"
                    label="Novo site ou redes sociais oficiais:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaWifi}
                />
            </div>
        </div>
    </>
);

const FormSeguranca = () => (
    <>
        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="senhaEdit" className='text-black-custom-500 font-semibold'>Senha:</label>
            
            <div className='w-full flex relative'>
                <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='*************' disabled name="senhaEdit" id="senhaEdit" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar senha"
                    label="Nova senha:"
                    typeInput="password"
                    initialValue={"**********"}
                    onSave={"Função para salvar valor"}
                    icon={RiLockPasswordFill}
                />
            </div>
        </div>
    </>
);

const SectionConta = () => (
    <>
        <div className="flex flex-col gap-2 px-4 font-inter">
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
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition hover:bg-red-700 focus:outline-none border-0 cursor-pointer focus:ring-2 w-full sm:w-auto"
                    type="button"
                >
                    Solicitar Exclusão Permanente da Conta
                </button>
            </div>
        </div>
    </>
);

export default function FormSettingsUser({ activeItem }) {
    let ConteudoAtual;

    switch (activeItem) {
        case 'Meu perfil':
            ConteudoAtual = <FormPerfil />;
            break;
        case 'Empresa':
            ConteudoAtual = <FormEmpresa />;
            break;
        case 'Segurança':
            ConteudoAtual = <FormSeguranca />;
            break;
        case 'Conta':
            ConteudoAtual = <SectionConta />
            break;
        default:
            ConteudoAtual = <p>Selecione uma opção nas configurações.</p>;
            break;
    }

    return (
        <article className="w-full md:w-[70%] border-2 border-black-custom-300 shadow-custom-sm rounded-lg">
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