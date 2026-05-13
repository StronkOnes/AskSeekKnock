
'use client';

import React from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Smartphone, Apple, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const onboardingSchema = z.object({
    firstName: z.string().min(2, 'Name is required'),
    lastName: z.string().min(2, 'Surname is required'),
    country: z.string().min(2, 'Country is required'),
    cellNumber: z.string().min(8, 'Valid cell number is required'),
    gender: z.string().min(1, 'Please select your gender'),
    denomination: z.string().min(2, 'Denomination is required'),
    homeLanguage: z.string().min(2, 'Home language is required'),
    preferredBibleTranslation: z.string().min(2, 'Preferred bible translation is required'),
    phoneOs: z.enum(['Android', 'IOS'], { required_error: 'Please select your phone OS' }),
    commPref: z.enum(['WhatsApp', 'Email', 'Both', 'None'], { required_error: 'Please select a communication preference' }),
});

export default function OnboardingPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { update } = useSession();
    const [step, setStep] = React.useState(1);

    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            cellNumber: '',
            gender: '',
            denomination: '',
            homeLanguage: '',
            preferredBibleTranslation: '',
            phoneOs: undefined,
            commPref: 'Both',
        },
    });

    async function onSubmit(values: z.infer<typeof onboardingSchema>) {
        try {
            const response = await fetch('/api/user/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error('Failed to save profile');

            // Update session locally so middleware knows we're onboarded
            await update({ isOnboarded: true });

            toast({
                title: 'Welcome to A.S.K!',
                description: 'Your profile has been completed successfully.',
            });
            router.push('/');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        }
    }

    const nextStep = async () => {
        const fields = step === 1 
            ? ['firstName', 'lastName', 'country', 'cellNumber', 'gender']
            : ['denomination', 'homeLanguage', 'preferredBibleTranslation'];
        
        const isValid = await form.trigger(fields as any);
        if (isValid) setStep(step + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col items-center justify-center p-4">
            <div className="mb-8">
                <Logo />
            </div>

            <Card className="w-full max-w-2xl border-none shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-muted w-full">
                    <div 
                        className="h-full bg-primary transition-all duration-500 ease-in-out" 
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
                
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-primary">
                        {step === 1 && "Tell us about yourself"}
                        {step === 2 && "Your Faith Journey"}
                        {step === 3 && "Stay Connected"}
                    </CardTitle>
                    <CardDescription className="text-center text-lg">
                        Step {step} of 3
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {step === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl><Input placeholder="John" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Surname</FormLabel>
                                                <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl><Input placeholder="South Africa" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cellNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cellphone Number</FormLabel>
                                                <FormControl><Input placeholder="+27..." {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <FormField
                                        control={form.control}
                                        name="denomination"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Denomination</FormLabel>
                                                <FormControl><Input placeholder="e.g. Baptist, Pentecostal" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="homeLanguage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Home Language</FormLabel>
                                                <FormControl><Input placeholder="e.g. English, Zulu" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="preferredBibleTranslation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Bible Translation</FormLabel>
                                                <FormControl><Input placeholder="e.g. KJV, NIV, AMP" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <FormField
                                        control={form.control}
                                        name="phoneOs"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-center block text-lg font-semibold">Which phone do you use?</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex justify-center gap-8"
                                                    >
                                                        <FormItem className="flex flex-col items-center space-y-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="Android" className="sr-only" />
                                                            </FormControl>
                                                            <FormLabel className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${field.value === 'Android' ? 'border-primary bg-primary/10 text-primary shadow-lg scale-110' : 'border-muted hover:border-primary/50'}`}>
                                                                <Smartphone size={40} />
                                                                <span className="font-bold">Android</span>
                                                                {field.value === 'Android' && <CheckCircle2 className="text-primary" size={20} />}
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex flex-col items-center space-y-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="IOS" className="sr-only" />
                                                            </FormControl>
                                                            <FormLabel className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${field.value === 'IOS' ? 'border-primary bg-primary/10 text-primary shadow-lg scale-110' : 'border-muted hover:border-primary/50'}`}>
                                                                <Apple size={40} />
                                                                <span className="font-bold">iPhone (iOS)</span>
                                                                {field.value === 'IOS' && <CheckCircle2 className="text-primary" size={20} />}
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="commPref"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-center block text-lg font-semibold">How should we send you updates & event invites?</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                                    >
                                                        {['WhatsApp', 'Email', 'Both', 'None'].map((pref) => (
                                                            <FormItem key={pref}>
                                                                <FormControl>
                                                                    <RadioGroupItem value={pref} className="sr-only" />
                                                                </FormControl>
                                                                <FormLabel className={`cursor-pointer p-4 rounded-xl border transition-all text-center flex flex-col items-center gap-2 ${field.value === pref ? 'border-primary bg-primary/5 text-primary' : 'border-muted hover:bg-muted/50'}`}>
                                                                    {pref === 'WhatsApp' && <MessageCircle size={20} />}
                                                                    {pref === 'Email' && <Mail size={20} />}
                                                                    {pref === 'Both' && <div className="flex gap-1"><MessageCircle size={20} /><Mail size={20} /></div>}
                                                                    <span className="text-sm font-medium">{pref}</span>
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="flex justify-between pt-6">
                                {step > 1 && (
                                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                                        Previous
                                    </Button>
                                )}
                                <div className="ml-auto">
                                    {step < 3 ? (
                                        <Button type="button" onClick={nextStep} className="px-8 font-bold">
                                            Next Step
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="px-12 font-bold bg-primary hover:bg-primary/90">
                                            Complete Profile
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
