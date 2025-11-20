export default function HeaderCards({ stats = { recusadas: 0, expiradas: 0, concluidas: 0 } }) {
  const items = [
    { label: "Solicitações recusadas", value: stats.recusadas, bg: "bg-red-500" },
    { label: "Solicitações expiradas", value: stats.expiradas, bg: "bg-tertiary" },
    { label: "Solicitações concluídas", value: stats.concluidas, bg: "bg-green-500" },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-thirteenth">
        Histórico dos agendamentos
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} text-white rounded-xl py-6 px-4 
                                    shadow-[0_4px_10px_rgba(0,0,0,0.25)] 
                                    flex flex-col items-center justify-center 
                                    border-2 border-black 
                                    hover:scale-102 transition-transform duration-300`}
          >
            <span className="text-4xl font-bold">{item.value}</span>
            <p className="text-lg mt-1 opacity-90 text-center font-fredoka font-bold">
              {item.label}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
