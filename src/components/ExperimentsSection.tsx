import { useState } from "react";
import ExperimentCard from "./ExperimentCard";
import { Atom, Beaker, Zap, Waves, FlaskConical, Magnet, Flame, TestTube } from "lucide-react";

const experiments = [
  {
    id: 1,
    title: "حركة البندول البسيط",
    description: "استكشف قوانين الحركة التوافقية البسيطة من خلال محاكاة البندول وتأثير الطول والكتلة",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Waves className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "الدوائر الكهربائية",
    description: "قم ببناء دوائر كهربائية ودراسة قانون أوم والمقاومات المتوالية والمتوازية",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "التفاعلات الكيميائية",
    description: "شاهد التفاعلات الكيميائية المختلفة وتعرف على أنواعها ونواتجها",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "10 دقائق",
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "المجال المغناطيسي",
    description: "اكتشف خصائص المجال المغناطيسي وتأثيره على الشحنات المتحركة",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "25 دقيقة",
    icon: <Magnet className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "معايرة الأحماض والقواعد",
    description: "تعلم كيفية معايرة المحاليل وحساب تركيز الأحماض والقواعد",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Beaker className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "بنية الذرة",
    description: "استكشف تركيب الذرة والإلكترونات والبروتونات والنيوترونات",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Atom className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "الاحتراق والتأكسد",
    description: "دراسة تفاعلات الاحتراق وفهم عمليات الأكسدة والاختزال",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "18 دقيقة",
    icon: <Flame className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "المحاليل والذوبان",
    description: "تعلم عن خصائص المحاليل وعوامل الذوبان والتركيز",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "12 دقيقة",
    icon: <TestTube className="w-6 h-6" />,
  },
];

const ExperimentsSection = () => {
  const [filter, setFilter] = useState<"all" | "physics" | "chemistry">("all");

  const filteredExperiments = experiments.filter(
    (exp) => filter === "all" || exp.category === filter
  );

  return (
    <section id="experiments" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            استكشف <span className="text-gradient">التجارب</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            مجموعة متنوعة من التجارب التفاعلية في الفيزياء والكيمياء
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter("physics")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === "physics"
                ? "bg-physics text-primary-foreground glow-physics"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              الفيزياء
            </span>
          </button>
          <button
            onClick={() => setFilter("chemistry")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              filter === "chemistry"
                ? "bg-chemistry text-primary-foreground glow-chemistry"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              الكيمياء
            </span>
          </button>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.id}
              {...experiment}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
