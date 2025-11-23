export default function TypeRegister({ activeType, onSelect }) {
    const tipos = [
        { label: 'Usuário', value: 'USER' },
        { label: 'Empresa', value: 'EMPRESA' },
    ];
    
    return (
        <div className='w-[50%] mx-auto flex justify-center gap-5 items-center p-1 bg-gray-100 rounded-xl font-inter'>
            {tipos.map((tipo) => (
                <button
                    key={tipo.value}
                    type="button" // Importante: Garante que o botão não submete o form
                    onClick={() => onSelect(tipo.value)}
                    // Estilização baseada na imagem que você enviou:
                    className={`
                        py-2 px-6 rounded-lg font-medium transition ease-in-out whitespace-nowrap cursor-pointer
                        ${activeType === tipo.value 
                            ? 'bg-white text-tertiary shadow-md' // Estilo Ativo (fundo branco, texto da cor principal, sombra)
                            : 'text-gray-600 hover:bg-gray-200' // Estilo Inativo (texto cinza, hover discreto)
                        }
                    `}
                >
                    {tipo.label}
                </button>
            ))}
        </div>
    );
}