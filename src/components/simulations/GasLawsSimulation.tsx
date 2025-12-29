import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Thermometer } from "lucide-react";

const GasLawsSimulation = () => {
  const [pressure, setPressure] = useState(1);
  const [volume, setVolume] = useState(22.4);
  const [temperature, setTemperature] = useState(273);
  const [moles, setMoles] = useState(1);
  const [lockedVariable, setLockedVariable] = useState<"P" | "V" | "T" | "n">("n");
  const [isAnimating, setIsAnimating] = useState(true);
  const [particlePositions, setParticlePositions] = useState<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const R = 8.314; // Gas constant J/(mol·K)

  // Initialize particles
  useEffect(() => {
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));
    setParticlePositions(particles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setParticlePositions((prev) =>
        prev.map((p) => {
          let newX = p.x + p.vx * (temperature / 273);
          let newY = p.y + p.vy * (temperature / 273);
          let newVx = p.vx;
          let newVy = p.vy;

          // Bounce off walls based on volume
          const maxSize = 50 + volume * 3;
          if (newX < 0 || newX > maxSize) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(maxSize, newX));
          }
          if (newY < 0 || newY > maxSize) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(maxSize, newY));
          }

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating, volume, temperature]);

  // Calculate the fourth variable using ideal gas law: PV = nRT
  const calculateMissing = () => {
    switch (lockedVariable) {
      case "P":
        return (moles * R * temperature) / (volume * 1000);
      case "V":
        return (moles * R * temperature) / (pressure * 1000);
      case "T":
        return (pressure * volume * 1000) / (moles * R);
      case "n":
        return (pressure * volume * 1000) / (R * temperature);
      default:
        return 0;
    }
  };

  const containerSize = 50 + volume * 3;

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gas Container Visualization */}
        <div className="aspect-square bg-gradient-to-br from-physics/10 to-muted/30 rounded-xl relative overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* Container */}
            <rect
              x={(300 - containerSize) / 2}
              y={(300 - containerSize) / 2}
              width={containerSize}
              height={containerSize}
              className="fill-physics/10 stroke-physics"
              strokeWidth="3"
              rx="10"
            />

            {/* Piston (top) */}
            <rect
              x={(300 - containerSize) / 2 - 10}
              y={(300 - containerSize) / 2 - 20}
              width={containerSize + 20}
              height="20"
              className="fill-muted-foreground"
              rx="5"
            />
            <rect
              x="145"
              y={(300 - containerSize) / 2 - 60}
              width="10"
              height="40"
              className="fill-muted-foreground"
            />

            {/* Pressure arrows */}
            {Array.from({ length: Math.min(5, Math.floor(pressure * 2)) }).map((_, i) => (
              <polygon
                key={i}
                points={`${140 + i * 10},${(300 - containerSize) / 2 - 25} ${145 + i * 10},${(300 - containerSize) / 2 - 35} ${150 + i * 10},${(300 - containerSize) / 2 - 25}`}
                className="fill-energy"
              />
            ))}

            {/* Gas particles */}
            {particlePositions.map((p, i) => (
              <circle
                key={i}
                cx={(300 - containerSize) / 2 + (p.x / 200) * containerSize}
                cy={(300 - containerSize) / 2 + (p.y / 200) * containerSize}
                r={4 + (temperature - 200) / 100}
                className="fill-physics"
                style={{
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}

            {/* Temperature indicator */}
            <g transform="translate(260, 150)">
              <rect x="-5" y="-50" width="10" height="100" rx="5" className="fill-muted" />
              <rect
                x="-3"
                y={50 - (temperature / 500) * 100}
                width="6"
                height={(temperature / 500) * 100}
                rx="3"
                className="fill-destructive"
              />
              <Thermometer x="-12" y="55" className="w-6 h-6 text-destructive" />
            </g>

            {/* Labels */}
            <text x="150" y="290" textAnchor="middle" className="fill-foreground text-sm">
              V = {volume.toFixed(1)} L | P = {pressure.toFixed(2)} atm
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Variable Controls */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">المتغيرات</h3>

            {/* Pressure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  الضغط (P)
                  {lockedVariable === "P" && <span className="text-xs text-physics">(محسوب)</span>}
                </span>
                <span className="text-physics font-bold">
                  {lockedVariable === "P" ? calculateMissing().toFixed(2) : pressure.toFixed(2)} atm
                </span>
              </div>
              <Slider
                value={[pressure]}
                onValueChange={(v) => setPressure(v[0])}
                min={0.5}
                max={5}
                step={0.1}
                disabled={lockedVariable === "P"}
                className="w-full"
              />
            </div>

            {/* Volume */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  الحجم (V)
                  {lockedVariable === "V" && <span className="text-xs text-physics">(محسوب)</span>}
                </span>
                <span className="text-secondary font-bold">
                  {lockedVariable === "V" ? calculateMissing().toFixed(1) : volume.toFixed(1)} L
                </span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                min={5}
                max={50}
                step={1}
                disabled={lockedVariable === "V"}
                className="w-full"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  درجة الحرارة (T)
                  {lockedVariable === "T" && <span className="text-xs text-physics">(محسوب)</span>}
                </span>
                <span className="text-destructive font-bold">
                  {lockedVariable === "T" ? calculateMissing().toFixed(0) : temperature} K
                </span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(v) => setTemperature(v[0])}
                min={200}
                max={500}
                step={10}
                disabled={lockedVariable === "T"}
                className="w-full"
              />
            </div>

            {/* Moles */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  عدد المولات (n)
                  {lockedVariable === "n" && <span className="text-xs text-physics">(محسوب)</span>}
                </span>
                <span className="text-energy font-bold">
                  {lockedVariable === "n" ? calculateMissing().toFixed(2) : moles.toFixed(2)} mol
                </span>
              </div>
              <Slider
                value={[moles]}
                onValueChange={(v) => setMoles(v[0])}
                min={0.5}
                max={3}
                step={0.1}
                disabled={lockedVariable === "n"}
                className="w-full"
              />
            </div>
          </div>

          {/* Lock Variable Selector */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-medium mb-3">احسب تلقائياً:</h4>
            <div className="grid grid-cols-4 gap-2">
              {(["P", "V", "T", "n"] as const).map((v) => (
                <Button
                  key={v}
                  variant={lockedVariable === v ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLockedVariable(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          {/* Formula */}
          <div className="bg-physics/10 border border-physics/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-physics">قانون الغاز المثالي</h4>
            <p className="font-mono text-center text-2xl">PV = nRT</p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              R = 8.314 J/(mol·K)
            </p>
          </div>

          {/* Playback */}
          <Button
            variant="physics"
            size="lg"
            onClick={() => setIsAnimating(!isAnimating)}
            className="w-full"
          >
            {isAnimating ? <Pause className="w-5 h-5 ml-2" /> : <Play className="w-5 h-5 ml-2" />}
            {isAnimating ? "إيقاف الحركة" : "تشغيل الحركة"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GasLawsSimulation;
