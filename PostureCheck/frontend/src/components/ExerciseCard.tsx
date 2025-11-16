import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ExerciseCardProps {
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: LucideIcon;
  onClick: () => void;
}

export const ExerciseCard = ({ name, category, difficulty, icon: Icon, onClick }: ExerciseCardProps) => {
  const difficultyColors = {
    Beginner: 'text-muted-foreground',
    Intermediate: 'text-foreground',
    Advanced: 'text-primary',
  };

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-card border-border"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent transition-colors duration-300">
            <Icon className="w-8 h-8 text-foreground" />
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full bg-secondary ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            Click to start posture check
          </p>
        </div>
      </div>
    </Card>
  );
};
