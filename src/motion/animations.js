// animação geral para todas as paginas

export const fadeDefault = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.8 },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.8 },
  }),
};
