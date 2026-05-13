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
import { CheckCircle } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      'Access to basic prayer templates',
      'Log up to 10 journal entries',
      'Community support',
    ],
    cta: 'Current Plan',
    current: true,
  },
  {
    name: 'Pro Monthly',
    price: '$2.99',
    period: '/month',
    features: [
      'Access to all prayer templates',
      'Unlimited journal entries',
      'AI-powered prayer suggestions',
      'Priority support',
    ],
    cta: 'Upgrade with Paystack',
    current: false,
  },
  {
    name: 'Pro Yearly',
    price: '$30.99',
    period: '/year',
    features: [
      'Access to all prayer templates',
      'Unlimited journal entries',
      'AI-powered prayer suggestions',
      'Priority support',
      'Save with yearly plan (2 months free)'
    ],
    cta: 'Upgrade with Paystack',
    current: false,
  },
];

export default function SubscriptionPage() {
  const handleSubscription = (planName: string) => {
    // This is where you would handle the subscription logic, e.g., redirect to a payment gateway.
    alert(`You have selected the ${planName} plan.`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Subscription Plans
        </h2>
        <p className="text-muted-foreground">
          Choose a plan that fits your spiritual journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.name === 'Pro Monthly' ? 'border-primary' : ''
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={plan.current}
                onClick={() => handleSubscription(plan.name)}
                variant={plan.name === 'Pro Monthly' ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
