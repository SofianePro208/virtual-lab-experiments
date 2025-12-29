import { useState } from "react";
import ExperimentCard from "./ExperimentCard";
import { 
  Atom, Beaker, Zap, Waves, FlaskConical, Magnet, Flame, TestTube,
  Lightbulb, Thermometer, Wind, Droplets, Eye, Radio, Gauge, Scale,
  Compass, Battery, Rocket, Orbit, Sun, Moon, CloudRain, Snowflake,
  Microscope, Dna, Leaf, Heart, Brain, Pill, Sparkles, Diamond,
  CircleDot, Activity, TrendingUp, RotateCcw, Move, ArrowUpDown,
  Waves as WaveIcon, Volume2, Camera, Glasses, Ruler, Timer, Target
} from "lucide-react";

const experiments = [
  // ===== تجارب الفيزياء =====
  // الميكانيكا
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
    title: "قوانين نيوتن للحركة",
    description: "تعرف على قوانين نيوتن الثلاثة من خلال تجارب تفاعلية مع الأجسام المتحركة",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "20 دقيقة",
    icon: <Move className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "السقوط الحر",
    description: "دراسة تأثير الجاذبية على الأجسام الساقطة وحساب التسارع",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "12 دقيقة",
    icon: <ArrowUpDown className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "حركة المقذوفات",
    description: "محاكاة حركة المقذوفات وتحليل المسار المنحني والمدى الأفقي",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "الحركة الدائرية",
    description: "استكشف القوة المركزية والتسارع في الحركة الدائرية المنتظمة",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <RotateCcw className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "الاحتكاك والقوى",
    description: "دراسة أنواع الاحتكاك وتأثيرها على حركة الأجسام",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: 7,
    title: "الزخم والتصادمات",
    description: "محاكاة التصادمات المرنة وغير المرنة وحفظ كمية الحركة",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <CircleDot className="w-6 h-6" />,
  },
  {
    id: 8,
    title: "الطاقة الحركية والوضع",
    description: "تحويل الطاقة بين الشكل الحركي والوضع في الأنظمة المختلفة",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 9,
    title: "الروافع والآلات البسيطة",
    description: "دراسة أنواع الروافع والبكرات وحساب المزايا الميكانيكية",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Scale className="w-6 h-6" />,
  },
  
  // الكهرباء والمغناطيسية
  {
    id: 10,
    title: "الدوائر الكهربائية",
    description: "قم ببناء دوائر كهربائية ودراسة قانون أوم والمقاومات المتوالية والمتوازية",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 11,
    title: "المجال المغناطيسي",
    description: "اكتشف خصائص المجال المغناطيسي وتأثيره على الشحنات المتحركة",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Magnet className="w-6 h-6" />,
  },
  {
    id: 12,
    title: "الحث الكهرومغناطيسي",
    description: "تعلم كيفية توليد التيار الكهربائي من خلال تغير المجال المغناطيسي",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    id: 13,
    title: "الكهرباء الساكنة",
    description: "استكشف الشحنات الكهربائية والقوى بين الأجسام المشحونة",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 14,
    title: "المكثفات الكهربائية",
    description: "دراسة تخزين الطاقة في المكثفات وحساب السعة الكهربائية",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Battery className="w-6 h-6" />,
  },
  {
    id: 15,
    title: "المحولات الكهربائية",
    description: "فهم مبدأ عمل المحولات ورفع وخفض الجهد الكهربائي",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "25 دقيقة",
    icon: <Gauge className="w-6 h-6" />,
  },
  
  // الموجات والبصريات
  {
    id: 16,
    title: "الموجات الصوتية",
    description: "استكشف خصائص الصوت: التردد والسعة وسرعة الانتشار",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Volume2 className="w-6 h-6" />,
  },
  {
    id: 17,
    title: "انعكاس وانكسار الضوء",
    description: "دراسة قوانين الانعكاس والانكسار وظاهرة الانعكاس الكلي",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: 18,
    title: "العدسات والمرايا",
    description: "محاكاة تكون الصور في العدسات المحدبة والمقعرة والمرايا",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Glasses className="w-6 h-6" />,
  },
  {
    id: 19,
    title: "تحليل الضوء الأبيض",
    description: "دراسة تحلل الضوء إلى ألوانه الأساسية باستخدام المنشور",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Sun className="w-6 h-6" />,
  },
  {
    id: 20,
    title: "التداخل والحيود",
    description: "استكشف ظواهر التداخل والحيود للموجات الضوئية",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <WaveIcon className="w-6 h-6" />,
  },
  {
    id: 21,
    title: "الموجات الكهرومغناطيسية",
    description: "تعرف على طيف الموجات الكهرومغناطيسية وخصائصها",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Radio className="w-6 h-6" />,
  },
  
  // الحرارة والديناميكا الحرارية
  {
    id: 22,
    title: "انتقال الحرارة",
    description: "دراسة طرق انتقال الحرارة: التوصيل والحمل والإشعاع",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Thermometer className="w-6 h-6" />,
  },
  {
    id: 23,
    title: "تمدد المواد بالحرارة",
    description: "استكشف التمدد الطولي والحجمي للمواد الصلبة والسوائل",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Ruler className="w-6 h-6" />,
  },
  {
    id: 24,
    title: "حالات المادة",
    description: "دراسة التحولات بين الحالات الصلبة والسائلة والغازية",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "20 دقيقة",
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    id: 25,
    title: "قوانين الغازات",
    description: "تطبيق قوانين بويل وشارل وقانون الغاز المثالي",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Wind className="w-6 h-6" />,
  },
  {
    id: 26,
    title: "المحركات الحرارية",
    description: "فهم مبدأ عمل المحركات الحرارية والكفاءة الحرارية",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Rocket className="w-6 h-6" />,
  },
  
  // الفيزياء الحديثة
  {
    id: 27,
    title: "بنية الذرة",
    description: "استكشف تركيب الذرة ونموذج بور للذرة",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Atom className="w-6 h-6" />,
  },
  {
    id: 28,
    title: "التأثير الكهروضوئي",
    description: "دراسة ظاهرة التأثير الكهروضوئي وفهم طبيعة الضوء",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "25 دقيقة",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    id: 29,
    title: "النشاط الإشعاعي",
    description: "تعرف على أنواع الإشعاع النووي وقانون التحلل",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <CircleDot className="w-6 h-6" />,
  },
  {
    id: 30,
    title: "النظرية النسبية",
    description: "مقدمة في النسبية الخاصة وتمدد الزمن وانكماش الطول",
    category: "physics" as const,
    difficulty: "صعب" as const,
    duration: "35 دقيقة",
    icon: <Timer className="w-6 h-6" />,
  },
  
  // الفلك والفضاء
  {
    id: 31,
    title: "المجموعة الشمسية",
    description: "استكشف الكواكب والأقمار في مجموعتنا الشمسية",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "20 دقيقة",
    icon: <Orbit className="w-6 h-6" />,
  },
  {
    id: 32,
    title: "أطوار القمر",
    description: "فهم سبب تغير شكل القمر خلال الشهر",
    category: "physics" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Moon className="w-6 h-6" />,
  },
  {
    id: 33,
    title: "الجاذبية الكونية",
    description: "دراسة قانون الجذب العام وحركة الأجرام السماوية",
    category: "physics" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Sun className="w-6 h-6" />,
  },

  // ===== تجارب الكيمياء =====
  // الكيمياء العامة
  {
    id: 34,
    title: "التفاعلات الكيميائية",
    description: "شاهد التفاعلات الكيميائية المختلفة وتعرف على أنواعها ونواتجها",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    id: 35,
    title: "بنية الذرة الكيميائية",
    description: "استكشف تركيب الذرة والإلكترونات والبروتونات والنيوترونات",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Atom className="w-6 h-6" />,
  },
  {
    id: 36,
    title: "الجدول الدوري",
    description: "تعرف على عناصر الجدول الدوري وخصائصها وتصنيفها",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "20 دقيقة",
    icon: <Diamond className="w-6 h-6" />,
  },
  {
    id: 37,
    title: "الروابط الكيميائية",
    description: "دراسة أنواع الروابط: الأيونية والتساهمية والفلزية",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <CircleDot className="w-6 h-6" />,
  },
  {
    id: 38,
    title: "موازنة المعادلات الكيميائية",
    description: "تعلم كيفية موازنة المعادلات الكيميائية بطريقة صحيحة",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Scale className="w-6 h-6" />,
  },
  
  // الأحماض والقواعد
  {
    id: 39,
    title: "معايرة الأحماض والقواعد",
    description: "تعلم كيفية معايرة المحاليل وحساب تركيز الأحماض والقواعد",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Beaker className="w-6 h-6" />,
  },
  {
    id: 40,
    title: "مقياس الأس الهيدروجيني",
    description: "فهم مفهوم pH وقياس حموضة وقاعدية المحاليل",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <Gauge className="w-6 h-6" />,
  },
  {
    id: 41,
    title: "الكواشف الكيميائية",
    description: "استخدام الكواشف للكشف عن المواد الكيميائية المختلفة",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    id: 42,
    title: "تفاعلات التعادل",
    description: "دراسة تفاعلات الأحماض مع القواعد وتكوين الأملاح",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Activity className="w-6 h-6" />,
  },
  
  // المحاليل والتراكيز
  {
    id: 43,
    title: "المحاليل والذوبان",
    description: "تعلم عن خصائص المحاليل وعوامل الذوبان والتركيز",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <TestTube className="w-6 h-6" />,
  },
  {
    id: 44,
    title: "تحضير المحاليل",
    description: "طرق تحضير المحاليل بتراكيز مختلفة (المولارية والنظامية)",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    id: 45,
    title: "الخواص التجميعية للمحاليل",
    description: "دراسة انخفاض درجة التجمد وارتفاع درجة الغليان",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <Snowflake className="w-6 h-6" />,
  },
  
  // التفاعلات الكيميائية
  {
    id: 46,
    title: "الاحتراق والتأكسد",
    description: "دراسة تفاعلات الاحتراق وفهم عمليات الأكسدة والاختزال",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Flame className="w-6 h-6" />,
  },
  {
    id: 47,
    title: "تفاعلات الترسيب",
    description: "تكوين الرواسب من خلط المحاليل المختلفة",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "15 دقيقة",
    icon: <CloudRain className="w-6 h-6" />,
  },
  {
    id: 48,
    title: "سرعة التفاعل الكيميائي",
    description: "دراسة العوامل المؤثرة على سرعة التفاعلات الكيميائية",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Timer className="w-6 h-6" />,
  },
  {
    id: 49,
    title: "الاتزان الكيميائي",
    description: "فهم مبدأ لوشاتلييه وعوامل تأثير الاتزان",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    id: 50,
    title: "الطاقة في التفاعلات",
    description: "التفاعلات الطاردة والماصة للحرارة وحساب التغير في المحتوى الحراري",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Thermometer className="w-6 h-6" />,
  },
  
  // الكيمياء العضوية
  {
    id: 51,
    title: "الهيدروكربونات",
    description: "تعرف على الألكانات والألكينات والألكاينات وخصائصها",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Dna className="w-6 h-6" />,
  },
  {
    id: 52,
    title: "المجموعات الوظيفية",
    description: "دراسة الكحولات والألدهيدات والكيتونات والأحماض الكربوكسيلية",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Microscope className="w-6 h-6" />,
  },
  {
    id: 53,
    title: "البوليمرات",
    description: "فهم تكوين البوليمرات وأنواعها واستخداماتها",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <CircleDot className="w-6 h-6" />,
  },
  
  // الكيمياء الحيوية
  {
    id: 54,
    title: "البروتينات والأحماض الأمينية",
    description: "استكشف تركيب البروتينات ووظائفها في الجسم",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <Dna className="w-6 h-6" />,
  },
  {
    id: 55,
    title: "الكربوهيدرات",
    description: "دراسة السكريات الأحادية والثنائية والعديدة",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    id: 56,
    title: "الدهون والزيوت",
    description: "تعرف على تركيب الدهون والفرق بين المشبعة وغير المشبعة",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    id: 57,
    title: "الإنزيمات",
    description: "دراسة عمل الإنزيمات كمحفزات حيوية",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "25 دقيقة",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 58,
    title: "الحمض النووي DNA",
    description: "استكشف تركيب الحمض النووي وآلية التضاعف",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Brain className="w-6 h-6" />,
  },
  
  // الكيمياء التحليلية
  {
    id: 59,
    title: "الكروماتوغرافيا",
    description: "فصل مكونات المخاليط باستخدام تقنية الكروماتوغرافيا",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 60,
    title: "التحليل الطيفي",
    description: "استخدام الطيف الضوئي لتحديد المواد الكيميائية",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    id: 61,
    title: "الكشف عن الأيونات",
    description: "تجارب الكشف عن الكاتيونات والأنيونات المختلفة",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Sparkles className="w-6 h-6" />,
  },
  
  // الكيمياء الكهربائية
  {
    id: 62,
    title: "الخلايا الجلفانية",
    description: "بناء خلية جلفانية وفهم مبدأ توليد الكهرباء",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "25 دقيقة",
    icon: <Battery className="w-6 h-6" />,
  },
  {
    id: 63,
    title: "التحليل الكهربائي",
    description: "دراسة عملية التحليل الكهربائي وتطبيقاتها الصناعية",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "28 دقيقة",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 64,
    title: "التآكل والصدأ",
    description: "فهم آلية التآكل وطرق الحماية من الصدأ",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Activity className="w-6 h-6" />,
  },
  
  // كيمياء البيئة
  {
    id: 65,
    title: "تلوث الهواء",
    description: "دراسة ملوثات الهواء وتأثيرها على البيئة والصحة",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Wind className="w-6 h-6" />,
  },
  {
    id: 66,
    title: "معالجة المياه",
    description: "تعرف على طرق تنقية المياه والتعقيم",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    id: 67,
    title: "طبقة الأوزون",
    description: "فهم أهمية طبقة الأوزون والمواد المستنفدة لها",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "20 دقيقة",
    icon: <Sun className="w-6 h-6" />,
  },
  
  // الكيمياء الصناعية
  {
    id: 68,
    title: "صناعة الصابون",
    description: "تعلم عملية التصبن وصناعة الصابون",
    category: "chemistry" as const,
    difficulty: "سهل" as const,
    duration: "18 دقيقة",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 69,
    title: "صناعة الأدوية",
    description: "مقدمة في الكيمياء الصيدلانية وتصنيع الأدوية",
    category: "chemistry" as const,
    difficulty: "صعب" as const,
    duration: "30 دقيقة",
    icon: <Pill className="w-6 h-6" />,
  },
  {
    id: 70,
    title: "صناعة الأسمدة",
    description: "دراسة إنتاج الأسمدة النيتروجينية والفوسفاتية",
    category: "chemistry" as const,
    difficulty: "متوسط" as const,
    duration: "22 دقيقة",
    icon: <Leaf className="w-6 h-6" />,
  },
];

const ExperimentsSection = () => {
  const [filter, setFilter] = useState<"all" | "physics" | "chemistry">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "سهل" | "متوسط" | "صعب">("all");

  const filteredExperiments = experiments.filter((exp) => {
    const categoryMatch = filter === "all" || exp.category === filter;
    const difficultyMatch = difficultyFilter === "all" || exp.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  const physicsCount = experiments.filter(e => e.category === "physics").length;
  const chemistryCount = experiments.filter(e => e.category === "chemistry").length;

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
            أكثر من {experiments.length} تجربة تفاعلية في الفيزياء والكيمياء
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

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Category Filter */}
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
          {filteredExperiments.map((experiment, index) => (
            <ExperimentCard
              key={experiment.id}
              {...experiment}
              delay={index * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
