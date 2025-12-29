import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FlaskConical, Droplets, Sparkles, RotateCcw } from "lucide-react";

const reactions = [
  {
    id: 1,
    name: "تفاعل حمض-قاعدة",
    reactant1: { name: "HCl", color: "destructive", label: "حمض الهيدروكلوريك" },
    reactant2: { name: "NaOH", color: "physics", label: "هيدروكسيد الصوديوم" },
    product: { name: "NaCl + H₂O", color: "chemistry", label: "ملح + ماء" },
    effect: "bubbles",
  },
  {
    id: 2,
    name: "تفاعل التعادل",
    reactant1: { name: "H₂SO₄", color: "energy", label: "حمض الكبريتيك" },
    reactant2: { name: "Ba(OH)₂", color: "secondary", label: "هيدروكسيد الباريوم" },
    product: { name: "BaSO₄ + H₂O", color: "muted", label: "راسب أبيض + ماء" },
    effect: "precipitate",
  },
  {
    id: 3,
    name: "تفاعل الاحتراق",
    reactant1: { name: "CH₄", color: "physics", label: "ميثان" },
    reactant2: { name: "O₂", color: "destructive", label: "أكسجين" },
    product: { name: "CO₂ + H₂O", color: "energy", label: "ثاني أكسيد الكربون + ماء" },
    effect: "fire",
  },
];

const ChemicalReactionSimulation = () => {
  const [selectedReaction, setSelectedReaction] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [particles, setParticles] = useState<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const reaction = reactions[selectedReaction];

  useEffect(() => {
    if (!isReacting) return;

    const interval = setInterval(() => {
      setReactionProgress((p) => {
        if (p >= 100) {
          setIsReacting(false);
          return 100;
        }
        return p + 2;
      });

      // Add particles
      if (reactionProgress < 80) {
        setParticles((prev) => [
          ...prev.slice(-30),
          {
            x: 150 + Math.random() * 100,
            y: 200 + Math.random() * 50,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3 - 1,
          },
        ]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isReacting, reactionProgress]);

  // Update particle positions
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
          }))
          .filter((p) => p.y < 350)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particles.length]);

  const startReaction = () => {
    setIsReacting(true);
    setReactionProgress(0);
    setParticles([]);
  };

  const resetReaction = () => {
    setIsReacting(false);
    setReactionProgress(0);
    setParticles([]);
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Simulation */}
        <div className="aspect-square bg-gradient-to-b from-muted/30 to-muted/10 rounded-xl relative overflow-hidden">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Beaker */}
            <path
              d="M 100 100 L 100 300 Q 100 350 150 350 L 250 350 Q 300 350 300 300 L 300 100"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="3"
            />
            
            {/* Liquid in beaker */}
            <path
              d={`M 103 ${300 - reactionProgress} L 103 297 Q 103 347 150 347 L 250 347 Q 297 347 297 297 L 297 ${300 - reactionProgress}`}
              className={reactionProgress > 50 ? `fill-${reaction.product.color}/50` : `fill-${reaction.reactant1.color}/30`}
            />
            
            {/* Dropper */}
            <g 
              transform={`translate(200, ${isReacting ? 120 : 80})`}
              className="transition-transform duration-500"
            >
              <rect x="-15" y="0" width="30" height="60" rx="5" className="fill-muted stroke-border" strokeWidth="2" />
              <ellipse cx="0" cy="60" rx="8" ry="10" className={`fill-${reaction.reactant2.color}`} />
              
              {/* Drops falling */}
              {isReacting && reactionProgress < 70 && (
                <>
                  <circle cy={70 + (reactionProgress % 30) * 3} r="5" className={`fill-${reaction.reactant2.color}`} />
                </>
              )}
            </g>
            
            {/* Reaction effects */}
            {isReacting && (
              <>
                {/* Bubbles */}
                {particles.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={3 + Math.random() * 3}
                    className={`fill-${reaction.product.color}/50`}
                  />
                ))}
                
                {/* Sparkles */}
                {reaction.effect === "fire" && reactionProgress > 30 && (
                  <>
                    <Sparkles x="170" y="180" className="w-8 h-8 text-energy animate-pulse" />
                    <Sparkles x="210" y="200" className="w-6 h-6 text-destructive animate-pulse" />
                  </>
                )}
              </>
            )}
            
            {/* Labels */}
            <text x="200" y="380" textAnchor="middle" className="fill-foreground text-sm font-bold">
              {reactionProgress === 100 ? reaction.product.name : `${reaction.reactant1.name} + ${reaction.reactant2.name}`}
            </text>
          </svg>

          {/* Progress bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-chemistry transition-all duration-100"
                style={{ width: `${reactionProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Reaction Selector */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-chemistry" />
              اختر التفاعل
            </h3>
            <div className="space-y-2">
              {reactions.map((r, index) => (
                <Button
                  key={r.id}
                  variant={selectedReaction === index ? "chemistry" : "outline"}
                  size="sm"
                  onClick={() => { setSelectedReaction(index); resetReaction(); }}
                  className="w-full justify-start"
                >
                  {r.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Reaction Info */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">المعادلة الكيميائية</h3>
            
            <div className="flex items-center justify-center gap-2 p-4 bg-card rounded-lg">
              <span className={`px-3 py-1 rounded-lg bg-${reaction.reactant1.color}/20 text-${reaction.reactant1.color} font-mono font-bold`}>
                {reaction.reactant1.name}
              </span>
              <span className="text-xl">+</span>
              <span className={`px-3 py-1 rounded-lg bg-${reaction.reactant2.color}/20 text-${reaction.reactant2.color} font-mono font-bold`}>
                {reaction.reactant2.name}
              </span>
              <span className="text-xl">→</span>
              <span className={`px-3 py-1 rounded-lg bg-${reaction.product.color}/20 text-${reaction.product.color} font-mono font-bold`}>
                {reaction.product.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">المتفاعل 1:</span>
                <p className="font-medium">{reaction.reactant1.label}</p>
              </div>
              <div>
                <span className="text-muted-foreground">المتفاعل 2:</span>
                <p className="font-medium">{reaction.reactant2.label}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">الناتج:</span>
                <p className="font-medium">{reaction.product.label}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="chemistry"
              size="lg"
              onClick={startReaction}
              disabled={isReacting}
              className="flex-1"
            >
              <Droplets className="w-5 h-5 ml-2" />
              {isReacting ? "جاري التفاعل..." : "ابدأ التفاعل"}
            </Button>
            <Button variant="outline" size="lg" onClick={resetReaction}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

          {/* Result */}
          {reactionProgress === 100 && (
            <div className="bg-chemistry/10 border border-chemistry/30 rounded-xl p-4 text-center animate-fade-in">
              <Sparkles className="w-8 h-8 text-chemistry mx-auto mb-2" />
              <p className="font-bold text-chemistry">اكتمل التفاعل!</p>
              <p className="text-sm text-muted-foreground">{reaction.product.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemicalReactionSimulation;
