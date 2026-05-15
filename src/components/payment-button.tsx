'use client';

import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PaymentButtonProps {
  amount: number;
  email: string;
  planName: string;
  onSuccess?: (reference: string) => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  email,
  planName,
  onSuccess,
  className,
  disabled,
  children,
}) => {
  const { toast } = useToast();
  
  const config = {
    reference: `ASK_${new Date().getTime()}`,
    email: email,
    amount: Math.round(amount * 100), // Paystack works in Kobo/Cents
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: "Plan Name",
          variable_name: "plan_name",
          value: planName
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handleSuccess = (reference: any) => {
    toast({
      title: "Payment Successful",
      description: "Verifying your transaction...",
    });
    
    if (onSuccess) {
      onSuccess(reference.reference);
    }

    // Call internal verification API
    fetch(`/api/verify?reference=${reference.reference}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'Verified') {
          toast({
            title: "Subscription Active",
            description: `You are now subscribed to ${planName}.`,
          });
          // Redirect or refresh
          window.location.reload();
        } else {
          toast({
            title: "Verification Failed",
            description: "Please contact support if your subscription is not active.",
            variant: "destructive",
          });
        }
      })
      .catch(err => {
        console.error("Verification error:", err);
        toast({
          title: "Verification Error",
          description: "An error occurred while verifying your payment.",
          variant: "destructive",
        });
      });
  };

  const handleClose = () => {
    toast({
      title: "Payment Cancelled",
      description: "You have closed the payment window.",
      variant: "destructive"
    });
  };

  return (
    <Button
      className={className}
      disabled={disabled || !process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
      onClick={() => {
        if (!email) {
          toast({
            title: "Email Required",
            description: "Please log in to continue.",
            variant: "destructive"
          });
          return;
        }
        initializePayment({ onSuccess: handleSuccess, onClose: handleClose });
      }}
    >
      {children}
    </Button>
  );
};
