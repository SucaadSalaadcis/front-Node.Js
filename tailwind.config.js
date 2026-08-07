module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/Layouts/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1D3E73',
          yellow: '#FDC040',
          heading: '#1B1B1B',
          muted: '#7E7E7E',
        }
      }
    },
  },
  plugins: [],
}
