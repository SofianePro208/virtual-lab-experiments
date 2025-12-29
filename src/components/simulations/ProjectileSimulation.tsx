import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Target } from "lucide-react";

const ProjectileSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(50);
  const [time, setTime] = useState(0);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [hasLanded, setHasLanded] = useState(false);

  const g = 9.8;
  const scale = 3;

  // Physics calculations
  const vx = velocity * Math.cos((angle * Math.PI) / 180);
  const vy = velocity * Math.sin((angle * Math.PI) / 180);
  const flightTime = (2 * vy) / g;
  const maxHeight = (vy * vy) / (2 * g);
  const range = vx * flightTime;

  // Current position
  const x = vx * time;
  const y = vy * time - 0.5 * g * time * time;

  useEffect(() => {
    if (!isPlaying || hasLanded) return;

    const interval = setInterval(() => {
      setTime((t) => {
        const newT = t + 0.05;
        const newY = vy * newT - 0.5 * g * newT * newT;
        
        if (newY <= 0 && newT > 0.1) {
          setHasLanded(true);
          setIsPlaying(false);
          return t;
        }

        setTrail((prev) => [...prev, { x: vx * newT * scale, y: 300 - newY * scale }]);
        return newT;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, hasLanded, vx, vy, g, scale]);

  const handleReset = () => {
    setTime(0);
    setTrail([]);
    setHasLanded(false);
    setIsPlaying(false);
  };

  const handleLaunch = () => {
    handleReset();
    setTimeout(() => setIsPlaying(true), 100);
  };

  const projectileX = 50 + x * scale;
  const projectileY = 300 - Math.max(0, y) * scale;

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Simulation Canvas */}
        <div className="aspect-video bg-gradient-to-b from-[hsl(var(--physics)/0.1)] to-muted/30 rounded-xl relative overflow-hidden">
          <svg viewBox="0 0 600 350" className="w-full h-full">
            {/* Ground */}
            <rect x="0" y="300" width="600" height="50" className="fill-muted" />
            <line x1="0" y1="300" x2="600" y2="300" stroke="hsl(var(--physics))" strokeWidth="2" />
            
            {/* Launch platform */}
            <rect x="30" y="280" width="40" height="20" className="fill-physics" rx="4" />
            
            {/* Angle indicator */}
            <line
              x1="50"
              y1="290"
              x2={50 + 60 * Math.cos((angle * Math.PI) / 180)}
              y2={290 - 60 * Math.sin((angle * Math.PI) / 180)}
              stroke="hsl(var(--energy))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Trail */}
            {trail.length > 1 && (
              <polyline
                points={trail.map((p) => `${50 + p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="hsl(var(--physics) / 0.5)"
                strokeWidth="2"
              />
            )}
            
            {/* Target area */}
            <circle cx={50 + range * scale} cy="300" r="15" className="fill-energy/30" />
            <Target x={50 + range * scale - 8} y="284" className="w-4 h-4 text-energy" />
            
            {/* Projectile */}
            <circle
              cx={projectileX}
              cy={projectileY}
              r="12"
              className="fill-physics"
              style={{
                filter: "drop-shadow(0 0 10px hsl(var(--physics) / 0.6))",
              }}
            />
            
            {/* Max height indicator */}
            <line
              x1="30"
              y1={300 - maxHeight * scale}
              x2="570"
              y2={300 - maxHeight * scale}
              stroke="hsl(var(--secondary) / 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <text x="560" y={295 - maxHeight * scale} className="fill-secondary text-xs" textAnchor="end">
              H = {maxHeight.toFixed(1)}m
            </text>
            
            {/* Range indicator */}
            <text x={50 + range * scale} y="325" className="fill-energy text-xs" textAnchor="middle">
              R = {range.toFixed(1)}m
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">التحكم بالمتغيرات</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>زاوية الإطلاق</span>
                <span className="text-physics">{angle}°</span>
              </div>
              <Slider
                value={[angle]}
                onValueChange={(v) => { setAngle(v[0]); handleReset(); }}
                min={10}
                max={80}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>السرعة الابتدائية</span>
                <span className="text-physics">{velocity} m/s</span>
              </div>
              <Slider
                value={[velocity]}
                onValueChange={(v) => { setVelocity(v[0]); handleReset(); }}
                min={20}
                max={80}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-physics/10 border border-physics/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-physics">{maxHeight.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">أقصى ارتفاع (م)</div>
            </div>
            <div className="bg-energy/10 border border-energy/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-energy">{range.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">المدى الأفقي (م)</div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{flightTime.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">زمن الطيران (ث)</div>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary">{time.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">الزمن الحالي (ث)</div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex gap-3">
            <Button
              variant="physics"
              size="lg"
              onClick={handleLaunch}
              className="flex-1"
              disabled={isPlaying}
            >
              <Play className="w-5 h-5 ml-2" />
              أطلق
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

export default ProjectileSimulation;
