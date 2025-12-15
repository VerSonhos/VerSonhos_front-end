import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineWork } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";

export default function NavSettings({ activeItem, onSelect, hasCompany }) {
    const itensCompletos = [
        {
            id: 1,
            title: "Meu perfil",
            icon: <FaUser />,
        },

        {
            id: 2,
            title: "Empresa",
            icon: <MdOutlineWork />,
            isCompanyItem: true,
        },

        {
            id: 3,
            title: "Segurança",
            icon: <MdOutlineSecurity />,
        },

        {
            id: 4,
            title: "Conta",
            icon: <BiSolidUserAccount />,
        },
    ]

    const itensRenderizados = itensCompletos.filter(item => 
        !item.isCompanyItem || hasCompany
    );

    if (!hasCompany && activeItem === 'Empresa') {
        onSelect('Meu perfil');
    }

    return (
        <article className="w-full md:w-[35%] border-0 shadow-custom-sm rounded-lg">
            <h2 className="w-full flex items-center bg-tertiary py-2 px-3 gap-2 text-white text-2xl font-fredoka font-medium rounded-t-md">
                <IoMdSettings />
                Configurações
            </h2>

            <div className="py-5 px-3 flex flex-col gap-5 font-inter">
                {itensRenderizados.map(item => (
                    <div
                        key={item.id}
                        className={`${activeItem === item.title ? 'active' : ''} flex items-center gap-3 text-xl font-medium text-black-custom-400 cursor-pointer py-2 px-5 rounded-md hover:bg-tertiary hover:text-white transition`}
                        onClick={() => onSelect(item.title)}
                    >
                        {item.icon}
                        {item.title}
                    </div>
                ))}
            </div>
        </article>
    )
}