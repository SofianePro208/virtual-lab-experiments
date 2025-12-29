import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Beaker, Droplets } from "lucide-react";

const solutions = [
  { name: "حمض الهيدروكلوريك", pH: 1, color: "#ff4444" },
  { name: "عصير الليمون", pH: 2.5, color: "#ff6644" },
  { name: "الخل", pH: 3, color: "#ff8844" },
  { name: "عصير البرتقال", pH: 4, color: "#ffaa44" },
  { name: "القهوة", pH: 5, color: "#bb8844" },
  { name: "الحليب", pH: 6.5, color: "#88aa66" },
  { name: "الماء النقي", pH: 7, color: "#44bb88" },
  { name: "الدم", pH: 7.4, color: "#44bbaa" },
  { name: "ماء البحر", pH: 8, color: "#44aacc" },
  { name: "صابون اليد", pH: 9.5, color: "#4488dd" },
  { name: "الأمونيا", pH: 11, color: "#6666ee" },
  { name: "المبيض", pH: 12.5, color: "#8844ff" },
  { name: "هيدروكسيد الصوديوم", pH: 14, color: "#aa44ff" },
];

const PHSimulation = () => {
  const [selectedSolution, setSelectedSolution] = useState(6);
  const [customPH, setCustomPH] = useState(7);
  const [useCustom, setUseCustom] = useState(false);

  const currentPH = useCustom ? customPH : solutions[selectedSolution].pH;
  
  // Get color based on pH
  const getColor = (pH: number) => {
    if (pH < 3) return "#ff4444";
    if (pH < 5) return "#ff8844";
    if (pH < 6.5) return "#ddaa44";
    if (pH < 7.5) return "#44bb88";
    if (pH < 9) return "#44aacc";
    if (pH < 11) return "#4488dd";
    return "#8844ff";
  };

  const getAcidity = (pH: number) => {
    if (pH < 7) return { text: "حمضي", color: "destructive" };
    if (pH > 7) return { text: "قاعدي", color: "physics" };
    return { text: "متعادل", color: "chemistry" };
  };

  const acidity = getAcidity(currentPH);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* pH Scale Visualization */}
        <div className="space-y-6">
          {/* Beaker with solution */}
          <div className="aspect-video bg-muted/30 rounded-xl relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 250" className="w-full h-full">
              {/* Beaker */}
              <path
                d="M 120 50 L 120 200 Q 120 220 140 220 L 260 220 Q 280 220 280 200 L 280 50"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="3"
              />
              
              {/* Liquid */}
              <path
                d="M 123 80 L 123 197 Q 123 217 140 217 L 260 217 Q 277 217 277 197 L 277 80"
                fill={getColor(currentPH)}
                opacity="0.6"
              />
              
              {/* Bubbles */}
              <circle cx="150" cy="150" r="5" fill="white" opacity="0.3" />
              <circle cx="180" cy="180" r="3" fill="white" opacity="0.3" />
              <circle cx="230" cy="160" r="4" fill="white" opacity="0.3" />
              <circle cx="250" cy="140" r="3" fill="white" opacity="0.3" />
              
              {/* pH indicator strip */}
              <rect x="310" y="60" width="30" height="150" rx="5" fill={getColor(currentPH)} stroke="hsl(var(--border))" strokeWidth="2" />
              <text x="325" y="230" textAnchor="middle" className="fill-foreground text-sm">كاشف</text>
              
              {/* pH value */}
              <text x="200" y="150" textAnchor="middle" className="fill-white text-4xl font-bold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                {currentPH.toFixed(1)}
              </text>
            </svg>
          </div>

          {/* pH Scale */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="text-sm font-medium mb-3">مقياس pH</h4>
            <div className="relative h-8 rounded-full overflow-hidden" style={{
              background: "linear-gradient(to right, #ff4444, #ff8844, #ddaa44, #44bb88, #44aacc, #4488dd, #8844ff)"
            }}>
              {/* Indicator */}
              <div 
                className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-300"
                style={{ left: `${(currentPH / 14) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>0 (حمضي قوي)</span>
              <span>7 (متعادل)</span>
              <span>14 (قاعدي قوي)</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Solution Selector */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-chemistry" />
              اختر المحلول
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {solutions.map((solution, index) => (
                <Button
                  key={solution.name}
                  variant={!useCustom && selectedSolution === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setSelectedSolution(index); setUseCustom(false); }}
                  className="justify-start text-xs"
                >
                  <span 
                    className="w-3 h-3 rounded-full ml-2" 
                    style={{ backgroundColor: solution.color }}
                  />
                  {solution.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom pH Slider */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">قيمة pH مخصصة</h3>
              <Button
                variant={useCustom ? "default" : "outline"}
                size="sm"
                onClick={() => setUseCustom(true)}
              >
                تخصيص
              </Button>
            </div>
            
            {useCustom && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>pH</span>
                  <span className="font-bold">{customPH.toFixed(1)}</span>
                </div>
                <Slider
                  value={[customPH]}
                  onValueChange={(v) => setCustomPH(v[0])}
                  min={0}
                  max={14}
                  step={0.5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Result */}
          <div className={`bg-${acidity.color}/10 border border-${acidity.color}/30 rounded-xl p-6 text-center`}>
            <div className={`text-4xl font-bold text-${acidity.color} mb-2`}>
              {currentPH.toFixed(1)}
            </div>
            <div className={`text-xl font-medium text-${acidity.color}`}>
              {acidity.text}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {useCustom ? "قيمة مخصصة" : solutions[selectedSolution].name}
            </div>
          </div>

          {/* H+ concentration */}
          <div className="bg-chemistry/10 border border-chemistry/30 rounded-xl p-4">
            <h4 className="font-bold mb-2 text-chemistry">تركيز أيونات الهيدروجين</h4>
            <p className="font-mono text-center text-lg">
              [H⁺] = 10<sup>-{currentPH.toFixed(1)}</sup> M
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              = {Math.pow(10, -currentPH).toExponential(2)} mol/L
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHSimulation;
