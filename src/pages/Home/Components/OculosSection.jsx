import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useInView } from "react-intersection-observer";

import oculosModel from "../../../assets/models/oculos.glb";
import videoFile from "../../../assets/videos/video-oculos.mp4";
import mascoteImg from "../../../assets/images/willApresentando.png";

export default function OculosSection() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [phase, setPhase] = useState("idle"); // idle -> rotate -> zoom -> done

  // timeline automática ao entrar na viewport
  useEffect(() => {
    if (!inView) return;

    // pequeno delay para garantir o render inicial
    const t1 = setTimeout(() => setPhase("rotate"), 400);     // começa a girar
    const t2 = setTimeout(() => setPhase("zoom"), 1400);      // faz zoom (entrar)
    const t3 = setTimeout(() => setPhase("done"), 2400);      // some e mostra vídeo

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      className="w-full flex justify-center items-center bg-transparent"
      style={{ minHeight: "420px" }}
    >
      {/* Canvas com o óculos — só mostra enquanto não estiver em 'done' */}
      {phase !== "done" && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[2, 2, 2]} intensity={0.8} />
            <Oculos3D phase={phase} />
          </Canvas>
        </div>
      )}

      {/* Quando a animação termina, mostramos vídeo + mascote (sem animação) */}
      {phase === "done" && (
        <div className="relative z-10 w-full flex justify-center">
          <div className="max-w-5xl w-full flex items-center justify-center gap-8 px-6">
            <img
              src={mascoteImg}
              alt="Mascote"
              className="hidden md:block w-44 object-contain"
              style={{ flex: "0 0 180px" }}
            />

            <video
              src={videoFile}
              className="w-full md:w-3/5 rounded-xl shadow-lg"
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- componente 3D (controla rotação e zoom) ---------- */
function Oculos3D({ phase }) {
  const gltf = useGLTF(oculosModel);
  const meshRef = useRef();
  const { camera } = useThree();

  // garantir camera inicial (afastada para caber o modelo inteiro)
  useEffect(() => {
    camera.position.set(0, 0, 5); // posição padrão
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // parâmetros de animação
  const rotateSpeed = 0.04;
  const rotateTo = 0; // valor alvo para rotação (frente)
  const initialRotation = -Math.PI / 6; // começa levemente de lado

  // valores animáveis armazenados no ref
  const stateRef = useRef({
    rotY: initialRotation,
    scale: 0.35,
    camZ: 5,
  });

  useFrame(() => {
    const s = stateRef.current;

    if (!meshRef.current) return;

    // fase idle: óculos pequeno e centrado, frente para usuário (com pequeno ângulo)
    if (phase === "idle") {
      // mantém posição e scale iniciais (suave)
      s.rotY += 0.001;
      s.scale = s.scale * 0.98 + 0.35 * 0.02;
    }

    // fase rotate: gira até alinhamento frontal (apresentar lente)
    if (phase === "rotate") {
      // aproxima rotY do alvo (0)
      s.rotY = s.rotY + (rotateTo - s.rotY) * 0.12;
      // mantém scale pequeno
      s.scale = s.scale * 0.96 + 0.35 * 0.04;
    }

    // fase zoom: aumenta escala (efeito entrando) e move câmera rapidamente
    if (phase === "zoom") {
      // acelerar rotação para garantir que fique frontal
      s.rotY = s.rotY + (rotateTo - s.rotY) * 0.2;
      // escala sobe rapidamente (efeito de "entrar")
      s.scale = s.scale + (3.6 - s.scale) * 0.18; // grande escala para cobrir a tela
      // câmera avança (reduz z)
      s.camZ = s.camZ + (0.7 - s.camZ) * 0.18;
    }

    // aplicar valores ao mesh e camera
    meshRef.current.rotation.y = s.rotY;
    meshRef.current.scale.setScalar(s.scale);
    camera.position.z = s.camZ;
  });

  // posição do modelo: centralizado e levemente acima para parecer "frente"
  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={[0, 0, 0]}
    />
  );
}