import { Atom, Zap, GraduationCap, Play, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: <Play className="w-6 h-6" />,
    title: "محاكاة تفاعلية",
    description: "تجارب افتراضية بتقنيات متقدمة تحاكي الواقع بدقة عالية",
    color: "primary",
  },
  {
    icon: <Atom className="w-6 h-6" />,
    title: "فيزياء شاملة",
    description: "تغطية كاملة لمواضيع الفيزياء من الميكانيكا إلى الفيزياء الحديثة",
    color: "physics",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "تجارب فورية",
    description: "ابدأ التجربة فوراً بدون تحميل أو تثبيت أي برامج",
    color: "energy",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "محتوى تعليمي",
    description: "شروحات مفصلة وأسئلة تقييمية لكل تجربة",
    color: "secondary",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "تتبع التقدم",
    description: "راقب تقدمك وإنجازاتك في كل مجال علمي",
    color: "chemistry",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "تعلم جماعي",
    description: "شارك التجارب مع زملائك وتعلموا معاً",
    color: "primary",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/30" },
  physics: { bg: "bg-physics/10", text: "text-physics", border: "border-physics/30" },
  chemistry: { bg: "bg-chemistry/10", text: "text-chemistry", border: "border-chemistry/30" },
  energy: { bg: "bg-energy/10", text: "text-energy", border: "border-energy/30" },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            لماذا <span className="text-gradient">مختبر العلوم</span>؟
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            منصة متكاملة تجمع بين التعليم والمتعة في تجربة علمية فريدة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <div className={colors.text}>{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-${feature.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
