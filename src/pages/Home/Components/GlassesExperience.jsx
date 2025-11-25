import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import videoOculos from "../../../assets/videos/video-oculos.mp4";
import modelOculos from "@/assets/models/oculos.glb"

const SCROLL_HEIGHT_VH = 400;

function GlassesModel({ progress }) {
  const { scene } = useGLTF(modelOculos);
  const ref = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;

    const p = progress;
    const isMobile = window.innerWidth < 768;
    const baseScale = isMobile ? 7.5 : 13;
    const offsetY = isMobile ? -0.5 : -0.5; 
    const initialCameraZ = 7;
    const zoomedCameraZ = 2;

    ref.current.visible = true;
    ref.current.scale.setScalar(baseScale);
    ref.current.position.set(0, offsetY, 0);

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
  const showCanvas = progress < 0.75;

  return (
    <section
      id="vr-section"
      className="relative w-full h-[400vh] px-0 md:px-12"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start">
        {progress < 0.25 && (
          <motion.h2
            className="absolute top-24 left-1/2 -translate-x-1/2
              text-xl sm:text-2xl md:text-5xl font-bold text-[#03184F]
              text-center font-fredoka z-[60]
            "
            initial={{ opacity: 1 }}
            animate={{ opacity: progress > 0.15 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="block whitespace-nowrap">
              O que as crianças veem no óculos?
            </span>

            <span className="block text-[#3184EF]">
              Prepare-se para a imersão!
            </span>
          </motion.h2>
        )}

        <div
          className={`absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none z-50 transition-opacity duration-300
            ${showCanvas ? "opacity-100" : "opacity-0"}
          `}
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[2, 2, 2]} intensity={1.4} />
            <GlassesModel progress={progress} />
          </Canvas>
        </div>

      <motion.div
        className="relative z-40 mt-[28vh] sm:mt-[20vh] md:mt-[12vh] w-full flex justify-center px-4 md:px-12*/"
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
          className="w-full md:w-[62vw] max-w-[1200px] rounded-none md:rounded-xl shadow-xl"
        />
      </motion.div>

      </div>
    </section>
  );
}