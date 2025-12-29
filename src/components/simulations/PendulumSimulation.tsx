import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

const PendulumSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [length, setLength] = useState(150);
  const [gravity, setGravity] = useState(9.8);
  const [damping, setDamping] = useState(0.995);
  const [time, setTime] = useState(0);
  const [initialAngle] = useState(30);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTime((t) => t + 0.05);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate period: T = 2π√(L/g)
  const period = 2 * Math.PI * Math.sqrt(length / 100 / gravity);
  
  // Damped oscillation
  const dampingFactor = Math.pow(damping, time * 20);
  const currentAngle = initialAngle * Math.cos((2 * Math.PI * time) / period) * dampingFactor;

  const handleReset = () => {
    setTime(0);
    setIsPlaying(true);
  };

  // Calculate pendulum position
  const pivotX = 200;
  const pivotY = 50;
  const bobX = pivotX + length * Math.sin((currentAngle * Math.PI) / 180);
  const bobY = pivotY + length * Math.cos((currentAngle * Math.PI) / 180);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Simulation Canvas */}
        <div className="aspect-square bg-muted/30 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Pivot */}
            <rect x="150" y="40" width="100" height="10" rx="5" className="fill-muted-foreground" />
            <circle cx={pivotX} cy={pivotY} r="8" className="fill-physics" />
            
            {/* String */}
            <line
              x1={pivotX}
              y1={pivotY}
              x2={bobX}
              y2={bobY}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
            />
            
            {/* Trail arc */}
            <path
              d={`M ${pivotX + length * Math.sin((-initialAngle * Math.PI) / 180)} ${pivotY + length * Math.cos((-initialAngle * Math.PI) / 180)} 
                  A ${length} ${length} 0 0 1 
                  ${pivotX + length * Math.sin((initialAngle * Math.PI) / 180)} ${pivotY + length * Math.cos((initialAngle * Math.PI) / 180)}`}
              fill="none"
              stroke="hsl(var(--physics) / 0.2)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Bob */}
            <circle
              cx={bobX}
              cy={bobY}
              r="25"
              className="fill-physics"
              style={{
                filter: "drop-shadow(0 0 15px hsl(var(--physics) / 0.6))",
              }}
            />
            
            {/* Angle indicator */}
            <line
              x1={pivotX}
              y1={pivotY}
              x2={pivotX}
              y2={pivotY + 60}
              stroke="hsl(var(--muted-foreground) / 0.5)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            
            {/* Info text */}
            <text x="200" y="380" textAnchor="middle" className="fill-foreground text-sm" style={{ fontFamily: "Cairo" }}>
              θ = {currentAngle.toFixed(1)}° | T = {period.toFixed(2)}s
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">التحكم بالمتغيرات</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>طول البندول</span>
                <span className="text-physics">{length} px</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(v) => setLength(v[0])}
                min={80}
                max={200}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>تسارع الجاذبية</span>
                <span className="text-physics">{gravity} m/s²</span>
              </div>
              <Slider
                value={[gravity]}
                onValueChange={(v) => setGravity(v[0])}
                min={1}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>معامل التخميد</span>
                <span className="text-physics">{damping}</span>
              </div>
              <Slider
                value={[damping * 1000]}
                onValueChange={(v) => setDamping(v[0] / 1000)}
                min={900}
                max={1000}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-physics/10 border border-physics/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-physics">المعادلات</h4>
            <div className="space-y-2 text-sm font-mono">
              <p>T = 2π√(L/g)</p>
              <p>θ(t) = θ₀ cos(ωt)</p>
              <p>ω = √(g/L)</p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex gap-3">
            <Button
              variant="physics"
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1"
            >
              {isPlaying ? <Pause className="w-5 h-5 ml-2" /> : <Play className="w-5 h-5 ml-2" />}
              {isPlaying ? "إيقاف" : "تشغيل"}
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumSimulation;
