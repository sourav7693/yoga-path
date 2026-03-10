export default function AnimatedCTAButton() {
  return (
    <button className="relative px-10 py-4 rounded-xl 
    text-white font-semibold text-lg 
    overflow-hidden group">

      {/* Animated Gradient Background */}
      <span className="absolute inset-0 
      bg-[linear-gradient(270deg,#ff6a00,#ff0080,#7928ca,#00c6ff,#ff6a00)] 
      bg-[length:400%_400%] 
      animate-gradient 
      transition-all duration-500"></span>

      {/* Glow Shadow Layer */}
      <span className="absolute inset-0 rounded-xl 
      blur-xl opacity-70 
      bg-[linear-gradient(270deg,#ff6a00,#ff0080,#7928ca,#00c6ff,#ff6a00)] 
      bg-[length:400%_400%] 
      animate-gradient"></span>

      {/* Text */}
      <span className="relative z-10">
        BOOK YOUR SPOT NOW AT ₹99/-
      </span>
    </button>
  );
}