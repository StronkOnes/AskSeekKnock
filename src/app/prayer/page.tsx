'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrayerSchedulePage from '../prayer-schedule/PrayerSchedulePage';
import PrayerSessionPage from '../prayer-session/page';
import FastingSchedulerContent from './FastingSchedulerContent';
import PrayerJournalPage from '../prayer-journal/page';
import BibleVersesPage from '../bible-verses/page';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UnifiedPrayerPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-blocksy-heading">
            Prayer Hub
          </h2>
          <p className="text-muted-foreground mt-1">
            Plan, schedule, and experience your spiritual journey.
          </p>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm border border-border/50 shadow-sm p-1 rounded-blocksy-lg h-12 w-full md:w-auto justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="templates" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            A.S.K. Templates
          </TabsTrigger>
          <TabsTrigger value="fasting" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Fasting
          </TabsTrigger>
          <TabsTrigger value="journal" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Journal
          </TabsTrigger>
          <TabsTrigger value="session-builder" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Session Builder
          </TabsTrigger>
        </TabsList>
        <div className="animate-scale-in delay-100">
          <TabsContent value="templates" className="space-y-4 focus-visible:outline-none">
            <div className="flex justify-end mb-4">
               <Button onClick={() => setActiveTab('session')}>
                  <Play className="mr-2 h-4 w-4" /> Start Session
               </Button>
            </div>
            <PrayerSessionPage />
          </TabsContent>
          <TabsContent value="session" className="space-y-4 focus-visible:outline-none">
            <PrayerSessionPage />
          </TabsContent>
          <TabsContent value="fasting" className="space-y-4 focus-visible:outline-none">
            <FastingSchedulerContent />
          </TabsContent>
          <TabsContent value="journal" className="space-y-4 focus-visible:outline-none">
            <PrayerJournalPage />
          </TabsContent>
          <TabsContent value="session-builder" className="space-y-4 focus-visible:outline-none">
            <BibleVersesPage />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}