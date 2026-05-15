import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { AppShell } from '@/components/app-shell';
import { TemplateProvider } from '@/context/TemplateContext';
import { JournalProvider } from '@/context/JournalContext';
import { PostProvider } from '@/context/PostContext';
import './globals.css';
import { auth } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'A.S.K. - Ask Seek Knock',
  description: 'A focused platform for prayer, community, and spiritual growth.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png' },
    ],
  },
};

async function UpdateActivity() {
  const session = await auth();
  if (session?.user?.id) {
    try {
      // Update last activity
      await db.update(users)
        .set({ lastActivityAt: new Date() })
        .where(eq(users.id, session.user.id));
    } catch (e) {
      console.error("Failed to update activity:", e);
    }
  }
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TemplateProvider>
              <JournalProvider>
                <PostProvider>
                  <UpdateActivity />
                  <AppShell>
                    {children}
                  </AppShell>
                  <Toaster />
                </PostProvider>
              </JournalProvider>
            </TemplateProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
