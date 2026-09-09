import DefaultTheme from "vitepress/theme";
import PdfEmbed from "./components/PdfEmbed.vue";

export default {
  ...DefaultTheme,

  enhanceApp({ app }) {
    app.component("PdfEmbed", PdfEmbed);
  },
};
