export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-6 w-full z-50">
      <nav className="flex gap-1 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#home" className="nav-item text-lg">Home</a>
        <a href="#projects" className="nav-item text-lg">Projects</a>
        <a href="#about" className="nav-item text-lg">About</a>
        <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 text-lg">Contact</a>
      </nav>
    </div>
  );
};
