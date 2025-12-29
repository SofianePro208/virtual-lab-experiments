import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FlaskConical, Droplets, Sparkles } from "lucide-react";

const ChemistryPreview = () => {
  const [isReacting, setIsReacting] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);

  const triggerReaction = () => {
    setIsReacting(true);
    // Generate random bubbles
    const newBubbles = Array.from({ length: 20 }, (_, i) => i);
    setBubbles(newBubbles);
    
    setTimeout(() => {
      setIsReacting(false);
      setBubbles([]);
    }, 3000);
  };

  return (
    <section id="chemistry" className="py-24 relative bg-gradient-to-b from-background via-chemistry/5 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Simulation */}
          <div>
            <div className="relative aspect-square max-w-lg mx-auto bg-card rounded-3xl border border-border overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-grid opacity-20" />
              
              {/* Flask SVG */}
              <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
                {/* Flask Shape */}
                <path
                  d="M 100 80 L 100 150 L 60 250 Q 55 270 75 275 L 225 275 Q 245 270 240 250 L 200 150 L 200 80"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                
                {/* Flask Neck */}
                <rect x="100" y="50" width="100" height="30" rx="5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                
                {/* Liquid */}
                <path
                  d="M 65 250 Q 62 260 78 265 L 222 265 Q 238 260 235 250 L 200 165 L 100 165 Z"
                  className={`transition-all duration-500 ${isReacting ? 'fill-chemistry' : 'fill-physics/50'}`}
                  style={{
                    filter: isReacting ? 'drop-shadow(0 0 20px hsl(var(--chemistry)))' : 'none',
                  }}
                />
                
                {/* Bubbles */}
                {isReacting && bubbles.map((_, i) => (
                  <circle
                    key={i}
                    cx={100 + Math.random() * 100}
                    cy={250}
                    r={3 + Math.random() * 5}
                    className="fill-foreground/30 animate-molecule"
                    style={{
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  />
                ))}
                
                {/* Droplet */}
                <g className={`transition-transform duration-500 ${isReacting ? 'translate-y-20 opacity-0' : ''}`}>
                  <ellipse cx="150" cy="100" rx="15" ry="20" className="fill-secondary/80" />
                  <ellipse cx="145" cy="95" rx="5" ry="7" className="fill-secondary-foreground/30" />
                </g>
                
                {/* Sparkles when reacting */}
                {isReacting && (
                  <>
                    <Sparkles x="130" y="180" className="w-6 h-6 text-energy animate-pulse" />
                    <Sparkles x="160" y="200" className="w-4 h-4 text-energy animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <Sparkles x="140" y="220" className="w-5 h-5 text-energy animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </>
                )}
              </svg>

              {/* Reaction Button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <Button
                  variant="chemistry"
                  size="lg"
                  onClick={triggerReaction}
                  disabled={isReacting}
                  className="gap-2"
                >
                  <Droplets className="w-4 h-4" />
                  {isReacting ? "جاري التفاعل..." : "أضف الكاشف"}
                </Button>
              </div>

              {/* Glow Effect */}
              <div className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${isReacting ? 'bg-chemistry/30' : 'bg-physics/10'}`} />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chemistry/10 border border-chemistry/30 mb-6">
              <FlaskConical className="w-4 h-4 text-chemistry" />
              <span className="text-sm text-chemistry font-medium">تجربة تفاعلية</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              اكتشف <span className="text-chemistry">التفاعلات</span> الكيميائية
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              شاهد التفاعلات الكيميائية تحدث أمام عينيك. أضف الكواشف، لاحظ التغيرات، وتعلم عن أنواع التفاعلات المختلفة.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-chemistry/10 border border-chemistry/30">
                <div className="text-2xl font-bold text-chemistry mb-1">15+</div>
                <div className="text-sm text-muted-foreground">تفاعل كيميائي</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">عنصر ومركب</div>
              </div>
              <div className="p-4 rounded-xl bg-energy/10 border border-energy/30">
                <div className="text-2xl font-bold text-energy mb-1">100%</div>
                <div className="text-sm text-muted-foreground">آمن ونظيف</div>
              </div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                <div className="text-2xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">إعادة التجربة</div>
              </div>
            </div>

            <Button variant="chemistry" size="xl">
              استكشف التجارب الكيميائية
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChemistryPreview;
