import ImgOds3 from "../../../assets/images/ods3.png";
import ImgOds10 from "../../../assets/images/ods10.png";
import ImgOds18 from "../../../assets/images/ods18.png";

export default function OdsSection() {
  const ods = [
    {
      id: 3,
      title: "Saúde e Bem-estar",
      color: "bg-green-600",
      img: ImgOds3,
    },
    {
      id: 10,
      title: "Redução das Desigualdades",
      color: "bg-pink-500",
      img: ImgOds10,
    },
    {
      id: 18,
      title: "Igualdade Étnico-Racial",
      color: "bg-orange-800",
      img: ImgOds18,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#03184F] to-blue-800 text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-5xl font-semibold mb-12 font-fredoka">
          ODS que fazem parte da{" "}
          <span className="text-blue-400 font-bold">VerSonhos</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-10 mb-30">
          {ods.map((o) => (
            <div key={o.id} className="flex flex-col items-center text-center">
              <div className="w-50 h-50 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <img
                  src={o.img}
                  alt={o.title}
                  className={`w-full h-full object-contain ${
                    o.id === 10
                      ? "drop-shadow-[0_8px_10px_rgba(0,0,0,0.6)]"
                      : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-[200px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
             82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
             906.67,72,985.66,92.83c70.05,18.48,146.53,
             26.09,214.34,3V0H0V27.35A600.21,600.21,0,
             0,0,321.39,56.44Z"
          className="fill-white"
        />
      </svg>
    </div>
    </section>
  );
}

