import ModalEditUser from "../ModalEditAdmin/ModalEditAdmin"
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";

const FormPerfil = () => (
    <>
        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="usuario" className='text-black-custom-500 font-semibold'>Usuário:</label>
            
            <div className='w-full flex relative'>
                <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite...' disabled name="usuario" id="usuario" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <ModalEditUser
                    dialogTitle="Editar nome de usuário"
                    label="Novo nome de usuário:"
                    initialValue={"Valor inicial fornecido pela API"}
                    onSave={"Função para salvar valor"}
                    icon={FaUser}
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
                <h3 className="text-xl font-bold mb-1">Encerramento e Revogação da Conta de Administrador</h3>
                <p className="text-gray-600">Gerencie o processo de exclusão definitiva da sua conta de <strong>Administrador</strong> na plataforma <strong>VerSonhos</strong>.</p>
            </div>

            {/* Bloco Explicativo e Objetivo */}
            <div className="bg-red-100 p-4 border border-red-300 rounded-lg">
                <h4 className="text-lg font-semibold text-red-800 mb-2">🚨 Atenção Crítica: Impacto da Exclusão da Conta de Administrador</h4>
                
                <p className="text-gray-800 font-semibold">
                    Ao prosseguir com esta ação, você está ciente de que está removendo uma <strong>identidade administrativa vital</strong> do sistema. Esta ação é <strong>irreversível</strong> e de alto risco.
                </p>
                
                <ul className="list-disc list-inside mt-3 text-sm text-gray-800 space-y-2 ml-4">
                    <li>Seus <strong>dados de acesso administrativos</strong> serão permanentemente removidos.</li>
                    <li>Você <strong>perderá instantaneamente</strong> todos os privilégios e permissões de <strong>Administrador</strong>.</li>
                    <li>A exclusão pode <strong>comprometer a governança</strong> se você for o único administrador, exigindo a recriação manual de permissões por outro usuário.</li>
                </ul>

                <p className="mt-4 text-sm font-semibold text-red-900">
                    É <strong>IMPERATIVO</strong> que haja <strong>outros administradores ativos</strong> e que a transferência de responsabilidades tenha sido concluída antes de prosseguir.
                </p>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-start gap-4">
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition hover:bg-red-900 boder-0 focus:outline-none border-0 cursor-pointer w-full sm:w-auto"
                    type="button"
                >
                    Confirmar Revogação e Exclusão (Administrador)
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
            <h2 className="w-full flex items-center bg-quintenary py-2 px-3 gap-2 text-white text-2xl font-fredoka font-medium rounded-t-md">
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