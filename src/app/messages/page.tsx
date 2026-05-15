'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Send, Inbox, User, Search, PlusCircle, ArrowLeft, Users as UsersIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function MessagesPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
    setIsLoading(false);
  };

  const handleUserSearch = async (query: string) => {
    setUserSearchQuery(query);
    if (query.length < 1) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setSearchResults(data.filter((u: any) => u.id !== session?.user?.id));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('User search failed:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSendMessage = async () => {
    if (!selectedUser || !newMessageContent.trim()) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedUser.id,
          content: newMessageContent,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent',
          description: `Your message to ${selectedUser.name} has been sent.`,
        });
        setNewMessageContent('');
        setSelectedUser(null);
        setUserSearchQuery('');
        setSearchResults([]);
        setIsNewMessageDialogOpen(false);
        fetchMessages();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    }
    setIsSending(false);
  };

  const inboxMessages = messages.filter(m => m.receiverId === session?.user?.id);
  const sentMessages = messages.filter(m => m.senderId === session?.user?.id);
  
  // Unique contacts from messages
  const contacts = Array.from(new Set([
    ...inboxMessages.map(m => m.senderId),
    ...sentMessages.map(m => m.receiverId)
  ])).map(id => {
    return { id, name: `User ${id.slice(0, 4)}`, email: '...' };
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
              Community Messages
            </h2>
            <p className="text-muted-foreground">
              Connect and communicate with other believers in the A.S.K. community.
            </p>
          </div>
        </div>
        
        <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-blocksy">
              <PlusCircle className="mr-2 h-4 w-4" /> New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
              <DialogDescription>
                Search for a user by name or email to start a conversation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {!selectedUser ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Type name or email to search..."
                      className="pl-8"
                      value={userSearchQuery}
                      onChange={(e) => handleUserSearch(e.target.value)}
                    />
                  </div>
                  {isSearching && <div className="text-center py-2"><Loader2 className="h-4 w-4 animate-spin mx-auto text-primary" /></div>}
                  <div className="max-h-[250px] overflow-y-auto space-y-1 pr-2">
                    {searchResults.map((user) => (
                      <Button
                        key={user.id}
                        variant="ghost"
                        className="w-full justify-start font-normal h-auto py-3 px-4 hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
                        onClick={() => setSelectedUser(user)}
                      >
                        <User className="mr-3 h-5 w-5 text-primary/60" />
                        <div className="text-left overflow-hidden">
                          <p className="text-sm font-bold truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </Button>
                    ))}
                    {userSearchQuery.length >= 1 && searchResults.length === 0 && !isSearching && (
                      <div className="text-center py-8">
                        <UsersIcon className="h-8 w-8 mx-auto text-muted-foreground opacity-20 mb-2" />
                        <p className="text-xs text-muted-foreground">No users found for "{userSearchQuery}"</p>
                      </div>
                    )}
                    {userSearchQuery.length === 0 && (
                        <p className="text-center text-xs text-muted-foreground py-4">Start typing to find believers...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{selectedUser.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)} className="h-8 px-2">Change</Button>
                  </div>
                  <Textarea
                    placeholder="Write your message here..."
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    className="min-h-[150px] resize-none focus-visible:ring-primary/20"
                  />
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-between">
                <Button variant="ghost" onClick={() => setIsNewMessageDialogOpen(false)}>Cancel</Button>
                <Button 
                    onClick={handleSendMessage} 
                    disabled={!selectedUser || !newMessageContent.trim() || isSending}
                    className="px-8 shadow-lg shadow-primary/20"
                >
                    {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Inbox className="h-4 w-4" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Contacts
          </TabsTrigger>
        </TabsList>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <TabsContent value="inbox" className="space-y-4 pt-4">
              {inboxMessages.length > 0 ? (
                inboxMessages.map((msg) => (
                  <Card key={msg.id} className="hover:shadow-md transition-shadow border-none shadow-blocksy">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">From: {msg.senderId}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(msg.sentAt), 'PPP p')}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-12 bg-secondary/20 rounded-lg">
                  <Inbox className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
                  <p className="text-muted-foreground">No messages in your inbox.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sent" className="space-y-4 pt-4">
              {sentMessages.length > 0 ? (
                sentMessages.map((msg) => (
                  <Card key={msg.id} className="hover:shadow-md transition-shadow border-none shadow-blocksy">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">To: {msg.receiverId}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(msg.sentAt), 'PPP p')}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-12 bg-secondary/20 rounded-lg">
                  <Send className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
                  <p className="text-muted-foreground">You haven't sent any messages yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4 pt-4">
              {contacts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="hover:shadow-md transition-all border-none shadow-blocksy group">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                           </div>
                           <span className="font-semibold text-sm">{contact.name}</span>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                                setSelectedUser(contact);
                                setIsNewMessageDialogOpen(true);
                            }}
                        >
                            <Send className="h-4 w-4 text-primary" />
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-secondary/20 rounded-lg">
                  <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
                  <p className="text-muted-foreground">You haven't interacted with anyone yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsNewMessageDialogOpen(true)}>
                    Start a Conversation
                  </Button>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
