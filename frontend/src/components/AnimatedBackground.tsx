const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      {/* Futuristic grid with neon glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Neon orbs with enhanced glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-[140px] animate-pulse-neon" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-[140px] animate-pulse-neon" 
        style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-accent/25 to-primary/25 rounded-full blur-[120px] animate-pulse-neon" 
        style={{ animationDelay: '2s' }} />
      
      {/* Floating glowing orbs */}
      <div className="absolute top-0 left-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-[160px] animate-float" />
      <div className="absolute bottom-0 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-[150px] animate-float" 
        style={{ animationDelay: '3s' }} />
      
      {/* Glowing particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            backgroundColor: i % 3 === 0 
              ? 'hsl(var(--primary))' 
              : i % 3 === 1 
                ? 'hsl(var(--secondary))' 
                : 'hsl(var(--accent))',
            opacity: 0.4,
            boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
          }}
        />
      ))}
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,hsl(var(--primary)/0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
