import { motion } from "framer-motion";
import { fadeUp } from "../../../motion/animations";
import ft_heitor from '../../../assets/images/ft_heitor.png';
import ft_jp from '../../../assets/images/ft_jp.png';
import ft_mariana from '../../../assets/images/ft_mariana.png';
import ft_vitor from '../../../assets/images/ft_vitor.png';
import ft_nicolas from '../../../assets/images/ft_nicolas.png';
import ft_mauricio from '../../../assets/images/ft_mauricio.png';
import background_time from '../../../assets/images/fundo-sobrenos.png'
import background_rapaziada from '../../../assets/images/background_rapaziada.jpeg' // Certifique-se de que este caminho está correto.

const members = [
  {
    name: "Heitor Sales",
    role: "Product Owner, Financeiro e Desenvolvedor Full Stack",
    img: ft_heitor,
    linkedin: "https://www.linkedin.com/in/heitorlsales/",
    github: "https://github.com/desenvolvheitor",
  },
  {
    name: "João Queiroz",
    role: "Scrum Master e Desenvolvedor Front-end",
    img: ft_jp,
    linkedin: "https://www.linkedin.com/in/joaopedroqdemelo/",
    github: "https://github.com/JotaPQueiroz",
  },
  {
    name: "Mariana Ocireu",
    role: "Desenvolvedora Full Stack",
    img: ft_mariana,
    linkedin: "https://www.linkedin.com/in/marianaociz/",
    github: "https://github.com/marisouza31",
  },
  {
    name: "Nicolas Coelho",
    role: "Desenvolvedor Full Stack",
    img: ft_nicolas,
    linkedin: "https://www.linkedin.com/in/nicolascoelho/",
    github: "https://github.com/nicoelho",
  },
  {
    name: "Vitor Mota",
    role: "UI/UX Designer, Marketing e Desenvolvedor Front-end",
    img: ft_vitor,
    linkedin: "https://www.linkedin.com/in/vitor-mota-nj/",
    github: "https://github.com/VitorMotaNJ",
  },
  {
    name: "Maurício Martins",
    role: "Desenvolvedor Full Stack",
    img: ft_mauricio,
    linkedin: "https://www.linkedin.com/in/mauricio-martins-gois/",
    github: "https://github.com/maugois",
  },
];

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.564-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.742.086-.728.086-.728 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.797.576c4.765-1.589 8.204-6.085 8.204-11.385 0-6.627-5.373-12-12-12z"/></svg>
);

export default function TeamSection() {
  const imageAreaSize = '9rem';

  return (
    <section className="flex flex-col justify-center items-center p-8 md:p-16 pb-32">
      <h3 className="text-4xl md:text-5xl font-bold mb-8 font-fredoka text-thirteenth" >
        Conheça nosso <span className='text-tertiary'>time</span>
      </h3>

      {/* NOVO ELEMENTO: background_rapaziada */}
      <div 
        className="w-full max-w-4xl lg:max-w-6xl h-48 sm:h-64 rounded-xl shadow-xl mb-8"
        style={{
          backgroundImage: `url(${background_rapaziada})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl lg:max-w-6xl">
        {members.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
           
            className="flex min-h-46 rounded-2xl shadow-xl overflow-hidden relative hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: '#e0f2f7',
              border: '1px solid #c0d9e7',
            }}
          >
            <div
              className="flex items-center justify-center z-10"
              style={{
                backgroundImage: `url(${background_time})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minWidth: imageAreaSize,
                width: imageAreaSize,
              }}
            >
              <img 
                src={m.img} 
                alt={m.name} 
                className="w-30 h-30 rounded-full object-cover border-4 border-white"
              />
            </div>

            <div 
              className='flex-1 flex flex-col justify-between p-4' 
              style={{
                backgroundColor: '#192b45',
              }}
            >
              <div className=''>
                <h4 className="text-lg md:text-xl font-extrabold text-white leading-tight mb-1">{m.name}</h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">{m.role}</p>
              </div>
              
              <div className='flex gap-2 mt-2'>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <LinkedInIcon />
                  </a>
                )}
                {m.github && (
                  <a href={m.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <GithubIcon />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        ))}
      </div>
    </section>
  );
}