import { Dumbbell, Activity, Target, TrendingUp, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExerciseCard } from '@/components/ExerciseCard';
import { HoverSidebar } from '@/components/HoverSidebar';

const exercises = [
  {
    name: 'Bench Press',
    category: 'Chest',
    difficulty: 'Intermediate' as const,
    icon: Dumbbell,
  },
  {
    name: 'Squats',
    category: 'Legs',
    difficulty: 'Beginner' as const,
    icon: Activity,
  },
  {
    name: 'Deadlift',
    category: 'Back',
    difficulty: 'Advanced' as const,
    icon: Target,
  },
  {
    name: 'Pull-ups',
    category: 'Back',
    difficulty: 'Intermediate' as const,
    icon: TrendingUp,
  },
  {
    name: 'Shoulder Press',
    category: 'Shoulders',
    difficulty: 'Intermediate' as const,
    icon: Zap,
  },
  {
    name: 'Plank',
    category: 'Core',
    difficulty: 'Beginner' as const,
    icon: Shield,
  },
];

const Index = () => {
  const navigate = useNavigate();
  
  const handleExerciseClick = (exerciseName: string) => {
    navigate(`/exercise/${encodeURIComponent(exerciseName)}`, {
      state: { exerciseName }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HoverSidebar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              Posture<span className="text-primary">Check</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select an exercise to analyze your form and improve your technique with AI-powered feedback
            </p>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.name}
                name={exercise.name}
                category={exercise.category}
                difficulty={exercise.difficulty}
                icon={exercise.icon}
                onClick={() => handleExerciseClick(exercise.name)}
              />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              Hover over the left edge to sign in and unlock personalized tracking
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
