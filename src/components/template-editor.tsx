
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTemplates } from '@/context/TemplateContext';
import type { PrayerTemplate, PrayerPoint } from '@/lib/types';
import { PlusCircle, Trash, Loader2, BookOpen } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'reference' | 'keyword'>('reference');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{ reference: string; text: string } | null>(null);
  const [keywordResults, setKeywordResults] = useState<{ reference: string; text: string }[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [verseSearchPointIndex, setVerseSearchPointIndex] = useState<number | null>(null);

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
      icon: initialTemplate?.icon || 'UserSquare',
      points,
    };

    if (initialTemplate) {
      updateTemplate(newTemplate);
    } else {
      addTemplate(newTemplate);
    }
    onOpenChange(false);
  };

  const cleanText = (text: string) =>
    text.replace(/<[^>]*>/g, '').replace(/[a-zA-Z]+\d+/g, (m) => m.replace(/\d+/g, '')).replace(/\s\d+\b/g, ' ').replace(/\s+/g, ' ').trim();

  const handleSearch = async () => {
    if (verseSearchPointIndex === null || !searchQuery.trim()) return;
    setIsSearchLoading(true);
    setSearchResult(null);
    setKeywordResults([]);
    setSearchError(null);

    try {
      const param = searchMode === 'reference' ? 'reference' : 'keyword';
      const response = await fetch(`/api/bible/verses?${param}=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (!response.ok) {
        setSearchError(data.error || 'Search failed. Please try again.');
        setIsSearchLoading(false);
        return;
      }

      if (searchMode === 'reference' && data.text) {
        setSearchResult({
          reference: data.reference || searchQuery.trim(),
          text: cleanText(data.text),
        });
      } else if (searchMode === 'keyword' && Array.isArray(data) && data.length > 0) {
        setKeywordResults(
          data.slice(0, 15).map((v: any) => {
            const bookName = v.book_name || v.book || 'Unknown';
            return {
              reference: `${bookName} ${v.chapter}:${v.verse}`,
              text: cleanText(v.text),
            };
          })
        );
      } else {
        setSearchError('No verses found. Try a different search term.');
      }
    } catch (e) {
      setSearchError('Network error. Please check your connection and try again.');
      console.error(e);
    }
    setIsSearchLoading(false);
  };

  const handleAddVerse = (verse: { reference: string; text: string }) => {
    if (verseSearchPointIndex === null) return;
    const newPoints = [...points];
    newPoints[verseSearchPointIndex] = {
      ...newPoints[verseSearchPointIndex],
      bibleVerse: verse.reference,
      bibleVerseText: verse.text,
    };
    setPoints(newPoints);
    setSearchResult(null);
    setKeywordResults([]);
    setSearchQuery('');
    setVerseSearchPointIndex(null);
  };

  const handleRemoveVerse = (index: number) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], bibleVerse: undefined, bibleVerseText: undefined };
    setPoints(newPoints);
  };

  const isReferenceFormat = (value: string) =>
    /^\d?\s?[a-zA-Z\s]+\s\d+:\d+$/.test(value.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{initialTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[calc(90vh-10rem)]">
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
            <div className="space-y-3">
              {points.map((point, index) => (
                <div key={index} className="flex flex-col gap-2 p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-start gap-2">
                    <Input
                      placeholder="Point Title"
                      value={point.title}
                      onChange={(e) => handlePointChange(index, 'title', e.target.value)}
                      className="flex-1 min-w-0"
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={point.duration}
                        onChange={(e) => handlePointChange(index, 'duration', parseInt(e.target.value, 10))}
                        className="w-20"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removePoint(index)} className="h-8 w-8 flex-shrink-0">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => setVerseSearchPointIndex(verseSearchPointIndex === index ? null : index)}
                      >
                        <BookOpen className={`h-4 w-4 ${verseSearchPointIndex === index ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                    </div>
                  </div>

                  {verseSearchPointIndex === index && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => { setSearchMode('reference'); setSearchQuery(''); setSearchResult(null); setKeywordResults([]); setSearchError(null); }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${searchMode === 'reference' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                        >
                          By Reference
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSearchMode('keyword'); setSearchQuery(''); setSearchResult(null); setKeywordResults([]); setSearchError(null); }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${searchMode === 'keyword' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                        >
                          By Topic
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder={searchMode === 'reference' ? 'e.g., John 3:16' : 'e.g., Faith, Love, Prayer'}
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); if (searchMode === 'keyword') setSearchError(null); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
                          className="flex-1 min-w-0"
                        />
                        <Button
                          onClick={handleSearch}
                          disabled={isSearchLoading || !searchQuery.trim()}
                          size="sm"
                          className="flex-shrink-0"
                        >
                          {isSearchLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Search
                        </Button>
                      </div>
                    </div>
                  )}

                  {searchResult && verseSearchPointIndex === index && (
                    <div className="p-3 bg-secondary rounded-md space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate">{searchResult.reference}</p>
                        <Button variant="outline" size="sm" onClick={() => handleAddVerse(searchResult)} className="flex-shrink-0">
                          <PlusCircle className="mr-1 h-3 w-3" />
                          Add
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{searchResult.text}</p>
                    </div>
                  )}

                  {keywordResults.length > 0 && verseSearchPointIndex === index && (
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2 bg-background">
                      <p className="text-xs font-medium text-muted-foreground px-1">{keywordResults.length} verse{keywordResults.length > 1 ? 's' : ''} found</p>
                      {keywordResults.map((verse, vi) => (
                        <div key={vi} className="p-2 border rounded-md hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-semibold text-xs text-primary truncate">{verse.reference}</p>
                            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleAddVerse(verse)}>
                              <PlusCircle className="mr-1 h-3 w-3" />
                              Add
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{verse.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchError && verseSearchPointIndex === index && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-xs">{searchError}</AlertDescription>
                    </Alert>
                  )}

                  {point.bibleVerse && verseSearchPointIndex !== index && (
                    <div className="p-2 bg-primary/5 border border-primary/20 rounded-md flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen className="h-3 w-3 text-primary flex-shrink-0" />
                        <span className="font-medium text-primary text-xs truncate">{point.bibleVerse}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => handleRemoveVerse(index)}>
                        <Trash className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                  )}

                  {point.bibleVerseText && verseSearchPointIndex !== index && (
                    <p className="text-xs text-muted-foreground leading-relaxed bg-background rounded p-2 border">
                      {point.bibleVerseText}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addPoint} className="mt-2">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Point
            </Button>
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
