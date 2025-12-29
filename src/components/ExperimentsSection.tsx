import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { experimentsData } from "@/data/experiments";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BarChart3, Atom, FlaskConical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ExperimentsSection = () => {
  const [filter, setFilter] = useState<"all" | "physics" | "chemistry">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "سهل" | "متوسط" | "صعب">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredExperiments = experimentsData.filter((exp) => {
    const categoryMatch = filter === "all" || exp.category === filter;
    const difficultyMatch = difficultyFilter === "all" || exp.difficulty === difficultyFilter;
    const searchMatch = exp.title.includes(searchQuery) || exp.description.includes(searchQuery);
    return categoryMatch && difficultyMatch && searchMatch;
  });

  const physicsCount = experimentsData.filter(e => e.category === "physics").length;
  const chemistryCount = experimentsData.filter(e => e.category === "chemistry").length;

  const difficultyColors: Record<string, string> = {
    سهل: "text-chemistry",
    متوسط: "text-energy",
    صعب: "text-destructive",
  };

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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            أكثر من {experimentsData.length} تجربة تفاعلية في الفيزياء والكيمياء
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-physics">{physicsCount}</div>
              <div className="text-sm text-muted-foreground">تجربة فيزياء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chemistry">{chemistryCount}</div>
              <div className="text-sm text-muted-foreground">تجربة كيمياء</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن تجربة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter("physics")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === "physics"
                  ? "bg-[hsl(var(--physics))] text-primary-foreground shadow-[0_0_20px_hsl(var(--physics)/0.4)]"
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
                  ? "bg-[hsl(var(--chemistry))] text-primary-foreground shadow-[0_0_20px_hsl(var(--chemistry)/0.4)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                الكيمياء
              </span>
            </button>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-sm text-muted-foreground ml-2">المستوى:</span>
          {["all", "سهل", "متوسط", "صعب"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(level as typeof difficultyFilter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                difficultyFilter === level
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {level === "all" ? "الكل" : level}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <span className="text-muted-foreground">
            عرض {filteredExperiments.length} تجربة
          </span>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiments.map((experiment, index) => {
            const categoryStyles = {
              physics: {
                border: "border-physics/30",
                bg: "bg-physics/10",
                text: "text-physics",
              },
              chemistry: {
                border: "border-chemistry/30",
                bg: "bg-chemistry/10",
                text: "text-chemistry",
              },
            };
            const styles = categoryStyles[experiment.category];

            return (
              <div
                key={experiment.id}
                className={`group relative rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm p-6 transition-all duration-500 hover:scale-[1.02] animate-fade-in cursor-pointer`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(`/experiment/${experiment.id}`)}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${styles.bg} border ${styles.border} flex items-center justify-center mb-4`}>
                  <div className={styles.text}>{experiment.icon}</div>
                </div>

                {/* Category Badge */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${styles.bg} border ${styles.border} mb-4`}>
                  <span className={`text-xs font-medium ${styles.text}`}>
                    {experiment.category === "physics" ? "فيزياء" : "كيمياء"}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {experiment.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {experiment.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{experiment.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className={difficultyColors[experiment.difficulty]}>{experiment.difficulty}</span>
                  </div>
                </div>

                {/* Button */}
                <Button 
                  variant={experiment.category === "physics" ? "physics" : "chemistry"} 
                  className="w-full group/btn"
                >
                  ابدأ التجربة
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
