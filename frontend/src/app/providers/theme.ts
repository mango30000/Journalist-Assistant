import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Палитра проекта
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        ink: { value: "#031927" }, // Ink Black: текст, навигация
        ember: { value: "#BA1200" }, // Brick Ember: главные кнопки
        steel: { value: "#508AA8" }, // Air Force Blue: рамки, линии
        sky: { value: "#9DD1F1" }, // Baby Blue: акценты в навигации
        pale: { value: "#C8E0F4" }, // Pale Sky: фон страниц
      },
      fonts: {
        heading: { value: "Georgia, serif" },
        body: { value: "system-ui, sans-serif" },
      },
    },
  },
  globalCss: { body: { bg: "pale", color: "ink" } },
});

export const system = createSystem(defaultConfig, config);
