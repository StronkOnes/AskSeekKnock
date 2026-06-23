'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePrayerFromVerse } from '@/ai/flows/generate-prayer-from-verse';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, BookOpen, Sparkles, PlusCircle, ExternalLink, Youtube, Facebook, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bookMapping } from '@/lib/bible-mapping';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
});

type VerseWithPrayer = {
  reference: string;
  text: string;
  prayer?: string;
  isGeneratingPrayer?: boolean;
};

const translations = [
  { code: 'KJV', name: 'King James Version' },
  { code: 'NIV', name: 'New International Version' },
  { code: 'ESV', name: 'English Standard Version' },
  { code: 'ASV', name: 'American Standard Version' },
  { code: 'BBE', name: 'Bible in Basic English' },
];

export default function BibleVersesPage() {
  const [verses, setVerses] = useState<VerseWithPrayer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translation, setTranslation] = useState('KJV');
  const [directReference, setDirectReference] = useState('');
  const [isDirectSearchLoading, setIsDirectSearchLoading] = useState(false);
  const [directReferenceResult, setDirectReferenceResult] = useState<{ reference: string; text: string } | null>(null);
  const [directReferenceError, setDirectReferenceError] = useState<string | null>(null);
  const { toast } = useToast();

  const cleanBibleText = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '')      // Remove all HTML-like tags (e.g., <mark>, <S>2859</S>)
      .replace(/[a-zA-Z]+(\d+)/g, (match, p1) => match.replace(p1, '')) // Remove trailing digits from words (e.g., God2316 -> God)
      .replace(/\s\d+\b/g, ' ')      // Remove standalone numbers that are likely Strong's
      .replace(/\s+/g, ' ')          // Normalize whitespace
      .trim();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function handleDirectReferenceSearch() {
    setIsDirectSearchLoading(true);
    setDirectReferenceResult(null);
    setDirectReferenceError(null);
    
    try {
      // Parse reference (e.g., "John 3:16" or "1 John 1:9")
      const refRegex = /^(\d?\s?[a-zA-Z\s]+)\s(\d+):(\d+)$/;
      const match = directReference.trim().match(refRegex);
      
      if (match) {
        const bookName = match[1].trim();
        const chapter = match[2];
        const verse = match[3];
        
        // Find book ID
        const reverseMapping: { [key: string]: string } = {};
        Object.entries(bookMapping).forEach(([id, name]) => {
          reverseMapping[name.toLowerCase()] = id;
        });
        
        const bookId = reverseMapping[bookName.toLowerCase()];
        
        if (bookId) {
          const response = await fetch(`https://bolls.life/get-verse/${translation}/${bookId}/${chapter}/${verse}/`);
          const data = await response.json();
          
          if (response.ok && data.text) {
            setDirectReferenceResult({ 
              reference: `${bookName} ${chapter}:${verse}`, 
              text: cleanBibleText(data.text) 
            });
            setIsDirectSearchLoading(false);
            return;
          }
        }
      }
      
      // Fallback to general search if parsing fails or verse not found via direct API
      const response = await fetch(`https://bolls.life/search/${translation}/?search=${encodeURIComponent(directReference)}`);
      const data = await response.json();

      if (response.ok && Array.isArray(data) && data.length > 0) {
        const firstMatch = data[0];
        const bookName = firstMatch.book_name || bookMapping[firstMatch.book.toString()] || `Book ${firstMatch.book}`;
        setDirectReferenceResult({ 
          reference: `${bookName} ${firstMatch.chapter}:${firstMatch.verse}`, 
          text: cleanBibleText(firstMatch.text) 
        });
      } else {
        setDirectReferenceError('Verse not found. Please check the spelling and format (e.g., John 3:16).');
      }
    } catch (e) {
      setDirectReferenceError('Failed to fetch verse. Please try again.');
      console.error(e);
    }
    setIsDirectSearchLoading(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setVerses([]);
    try {
      const response = await fetch(`https://bolls.life/search/${translation}/?search=${encodeURIComponent(values.topic)}`);
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        if (data.length === 0) {
          setError('No verses found for this topic.');
        } else {
          const formattedVerses = data.slice(0, 10).map((v: any) => {
            const bookName = v.book_name || bookMapping[v.book.toString()] || `Book ${v.book}`;
            return {
              reference: `${bookName} ${v.chapter}:${v.verse}`,
              text: cleanBibleText(v.text),
            };
          });
          setVerses(formattedVerses);
        }
      } else {
        setError('Failed to find verses. Please try a different topic or translation.');
      }
    } catch (e) {
      setError('Failed to find verses. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  }

  async function handleGeneratePrayer(verse: string, index: number) {
    setVerses((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, isGeneratingPrayer: true } : v
      )
    );
    try {
      const result = await generatePrayerFromVerse({ bibleVerse: verse });
      setVerses((prev) =>
        prev.map((v, i) =>
          i === index
            ? { ...v, prayer: result.prayer, isGeneratingPrayer: false }
            : v
        )
      );
    } catch (e) {
      setError('Failed to generate prayer. Please try again.');
      console.error(e);
      setVerses((prev) =>
        prev.map((v, i) =>
          i === index ? { ...v, isGeneratingPrayer: false } : v
        )
      );
    }
  }

  const handleAddToSession = (verse: string) => {
    console.log('Added to session:', verse);
    toast({
      title: 'Verse Added',
      description: `"${verse}" has been added to your prayer session.`,
    });
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Bible Verse Locator
        </h2>
        <p className="text-muted-foreground">
          Find relevant Bible verses for any topic and generate a prayer.
        </p>
      </div>

      <div className="flex items-center gap-4 w-full lg:max-w-[calc(50%-1rem)]">
        <div className="w-full">
          <label className="text-sm font-medium mb-1 block">Select Translation</label>
          <Select value={translation} onValueChange={setTranslation}>
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select Translation" />
            </SelectTrigger>
            <SelectContent>
              {translations.map((t) => (
                <SelectItem key={t.code} value={t.code}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-blocksy border-none">
          <CardHeader>
            <CardTitle>Find Verses</CardTitle>
            <CardDescription>
              Enter a topic below to discover related Bible verses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Faith, Love, Forgiveness" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Find Verses
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleAddToSession(form.getValues().topic || 'Search Result')}
                    className="flex-1"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add To Prayer Session
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-blocksy border-none">
          <CardHeader>
            <CardTitle>Search by Reference</CardTitle>
            <CardDescription>
              Enter a Bible verse reference (e.g., John 3:16) to find its text.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Enter Keyword</FormLabel>
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
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleAddToSession(directReference || 'Reference Search')}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add To Prayer Session
              </Button>
            </div>
            {directReferenceResult && (
              <div className="mt-4 p-4 bg-secondary rounded-md">
                <p className="font-semibold">{directReferenceResult.reference}</p>
                <p className="text-muted-foreground">{directReferenceResult.text}</p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => handleAddToSession(directReferenceResult.reference)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add to Session
                </Button>
              </div>
            )}
            {directReferenceError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{directReferenceError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      
      {error && (
         <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {verses.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <h3 className="text-2xl font-semibold font-headline">Results</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {verses.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {item.reference}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.text}</p>
                  {item.prayer ? (
                      <Alert>
                          <Sparkles className="h-4 w-4" />
                          <AlertTitle>Generated Prayer</AlertTitle>
                          <AlertDescription className="whitespace-pre-wrap">{item.prayer}</AlertDescription>
                      </Alert>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Click the button to generate a prayer from this verse.
                    </p>
                  )}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    onClick={() => handleGeneratePrayer(item.text, index)}
                    disabled={item.isGeneratingPrayer || !!item.prayer}
                  >
                    {item.isGeneratingPrayer && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate Prayer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAddToSession(item.reference)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Session
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Mentorship Hub Section */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight font-headline">
            Doctrinal Truths & Prophetic Insights by Ps TL Immanuel
          </h3>
          <p className="text-muted-foreground">
            Mentorship and spiritual guidance from my father in the faith.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow border-none shadow-blocksy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                BLADE Daily Devotional
              </CardTitle>
              <CardDescription>Published on Facebook and WhatsApp Community.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Daily spiritual nourishment and insights to sharpen your faith.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.facebook.com/ps.tl.immanuel" target="_blank" rel="noopener noreferrer">
                  View on Facebook <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-none shadow-blocksy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Articles
              </CardTitle>
              <CardDescription>Deep dives into spiritual truths.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Weekly articles such as "THE ANGEL OF DEATH IS NEAR" and more.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.facebook.com/ps.tl.immanuel" target="_blank" rel="noopener noreferrer">
                  Read Articles <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-none shadow-blocksy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-destructive" />
                YouTube Church Service
              </CardTitle>
              <CardDescription>Weekly streamed services.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Watch weekly services held on Saturdays via Christian Consulate Church.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.youtube.com/@ChristianConsulateChurch" target="_blank" rel="noopener noreferrer">
                  Watch on YouTube <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}