/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    safelist: [
      'bg-red-50', 'bg-blue-50', 'bg-amber-50', 'bg-emerald-50', 'bg-purple-50', 'bg-pink-50',
      'bg-rose-50', 'bg-slate-50', 'bg-orange-50', 'bg-indigo-50', 'bg-yellow-50', 'bg-teal-50',
      'text-red-600', 'text-blue-600', 'text-amber-600', 'text-emerald-600', 'text-purple-600', 'text-pink-600',
      'text-rose-600', 'text-slate-600', 'text-orange-600', 'text-indigo-600', 'text-yellow-600', 'text-teal-600',
      'text-red-700', 'text-blue-700', 'text-amber-700', 'text-emerald-700', 'text-purple-700', 'text-pink-700',
      'text-rose-700', 'text-slate-700', 'text-orange-700', 'text-indigo-700', 'text-yellow-700', 'text-teal-700',
      'border-red-200', 'border-blue-200', 'border-amber-200', 'border-emerald-200', 'border-purple-200', 'border-pink-200',
      'border-rose-200', 'border-slate-200', 'border-orange-200', 'border-indigo-200', 'border-yellow-200', 'border-teal-200',
    ],
  theme: {
  	extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
        'lux-red': 'hsl(var(--lux-red))',
        'lux-blue': 'hsl(var(--lux-blue))',
        'lux-red-light': 'hsl(var(--lux-red-light))',
        'lux-blue-light': 'hsl(var(--lux-blue-light))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}