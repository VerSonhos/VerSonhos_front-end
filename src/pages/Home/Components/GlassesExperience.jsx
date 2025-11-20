import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import willApresentando from "../../../assets/images/willApresentando.png";
import videoOculos from "../../../assets/videos/video-oculos.mp4";

// Defina a altura total da experiência de scroll.
const SCROLL_HEIGHT_VH = 400; // 400% da altura da viewport

/* -------------------------------------------------------
   MODELO — alinhado, leve e 100% centralizado
------------------------------------------------------- */
function GlassesModel({ progress }) {
  const { scene } = useGLTF("src/assets/models/oculos.glb");
  const ref = useRef();

  // Limpa o material se houver algum cache (para garantir a cor preta padrão)
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Opcional: ajustar material para garantir que não haja cor indesejada
          // Se o modelo GLB já vier com material preto, pode remover este bloco.
          // child.material = new MeshStandardMaterial({ color: 0x000000 });
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;

    const p = progress;
    const baseScale = 3.5;
    const initialCameraZ = 7;
    const zoomedCameraZ = 2; // Posição de câmera com zoom

    // Sempre visível por padrão, será ocultado apenas no final
    ref.current.visible = true;
    ref.current.scale.setScalar(baseScale);
    ref.current.position.set(0, 0, 0); // Garante que o óculos esteja centralizado

    // --- PONTO CHAVE: Rotacionar para a frente (lentes) e aplicar zoom ---
    const rotateToFrontEnd = 0.3; // Final da rotação para frente
    const zoomStart = 0.4; // Início do zoom
    const zoomEnd = 0.7; // Fim do zoom e posição para ver o vídeo

    if (p <= rotateToFrontEnd) {
      // Gira o óculos de sua posição inicial até as lentes ficarem para frente
      // Ajuste o "Math.PI * 0.5" ou similar se o modelo estiver em outra orientação inicial.
      // O objetivo é que em p=rotateToFrontEnd, rotation.y seja ~Math.PI ou ~0, dependendo da frente do seu modelo.
      // Vamos tentar começar com Math.PI para que ele termine de frente (lentes).
      ref.current.rotation.y = p * (Math.PI / rotateToFrontEnd); // Rotação de 0 a Math.PI (180 graus)
      state.camera.position.set(0, 0, initialCameraZ); // Câmera padrão
    } else if (p > rotateToFrontEnd && p <= zoomStart) {
      // Mantém a rotação de frente
      ref.current.rotation.y = Math.PI; // Fica de frente (lentes)
      state.camera.position.set(0, 0, initialCameraZ); // Câmera padrão
    } else if (p > zoomStart && p <= zoomEnd) {
      // Aplica o zoom enquanto o óculos permanece de frente
      const t = (p - zoomStart) / (zoomEnd - zoomStart); // 0 -> 1
      state.camera.position.z = initialCameraZ - t * (initialCameraZ - zoomedCameraZ); // 7 -> 2
      ref.current.rotation.y = Math.PI; // Garante que continue de frente
    } else {
      // p > zoomEnd (quando o vídeo já está mais visível)
      // Oculta o óculos completamente
      ref.current.visible = false;
      // Posiciona a câmera para onde o vídeo aparece
      state.camera.position.set(0, 0, zoomedCameraZ);
    }
  });

  return <primitive ref={ref} object={scene} />;
}

/* -------------------------------------------------------
   EXPERIÊNCIA VR — mais curta, centralizada e leve
------------------------------------------------------- */
export default function GlassesExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("vr-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // O progresso deve ir de 0 a 1 ao longo de toda a altura da seção.
      const scrollRange = (SCROLL_HEIGHT_VH / 100) * windowH;

      // Calcula o progresso de 0 a 1 dentro do intervalo de scroll da seção
      const p = Math.min(
        Math.max((-rect.top) / scrollRange, 0),
        1
      );
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // O vídeo começa a aparecer quando o óculos está saindo/escondendo
  const videoVisible = progress >= 0.7; // Ajustado para corresponder ao 'zoomEnd'

  return (
    <section
      id="vr-section"
      className="relative w-full"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-24"
      >
        {/* TÍTULO - Fica invisível ao rolar */}
        {progress < 0.25 && (
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#03184F] mb-10 font-fredoka text-center z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: progress > 0.15 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            O que as crianças veem no óculos?
            <br />
            <span className="text-[#3184EF]">Prepare-se para a imersão!</span>
          </motion.h2>
        )}

        {/* CANVAS centralizado — Z-INDEX MAIS ALTO (z-50) para ficar acima do vídeo */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-50">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[2, 2, 2]} intensity={1.4} />
            <GlassesModel progress={progress} />
          </Canvas>
        </div>

        {/* VÍDEO + BONECO — Z-INDEX MAIS BAIXO (z-40) e controlado pela visibilidade */}
        <motion.div
          className="relative z-40 mt-[20vh] flex items-center gap-10 justify-center"
          // Opacidade e posição dependem do progresso
          animate={{
            opacity: videoVisible ? 1 : 0,
            y: videoVisible ? 0 : 50, // Move para cima ao aparecer
          }}
          transition={{ duration: 0.45 }}
        >
          <img
            src={willApresentando}
            className="w-64 md:w-80"
            alt="Will apresentando"
          />

          <video
            src={videoOculos}
            autoPlay
            loop
            muted
            className="w-[70vw] max-w-[800px] rounded-xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}