module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          foreground: "hsl(var(--neutral-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          50: "hsl(45, 33%, 98%)",
          100: "hsl(45, 25%, 96%)",
          200: "hsl(45, 15%, 90%)",
          300: "hsl(42, 8%, 80%)",
          400: "hsl(42, 6%, 65%)",
          500: "hsl(40, 6%, 50%)",
          600: "hsl(38, 6%, 40%)",
          700: "hsl(36, 5%, 30%)",
          800: "hsl(32, 5%, 20%)",
          900: "hsl(28, 5%, 10%)",
        },
      },
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
        serif: ['"Source Serif Pro"', "serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.2" }],
        "3xl": ["1.875rem", { lineHeight: "1.2" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        headline: "-0.025em",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-1': "linear-gradient(135deg, hsl(40, 33%, 96%) 0%, hsl(36, 20%, 90%) 100%)",
        'gradient-2': "linear-gradient(90deg, hsl(45, 27%, 98%) 0%, hsl(36, 20%, 90%) 100%)",
        'button-border-gradient': "linear-gradient(120deg, hsl(220, 9%, 30%) 0%, hsl(220, 9%, 18%) 100%)",
      },
    },
  },
  plugins: [],
}
