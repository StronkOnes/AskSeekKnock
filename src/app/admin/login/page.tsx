
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';

const AdminLoginPage = () => {
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation: Using a fixed password for the prototype
    // In a real app, this would be an API call to verify credentials
    if (password === 'ASKadmin2026') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: "Access Granted",
        description: "Welcome back, Administrator.",
      });
      router.push('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect administrative password.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background/50 relative">
      <div className="absolute top-8">
        <Logo />
      </div>
      
      <Card className="w-full max-w-md border-none shadow-blocksy-xl animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-blocksy-heading">Admin Portal</CardTitle>
          <CardDescription>
            Enter the administrative password to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Administrative Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter password..." 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-blocksy-md border-primary/20 focus:border-primary"
                  required
                />
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 rounded-blocksy-md font-bold shadow-blocksy group"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Access Admin Hub'}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Secured Administrative Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
