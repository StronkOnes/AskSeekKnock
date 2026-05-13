'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prayerTemplates } from '@/lib/data';
import type { PrayerTemplate } from '@/lib/types';
import { Timer } from '@/components/timer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import { SessionConfigDialog } from '@/components/session-config-dialog';
import { IconRenderer } from '@/components/icon-renderer';

export default function PrayerSessionPage() {
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [sessionTemplates, setSessionTemplates] = useState<PrayerTemplate[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateIds(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleOpenConfigDialog = () => {
    setIsConfigDialogOpen(true);
  };

  const handleStartSession = (configuredTemplates: PrayerTemplate[]) => {
    setSessionTemplates(configuredTemplates);
    setCurrentTemplateIndex(0);
    setCurrentPointIndex(0);
    setIsConfigDialogOpen(false);
  };

  const handleNextClick = () => {
    const currentTemplate = sessionTemplates[currentTemplateIndex];
    if (currentPointIndex < currentTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else if (currentTemplateIndex < sessionTemplates.length - 1) {
      setCurrentTemplateIndex(prev => prev + 1);
      setCurrentPointIndex(0);
    } else {
      // Last point of last template finished
      setSessionTemplates([]);
    }
  }

  const handlePreviousClick = () => {
    if (currentPointIndex > 0) {
      setCurrentPointIndex(prev => prev - 1);
    } else if (currentTemplateIndex > 0) {
      const prevTemplate = sessionTemplates[currentTemplateIndex - 1];
      setCurrentTemplateIndex(prev => prev - 1);
      setCurrentPointIndex(prevTemplate.points.length - 1);
    }
  }
  
  const handleTimerComplete = () => {
    const currentTemplate = sessionTemplates[currentTemplateIndex];
    if (currentPointIndex < currentTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else if (currentTemplateIndex < sessionTemplates.length - 1) {
      setCurrentTemplateIndex(prev => prev + 1);
      setCurrentPointIndex(0);
    } else {
      // Last point of last template finished
      setSessionTemplates([]);
    }
  }

  const currentTemplate = sessionTemplates[currentTemplateIndex];
  const currentPoint = currentTemplate?.points[currentPointIndex];

  if (sessionTemplates.length > 0 && currentTemplate && currentPoint) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in zoom-in duration-500">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
            <img 
              src="/A.S.K. - Sans.png" 
              alt="Watermark" 
              className="w-[120%] max-w-[1200px] object-contain rotate-[-15deg]"
            />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col p-6 md:p-12">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <IconRenderer iconName={currentTemplate.icon} className="h-8 w-8 text-primary"/>
              <h2 className="text-2xl font-bold tracking-tight">{currentTemplate.title}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSessionTemplates([])} className="hover:bg-destructive/10 hover:text-destructive">
              End Session
            </Button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full space-y-12">
            <div className="text-center space-y-6 w-full">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">Current Prayer Point</h3>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tight leading-tight">
                  {currentPoint.title}
                </h1>
                {currentPoint.text && (
                  <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed italic">
                    "{currentPoint.text}"
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-center space-y-8">
              <Timer 
                  initialMinutes={currentPoint.duration} 
                  onComplete={handleTimerComplete}
                  timerKey={`${currentTemplate.id}-${currentPointIndex}`}
              />
              
              <div className="flex items-center gap-6">
                <Button 
                  onClick={handlePreviousClick} 
                  variant="outline" 
                  size="lg"
                  disabled={currentTemplateIndex === 0 && currentPointIndex === 0}
                  className="rounded-full px-8"
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextClick} 
                  variant="default" 
                  size="lg"
                  className="rounded-full px-12 h-14 text-lg font-bold shadow-xl shadow-primary/20"
                >
                  {currentTemplateIndex === sessionTemplates.length - 1 && currentPointIndex === currentTemplate.points.length - 1 
                    ? 'Finish Session' 
                    : 'Next Point'}
                </Button>
              </div>
            </div>

            <div className="w-full max-w-md">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Session Progress</h3>
                <div className="flex gap-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                   {sessionTemplates.map((t, tIdx) => 
                      t.points.map((p, pIdx) => {
                        const isPast = tIdx < currentTemplateIndex || (tIdx === currentTemplateIndex && pIdx < currentPointIndex);
                        const isCurrent = tIdx === currentTemplateIndex && pIdx === currentPointIndex;
                        return (
                          <div 
                            key={`${t.id}-${pIdx}`} 
                            className={cn("flex-1 transition-all duration-500", 
                              isPast ? "bg-primary/40" : isCurrent ? "bg-primary" : "bg-transparent"
                            )} 
                          />
                        )
                      })
                   )}
                </div>
            </div>
          </div>
          
          <div className="mt-auto pt-8 border-t flex justify-between items-end">
             <div className="text-left">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">Up Next</p>
                <p className="text-sm font-semibold truncate max-w-[200px]">
                  {currentTemplate.points[currentPointIndex + 1]?.title || (sessionTemplates[currentTemplateIndex + 1] ? `Next Section: ${sessionTemplates[currentTemplateIndex + 1].title}` : 'Completion')}
                </p>
             </div>
             <div className="text-right">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">A.S.K. Prayer Hub</p>
             </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Session
          </h2>
          <p className="text-muted-foreground">
            Choose one or more templates to structure your prayer time.
          </p>
        </div>
        <Button onClick={handleOpenConfigDialog} disabled={selectedTemplateIds.length === 0}>
          Start Session
        </Button>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Prayer Templates</CardTitle>
              <CardDescription>Select the guides for your session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
              {prayerTemplates.map((template) => (
              <div
                  key={template.id}
                  className={cn(
                    "w-full justify-start h-auto py-2 px-4 rounded-md flex items-center gap-4",
                    selectedTemplateIds.includes(template.id) ? 'bg-primary/10' : 'bg-secondary text-secondary-foreground'
                  )}
                  onClick={() => handleSelectTemplate(template.id)}
              >
                  <Checkbox 
                    checked={selectedTemplateIds.includes(template.id)} 
                    onCheckedChange={() => handleSelectTemplate(template.id)}
                  />
                  <IconRenderer iconName={template.icon} className="mr-2 h-4 w-4" />
                  <div className="text-left">
                      <p className="font-semibold">{template.title}</p>
                      <p className="text-xs font-normal">{template.description}</p>
                  </div>
              </div>
              ))}
          </CardContent>
      </Card>
      <SessionConfigDialog 
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        templates={prayerTemplates.filter(t => selectedTemplateIds.includes(t.id))}
        onStartSession={handleStartSession}
      />
    </div>
  );
}
