function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
      title={darkMode ? 'Светлая тема' : 'Тёмная тема'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;