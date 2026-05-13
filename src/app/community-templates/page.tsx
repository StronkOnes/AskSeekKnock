'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { communityPrayerTemplates } from '@/lib/data';
import type { PrayerTemplate } from '@/lib/types';
import { Timer } from '@/components/timer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users } from 'lucide-react';
import { ShareButtons } from '@/components/share-buttons';
import { Separator } from '@/components/ui/separator';
import { IconRenderer } from '@/components/icon-renderer';

export default function CommunityTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<PrayerTemplate | null>(null);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  const handleSelectTemplate = (template: PrayerTemplate) => {
    setSelectedTemplate(template);
    setCurrentPointIndex(0);
  };

  const handleTimerComplete = () => {
    if (selectedTemplate && currentPointIndex < selectedTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else {
       // Last point finished
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Community Templates
        </h2>
        <p className="text-muted-foreground">
          Explore prayer guides created by other users.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Community Prayer Templates</CardTitle>
                    <CardDescription>Select a guide for your session.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {communityPrayerTemplates.map((template) => (
                    <Button
                        key={template.id}
                        variant={selectedTemplate?.id === template.id ? 'default' : 'secondary'}
                        className="w-full justify-start h-auto py-2"
                        onClick={() => handleSelectTemplate(template)}
                    >
                        <IconRenderer iconName={template.icon} className="mr-2 h-4 w-4" />
                        <div className="text-left">
                            <p className="font-semibold">{template.title}</p>
                            <p className="text-xs font-normal">{template.description}</p>
                        </div>
                    </Button>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
            {selectedTemplate ? (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconRenderer iconName={selectedTemplate.icon} className="h-6 w-6"/>
                        {selectedTemplate.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Current Focus:</h3>
                        <p className="text-2xl font-bold text-primary">{selectedTemplate.points[currentPointIndex].title}</p>
                    </div>

                    <Timer 
                        initialMinutes={selectedTemplate.points[currentPointIndex].duration} 
                        onComplete={handleTimerComplete}
                        timerKey={`${selectedTemplate.id}-${currentPointIndex}`}
                    />
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Up Next:</h3>
                        <ul className="space-y-2">
                            {selectedTemplate.points.map((point, index) => (
                                <li key={point.title} className={cn("flex items-center gap-2 text-muted-foreground", {
                                    'text-foreground font-semibold': index === currentPointIndex,
                                    'line-through': index < currentPointIndex
                                })}>
                                   {index < currentPointIndex ? <CheckCircle className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4" /> }
                                    <span>{point.title} ({point.duration} min)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Separator className="my-4"/>
                    <ShareButtons 
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        title={selectedTemplate.title} 
                    />
                </CardFooter>
            </Card>
            ) : (
                <Card className="flex items-center justify-center h-96">
                    <CardContent className="flex flex-col items-center text-center">
                        <Users className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Select a community template to begin your prayer session.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
