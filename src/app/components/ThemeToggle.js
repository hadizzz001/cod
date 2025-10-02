'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { WiDaySunny } from 'react-icons/wi'; 
import { MdNightlightRound } from 'react-icons/md'; // cute moon icon

export default function ThemeToggle() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: theme === 'dark' ? '#4b5563' : '#fcd34d',
      }}
    >
      {theme === 'dark' ? (
        <WiDaySunny className="h-8 w-8 text-yellow-300" />
      ) : (
        <MdNightlightRound className="h-8 w-8 text-white-400" />
      )}
    </button>
  );
}
