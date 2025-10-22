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
                  className="w-full h-full object-contain"
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
        className="relative block w-[calc(100%+1.3px)] h-[160px]"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,
          70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,
          512.34,53.67,583,72.05c69.27,18,138.3,24.88,
          209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,
          25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          className="fill-white"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,
          47.69,72.05,99.41,111.27,165,111,224.58,
          91.58c31.15-10.15,60.09-26.07,89.67-39.8,
          40.92-19,84.73-46,130.83-49.67,36.26-2.85,
          70.9,9.42,98.6,31.56,31.77,25.39,62.32,
          62,103.63,73,40.44,10.79,81.35-6.69,
          119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,
          113.28,22.88,168.9,38.84,30.2,8.66,
          59,6.17,87.09-7.5,22.43-10.89,48-26.93,
          60.65-49.24V0Z"
          opacity=".5"
          className="fill-white"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,
          475.83,42.57c43-7.64,84.23-20.12,
          127.61-26.46,59-8.63,112.48,12.24,
          165.56,35.4C827.93,77.22,886,95.24,
          951.2,90c86.53-7,172.46-45.71,
          248.8-84.81V0Z"
          className="fill-white"
        ></path>
      </svg>
    </div>
    </section>
  );
}

