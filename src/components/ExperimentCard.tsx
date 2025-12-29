import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BarChart3 } from "lucide-react";

interface ExperimentCardProps {
  title: string;
  description: string;
  category: "physics" | "chemistry";
  difficulty: "سهل" | "متوسط" | "صعب";
  duration: string;
  icon: React.ReactNode;
  delay?: number;
}

const ExperimentCard = ({
  title,
  description,
  category,
  difficulty,
  duration,
  icon,
  delay = 0,
}: ExperimentCardProps) => {
  const categoryStyles = {
    physics: {
      border: "border-physics/30",
      bg: "bg-physics/10",
      text: "text-physics",
      glow: "hover:glow-physics",
      button: "physics" as const,
    },
    chemistry: {
      border: "border-chemistry/30",
      bg: "bg-chemistry/10",
      text: "text-chemistry",
      glow: "hover:glow-chemistry",
      button: "chemistry" as const,
    },
  };

  const difficultyColors = {
    سهل: "text-chemistry",
    متوسط: "text-energy",
    صعب: "text-destructive",
  };

  const styles = categoryStyles[category];

  return (
    <div
      className={`group relative rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm p-6 transition-all duration-500 hover:scale-[1.02] ${styles.glow} animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${category === 'physics' ? 'physics' : 'chemistry'}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl ${styles.bg} border ${styles.border} flex items-center justify-center mb-4`}>
        <div className={styles.text}>{icon}</div>
      </div>

      {/* Category Badge */}
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${styles.bg} border ${styles.border} mb-4`}>
        <span className={`text-xs font-medium ${styles.text}`}>
          {category === "physics" ? "فيزياء" : "كيمياء"}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className={difficultyColors[difficulty]}>{difficulty}</span>
        </div>
      </div>

      {/* Button */}
      <Button variant={styles.button} className="w-full group/btn">
        ابدأ التجربة
        <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
      </Button>
    </div>
  );
};

export default ExperimentCard;
