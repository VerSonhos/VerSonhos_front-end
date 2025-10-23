import ImgMeninoElementos from '../../../assets/images/menino_elementos.png'

export default function AboutVisit() {
  return (
    <section className="flex flex-col items-center py-12 px-6">
      <h1 className="text-thirteenth font-fredoka font-extrabold text-5xl md:text-5xl pb-10 text-center">
        Sorrisos em <span className="text-tertiary">movimento</span>
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center max-w-5xl gap-8">
        <img
          src={ImgMeninoElementos}
          alt="Menino na cama visualizando óculos"
        />

        <p className="text-base md:text-lg leading-relaxed text-justify md:text-left max-w-xl font-inter">
          Durante as visitas, nossa equipe leva óculos de realidade virtual e promove experiências
          imersivas que transportam as crianças para universos encantadores do fundo do mar ao
          espaço sideral. A atividade é conduzida com leveza e empatia, estimulando o riso, a
          imaginação e o bem-estar emocional.
        </p>
      </div>
    </section>
  );
}
