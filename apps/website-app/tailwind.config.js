/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
	"./app/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
  	extend: {
		container: {
			center: true, // Optional: centers the container
			padding: '1rem', // Optional: adds default padding
			screens: {
				'xs': '33.75rem', 
				'sm': '100%',    
				'md': '45rem',     
				'lg': '60rem',     
				'xl': '71.25rem',  
				'2xl': '76.875rem' 
			},
      	},
		screens: {
			'xs': '33.75rem', 
        	'md': '48rem',     // 768px (48rem)
			'lg': '64rem',     // 1024px (64rem)
			'xl': '80rem',     // 1280px (80rem)
			'2xl': '96rem'     // 1536px (96rem)
      	},
		fontFamily: {
        	jost: ['Jost', 'sans-serif'],
      	},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		outline: {
              none:'0',
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			customPurple: '#821f40',
			footerSecondary:'#55585b',
			customBlue: '#0989ff',
			productBg:"#eff1f5",
			productText:"#55585B",
			black:"#010F1C",
			customLightBlue: 'rgba(9, 137, 255, 0.06)',
			'tp-text-body': 'var(--tp-text-body)',
			'tp-customBlue-primary':'var(--tp-customBlue-primary)',
			'tp-common-black':'var(--tp-common-black)',
			'tp-common-grey-border':'var(--tp-common-grey-border)',
			'tp-common-grey-background':'var(--tp-common-grey-background)',
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
