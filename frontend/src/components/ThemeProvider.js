import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();
function ThemeProvider(props) {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const setThemeMode = (mode) => setTheme(mode);
  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { createContext, ThemeProvider };
