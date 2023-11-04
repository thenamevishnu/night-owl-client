/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          colors:{
              primary: "#fff",
          },
          keyframes:{
            floatingAnim:{
                  "0%": {
                      transform: "translate(0%, 0%)"
                  },
                  "25%": {
                      transform: "translate(0%, -3%)"
                  },
                  "50%": {
                      transform: "translate(0%, 0%)"
                  },
                  "75%": {
                      transform: "translate(0%, 3%)"
                  },
                  "100%": {
                      transform: "translate(0%, 0%)"
                  },
              }
          },
          animation:{
              floating: "floatingAnim 10s linear infinite"
          },
          backgroundImage:{
              main: "linear-gradient(to right, #efefbb, #d4d3dd)"
          },
          fontFamily:{
              primary: ["Bookman Old Style"]
          }
      },
    },
    plugins: [],
}

