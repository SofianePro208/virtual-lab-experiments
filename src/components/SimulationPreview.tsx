import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const SimulationPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [pendulumAngle, setPendulumAngle] = useState(30);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTime((t) => t + 0.05);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simple harmonic motion
  const currentAngle = 30 * Math.cos(2 * time);

  const handleReset = () => {
    setTime(0);
    setIsPlaying(true);
  };

  return (
    <section id="physics" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-physics/10 border border-physics/30 mb-6">
              <span className="w-2 h-2 bg-physics rounded-full animate-pulse" />
              <span className="text-sm text-physics font-medium">معاينة حية</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              تجربة <span className="text-physics">البندول</span> البسيط
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              استكشف الحركة التوافقية البسيطة من خلال محاكاة تفاعلية. تحكم في طول البندول والزاوية الابتدائية وشاهد كيف تتغير الحركة.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-physics/10 border border-physics/30 flex items-center justify-center">
                  <span className="text-physics font-bold">1</span>
                </div>
                <span className="text-foreground">تعلم قوانين الحركة التوافقية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-physics/10 border border-physics/30 flex items-center justify-center">
                  <span className="text-physics font-bold">2</span>
                </div>
                <span className="text-foreground">تحكم في المتغيرات ولاحظ النتائج</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-physics/10 border border-physics/30 flex items-center justify-center">
                  <span className="text-physics font-bold">3</span>
                </div>
                <span className="text-foreground">اختبر فهمك بأسئلة تفاعلية</span>
              </div>
            </div>

            <Button variant="physics" size="xl">
              جرب التجربة الكاملة
            </Button>
          </div>

          {/* Simulation */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square max-w-lg mx-auto bg-card rounded-3xl border border-border overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-grid opacity-30" />
              
              {/* Pendulum SVG */}
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
              >
                {/* Pivot Point */}
                <circle cx="150" cy="50" r="8" className="fill-physics" />
                
                {/* String */}
                <line
                  x1="150"
                  y1="50"
                  x2={150 + 120 * Math.sin((currentAngle * Math.PI) / 180)}
                  y2={50 + 120 * Math.cos((currentAngle * Math.PI) / 180)}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="2"
                />
                
                {/* Bob */}
                <circle
                  cx={150 + 120 * Math.sin((currentAngle * Math.PI) / 180)}
                  cy={50 + 120 * Math.cos((currentAngle * Math.PI) / 180)}
                  r="20"
                  className="fill-physics"
                  style={{
                    filter: "drop-shadow(0 0 10px hsl(var(--physics) / 0.5))",
                  }}
                />
                
                {/* Trail Effect */}
                <path
                  d={`M ${150 + 120 * Math.sin((-30 * Math.PI) / 180)} ${50 + 120 * Math.cos((-30 * Math.PI) / 180)} 
                      Q 150 230 
                      ${150 + 120 * Math.sin((30 * Math.PI) / 180)} ${50 + 120 * Math.cos((30 * Math.PI) / 180)}`}
                  fill="none"
                  stroke="hsl(var(--physics) / 0.2)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                
                {/* Angle Arc */}
                <path
                  d={`M 150 100 A 50 50 0 0 ${currentAngle > 0 ? 1 : 0} ${150 + 50 * Math.sin((currentAngle * Math.PI) / 180)} ${50 + 50 * Math.cos((currentAngle * Math.PI) / 180)}`}
                  fill="none"
                  stroke="hsl(var(--energy))"
                  strokeWidth="2"
                />
                
                {/* Angle Label */}
                <text
                  x="150"
                  y="280"
                  textAnchor="middle"
                  className="fill-foreground text-sm"
                  style={{ fontFamily: "Cairo" }}
                >
                  θ = {currentAngle.toFixed(1)}°
                </text>
              </svg>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-physics/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationPreview;
