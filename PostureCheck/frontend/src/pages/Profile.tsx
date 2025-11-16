import { ArrowLeft, TrendingUp, Calendar, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Initial data - all zeros
const weeklyActivity = [
  { day: 'Mon', exercises: 0 },
  { day: 'Tue', exercises: 0 },
  { day: 'Wed', exercises: 0 },
  { day: 'Thu', exercises: 0 },
  { day: 'Fri', exercises: 0 },
  { day: 'Sat', exercises: 0 },
  { day: 'Sun', exercises: 0 },
];

const postureAccuracy = [
  { week: 'Week 1', accuracy: 0 },
  { week: 'Week 2', accuracy: 0 },
  { week: 'Week 3', accuracy: 0 },
  { week: 'Week 4', accuracy: 0 },
  { week: 'Week 5', accuracy: 0 },
];

const topExercises: { name: string; count: number }[] = [];

const recentHistory: { exercise: string; date: string; score: number }[] = [];

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* User Info Section */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full ring-4 ring-border"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">{user.displayName}</h1>
                <Badge variant="secondary" className="text-xs">Premium Member</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Member since January 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">+0 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">days in a row</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0%</div>
              <p className="text-xs text-muted-foreground mt-1">average score</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0h</div>
              <p className="text-xs text-muted-foreground mt-1">total practice time</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="exercises" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="w-5 h-5" />
                Posture Accuracy Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={postureAccuracy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Most Practiced Exercises */}
        <Card className="bg-card border-border mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5" />
              Most Practiced Exercises
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topExercises.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topExercises} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No exercises recorded yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Exercise History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHistory.length > 0 ? (
                recentHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.exercise}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge variant={item.score >= 90 ? 'default' : 'secondary'}>
                      Score: {item.score}%
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No exercise history yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;