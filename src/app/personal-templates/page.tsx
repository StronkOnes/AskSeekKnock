
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PrayerTemplate } from '@/lib/types';
import { Timer } from '@/components/timer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, UserSquare, PlusCircle, Edit, Trash, Share2, FileDown, Lock, List } from 'lucide-react';
import { useTemplates } from '@/context/TemplateContext';
import { TemplateEditor } from '@/components/template-editor';
import { askPrayerTemplates } from '@/lib/ask-templates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PersonalTemplatesPage() {
  const { templates, deleteTemplate } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<PrayerTemplate | null>(null);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PrayerTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'ask'>('personal');

  const handleSelectTemplate = (template: PrayerTemplate) => {
    setSelectedTemplate(template);
    setCurrentPointIndex(0);
  };

  const handleTimerComplete = () => {
    if (selectedTemplate && currentPointIndex < selectedTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    }
  }

  const handleCreate = () => {
    setEditingTemplate(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, template: PrayerTemplate) => {
    e.stopPropagation();
    setEditingTemplate(template);
    setIsEditorOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation();
    deleteTemplate(templateId);
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
  };

  const handleExportPDF = (e: React.MouseEvent, template: PrayerTemplate) => {
    e.stopPropagation();
    console.log('Exporting Template as PDF:', template.title);
    const content = `Template: ${template.title}\nDescription: ${template.description}\n\nPoints:\n${template.points.map(p => `- ${p.title} (${p.duration} min)`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = (e: React.MouseEvent, template: PrayerTemplate) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Prayer Template: ${template.title}`,
        text: template.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast({
        title: 'Share Link Copied',
        description: 'Template link has been copied to your clipboard.',
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Templates
          </h2>
          <p className="text-muted-foreground">
            Curated and personal prayer guides.
          </p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 rounded-lg">
          <TabsTrigger value="personal" className="px-6">Personal Templates</TabsTrigger>
          <TabsTrigger value="ask" className="px-6">A.S.K. Templates</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1 space-y-4">
              <TabsContent value="personal" className="mt-0 space-y-4">
                <Card className="shadow-blocksy border-none h-full">
                    <CardHeader>
                        <CardTitle>Personal Templates</CardTitle>
                        <CardDescription>Guides created by you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {templates.map((template) => (
                        <Button
                            key={template.id}
                            variant={selectedTemplate?.id === template.id ? 'default' : 'secondary'}
                            className="w-full justify-between h-auto py-3 px-4"
                            onClick={() => handleSelectTemplate(template)}
                        >
                            <div className="flex items-center max-w-[60%]">
                                <div className="text-left overflow-hidden">
                                    <p className="font-semibold truncate">{template.title}</p>
                                    <p className="text-xs font-normal truncate opacity-70">{template.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleShare(e, template)}>
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleExportPDF(e, template)}>
                                    <FileDown className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => handleDelete(e, template.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </Button>
                        ))}
                        {templates.length === 0 && (
                          <p className="text-center py-4 text-muted-foreground text-sm italic">No personal templates yet.</p>
                        )}
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ask" className="mt-0 space-y-4 h-full">
                <Card className="shadow-blocksy border-none h-full">
                    <CardHeader>
                        <CardTitle>Official A.S.K. Guides</CardTitle>
                        <CardDescription>Curated spiritual structures.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {askPrayerTemplates.map((template) => (
                        <Button
                            key={template.id}
                            variant={selectedTemplate?.id === template.id ? 'default' : 'secondary'}
                            className="w-full justify-between h-auto py-3 px-4"
                            onClick={() => handleSelectTemplate(template)}
                        >
                            <div className="flex items-center">
                                <div className="text-left">
                                    <p className="font-semibold">{template.title}</p>
                                    <p className="text-xs font-normal opacity-70">{template.description}</p>
                                </div>
                            </div>
                            <Lock className="h-4 w-4 opacity-30" />
                        </Button>
                        ))}
                    </CardContent>
                </Card>
              </TabsContent>
          </div>

          <div className="lg:col-span-1">
              <TabsContent value="personal" className="mt-0 h-full">
                <Card 
                  className="flex flex-col items-center justify-center p-6 text-center border-dashed border-2 h-full bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors group"
                  onClick={handleCreate}
                >
                    <PlusCircle className="h-16 w-16 text-primary mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-2xl mb-2">Create New Template</CardTitle>
                    <p className="text-muted-foreground mb-6 max-w-[250px]">Start building a custom prayer structure tailored to your spiritual needs.</p>
                    <Button onClick={handleCreate} size="lg" className="h-12 px-8">
                        Get Started
                    </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="ask" className="mt-0 h-full">
                <Card className="flex items-center justify-center h-full border-none shadow-inner bg-muted/20">
                    <CardContent className="flex flex-col items-center text-center max-w-xs">
                        <UserSquare className="h-16 w-16 text-muted-foreground mb-6 opacity-20" />
                        <h3 className="text-xl font-bold mb-2">A.S.K. Methodology</h3>
                        <p className="text-muted-foreground">Select an official template to learn the A.S.K. way of prayer.</p>
                    </CardContent>
                </Card>
              </TabsContent>
          </div>
        </div>

        {selectedTemplate && (
          <div className="mt-8">
              <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/30">
                  <CardHeader className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                      <CardTitle className="flex items-center justify-between">
                          <span className="text-2xl">{selectedTemplate.title}</span>
                          {activeTab === 'ask' && (
                            <span className="text-[10px] uppercase tracking-widest bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">
                              Official Content
                            </span>
                          )}
                      </CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-8">
                      <div className="text-center space-y-4 py-8 bg-background/40 rounded-2xl border">
                          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Current Point</h3>
                          <p className="text-4xl font-black text-primary tracking-tight px-4">{selectedTemplate.points[currentPointIndex].title}</p>
                      </div>

                      <Timer 
                          initialMinutes={selectedTemplate.points[currentPointIndex].duration} 
                          onComplete={handleTimerComplete}
                          timerKey={`${selectedTemplate.id}-${currentPointIndex}`}
                      />
                      
                      <div className="space-y-4">
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            <List className="h-5 w-5 text-primary" />
                            Session Roadmap
                          </h3>
                          <div className="grid gap-2">
                              {selectedTemplate.points.map((point, index) => (
                                  <div key={index} className={cn("flex items-center justify-between p-3 rounded-lg border transition-all", {
                                      'bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]': index === currentPointIndex,
                                      'bg-muted/50 opacity-50 grayscale': index < currentPointIndex,
                                      'bg-background': index > currentPointIndex
                                  })}>
                                     <div className="flex items-center gap-3">
                                       <span className="text-xs font-bold opacity-50 w-4">{index + 1}.</span>
                                       <span className="font-medium">{point.title}</span>
                                     </div>
                                     <span className="text-xs font-mono">{point.duration}m</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                      
                      {/* Uniform End Slide Concept */}
                      {currentPointIndex === selectedTemplate.points.length - 1 && (
                        <div className="mt-8 p-6 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 text-center animate-bounce">
                           <p className="text-lg font-bold text-primary">HALLELUYAH! Prayer Session Complete</p>
                           <p className="text-sm text-muted-foreground mt-1 tracking-widest uppercase">Brand Uniformity • A.S.K.</p>
                        </div>
                      )}
                  </CardContent>
              </Card>
              ) : (
                  <Card className="flex items-center justify-center h-[600px] border-none shadow-inner bg-muted/20">
                      <CardContent className="flex flex-col items-center text-center max-w-xs">
                          <UserSquare className="h-16 w-16 text-muted-foreground mb-6 opacity-20" />
                          <h3 className="text-xl font-bold mb-2">Ready to Pray?</h3>
                          <p className="text-muted-foreground">Select a template from the left to load your session structure.</p>
                      </CardContent>
                  </Card>
              )}
          </div>
        </div>
      </Tabs>
      <TemplateEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        template={editingTemplate}
      />
    </div>
  );
}

import { useToast } from '@/hooks/use-toast';
