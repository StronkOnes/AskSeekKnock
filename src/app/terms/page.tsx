'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <CardTitle className="text-3xl font-bold text-blocksy-heading">TERMS AND CONDITIONS FOR A.S.K. – THE ULTIMATE PRAYER COMPANION</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: April 7, 2026</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <h3 className="text-lg font-bold mt-6 mb-2">1. AGREEMENT TO TERMS</h3>
            <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and A.S.K. – The Ultimate Prayer Companion (“we,” “us,” or “our”), concerning your access to and use of the https://ask-seek-knock.vercel.app website and application.</p>
            <p>By accessing the Service, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICE.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">2. THE SERVICE & PERSONAL CONDUCT</h3>
            <p>A.S.K. provides a digital platform for instructional prayer habits, community fellowship, and spiritual growth content.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Instructional Content:</strong> The articles and "habit-building" guides provided are for spiritual and educational purposes. They do not constitute professional medical, psychological, or legal advice.</li>
              <li><strong>User Voice:</strong> We respect the sanctity of your prayers. Your private entries remain yours; however, any content posted to "Community Fellowship" areas becomes visible to other members of that group.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">3. SUBSCRIPTIONS AND BILLING</h3>
            <p>Certain aspects of the Service are provided on a tier-based subscription basis.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Billing:</strong> You will be billed in advance on a recurring, periodic basis (Monthly or Annually).</li>
              <li><strong>Automatic Renewal:</strong> At the end of each cycle, your subscription will automatically renew under the exact same conditions unless you cancel it via your account settings.</li>
              <li><strong>Fees:</strong> We reserve the right to modify subscription fees. Any price change will take effect at the start of the next billing cycle following notice to you.</li>
              <li><strong>Refunds:</strong> Pursuant to the South African Consumer Protection Act, subscriptions are generally non-refundable once the digital service has been accessed. However, refund requests are evaluated on a case-by-case basis.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">4. DATA PRIVACY (POPIA & GLOBAL COMPLIANCE)</h3>
            <p>As a South African-based entity, we are committed to the Protection of Personal Information Act (POPIA).</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Sensitive Data:</strong> We recognize that prayer requests and religious affiliations are sensitive data. We implement industry-standard encryption to protect this information.</li>
              <li><strong>Global Reach:</strong> While we are based in South Africa, we strive to maintain data protection standards that align with global expectations (including GDPR principles) for our international Christian community.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-2">5. INTELLECTUAL PROPERTY RIGHTS</h3>
            <p>Unless otherwise indicated, the Service is our proprietary property, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The A.S.K. branding and logos.</li>
              <li>All website designs, audio, video, text (specifically our instructional article series), and graphics.</li>
              <li>The underlying software code and database schemas.</li>
            </ul>
            <p>You are granted a limited license to use the Service for personal, non-commercial spiritual growth. You may not reproduce, "scrape," or distribute our instructional content without express written permission.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">6. USER-GENERATED CONTENT & FELLOWSHIP</h3>
            <p>By posting in community areas, you represent that your content is not defamatory, hateful, or in violation of Christian community standards. We reserve the right to monitor, edit, or remove content that we deem harmful to the fellowship environment of A.S.K.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">7. LIMITATION OF LIABILITY</h3>
            <p>In no event will A.S.K., its founder Mpho Matlou, or its affiliates be liable for any direct, indirect, or consequential damages resulting from your use of the app. The service is provided on an AS-IS and AS-AVAILABLE basis.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">8. GOVERNING LAW</h3>
            <p>These Terms shall be governed by and defined following the laws of the Republic of South Africa. You irrevocably consent that the courts of South Africa shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>

            <h3 className="text-lg font-bold mt-6 mb-2">9. CONTACT US</h3>
            <p>In order to resolve a complaint regarding the Service or to receive further information regarding use of the Service, please contact us at the contact details provided within the A.S.K. web application.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}