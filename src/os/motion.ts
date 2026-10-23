export const springs = {
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  app: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  popover: {
    type: "spring" as const,
    stiffness: 350,
    damping: 28,
  },
  playful: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
};

export const ease = {
  ios: [0.32, 0.72, 0, 1] as const,
};

export const reducedMotionTransition = {
  duration: 0.15,
  ease: "easeInOut" as const,
};
