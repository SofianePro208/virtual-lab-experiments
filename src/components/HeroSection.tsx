import { Button } from "@/components/ui/button";
import { Atom, Zap, FlaskConical } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="w-16 h-16 rounded-full bg-physics/20 backdrop-blur-sm border border-physics/30 flex items-center justify-center">
          <Atom className="w-8 h-8 text-physics" />
        </div>
      </div>
      
      <div className="absolute top-48 left-32 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="w-14 h-14 rounded-full bg-chemistry/20 backdrop-blur-sm border border-chemistry/30 flex items-center justify-center">
          <FlaskConical className="w-7 h-7 text-chemistry" />
        </div>
      </div>
      
      <div className="absolute bottom-32 right-32 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-12 h-12 rounded-full bg-energy/20 backdrop-blur-sm border border-energy/30 flex items-center justify-center">
          <Zap className="w-6 h-6 text-energy" />
        </div>
      </div>

      {/* Orbiting Particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
        <div className="absolute w-4 h-4 bg-primary rounded-full animate-orbit opacity-60" />
        <div className="absolute w-3 h-3 bg-secondary rounded-full animate-orbit opacity-60" style={{ animationDelay: "-3s", animationDuration: "8s" }} />
        <div className="absolute w-2 h-2 bg-energy rounded-full animate-orbit opacity-60" style={{ animationDelay: "-6s", animationDuration: "12s" }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">منصة تعليمية تفاعلية</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            اكتشف عالم
            <span className="text-gradient"> العلوم </span>
            <br />
            بطريقة تفاعلية
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            محاكاة تجارب الفيزياء والكيمياء بتقنيات متقدمة. تعلم، جرب، واكتشف القوانين العلمية بنفسك
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button variant="hero" size="xl">
              <Atom className="w-5 h-5" />
              استكشف التجارب
            </Button>
            <Button variant="outline" size="xl">
              شاهد الفيديو التعريفي
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground mt-1">تجربة تفاعلية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">مستخدم نشط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-energy">100%</div>
              <div className="text-sm text-muted-foreground mt-1">تفاعلي</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
