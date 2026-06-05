// Premium categorized selection of Google Fonts
export interface FontItem {
  name: string;
  category: string;
  description: string;
}

export const GOOGLE_FONTS: FontItem[] = [
  // Sans-serif
  {
    name: 'Inter',
    category: 'Sans-serif',
    description: 'Clean, neutral, and highly readable.',
  },
  {
    name: 'Plus Jakarta Sans',
    category: 'Sans-serif',
    description: 'Modern, geometric, and energetic.',
  },
  {
    name: 'Outfit',
    category: 'Sans-serif',
    description: 'Sleek, minimalist, and premium.',
  },
  {
    name: 'Space Grotesk',
    category: 'Sans-serif',
    description: 'Tech-forward, quirky, and bold.',
  },
  {
    name: 'Poppins',
    category: 'Sans-serif',
    description: 'Friendly, balanced, and elegant.',
  },
  {
    name: 'Montserrat',
    category: 'Sans-serif',
    description: 'Classic geometric architecture.',
  },
  {
    name: 'Raleway',
    category: 'Sans-serif',
    description: 'Lightweight, modern, and stylized.',
  },
  {
    name: 'Lexend',
    category: 'Sans-serif',
    description: 'Designed for optimal reading performance.',
  },
  {
    name: 'DM Sans',
    category: 'Sans-serif',
    description: 'Low-contrast, highly functional.',
  },

  // Serif
  {
    name: 'Playfair Display',
    category: 'Serif',
    description: 'Classic elegance and high contrast.',
  },
  {
    name: 'Lora',
    category: 'Serif',
    description: 'Brilliant brush-like, literary style.',
  },
  {
    name: 'Merriweather',
    category: 'Serif',
    description: 'High readability, warm, and sturdy.',
  },
  {
    name: 'Cinzel',
    category: 'Serif',
    description: 'Roman-inscribed classical structure.',
  },
  {
    name: 'Instrument Serif',
    category: 'Serif',
    description: 'Slim, expressive, and high-fashion.',
  },
  {
    name: 'EB Garamond',
    category: 'Serif',
    description: 'Humanist, legendary renaissance shape.',
  },
  {
    name: 'Cormorant Garamond',
    category: 'Serif',
    description: 'Prestigious, fine-serifed, and luxurious.',
  },

  // Monospace
  {
    name: 'Fira Code',
    category: 'Monospace',
    description: 'Tech-standard with elegant ligatures.',
  },
  {
    name: 'JetBrains Mono',
    category: 'Monospace',
    description: 'Crafted specifically for developers.',
  },
  {
    name: 'Space Mono',
    category: 'Monospace',
    description: 'Geometric, retro-futuristic vibes.',
  },
  {
    name: 'Courier Prime',
    category: 'Monospace',
    description: 'Classic typewriter style refined.',
  },
  {
    name: 'Source Code Pro',
    category: 'Monospace',
    description: 'Clean, professional coding design.',
  },

  // Creative & Display
  {
    name: 'Syne',
    category: 'Display',
    description: 'Artistic, highly conceptual, and wide.',
  },
  {
    name: 'Bungee',
    category: 'Display',
    description: 'Heavy, blocky, arcade-style power.',
  },
  {
    name: 'Pacifico',
    category: 'Display',
    description: 'Beautifully flowing hand-drawn script.',
  },
  {
    name: 'Lobster',
    category: 'Display',
    description: 'Vintage, bold, and energetic cursive.',
  },
  {
    name: 'Creepster',
    category: 'Display',
    description: 'Gothic, horror, and spooky display.',
  },
  {
    name: 'Cabin Sketch',
    category: 'Display',
    description: 'Hand-drawn, scribbled notebook feel.',
  },
  {
    name: 'Playpen Sans',
    category: 'Display',
    description: 'Playful, handwritten casual font.',
  },
  {
    name: 'Bebas Neue',
    category: 'Display',
    description: 'Tall, condensed, striking title-maker.',
  },
  {
    name: 'Cinzel Decorative',
    category: 'Display',
    description: 'Ultra-ornately styled classic serif.',
  },
];

export const CATEGORIES = ['All', 'Sans-serif', 'Serif', 'Monospace', 'Display'];

// Helper to inject Google Font link dynamically
export const loadGoogleFont = (fontName: string) => {
  if (typeof window === 'undefined') return;
  const linkId = `dynamic-font-${fontName.replace(/ /g, '-').toLowerCase()}`;
  if (document.getElementById(linkId)) return;

  const url = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
};

// Helper to apply the selected font globally
export const applyGlobalFont = (fontName: string, isEnabled: boolean) => {
  if (typeof window === 'undefined') return;

  let styleTag = document.getElementById(
    'global-font-style',
  ) as HTMLStyleElement | null;

  if (!isEnabled) {
    if (styleTag) {
      styleTag.innerHTML = '';
    }
    document.documentElement.style.removeProperty('--font-global');
    return;
  }

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'global-font-style';
    document.head.appendChild(styleTag);
  }

  // Force apply across the entire web-page elements using standard and high specificity selectors
  styleTag.innerHTML = `
    body, html, h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, div, code, pre, label, section, footer, header {
      font-family: "${fontName}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
  `;
  document.documentElement.style.setProperty('--font-global', `"${fontName}"`);
};
