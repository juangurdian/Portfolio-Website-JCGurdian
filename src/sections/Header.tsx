import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-6 w-full z-50">
      <nav className="flex items-center gap-3 px-4 py-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#home" className="nav-item text-lg">Home</a>
        <a href="#projects" className="nav-item text-lg">Projects</a>
        <a href="#about" className="nav-item text-lg">About</a>
        <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 text-lg">Contact</a>
        <a 
          href="https://github.com/juangurdian" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors p-1"
        >
          <FaGithub className="text-white text-xl w-full h-full" />
        </a>
        <a 
          href="https://linkedin.com/in/juan-gurdian" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors p-1"
        >
          <FaLinkedin className="text-white text-xl w-full h-full" />
        </a>
      </nav>
    </div>
  );
};
