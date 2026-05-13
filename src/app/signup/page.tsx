
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chrome, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    termsAccepted: z.boolean().refine(v => v === true, { message: 'You must accept the Terms and Conditions.' }),
    privacyAccepted: z.boolean().refine(v => v === true, { message: 'You must accept the Privacy Policy.' }),
});

export default function SignupPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            termsAccepted: false,
            privacyAccepted: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            // 1. Create the user
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Something went wrong');
            }

            // 2. Automatically log them in
            const loginResult = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (loginResult?.error) {
                toast({
                    title: 'Account Created',
                    description: 'Please log in with your new credentials.',
                });
                router.push('/login');
            } else {
                toast({
                    title: 'Welcome!',
                    description: 'Your account is ready. Let\'s finish setting up your profile.',
                });
                router.push('/onboarding');
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Signup Failed',
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignup = () => {
        toast({
            title: 'Coming Soon',
            description: 'Google login will be enabled shortly.',
        });
    };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/50 p-4 relative py-12">
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
            <CardTitle className="text-2xl font-bold text-blocksy-heading">Create an account</CardTitle>
            <CardDescription>
              Join the A.S.K community today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="name@example.com" {...field} className="rounded-blocksy-md" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} className="rounded-blocksy-md" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium">
                                        I accept the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="privacyAccepted"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium">
                                        I accept the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full rounded-blocksy-md shadow-blocksy font-bold mt-4" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-blocksy-md" onClick={handleGoogleSignup} type="button" disabled>
                        <Chrome className="mr-2 h-4 w-4" />
                        Google Login (Coming Soon)
                    </Button>
                </form>
            </Form>
             <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline font-semibold text-primary hover:text-primary/80 transition-colors">
                    Login
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
