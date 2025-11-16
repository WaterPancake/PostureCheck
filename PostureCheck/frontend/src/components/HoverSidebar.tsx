import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export const HoverSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Failed to sign out.');
      console.error('Logout error:', error);
    }
  };


  return (
    <>
      {/* Hover trigger zone */}
      <div
        className="fixed left-0 top-0 h-full w-16 z-40"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '320px' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col h-full p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : user ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>

              <div className="flex-1">
                <div 
                  className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/30"
                  onClick={() => navigate('/profile')}
                >
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">Premium Member</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <Button 
                onClick={handleLogout}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-glow"
                size="lg"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground text-sm">Sign in to unlock premium features</p>
              </div>


              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-glow"
                size="lg"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By signing in, you agree to our Terms of Service
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
