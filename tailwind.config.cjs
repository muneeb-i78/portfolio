/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom theme colors
        brand: {
          cyan:  '#06b6d4',
          blue:  '#3b82f6',
          light: '#22d3ee',
          dark:  '#0891b2',
        },
        surface: {
          900: '#0a0a0a',
          800: '#0f0f0f',
          700: '#141414',
          600: '#1a1a1a',
          500: '#222222',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl:  "calc(var(--radius) + 4px)",
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xs:  "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs:       "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        cyan:     "0 0 25px rgba(6, 182, 212, 0.35)",
        'cyan-lg':"0 0 50px rgba(6, 182, 212, 0.25)",
        card:     "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.06)",
      },
      backgroundImage: {
        'gradient-cyan': 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)',
        'glow-top':      'radial-gradient(ellipse at top, rgba(6,182,212,0.08) 0%, transparent 60%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%":     { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "caret-blink":    "caret-blink 1.25s ease-out infinite",
        "fade-up":        "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "shimmer":        "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
