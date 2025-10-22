import MainLayout from "../../layouts/MainLayout";
import styles from './styles.module.css';
import fundoDonate from "../../assets/images/fundoDonate.png";
import fundoLinhas from "../../assets/images/fundo-linhas.png"

export default function Home() {
  return (
    <MainLayout>
      <section
        className="relative w-full h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fundoDonate})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white max-w-xl pl-10 md:pl-24">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-fredoka">
            Pronto para espalhar <br/> alegria com a sua
            <span className="text-[#EB8AB4]"> contribuição?</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Levando um pouco mais de cor e alegria para <br/> quem mais precisa.
          </p>
        </div>
      </section>

        {/* card de doaçao pix*/}
      <section  className="py-16 bg-white text-center">
        <h2  className="text-3xl md:text-4xl font-bold text-[#3184EF] mb-10 font-fredoka">
             Doe <span className="text-[#03184F]">e receba nossa gratidão!</span></h2>
        <div
            className="relative w-full h-40 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${fundoLinhas})` }}></div>
      </section>
    </MainLayout>
  );
}
