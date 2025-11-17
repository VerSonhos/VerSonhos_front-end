import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import willApresentando from "../../../assets/images/willApresentando.png";
import videoOculos from "../../../assets/videos/video-oculos.mp4";

function GlassesModel({ internalPhase, setInternalPhase, onAnimationEnd, reverse }) {
  const { scene } = useGLTF("src/assets/models/oculos.glb");
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (internalPhase === 0) {
      ref.current.visible = false;
    }

    // oculos aparece grande e de frente
    if (internalPhase === 1 && !reverse) {
      ref.current.visible = true;
      ref.current.position.set(0, -0.5, 0);
      ref.current.rotation.y = 0;
      ref.current.scale.setScalar(18.0);
    }

    // gira mostrando lentes
    if (internalPhase === 2 && !reverse) {
      const targetRotation = Math.PI;
      ref.current.rotation.y += (targetRotation - ref.current.rotation.y) * 0.15;
      ref.current.scale.setScalar(16.0);
      ref.current.position.set(0, -0.5, 0);
      state.camera.position.z = 5;
      state.camera.position.x = 0;
      state.camera.position.y = -0.5;
    }

    // entra nas lentes
    if (internalPhase === 3 && !reverse) {
      ref.current.rotation.y = Math.PI;
      ref.current.position.set(0, -0.5, 0);
      const zoomScale = 3.0 + t * 2.0;
      ref.current.scale.setScalar(zoomScale);
      state.camera.position.z = Math.max(state.camera.position.z - 1.2, 0.4);
      state.camera.position.x += (0 - state.camera.position.x) * 0.2;
      state.camera.position.y += (-0.5 - state.camera.position.y) * 0.2;
    }

    // saida do oculos
    if (internalPhase === 4 && !reverse) {
      ref.current.rotation.y = 0;
      ref.current.position.y += (1 - ref.current.position.y) * 0.3; 
      ref.current.scale.setScalar(Math.max(ref.current.scale.x - 1.5, 0));
      if (ref.current.scale.x <= 0.5) {
        ref.current.visible = false;
        onAnimationEnd();
      }
    }

    // reverse do oculos
    if (reverse && internalPhase > 0) {
      ref.current.visible = true;
      ref.current.rotation.y = Math.PI;
      ref.current.position.set(0, -0.5, 0);
      ref.current.scale.setScalar(3.0 + t * 1.5);
      state.camera.position.z = Math.min(state.camera.position.z + 1.2, 6);
      state.camera.position.x += (0 - state.camera.position.x) * 0.2;
      state.camera.position.y += (-0.5 - state.camera.position.y) * 0.2;
      if (ref.current.scale.x >= 18.0) {
        ref.current.visible = false;
        onAnimationEnd(); 
      }
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function GlassesExperience() {
  const [phase, setPhase] = useState(0);
  const [showExperience, setShowExperience] = useState(false);
  const [internalPhase, setInternalPhase] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!reverse) {
      const phase1 = setTimeout(() => {
        setPhase(1); 
        setInternalPhase(1); 
      }, 700);

      const phase2 = setTimeout(() => setInternalPhase(2), 1400);
      const phase3 = setTimeout(() => setInternalPhase(3), 2000);
      const finish = setTimeout(() => setInternalPhase(4), 3000);

      return () => {
        clearTimeout(phase1);
        clearTimeout(phase2);
        clearTimeout(phase3);
        clearTimeout(finish);
      };
    }
  }, [reverse]);

  return (
    <section className="relative w-full h-[600px] overflow-hidden flex justify-center items-center">
      {/* Título da seção*/}
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[#03184F] mb-10 font-fredoka absolute z-[50] text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase === 0 ? 1 : 0, y: phase === 0 ? 0 : -20 }}
        transition={{ duration: 0.6 }}
      >
        O que as crianças veem no óculos?
        <br />
        <span className="text-[#3184EF]">Prepare-se para a imersão!</span>
      </motion.h2>

      {/* Canvas do óculos */}
      {!showExperience && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={2} />
            <directionalLight position={[2, 2, 2]} intensity={2} />
            <GlassesModel
              internalPhase={internalPhase}
              setInternalPhase={setInternalPhase}
              reverse={reverse}
              onAnimationEnd={() => {
                if (!reverse) setShowExperience(true);
                else setPhase(0); // título volta
              }}
            />
            <OrbitControls enableZoom={false} enablePan={false} enabled={false} />
          </Canvas>
        </div>
      )}

      {/*fundo escuro */}
      <AnimatePresence>
        {showExperience && !reverse && (
          <motion.div
            className="fixed inset-0 z-[998] flex justify-center items-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
            setShowExperience(false); 
            setReverse(false);       
            setPhase(0);            
            setInternalPhase(0);  
            }}

          >
           <div className="relative z-[999] flex items-center gap-0 px-4">
              {/* Mascote */}
              <motion.img
                initial={{ opacity: 0, x: -50, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 80 }} 
                exit={{ opacity: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={willApresentando}
                className="w-65 max-w-[500px] z-20"
                alt="Will Apresentando"
              />
              {/* Vídeo */}
              <motion.video
                initial={{ opacity: 0, scale: 0.8, x: 0 }}
                animate={{ opacity: 1, scale: 1, x: -55 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                src={videoOculos}
                autoPlay
                loop
                muted
                className="w-[60vw] max-w-[750px] rounded-xl shadow-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
