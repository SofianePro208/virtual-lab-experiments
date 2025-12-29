import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const elements = [
  { symbol: "H", name: "هيدروجين", protons: 1, neutrons: 0, electrons: 1, color: "physics" },
  { symbol: "He", name: "هيليوم", protons: 2, neutrons: 2, electrons: 2, color: "energy" },
  { symbol: "Li", name: "ليثيوم", protons: 3, neutrons: 4, electrons: 3, color: "secondary" },
  { symbol: "C", name: "كربون", protons: 6, neutrons: 6, electrons: 6, color: "chemistry" },
  { symbol: "N", name: "نيتروجين", protons: 7, neutrons: 7, electrons: 7, color: "physics" },
  { symbol: "O", name: "أكسجين", protons: 8, neutrons: 8, electrons: 8, color: "destructive" },
  { symbol: "Na", name: "صوديوم", protons: 11, neutrons: 12, electrons: 11, color: "energy" },
  { symbol: "Cl", name: "كلور", protons: 17, neutrons: 18, electrons: 17, color: "chemistry" },
];

const AtomSimulation = () => {
  const [selectedElement, setSelectedElement] = useState(0);
  const [time, setTime] = useState(0);
  const [showLabels, setShowLabels] = useState(true);

  const element = elements[selectedElement];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Calculate electron shell configuration
  const getElectronShells = (electrons: number) => {
    const shells: number[] = [];
    let remaining = electrons;
    const maxPerShell = [2, 8, 18, 32];
    
    for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
      const inShell = Math.min(remaining, maxPerShell[i]);
      shells.push(inShell);
      remaining -= inShell;
    }
    return shells;
  };

  const shells = getElectronShells(element.electrons);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Atom Visualization */}
        <div className="aspect-square bg-gradient-to-br from-muted/30 to-background rounded-xl relative overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
            {/* Electron orbits */}
            {shells.map((_, shellIndex) => (
              <circle
                key={shellIndex}
                cx="200"
                cy="200"
                r={60 + shellIndex * 50}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}

            {/* Nucleus glow */}
            <circle
              cx="200"
              cy="200"
              r="40"
              className="fill-destructive/20"
              style={{ filter: "blur(10px)" }}
            />

            {/* Nucleus */}
            <circle
              cx="200"
              cy="200"
              r="25"
              className="fill-destructive"
              style={{ filter: "drop-shadow(0 0 10px hsl(var(--destructive) / 0.6))" }}
            />

            {/* Protons and Neutrons in nucleus */}
            {Array.from({ length: Math.min(element.protons, 6) }).map((_, i) => {
              const angle = (i / Math.min(element.protons, 6)) * Math.PI * 2;
              const r = 10;
              return (
                <circle
                  key={`p-${i}`}
                  cx={200 + r * Math.cos(angle)}
                  cy={200 + r * Math.sin(angle)}
                  r="5"
                  className="fill-destructive"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
              );
            })}

            {/* Electrons */}
            {shells.map((electronCount, shellIndex) => (
              Array.from({ length: electronCount }).map((_, electronIndex) => {
                const orbitRadius = 60 + shellIndex * 50;
                const baseAngle = (electronIndex / electronCount) * Math.PI * 2;
                const speed = 1 / (shellIndex + 1);
                const angle = baseAngle + time * speed;
                const x = 200 + orbitRadius * Math.cos(angle);
                const y = 200 + orbitRadius * Math.sin(angle);

                return (
                  <g key={`e-${shellIndex}-${electronIndex}`}>
                    {/* Electron trail */}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      className="fill-physics/20"
                      style={{ filter: "blur(5px)" }}
                    />
                    {/* Electron */}
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      className="fill-physics"
                      style={{ filter: "drop-shadow(0 0 5px hsl(var(--physics)))" }}
                    />
                  </g>
                );
              })
            ))}

            {/* Labels */}
            {showLabels && (
              <>
                <text x="200" y="205" textAnchor="middle" className="fill-destructive-foreground text-xs font-bold">
                  {element.symbol}
                </text>
                <text x="200" y="380" textAnchor="middle" className="fill-foreground text-sm font-bold">
                  {element.name}
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Controls & Info */}
        <div className="space-y-6">
          {/* Element Selector */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-4">اختر العنصر</h3>
            <div className="grid grid-cols-4 gap-2">
              {elements.map((el, index) => (
                <Button
                  key={el.symbol}
                  variant={selectedElement === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedElement(index)}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="text-lg font-bold">{el.symbol}</span>
                  <span className="text-xs opacity-70">{el.protons}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Element Info */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">معلومات العنصر</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-destructive">{element.protons}</div>
                <div className="text-xs text-muted-foreground">بروتونات</div>
              </div>
              <div className="bg-muted border border-border rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{element.neutrons}</div>
                <div className="text-xs text-muted-foreground">نيوترونات</div>
              </div>
              <div className="bg-physics/10 border border-physics/30 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-physics">{element.electrons}</div>
                <div className="text-xs text-muted-foreground">إلكترونات</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>العدد الذري (Z)</span>
                <span className="text-primary font-bold">{element.protons}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>العدد الكتلي (A)</span>
                <span className="text-primary font-bold">{element.protons + element.neutrons}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>التوزيع الإلكتروني</span>
                <span className="text-physics font-bold font-mono">
                  {shells.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Theory */}
          <div className="bg-chemistry/10 border border-chemistry/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-chemistry">نموذج بور للذرة</h4>
            <p className="text-sm text-muted-foreground">
              الإلكترونات تدور حول النواة في مدارات محددة. كل مدار يتسع لعدد محدد من الإلكترونات: K=2, L=8, M=18
            </p>
          </div>

          {/* Toggle Labels */}
          <Button
            variant="outline"
            onClick={() => setShowLabels(!showLabels)}
            className="w-full"
          >
            {showLabels ? "إخفاء التسميات" : "إظهار التسميات"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AtomSimulation;
