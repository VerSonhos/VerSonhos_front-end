import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import videoOculos from "../../../assets/videos/video-oculos.mp4";

// Altura total do scroll
const SCROLL_HEIGHT_VH = 400;

/* -------------------------------------------------------
   MODELO — alinhado, leve e 100% centralizado
------------------------------------------------------- */
function GlassesModel({ progress }) {
  const { scene } = useGLTF("src/assets/models/oculos.glb");
  const ref = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Caso queira ajustar material, pode colocar aqui
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;

    const p = progress;
    const baseScale = 10;
    const initialCameraZ = 7;
    const zoomedCameraZ = 2;

    ref.current.visible = true;
    ref.current.scale.setScalar(baseScale);
    ref.current.position.set(0, 0, 0);

    const rotateToFrontEnd = 0.3;
    const zoomStart = 0.4;
    const zoomEnd = 0.7;

    if (p <= rotateToFrontEnd) {
      ref.current.rotation.y = p * (Math.PI / rotateToFrontEnd);
      state.camera.position.set(0, 0, initialCameraZ);
    } else if (p > rotateToFrontEnd && p <= zoomStart) {
      ref.current.rotation.y = Math.PI;
      state.camera.position.set(0, 0, initialCameraZ);
    } else if (p > zoomStart && p <= zoomEnd) {
      const t = (p - zoomStart) / (zoomEnd - zoomStart);
      state.camera.position.z = initialCameraZ - t * (initialCameraZ - zoomedCameraZ);
      ref.current.rotation.y = Math.PI;
    } else {
      ref.current.visible = false;
      state.camera.position.set(0, 0, zoomedCameraZ);
    }
  });

  return <primitive ref={ref} object={scene} />;
}

/* -------------------------------------------------------
   EXPERIÊNCIA VR — responsiva para Mobile e Desktop
------------------------------------------------------- */
export default function GlassesExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("vr-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      const scrollRange = (SCROLL_HEIGHT_VH / 100) * windowH;

      const p = Math.min(Math.max((-rect.top) / scrollRange, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const videoVisible = progress >= 0.7;
  const showCanvas = progress < 0.75;  // remove o Canvas no final

  return (
  <section
    id="vr-section"
    className="
      relative w-full
      h-[300vh]           /* Desktop */
      md:h-[350vh]        /* Tablets */
      lg:h-[400vh]        /* Monitores grandes */
      sm:h-[220vh]        /* Mobile grande */
      xs:h-[180vh]        /* Mobile pequeno */
      px-0 md:px-12
    "
  >


  <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-12 sm:pt-20 md:pt-24">


        {/* TÍTULO */}
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

        {/* CANVAS DO ÓCULOS */}
        <div
          className={`
            absolute inset-0 flex justify-center items-center pointer-events-none 
            z-50 transition-opacity duration-300
            ${showCanvas ? "opacity-100" : "opacity-0"}
          `}
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[2, 2, 2]} intensity={1.4} />
            <GlassesModel progress={progress} />
          </Canvas>
        </div>

        {/* VÍDEO RESPONSIVO */}
        <motion.div
          className="
            relative z-40 
            mt-[18vh] sm:mt-[15vh] md:mt-[10vh] lg:mt-[5vh]
            w-full flex justify-center
            px-0 md:px-12
          "
          animate={{
            opacity: videoVisible ? 1 : 0,
            y: videoVisible ? 0 : 50,
          }}
          transition={{ duration: 0.45 }}
        >
          <video
            src={videoOculos}
            autoPlay
            loop
            muted
            playsInline
            className="
              w-full md:w-[80vw]
              max-w-[1200px]
              rounded-none md:rounded-xl
              shadow-xl
            "
          />
        </motion.div>

      </div>
    </section>
  );
}
