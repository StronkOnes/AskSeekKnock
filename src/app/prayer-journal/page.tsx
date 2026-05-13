'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useJournal } from '@/context/JournalContext';
import type { JournalEntry, JournalCategory } from '@/lib/types';
import { JournalEditor } from '@/components/journal-editor';
import { PlusCircle, Edit, Trash, FileDown, History } from 'lucide-react';
import { format } from 'date-fns';

export default function PrayerJournalPage() {
  const { entries, deleteEntry } = useJournal();
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const handleNewEntry = () => {
    setEditingEntry(null);
    setIsEditorOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsEditorOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteEntry(entryId);
  };

  const handleExportPDF = (entry: JournalEntry) => {
    // Placeholder for jsPDF implementation
    // The user needs to install jspdf: npm install jspdf
    console.log('Exporting as PDF:', entry);
    const content = `Category: ${entry.category}\nDate: ${new Date(entry.timestamp).toLocaleString()}\n${entry.lastEdited ? `Last Edited: ${new Date(entry.lastEdited).toLocaleString()}\n` : ''}\nContent:\n${entry.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal-entry-${entry.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries = entries
    .filter(entry => selectedCategory === 'all' || entry.category === selectedCategory)
    .filter(entry => !selectedDate || new Date(entry.timestamp).toDateString() === selectedDate.toDateString());

  const entryDates = entries.map(entry => new Date(entry.timestamp));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Journal
          </h2>
          <p className="text-muted-foreground">
            Your personal space for reflection and spiritual insights.
          </p>
        </div>
        <Button onClick={handleNewEntry}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <Tabs defaultValue="entries">
        <TabsList>
          <TabsTrigger value="entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          <Card>
            <CardHeader>
              <CardTitle>Your Entries</CardTitle>
              <CardDescription>
                <Select onValueChange={(value: JournalCategory | 'all') => setSelectedCategory(value)} defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Reflections">Reflections</SelectItem>
                    <SelectItem value="Words">Words</SelectItem>
                    <SelectItem value="Revelations">Revelations</SelectItem>
                    <SelectItem value="Dreams">Dreams</SelectItem>
                  </SelectContent>
                </Select>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEntries.map(entry => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {entry.category}
                          {entry.lastEdited && (
                            <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                              <History className="h-3 w-3" />
                              Edited {format(new Date(entry.lastEdited), 'MMM d, p')}
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>{format(new Date(entry.timestamp), 'PPP p')}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleExportPDF(entry)} title="Export as PDF">
                          <FileDown className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={{ hasEntry: entryDates }}
                    modifiersStyles={{ hasEntry: { fontWeight: 'bold' } }}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Entries for {selectedDate ? selectedDate.toLocaleDateString() : 'Today'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map(entry => (
                      <Card key={entry.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{entry.category}</CardTitle>
                              <CardDescription>{new Date(entry.timestamp).toLocaleDateString()}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{entry.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p>No entries for this date.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <JournalEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        entry={editingEntry}
      />
    </div>
  );
}