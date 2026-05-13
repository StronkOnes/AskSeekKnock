'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-background/50 p-4 md:p-8 pt-20">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        <Link href="/signup">
          <Button variant="ghost" size="sm" className="mb-4 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sign Up
          </Button>
        </Link>

        <Card className="border-none shadow-blocksy-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blocksy-heading">Privacy Policy for A.S.K. – THE ULTIMATE PRAYER COMPANION</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: April 8, 2026</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>This Privacy Policy describes how A.S.K. – The Ultimate Prayer Companion (“we,” “us,” or “our”) collects, uses, and shares your personal information when you visit or use our website and application located at https://ask-seek-knock.vercel.app.</p>
            <p>As a South African-based entity, we are committed to the Protection of Personal Information Act (POPIA) and strive to align our data protection standards with global principles, including the General Data Protection Regulation (GDPR).</p>

            <h3 className="text-lg font-bold mt-6 mb-2">1. Information We Collect</h3>
            <p>We collect information that you provide directly to us and information generated through your use of the Service.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Data:</strong> When you register for a subscription, we collect information such as your name and email address.</li>
              <li><strong>Sensitive Spiritual Data:</strong> We recognize that prayer requests, religious affiliations, and private journal entries are highly sensitive. Your private entries remain yours and are protected with industry-standard encryption.</li>
              <li><strong>User-Generated Content:</strong> Any content you post to "Community Fellowship" areas is visible to other members of that specific group.</li>
              <li><strong>Billing Information:</strong> For tier-based subscriptions, payment processing is handled by third-party providers. We collect billing frequency (Monthly or Annually) to manage your account.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">2. How We Use Your Information</h3>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, maintain, and improve the A.S.K. digital platform and instructional content.</li>
              <li>Process subscription renewals and manage billing cycles.</li>
              <li>Facilitate community fellowship and spiritual growth.</li>
              <li>Ensure compliance with South African laws and our Terms and Conditions.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">3. Data Storage and Third-Party Services</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Technical Infrastructure:</strong> We utilize Vercel for hosting the application.</li>
              <li><strong>Data Storage:</strong> We use Firebase for secure data storage and management. This is a technical requirement for the transparency of our digital infrastructure.</li>
              <li><strong>Encryption:</strong> We implement industry-standard encryption to protect sensitive data, specifically prayer requests and personal identifiers.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">4. Legal Basis (POPIA & Global Compliance)</h3>
            <p>In accordance with POPIA, we process your personal information only when:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You have given consent by agreeing to our Terms and Conditions.</li>
              <li>Processing is necessary for the performance of a contract (e.g., providing subscription services).</li>
              <li>It is necessary to comply with South African law.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">5. Your Rights</h3>
            <p>Under POPIA and GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal information we hold about you.</li>
              <li>Request the correction or deletion of your data.</li>
              <li>Object to the processing of your data.</li>
              <li>Withdraw consent for recurring subscriptions at any time via your account settings.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">6. Data Retention</h3>
            <p>Subscriptions are billed in advance on a recurring basis. We retain your account data as long as your subscription is active. Please note that pursuant to the South African Consumer Protection Act, subscriptions are generally non-refundable once the digital service has been accessed.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">7. Limitation of Liability</h3>
            <p>While we take extensive measures to protect your data, A.S.K. and its founder, Mpho Matlou, shall not be liable for direct or indirect damages resulting from the use of the Service, which is provided on an AS-IS basis.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">8. Contact Us</h3>
            <p>For any questions regarding this Privacy Policy or to exercise your data rights, please contact us through the details provided within the A.S.K. web application.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}