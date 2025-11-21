import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineWork } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";

const FormPerfil = () => (
    <>
        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <BiSolidUserAccount className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite a razão social...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <button type="button" className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"><FiEdit className="m-auto" /></button>
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <BiSolidUserAccount className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite a razão social...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <button type="button" className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"><FiEdit className="m-auto" /></button>
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <BiSolidUserAccount className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite a razão social...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <button type="button" className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"><FiEdit className="m-auto" /></button>
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <BiSolidUserAccount className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite a razão social...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <button type="button" className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"><FiEdit className="m-auto" /></button>
            </div>
        </div>

        <div className='w-full flex flex-col items-start justify-center gap-2'>
            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
            
            <div className='w-full flex relative'>
                <BiSolidUserAccount className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                <input type="text" placeholder='Digite a razão social...' disabled name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 border-gray-300 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                <button type="button" className="absolute right-0 bg-tertiary text-white text-xl text-center h-full w-10 rounded-r-lg cursor-pointer active:bg-blue-600 hover:bg-blue-500 transition"><FiEdit className="m-auto" /></button>
            </div>
        </div>
    </>
);

const FormSeguranca = () => (
    <div className="form-card">
        <h3>Segurança da Conta</h3>
        <p>Opções para alterar senha e configurar 2FA.</p>
    </div>
);

export default function FormSettingsUser({ activeItem }) {
    let ConteudoAtual;

    switch ("Meu perfil") {
        case 'Meu perfil':
            ConteudoAtual = <FormPerfil />;
            break;
        case 'Segurança':
            ConteudoAtual = <FormSeguranca />;
            break;
        case 'Empresa':
            ConteudoAtual = <p>Conteúdo/Formulário da **Empresa**.</p>;
            break;
        case 'Conta':
            ConteudoAtual = <p>Opções da **Conta** (Excluir, Assinatura).</p>;
            break;
        default:
            ConteudoAtual = <p>Selecione uma opção nas configurações.</p>;
            break;
    }

    return (
        <article className="w-[full] md:w-[70%] border-2 border-black-custom-300 shadow-custom-sm rounded-lg">
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