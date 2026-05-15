
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTemplates } from '@/context/TemplateContext';
import type { PrayerTemplate, PrayerPoint } from '@/lib/types';
import { PlusCircle, Trash, UserSquare, Loader2, BookOpen } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface TemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: PrayerTemplate | null;
}

export const TemplateEditor = ({ open, onOpenChange, template: initialTemplate }: TemplateEditorProps) => {
  const { addTemplate, updateTemplate } = useTemplates();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState<PrayerPoint[]>([]);
  const [directReference, setDirectReference] = useState('');
  const [isDirectSearchLoading, setIsDirectSearchLoading] = useState(false);
  const [directReferenceResult, setDirectReferenceResult] = useState<{ reference: string; text: string } | null>(null);
  const [directReferenceError, setDirectReferenceError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTemplate) {
      setTitle(initialTemplate.title);
      setDescription(initialTemplate.description);
      setPoints(initialTemplate.points);
    } else {
      setTitle('');
      setDescription('');
      setPoints([{ title: '', duration: 5 }]);
    }
  }, [initialTemplate]);

  const handlePointChange = (index: number, field: keyof PrayerPoint, value: string | number) => {
    const newPoints = [...points];
    (newPoints[index] as any)[field] = value;
    setPoints(newPoints);
  };

  const addPoint = () => {
    setPoints([...points, { title: '', duration: 5 }]);
  };

  const removePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
  };

  const handleSave = () => {
    const newTemplate: PrayerTemplate = {
      id: initialTemplate ? initialTemplate.id : `template-${Date.now()}`,
      title,
      description,
      icon: initialTemplate?.icon || 'UserSquare', // Default icon as string
      points,
    };

    if (initialTemplate) {
      updateTemplate(newTemplate);
    } else {
      addTemplate(newTemplate);
    }
    onOpenChange(false);
  };

  const handleDirectReferenceSearch = async () => {
    setIsDirectSearchLoading(true);
    setDirectReferenceResult(null);
    setDirectReferenceError(null);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(directReference)}?verse_numbers=true`);
      const data = await response.json();

      if (response.ok && data.text) {
        setDirectReferenceResult({ reference: directReference, text: data.text });
      } else {
        setDirectReferenceError(data.error || 'Verse not found.');
      }
    } catch (e) {
      setDirectReferenceError('Failed to fetch verse. Please try again.');
      console.error(e);
    }
    setIsDirectSearchLoading(false);
  };

  const handleAddVerseAsPoint = () => {
    if (directReferenceResult) {
      addPoint();
      handlePointChange(points.length, 'title', `${directReferenceResult.reference}: ${directReferenceResult.text}`);
      handlePointChange(points.length, 'duration', 1); // Default duration for a verse point
      setDirectReferenceResult(null);
      setDirectReference('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Template Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Template Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div>
            <h4 className="text-sm font-medium mb-2">Prayer Points</h4>
            <div className="space-y-4 md:space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-2 p-3 md:p-0 border md:border-none rounded-lg">
                  <Input
                    placeholder="Point Title"
                    value={point.title}
                    onChange={(e) => handlePointChange(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={point.duration}
                      onChange={(e) => handlePointChange(index, 'duration', parseInt(e.target.value, 10))}
                      className="w-20 md:w-24"
                    />
                    <span className="text-xs text-muted-foreground md:hidden">minutes</span>
                    <Button variant="ghost" size="icon" onClick={() => removePoint(index)} className="ml-auto">
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addPoint} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Point
            </Button>
          </div>

          <hr className="my-4" />

          <div>
            <h4 className="text-sm font-medium mb-2">Add Bible Verse</h4>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="e.g., John 3:16"
                value={directReference}
                onChange={(e) => setDirectReference(e.target.value)}
              />
              <Button onClick={handleDirectReferenceSearch} disabled={isDirectSearchLoading}>
                {isDirectSearchLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Search
              </Button>
            </div>
            {directReferenceResult && (
              <div className="mt-4 p-4 bg-secondary rounded-md">
                <p className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4" />{directReferenceResult.reference}</p>
                <p className="text-muted-foreground">{directReferenceResult.text}</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={handleAddVerseAsPoint}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add as Prayer Point
                </Button>
              </div>
            )}
            {directReferenceError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{directReferenceError}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
