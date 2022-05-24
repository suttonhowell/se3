export const useThemeToggle = () => {
  const setUseSystemTheme = async () => {
    await window.darkMode.system();
  };

  const getThemeMode = async () => {
    const mode = await window.darkMode.get();
    return mode;
  };

  const toggleThemeMode = async () => {
    await window.darkMode.toggle();
  };

  return [setUseSystemTheme, getThemeMode, toggleThemeMode];
};
