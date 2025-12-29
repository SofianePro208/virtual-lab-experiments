import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus, Lightbulb, Battery } from "lucide-react";

interface Resistor {
  id: number;
  value: number;
  x: number;
  y: number;
}

const CircuitSimulation = () => {
  const [voltage, setVoltage] = useState(12);
  const [resistors, setResistors] = useState<Resistor[]>([
    { id: 1, value: 100, x: 200, y: 150 },
  ]);
  const [connectionType, setConnectionType] = useState<"series" | "parallel">("series");

  // Calculate total resistance
  const totalResistance = connectionType === "series"
    ? resistors.reduce((sum, r) => sum + r.value, 0)
    : 1 / resistors.reduce((sum, r) => sum + 1 / r.value, 0);

  // Calculate current using Ohm's law: I = V/R
  const current = voltage / totalResistance;
  
  // Calculate power: P = VI
  const power = voltage * current;

  // Light intensity based on current
  const lightIntensity = Math.min(1, current / 0.12);

  const addResistor = () => {
    if (resistors.length < 4) {
      setResistors([...resistors, { 
        id: Date.now(), 
        value: 100, 
        x: 200 + resistors.length * 80, 
        y: 150 
      }]);
    }
  };

  const removeResistor = () => {
    if (resistors.length > 1) {
      setResistors(resistors.slice(0, -1));
    }
  };

  const updateResistorValue = (id: number, value: number) => {
    setResistors(resistors.map(r => r.id === id ? { ...r, value } : r));
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Circuit Diagram */}
        <div className="aspect-square bg-muted/30 rounded-xl relative overflow-hidden">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Battery */}
            <g transform="translate(50, 180)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="hsl(var(--physics))" strokeWidth="4" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="hsl(var(--physics))" strokeWidth="4" />
              <line x1="-8" y1="40" x2="8" y2="40" stroke="hsl(var(--physics))" strokeWidth="4" />
              <text x="-30" y="25" className="fill-physics text-xs">+</text>
              <text x="-30" y="45" className="fill-physics text-xs">-</text>
              <text x="20" y="25" className="fill-foreground text-xs">{voltage}V</text>
            </g>

            {/* Wires */}
            <path
              d="M 50 180 L 50 100 L 350 100 L 350 180"
              fill="none"
              stroke="hsl(var(--physics))"
              strokeWidth="2"
            />
            <path
              d="M 50 220 L 50 300 L 350 300 L 350 220"
              fill="none"
              stroke="hsl(var(--physics))"
              strokeWidth="2"
            />

            {/* Resistors */}
            {connectionType === "series" ? (
              // Series connection
              resistors.map((resistor, index) => {
                const startX = 100 + index * (200 / resistors.length);
                const width = 150 / resistors.length;
                return (
                  <g key={resistor.id} transform={`translate(${startX}, 85)`}>
                    <rect x="0" y="0" width={width} height="30" rx="4" className="fill-energy/20 stroke-energy" strokeWidth="2" />
                    <text x={width/2} y="45" textAnchor="middle" className="fill-foreground text-xs">{resistor.value}Ω</text>
                  </g>
                );
              })
            ) : (
              // Parallel connection
              resistors.map((resistor, index) => {
                const yOffset = 120 + index * 50;
                return (
                  <g key={resistor.id}>
                    <line x1="150" y1="100" x2="150" y2={yOffset} stroke="hsl(var(--physics))" strokeWidth="2" />
                    <rect x="170" y={yOffset - 15} width="60" height="30" rx="4" className="fill-energy/20 stroke-energy" strokeWidth="2" />
                    <line x1="230" y1={yOffset} x2="250" y2={yOffset} stroke="hsl(var(--physics))" strokeWidth="2" />
                    <line x1="250" y1="100" x2="250" y2={yOffset} stroke="hsl(var(--physics))" strokeWidth="2" />
                    <text x="200" y={yOffset + 25} textAnchor="middle" className="fill-foreground text-xs">{resistor.value}Ω</text>
                  </g>
                );
              })
            )}

            {/* Light bulb */}
            <g transform="translate(320, 180)">
              <circle 
                cx="15" 
                cy="20" 
                r="25" 
                className="stroke-energy"
                strokeWidth="2"
                fill={`hsl(45 93% 58% / ${lightIntensity})`}
                style={{
                  filter: lightIntensity > 0.3 ? `drop-shadow(0 0 ${lightIntensity * 20}px hsl(var(--energy)))` : 'none',
                }}
              />
              <line x1="0" y1="20" x2="30" y2="20" stroke="hsl(var(--energy))" strokeWidth="2" />
              <Lightbulb x="5" y="10" className="w-5 h-5 text-energy" />
            </g>

            {/* Current flow arrows */}
            <polygon 
              points="200,95 210,100 200,105" 
              className="fill-physics animate-pulse" 
            />
            <polygon 
              points="200,295 190,300 200,305" 
              className="fill-physics animate-pulse" 
            />

            {/* Labels */}
            <text x="200" y="380" textAnchor="middle" className="fill-muted-foreground text-sm">
              I = {(current * 1000).toFixed(1)} mA
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Battery className="w-5 h-5 text-physics" />
              مصدر الجهد
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>الجهد الكهربائي</span>
                <span className="text-physics">{voltage} V</span>
              </div>
              <Slider
                value={[voltage]}
                onValueChange={(v) => setVoltage(v[0])}
                min={1}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">المقاومات</h3>
            
            {/* Connection Type */}
            <div className="flex gap-2">
              <Button
                variant={connectionType === "series" ? "physics" : "outline"}
                size="sm"
                onClick={() => setConnectionType("series")}
                className="flex-1"
              >
                توالي
              </Button>
              <Button
                variant={connectionType === "parallel" ? "physics" : "outline"}
                size="sm"
                onClick={() => setConnectionType("parallel")}
                className="flex-1"
              >
                توازي
              </Button>
            </div>

            {/* Resistor Controls */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={removeResistor} disabled={resistors.length <= 1}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="flex-1 text-center py-2">{resistors.length} مقاومة</span>
              <Button variant="outline" size="sm" onClick={addResistor} disabled={resistors.length >= 4}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Individual Resistor Values */}
            {resistors.map((resistor, index) => (
              <div key={resistor.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>R{index + 1}</span>
                  <span className="text-energy">{resistor.value} Ω</span>
                </div>
                <Slider
                  value={[resistor.value]}
                  onValueChange={(v) => updateResistorValue(resistor.id, v[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-physics/10 border border-physics/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-physics">{totalResistance.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">المقاومة الكلية (Ω)</div>
            </div>
            <div className="bg-energy/10 border border-energy/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-energy">{(current * 1000).toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">التيار (mA)</div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center col-span-2">
              <div className="text-2xl font-bold text-secondary">{(power * 1000).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">القدرة (mW)</div>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-physics/10 border border-physics/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-physics">قانون أوم</h4>
            <p className="font-mono text-center text-lg">V = I × R</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulation;
