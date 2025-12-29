import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

const WaveSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(50);
  const [wavelength, setWavelength] = useState(100);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTime((t) => t + 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Wave speed = frequency × wavelength
  const waveSpeed = frequency * wavelength;

  // Generate wave points
  const generateWavePoints = () => {
    const points: string[] = [];
    for (let x = 0; x <= 500; x += 2) {
      const y = 150 + amplitude * Math.sin((2 * Math.PI * x) / wavelength - frequency * time);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  // Generate particles for longitudinal wave
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      const baseX = 20 + i * 20;
      const displacement = 10 * Math.sin((2 * Math.PI * baseX) / wavelength - frequency * time);
      particles.push({ x: baseX + displacement, y: 150 });
    }
    return particles;
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wave Visualization */}
        <div className="space-y-4">
          {/* Transverse Wave */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-physics" />
              موجة مستعرضة
            </h4>
            <svg viewBox="0 0 500 200" className="w-full h-32">
              {/* Grid lines */}
              <line x1="0" y1="100" x2="500" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Amplitude markers */}
              <line x1="0" y1={100 - amplitude} x2="500" y2={100 - amplitude} stroke="hsl(var(--physics) / 0.3)" strokeDasharray="5,5" />
              <line x1="0" y1={100 + amplitude} x2="500" y2={100 + amplitude} stroke="hsl(var(--physics) / 0.3)" strokeDasharray="5,5" />
              
              {/* Wavelength marker */}
              <line x1="50" y1="30" x2={50 + wavelength} y2="30" stroke="hsl(var(--energy))" strokeWidth="2" />
              <line x1="50" y1="25" x2="50" y2="35" stroke="hsl(var(--energy))" strokeWidth="2" />
              <line x1={50 + wavelength} y1="25" x2={50 + wavelength} y2="35" stroke="hsl(var(--energy))" strokeWidth="2" />
              <text x={50 + wavelength / 2} y="20" textAnchor="middle" className="fill-energy text-xs">λ</text>
              
              {/* Wave */}
              <polyline
                points={generateWavePoints()}
                fill="none"
                stroke="hsl(var(--physics))"
                strokeWidth="3"
                style={{
                  filter: "drop-shadow(0 0 5px hsl(var(--physics) / 0.5))",
                }}
              />
              
              {/* Amplitude marker */}
              <line x1="20" y1="100" x2="20" y2={100 - amplitude} stroke="hsl(var(--secondary))" strokeWidth="2" />
              <text x="10" y={100 - amplitude / 2} className="fill-secondary text-xs">A</text>
            </svg>
          </div>

          {/* Longitudinal Wave */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="text-sm font-medium mb-2">موجة طولية (صوتية)</h4>
            <svg viewBox="0 0 500 100" className="w-full h-24">
              {/* Particles */}
              {generateParticles().map((particle, i) => (
                <circle
                  key={i}
                  cx={particle.x}
                  cy={50}
                  r="6"
                  className="fill-physics"
                  style={{
                    opacity: 0.5 + 0.5 * Math.abs(Math.sin((2 * Math.PI * (20 + i * 20)) / wavelength - frequency * time)),
                  }}
                />
              ))}
              
              {/* Compression/Rarefaction labels */}
              <text x="100" y="90" className="fill-muted-foreground text-xs" textAnchor="middle">انضغاط</text>
              <text x="200" y="90" className="fill-muted-foreground text-xs" textAnchor="middle">تخلخل</text>
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">خصائص الموجة</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التردد (f)</span>
                <span className="text-physics">{frequency} Hz</span>
              </div>
              <Slider
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
                min={0.5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>السعة (A)</span>
                <span className="text-secondary">{amplitude} px</span>
              </div>
              <Slider
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
                min={10}
                max={80}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>الطول الموجي (λ)</span>
                <span className="text-energy">{wavelength} px</span>
              </div>
              <Slider
                value={[wavelength]}
                onValueChange={(v) => setWavelength(v[0])}
                min={50}
                max={200}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Calculated Values */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-physics/10 border border-physics/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-physics">{waveSpeed.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">سرعة الموجة (v)</div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{(1 / frequency).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">الزمن الدوري (T)</div>
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-physics/10 border border-physics/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-physics">المعادلات</h4>
            <div className="space-y-1 text-sm font-mono text-center">
              <p>v = f × λ</p>
              <p>T = 1 / f</p>
              <p>y = A sin(kx - ωt)</p>
            </div>
          </div>

          {/* Playback Controls */}
          <Button
            variant="physics"
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full"
          >
            {isPlaying ? <Pause className="w-5 h-5 ml-2" /> : <Play className="w-5 h-5 ml-2" />}
            {isPlaying ? "إيقاف" : "تشغيل"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaveSimulation;
