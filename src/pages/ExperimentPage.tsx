import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BarChart3, BookOpen, Play } from "lucide-react";
import PendulumSimulation from "@/components/simulations/PendulumSimulation";
import CircuitSimulation from "@/components/simulations/CircuitSimulation";
import ProjectileSimulation from "@/components/simulations/ProjectileSimulation";
import WaveSimulation from "@/components/simulations/WaveSimulation";
import AtomSimulation from "@/components/simulations/AtomSimulation";
import ChemicalReactionSimulation from "@/components/simulations/ChemicalReactionSimulation";
import PHSimulation from "@/components/simulations/PHSimulation";
import GasLawsSimulation from "@/components/simulations/GasLawsSimulation";
import { experimentsData } from "@/data/experiments";

const ExperimentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const experiment = experimentsData.find(e => e.id === Number(id));
  
  if (!experiment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">التجربة غير موجودة</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  const renderSimulation = () => {
    switch (experiment.id) {
      case 1:
        return <PendulumSimulation />;
      case 4:
        return <ProjectileSimulation />;
      case 10:
        return <CircuitSimulation />;
      case 16:
        return <WaveSimulation />;
      case 27:
      case 35:
        return <AtomSimulation />;
      case 34:
        return <ChemicalReactionSimulation />;
      case 40:
        return <PHSimulation />;
      case 25:
        return <GasLawsSimulation />;
      default:
        return <DefaultSimulation experiment={experiment} />;
    }
  };

  const categoryColor = experiment.category === "physics" ? "physics" : "chemistry";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة
            </Button>
            <div className={`px-4 py-1 rounded-full bg-${categoryColor}/10 border border-${categoryColor}/30`}>
              <span className={`text-sm font-medium text-${categoryColor}`}>
                {experiment.category === "physics" ? "فيزياء" : "كيمياء"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{experiment.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{experiment.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{experiment.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className={
                experiment.difficulty === "سهل" ? "text-chemistry" :
                experiment.difficulty === "متوسط" ? "text-energy" : "text-destructive"
              }>{experiment.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {renderSimulation()}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                معلومات التجربة
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>{experiment.theory || "استكشف هذه التجربة التفاعلية لفهم المفاهيم العلمية بشكل عملي."}</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-bold mb-4">الأهداف التعليمية</h3>
              <ul className="space-y-2">
                {(experiment.objectives || ["فهم المفهوم الأساسي", "تطبيق القوانين", "تحليل النتائج"]).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className={`w-6 h-6 rounded-full bg-${categoryColor}/10 flex items-center justify-center text-xs text-${categoryColor} flex-shrink-0`}>
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Default simulation for experiments without custom simulation
const DefaultSimulation = ({ experiment }: { experiment: any }) => {
  return (
    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-8">
      <div className="text-center">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-${experiment.category === 'physics' ? 'physics' : 'chemistry'}/20 flex items-center justify-center`}>
          <Play className={`w-12 h-12 text-${experiment.category === 'physics' ? 'physics' : 'chemistry'}`} />
        </div>
        <h3 className="text-xl font-bold mb-2">{experiment.title}</h3>
        <p className="text-muted-foreground mb-4">المحاكاة قيد التطوير</p>
        <Button variant={experiment.category === 'physics' ? 'physics' : 'chemistry'}>
          قريباً
        </Button>
      </div>
    </div>
  );
};

export default ExperimentPage;
