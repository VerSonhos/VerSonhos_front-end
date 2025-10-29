"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ImgCarol from '../../../assets/images/carol_santos.png'
import ImgVinicius from '../../../assets/images/vini_mota.png'
import ImgLucas from '../../../assets/images/lucas_lopes.png'
import ImgAlexia from '../../../assets/images/alexia_santos.png'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alexia Santos",
      role: "Executive Engineer",
      image: ImgAlexia, 
      text: "Quando meu filho estava internado, o hospital era um lugar de medo e monotonia. O projeto da VerSonhos foi um verdadeiro respiro! Ele conseguia 'viajar' para lugares incríveis, esquecendo a dor e o ambiente hospitalar por alguns momentos. Vi meu filho rindo de novo. Não é só tratamento, é cura emocional.",
      isHighlighted: true,
    },
    {
      name: "Caroline Santos",
      role: "Psicóloga Pediatra",
      image: ImgCarol,
      text: "A VerSonhos trouxe uma ferramenta terapêutica fantástica que proporciona uma fuga controlada no ambiente hospitalar. O projeto diminui significativamente a ansiedade e a percepção da dor, devolvendo às crianças um vital senso de bem-estar.",
    },
    {
      name: "Lucas Lopes",
      role: "Pai da Marcella, hospitalizada há 5 meses",
      image: ImgLucas,
      text: "Ver minha filha usando a tecnologia da VerSonhos foi uma luz no quarto; por alguns minutos, ela esqueceu completamente a internação. Esse sorriso genuíno que a empresa trouxe é o maior alívio e esperança que poderíamos ter.",
    },
    {
      name: "Vinícius Mota",
      role: "Enfermeiro no Hospital Jangaíba",
      image: ImgVinicius,
      text: "O trabalho da VerSonhos mudou nosso dia a dia, servindo como uma poderosa distração que facilita a administração de medicação e curativos. Reduz o estresse das crianças e da equipe, nos ajudando a cuidar do espírito e da motivação dos pacientes.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center"> 
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#03184F] mb-12 font-fredoka">
        <span className="relative inline-block">
          <span className="text-gray-800">O que dizem</span>
        </span>{" "}
        <span className="text-blue-600">sobre nós</span>
      </h2>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card 
                    className={`relative flex flex-col pt-12 pb-8 px-6 border 
                                z-10 border-blue-200 bg-white shadow-lg rounded-2xl 
                                h-full transition-all duration-300 ease-in-out
                                ${t.isHighlighted ? "shadow-xl border-blue-400" : ""}`}
                >
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-xl bg-white">
                      <AvatarImage src={t.image} alt={t.name} />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <CardHeader className="flex-1 flex items-center justify-center p-0 mt-8">
                    <CardTitle className="text-gray-700 text-base italic leading-relaxed text-center font-inter">
                      "{t.text}"
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-4 p-0 text-center">
                    <p className="text-lg font-bold text-gray-800 font-fredoka">
                      {t.name}
                    </p>
                    <p className="text-sm text-gray-500 font-inter">{t.role}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious 
            className="absolute top-1/2 -translate-y-1/2 
             w-9 h-9 sm:w-10 sm:h-10 border-blue-400 bg-white text-blue-600 
             hover:bg-blue-50 hover:text-blue-700 shadow-md transition-all 
             left-2 sm:left-0 md:left-[-2rem] lg:left-[-3.5rem] z-20"
          />
          <CarouselNext 
            className="absolute top-1/2 -translate-y-1/2 
             w-9 h-9 sm:w-10 sm:h-10 border-blue-400 bg-white text-blue-600 
             hover:bg-blue-50 hover:text-blue-700 shadow-md transition-all 
             right-2 sm:right-0 md:right-[-2rem] lg:right-[-3.5rem] z-20"
          />
        </Carousel>
      </div>
    </section>
  );
}