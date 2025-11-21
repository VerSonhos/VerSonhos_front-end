import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import videoOculos from "../../../assets/videos/video-oculos.mp4";

function GlassesModel({ progress }) {
  const groupRef = useRef();
  const { scene } = useGLTF("src/assets/models/oculos.glb");

  useFrame(() => {
    if (!groupRef.current) return;
    const p = Math.min(progress, 1);
    groupRef.current.rotation.y = -Math.PI * 2 * p;
    groupRef.current.position.z = 2 - p * 2;
    const scale = 1 + p * 0.6;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return <primitive ref={groupRef} object={scene} />;
}

export default function GlassesExperience() {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const section = document.getElementById("vr-section");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const current = -rect.top;
    const p = Math.min(Math.max(current / total, 0), 1);
    setProgress(p);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="vr-section"
      className="
        relative w-full 
        overflow-hidden
        h-[400vh]
        md:h-[450vh]
        sm:h-[300vh]
      "
    >

      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">

        <Canvas className="w-full h-full" camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 3, 3]} intensity={2} />
          <GlassesModel progress={progress} />
        </Canvas>

        <video
          src={videoOculos}
          autoPlay
          muted
          playsInline
          className="
            w-full max-w-4xl rounded-xl shadow-xl
            mx-auto
            mt-[18vh] sm:mt-[15vh] md:mt-[10vh] lg:mt-[5vh]
          "
          style={{
            opacity: progress < 0.7 ? 0 : 1,
            pointerEvents: progress < 0.7 ? "none" : "auto",
            transition: "opacity 0.6s ease"
          }}
        />
      </div>
    </section>
  );
}
