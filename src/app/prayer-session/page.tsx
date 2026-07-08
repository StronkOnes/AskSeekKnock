'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prayerTemplates } from '@/lib/data';
import type { PrayerTemplate } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { SessionConfigDialog } from '@/components/session-config-dialog';
import { IconRenderer } from '@/components/icon-renderer';
import { useTemplates } from '@/context/TemplateContext';

const TEMPLATE_SLIDE_FOLDERS: Record<string, string> = {
  'template-1': '/ASK - Everyday Prayer Items - Template',
  'template-2': '/ASK - Prayers Against Witchcraft - Template',
  'template-3': '/PrayersForRestoration - Template',
};

const OFFICIAL_TEMPLATE_IDS = new Set(prayerTemplates.map(t => t.id));

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PrayerSessionPage() {
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [sessionTemplates, setSessionTemplates] = useState<PrayerTemplate[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [slideError, setSlideError] = useState(false);
  const sessionRef = useRef<HTMLDivElement>(null);

  const { templates: userTemplates } = useTemplates();
  const filteredUserTemplates = userTemplates.filter(t => !OFFICIAL_TEMPLATE_IDS.has(t.id));

  const isOfficialTemplate = (id: string) => OFFICIAL_TEMPLATE_IDS.has(id);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      sessionRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const setupTimer = useCallback((minutes: number) => {
    setTimerSeconds(minutes * 60);
    setTimerActive(false);
  }, []);

  useEffect(() => {
    if (sessionTemplates.length > 0 && currentTemplate && currentPoint) {
      setupTimer(currentPoint.duration);
      setSlideError(false);
    }
  }, [currentTemplateIndex, currentPointIndex, sessionTemplates]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      handleTimerComplete();
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerActive, timerSeconds]);

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
      setSessionTemplates([]);
    }
  };

  const handlePreviousClick = () => {
    if (currentPointIndex > 0) {
      setCurrentPointIndex(prev => prev - 1);
    } else if (currentTemplateIndex > 0) {
      const prevTemplate = sessionTemplates[currentTemplateIndex - 1];
      setCurrentTemplateIndex(prev => prev - 1);
      setCurrentPointIndex(prevTemplate.points.length - 1);
    }
  };

  const handleTimerComplete = () => {
    const currentTemplate = sessionTemplates[currentTemplateIndex];
    if (currentPointIndex < currentTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else if (currentTemplateIndex < sessionTemplates.length - 1) {
      setCurrentTemplateIndex(prev => prev + 1);
      setCurrentPointIndex(0);
    } else {
      setSessionTemplates([]);
    }
  };

  const currentTemplate = sessionTemplates[currentTemplateIndex];
  const currentPoint = currentTemplate?.points[currentPointIndex];
  const isOfficial = currentTemplate ? isOfficialTemplate(currentTemplate.id) : true;

  const slideFolder = currentTemplate ? TEMPLATE_SLIDE_FOLDERS[currentTemplate.id] : null;
  const slideUrl = slideFolder && !slideError
    ? `${slideFolder}/Slide${currentPointIndex + 1}.jpeg`
    : null;

  if (sessionTemplates.length > 0 && currentTemplate && currentPoint) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8">
        <div
          ref={sessionRef}
          className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          {slideUrl ? (
            <img
              src={slideUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
              onError={() => setSlideError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${isOfficial ? '/PrayerTemplateSlideDarkMode_JPG.png' : '/PrayerTemplateSlide_JPG.jfif'})`,
              }}
            >
              {isOfficial && <div className="absolute inset-0 bg-black/30" />}
            </div>
          )}

          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreenToggle}
              className="rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSessionTemplates([])}
              className="rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 backdrop-blur-sm text-xs"
            >
              End Session
            </Button>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg">
              <span className="text-3xl font-mono font-bold text-white tabular-nums tracking-wider">
                {formatTime(timerSeconds)}
              </span>
              <div className="h-6 w-px bg-white/20" />
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="rounded-full bg-white/15 hover:bg-white/25 p-2 transition-colors"
              >
                {timerActive ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
              </button>
              <button
                onClick={() => setupTimer(currentPoint.duration)}
                className="rounded-full bg-white/15 hover:bg-white/25 p-2 transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div
            className="absolute left-0 inset-y-0 w-24 z-20 group flex items-center cursor-pointer"
            onClick={handlePreviousClick}
          >
            <div className={cn(
              "opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start pl-3 w-full h-full",
              currentTemplateIndex === 0 && currentPointIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
            )}>
              <div className={cn(
                "rounded-full bg-black/50 backdrop-blur-sm p-2",
                currentTemplateIndex === 0 && currentPointIndex === 0 ? 'opacity-30' : ''
              )}>
                <ChevronLeft className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 inset-y-0 w-24 z-20 group flex items-center cursor-pointer"
            onClick={handleNextClick}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-end pr-3 w-full h-full">
              <div className="rounded-full bg-black/50 backdrop-blur-sm p-2">
                <ChevronRight className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <div className="flex gap-1 h-1 max-w-md mx-auto rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              {sessionTemplates.map((t, tIdx) =>
                t.points.map((p, pIdx) => {
                  const isPast = tIdx < currentTemplateIndex || (tIdx === currentTemplateIndex && pIdx < currentPointIndex);
                  const isCurrent = tIdx === currentTemplateIndex && pIdx === currentPointIndex;
                  return (
                    <div
                      key={`${t.id}-${pIdx}`}
                      className={cn(
                        "flex-1 transition-all duration-500 rounded-full",
                        isPast ? "bg-primary/60" : isCurrent ? "bg-primary" : "bg-transparent"
                      )}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
      </div>

      <Card>
          <CardHeader>
              <CardTitle>A.S.K. Templates</CardTitle>
              <CardDescription>Select the official guides for your session.</CardDescription>
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

      {filteredUserTemplates.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Your Templates</CardTitle>
                <CardDescription>Your custom prayer guides.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {filteredUserTemplates.map((template) => (
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
      )}

      {selectedTemplateIds.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={handleOpenConfigDialog} size="lg" className="px-12 h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-full">
            Start Session
          </Button>
        </div>
      )}

      <SessionConfigDialog 
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        templates={[...prayerTemplates, ...filteredUserTemplates].filter(t => selectedTemplateIds.includes(t.id))}
        onStartSession={handleStartSession}
      />
    </div>
  );
}
