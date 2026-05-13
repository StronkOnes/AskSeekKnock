'use client';

import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { sermonNotes as initialNotes } from '@/lib/data';
import type { SermonNote } from '@/lib/types';
import { ClipboardEdit, PlusCircle, Save, Edit, Tag, Bold, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  topic: z.string().min(2, { message: 'Topic must be at least 2 characters.' }),
});

export default function SermonsPage() {
  const [notes, setNotes] = useState<SermonNote[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<SermonNote | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const editEditorRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      topic: '',
    },
  });
  
  const editingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
    if (editEditorRef.current) editEditorRef.current.focus();
  };

  const handleAddNote = (values: z.infer<typeof formSchema>) => {
    const content = editorRef.current?.innerHTML || '';
    if (content.length < 10) {
      toast({
        title: 'Content too short',
        description: 'Sermon notes must be at least 10 characters.',
        variant: 'destructive',
      });
      return;
    }

    const newSermonNote: SermonNote = {
      id: `sermon-${Date.now()}`,
      timestamp: Date.now(),
      content: content,
      ...values,
    };
    setNotes([newSermonNote, ...notes]);
    form.reset();
    if (editorRef.current) editorRef.current.innerHTML = '';
    toast({
      title: 'Sermon Note Saved',
      description: 'Your sermon notes have been successfully saved.',
    });
  };

  const handleUpdateNote = (values: z.infer<typeof formSchema>) => {
    if (!editingNote) return;
    const content = editEditorRef.current?.innerHTML || '';

    setNotes(
      notes.map((note) =>
        note.id === editingNote.id ? { ...note, ...values, content } : note
      )
    );
    setEditingNote(null);
    toast({
        title: 'Sermon Note Updated',
        description: 'Your sermon notes have been successfully updated.',
    });
  };
  
  const startEditing = (note: SermonNote) => {
    setEditingNote(note);
    editingForm.reset({
        title: note.title,
        topic: note.topic,
    });
    // We'll set innerHTML in useEffect or similar if needed, 
    // but for Dialog we can try setting it after it opens.
    setTimeout(() => {
        if (editEditorRef.current) {
            editEditorRef.current.innerHTML = note.content;
        }
    }, 0);
  }
  
  const notesByTopic = notes.reduce((acc, note) => {
    (acc[note.topic] = acc[note.topic] || []).push(note);
    return acc;
  }, {} as Record<string, SermonNote[]>);

  const Toolbar = () => (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50 rounded-t-md">
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('bold')} title="Bold">
        <Bold className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('underline')} title="Underline">
        <Underline className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
        <List className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('insertOrderedList')} title="Numbered List">
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('justifyLeft')} title="Align Left">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('justifyCenter')} title="Align Center">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => execCommand('justifyRight')} title="Align Right">
        <AlignRight className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <Select onValueChange={(value) => execCommand('fontSize', value)}>
        <SelectTrigger className="w-[80px] h-8 text-xs border-none bg-transparent">
          <Type className="h-3 w-3 mr-1" />
          Size
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">Small</SelectItem>
            <SelectItem value="3">Normal</SelectItem>
            <SelectItem value="5">Large</SelectItem>
            <SelectItem value="7">Extra Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Sermon Notes
        </h2>
        <p className="text-muted-foreground">
          Record and organize insights from sermons and teachings with rich text formatting.
        </p>
      </div>
      
      <Dialog open={!!editingNote} onOpenChange={(isOpen) => !isOpen && setEditingNote(null)}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Sermon Note</DialogTitle>
            </DialogHeader>
            <Form {...editingForm}>
            <form onSubmit={editingForm.handleSubmit(handleUpdateNote)} className="space-y-4 py-4">
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={editingForm.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                            <Input placeholder="Sermon Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={editingForm.control}
                        name="topic"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic / Theme</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Faith, Grace" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <FormLabel>Notes</FormLabel>
                    <div className="border rounded-md shadow-sm bg-background">
                        <Toolbar />
                        <div
                            ref={editEditorRef}
                            contentEditable
                            className="p-4 min-h-[300px] focus:outline-none overflow-y-auto max-h-[500px]"
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    execCommand('indent');
                                }
                            }}
                        />
                    </div>
                 </div>

                 <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>New Sermon Note</CardTitle>
                    <CardDescription>Fill out the details below to add a new sermon note.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddNote)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., The Parable of the Sower" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic / Theme</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Faith, Love" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <FormLabel>Notes</FormLabel>
                                <div className="border rounded-md shadow-sm bg-background">
                                    <Toolbar />
                                    <div
                                        ref={editorRef}
                                        contentEditable
                                        className="p-4 min-h-[200px] focus:outline-none overflow-y-auto max-h-[400px]"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Tab') {
                                                e.preventDefault();
                                                execCommand('indent');
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Note
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold font-headline pb-4">Past Notes</h3>
            {Object.keys(notesByTopic).length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(notesByTopic).map(([topic, topicNotes]) => (
                         <AccordionItem value={topic} key={topic}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    {topic} ({topicNotes.length})
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                {topicNotes.map((note) => (
                                <Card key={note.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between text-lg">
                                            <span>{note.title}</span>
                                            <Button variant="ghost" size="icon" onClick={() => startEditing(note)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>{format(new Date(note.timestamp), 'PPP p')}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div 
                                            className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                                            dangerouslySetInnerHTML={{ __html: note.content }}
                                        />
                                    </CardContent>
                                </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                 <p className="text-muted-foreground">You haven't added any sermon notes yet. Use the form to get started.</p>
            )}
        </div>
      </div>
    </div>
  );
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
