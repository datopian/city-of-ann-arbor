/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./themes/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  safelist: [
    "bg-red-500",
    "text-3xl",
    "lg:text-4xl",
    "bg-ann-arbor-groups-1",
    "bg-ann-arbor-groups-2",
    "bg-ann-arbor-groups-3",
    "bg-ann-arbor-groups-4",
    "bg-ann-arbor-groups-5",
    "bg-ann-arbor-groups-6",
    "bg-ann-arbor-groups-7",
    "bg-ann-arbor-groups-8",
  ],
  theme: {
  	extend: {
  		colors: {
  			'ann-arbor': {
  				'accent-green': '#079A6D',
  				'primary-blue': '#0787AD',
  				'primary-gray': '#534F5D',
  				groups: {
  					'1': '#D9EFD2',
  					'2': '#D9F4EA',
  					'3': '#E0EEE1',
  					'4': '#EDF6CC',
  					'5': '#D2EAEF',
  					'6': '#D7E6EE',
  					'7': '#E6F8EF',
  					'8': '#DAF3F0'
  				}
  			},
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			blogImg: 'inset 0 0 0 50vw rgba(0,28,49,0.76)'
  		},
  		gridTemplateRows: {
  			'7': 'repeat(7, minmax(0, 1fr))',
  			'8': 'repeat(8, minmax(0, 1fr))',
  			'9': 'repeat(9, minmax(0, 1fr))',
  			'10': 'repeat(10, minmax(0, 1fr))',
  			'searchpage-hero': '1fr 40px 40px auto',
  			'frontpage-hero': '1fr 40px 40px auto',
  			'datasetpage-hero': 'fit-content(100ch) 50px fit-content(100ch)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwindcss-animate")],
  plugins: [require("@tailwindcss/typography")],
};
