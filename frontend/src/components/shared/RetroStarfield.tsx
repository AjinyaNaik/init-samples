import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  scale: number;
  delay: string;
}

export default function RetroStarfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate 50 stars at random pixel/grid locations
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100, // percentage top
      left: Math.random() * 100, // percentage left
      scale: Math.random() * 0.4 + 0.6, // random size variation (60% to 100%)
      delay: `${(Math.random() * 3).toFixed(1)}s`, // staggered start timings
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes pixel-blink {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
            background-color: #8b5cf6; /* Dim purple */
            box-shadow: none;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
            background-color: #d8b4fe; /* Bright neon purple core */
            box-shadow: 0 0 8px rgba(168, 85, 247, 0.7);
          }
        }
        .retro-star {
          position: absolute;
          width: 4px; /* Pixel-art style size */
          height: 4px;
          border-radius: 0px; /* Square "pixel" shape for retro game styling */
          animation: pixel-blink 3s infinite ease-in-out;
        }
      `}</style>
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="retro-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: star.delay,
            transform: `scale(${star.scale})`,
          }}
        />
      ))}
    </div>
  );
}