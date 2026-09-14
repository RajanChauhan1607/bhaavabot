module.exports = {
  // NOTE: Update this to include any files that contain Tailwind class names
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["System"],
      },
      colors: {
        primary: '#2D3E24',
        accent: '#EE7960',
        background: '#FBF8F1',
      },
    },
  },
  plugins: [],
}
