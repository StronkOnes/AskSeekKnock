
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { JournalEntry } from '@/lib/types';
import { journalEntries as initialJournalEntries } from '@/lib/data';

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  updateEntry: (entry: JournalEntry) => void;
  deleteEntry: (entryId: string) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedEntries = localStorage.getItem('journalEntries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        } else {
          setEntries(initialJournalEntries);
        }
      } catch (error) {
        console.error("Failed to parse journal entries from localStorage", error);
        setEntries(initialJournalEntries);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
      } catch (error) {
        console.error("Failed to save journal entries to localStorage", error);
      }
    }
  }, [entries]);

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
      timestamp: Date.now(),
    };
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const updateEntry = (updatedEntry: JournalEntry) => {
    const entryWithEdit = {
      ...updatedEntry,
      lastEdited: Date.now(),
    };
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === updatedEntry.id ? entryWithEdit : entry
      )
    );
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prevEntries =>
      prevEntries.filter(entry => entry.id !== entryId)
    );
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
