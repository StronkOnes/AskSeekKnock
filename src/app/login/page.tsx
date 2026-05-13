
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password.',
        });
      } else {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        router.push('/');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // signIn('google');
    toast({
        title: 'Coming Soon',
        description: 'Google login will be enabled shortly.',
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 p-4 relative">
      <div className="absolute top-8 left-8 hidden md:block">
        <Logo />
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <Link href="/landing">
          <Button variant="ghost" size="sm" className="mb-2 group hover:bg-primary/5">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <Card className="border-none shadow-blocksy-xl animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blocksy-heading">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    className="rounded-blocksy-md" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="rounded-blocksy-md" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <Button
                type="submit"
                className="w-full rounded-blocksy-md shadow-blocksy font-bold"
                disabled={isLoading}
                >
                {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="outline" className="w-full rounded-blocksy-md" onClick={handleGoogleLogin} type="button">
                <Chrome className="mr-2 h-4 w-4" />
                Login with Google
                </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
              <p className="w-full text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="underline font-semibold text-primary hover:text-primary/80 transition-colors">
                      Sign up
                  </Link>
              </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
