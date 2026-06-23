'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Clock, 
  BookMarked, 
  Calendar as CalendarIcon, 
  PenSquare, 
  UserSquare, 
  ArrowRight,
  TrendingUp,
  Heart,
  CalendarDays,
  MessageSquare,
  PlusCircle,
  Users,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  ListTodo,
  Search,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useState } from 'react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || 'User';
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const activityData = {
    weekly: [
      { name: 'Mon', value: 45 },
      { name: 'Tue', value: 70 },
      { name: 'Wed', value: 30 },
      { name: 'Thu', value: 85 },
      { name: 'Fri', value: 60 },
      { name: 'Sat', value: 90 },
      { name: 'Sun', value: 50 },
    ],
    monthly: [
      { name: 'Week 1', value: 320 },
      { name: 'Week 2', value: 450 },
      { name: 'Week 3', value: 280 },
      { name: 'Week 4', value: 510 },
    ],
    yearly: [
      { name: 'Jan', value: 1200 },
      { name: 'Feb', value: 1500 },
      { name: 'Mar', value: 1100 },
      { name: 'Apr', value: 1800 },
      { name: 'May', value: 2100 },
      { name: 'Jun', value: 1900 },
    ]
  };

  const progressData = [
    { name: 'Completed', value: 12, color: '#10b981' },
    { name: 'In Progress', value: 5, color: '#3b82f6' },
    { name: 'Scheduled', value: 8, color: '#f59e0b' },
  ];

  const friendsData = [
    { name: 'Ps John', image: 'https://github.com/shadcn.png', status: 'Online' },
    { name: 'Sarah W.', image: 'https://github.com/shadcn.png', status: 'Away' },
    { name: 'Michael K.', image: 'https://github.com/shadcn.png', status: 'Offline' },
  ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-blocksy-heading animate-fade-in">
            Welcome back, {firstName}
          </h2>
          <p className="text-muted-foreground mt-1 animate-fade-in delay-100">
            Here's what's happening in your spiritual journey today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
           <Link href="/prayer">
            <Button className="shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy">
              <Clock className="mr-2 h-4 w-4" /> Start Prayer
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-scale-in">
        <Card className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prayer Sessions</CardTitle>
            <div className="p-2 bg-primary/10 rounded-blocksy-md group-hover:bg-primary/20 transition-colors">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fasting Days</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-blocksy-md group-hover:bg-orange-500/20 transition-colors">
              <CalendarIcon className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next: Friday, May 15th
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Templates</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-blocksy-md group-hover:bg-emerald-500/20 transition-colors">
              <UserSquare className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Active prayer structures
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reflections</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-blocksy-md group-hover:bg-purple-500/20 transition-colors">
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Journal entries logged
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Button Cluster - Same size as top cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-scale-in delay-150">
        <Link href="/personal-templates?tab=ask">
          <Button variant="outline" className="w-full h-24 text-lg font-bold flex flex-col gap-1 items-center justify-center shadow-blocksy hover:shadow-blocksy-lg transition-all border-none bg-white/50 backdrop-blur-sm group">
            <BookMarked className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            A.S.K. Templates
          </Button>
        </Link>
        <Link href="/prayer?tab=fasting">
          <Button variant="outline" className="w-full h-24 text-lg font-bold flex flex-col gap-1 items-center justify-center shadow-blocksy hover:shadow-blocksy-lg transition-all border-none bg-white/50 backdrop-blur-sm group">
            <CalendarIcon className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" />
            Fasting
          </Button>
        </Link>
        <Link href="/prayer-journal">
          <Button variant="outline" className="w-full h-24 text-lg font-bold flex flex-col gap-1 items-center justify-center shadow-blocksy hover:shadow-blocksy-lg transition-all border-none bg-white/50 backdrop-blur-sm group">
            <PenSquare className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
            Journal
          </Button>
        </Link>
        <Link href="/prayer-session">
          <Button variant="outline" className="w-full h-24 text-lg font-bold flex flex-col gap-1 items-center justify-center shadow-blocksy hover:shadow-blocksy-lg transition-all border-none bg-white/50 backdrop-blur-sm group">
            <PlayCircle className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" />
            Session Builder
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Left Column - Prayer Templates (Halved width) - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in delay-200 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-primary" />
                Prayer Templates
              </CardTitle>
              <CardDescription>Quick access to your spiritual routines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-14 text-base border-primary/10 hover:bg-primary/5 shadow-sm">
                  <Heart className="mr-3 h-5 w-5 text-destructive" />
                  Morning Devotion
                </Button>
                <Button variant="outline" className="justify-start h-14 text-base border-primary/10 hover:bg-primary/5 shadow-sm">
                  <Users className="mr-3 h-5 w-5 text-blue-500" />
                  Family Intercession
                </Button>
                <Button variant="outline" className="justify-start h-14 text-base border-primary/10 hover:bg-primary/5 shadow-sm">
                  <TrendingUp className="mr-3 h-5 w-5 text-emerald-500" />
                  Spiritual Growth
                </Button>
                <Button variant="outline" className="justify-start h-14 text-base border-primary/10 hover:bg-primary/5 shadow-sm">
                  <Clock className="mr-3 h-5 w-5 text-orange-500" />
                  Night Reflection
                </Button>
              </div>
              <Separator className="my-4" />
              <CardTitle className="text-sm font-semibold mb-2">Spiritual Calendar</CardTitle>
              <Calendar mode="single" className="rounded-md border shadow-sm mx-auto bg-white/80" />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Productivity Insights (Detailed Monitor) - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in delay-250 h-full overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Productivity Insights
                </CardTitle>
                <CardDescription>Detailed metrics of your spiritual engagement.</CardDescription>
              </div>
              <div className="flex bg-muted p-1 rounded-md">
                {(['weekly', 'monthly', 'yearly'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-sm transition-all capitalize",
                      viewMode === mode ? "bg-white shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 rounded-blocksy-md bg-primary/5 border border-primary/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Time in App</p>
                  <p className="text-lg font-bold">14h 20m</p>
                </div>
                <div className="p-3 rounded-blocksy-md bg-emerald-500/5 border border-emerald-500/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Prayer Time</p>
                  <p className="text-lg font-bold">8h 45m</p>
                </div>
                <div className="p-3 rounded-blocksy-md bg-orange-500/5 border border-orange-500/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Top Template</p>
                  <p className="text-sm font-bold truncate">Morning Devotion</p>
                </div>
                <div className="p-3 rounded-blocksy-md bg-blue-500/5 border border-blue-500/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Peak Prayer</p>
                  <p className="text-lg font-bold">6:00 AM</p>
                </div>
                <div className="p-3 rounded-blocksy-md bg-purple-500/5 border border-purple-500/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Peak Community</p>
                  <p className="text-lg font-bold">8:00 PM</p>
                </div>
                <div className="p-3 rounded-blocksy-md bg-amber-500/5 border border-amber-500/10">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Streak</p>
                  <p className="text-lg font-bold">7 Days</p>
                </div>
              </div>

              {/* Productivity Streak Bar Graph */}
              <div className="space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                   <ListTodo className="h-4 w-4 text-primary" />
                   Productivity Streak
                </p>
                <div className="h-[200px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData[viewMode]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#64748b' }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {activityData[viewMode].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === activityData[viewMode].length - 1 ? '#3b82f6' : '#94a3b8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* ASK Activity */}
                <div className="space-y-4">
                   <p className="text-sm font-semibold flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      A-S-K Activity
                   </p>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-blocksy bg-white border border-border shadow-sm">
                         <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-sm">Scripture Searches</span>
                         </div>
                         <span className="font-bold">42</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-blocksy bg-white border border-border shadow-sm">
                         <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm">Templates Shared</span>
                         </div>
                         <span className="font-bold">8</span>
                      </div>
                   </div>
                </div>

                {/* Progress Circle Chart */}
                <div className="space-y-4">
                   <p className="text-sm font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Progress Chart
                   </p>
                   <div className="h-[120px] flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={progressData}
                            innerRadius={40}
                            outerRadius={55}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {progressData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <span className="text-xl font-bold">25</span>
                         <span className="text-[8px] uppercase text-muted-foreground">Total</span>
                      </div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-blocksy animate-fade-in delay-300">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Fellow Believers</CardTitle>
              <Link href="/friends" className="text-xs text-primary hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {friendsData.map((friend) => (
                <div key={friend.name} className="flex items-center justify-between group cursor-pointer hover:bg-primary/5 p-2 rounded-blocksy-md transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={friend.image} alt={friend.name} className="h-10 w-10 rounded-full border-2 border-primary/10" />
                      <div className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                        friend.status === 'Online' ? 'bg-green-500' : friend.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-400'
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">{friend.status}</p>
                    </div>
                  </div>
                  <Link href="/messages">
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 text-xs" asChild>
                <Link href="/friends">
                  <PlusCircle className="mr-2 h-3 w-3" /> Find Friends
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-blocksy animate-fade-in delay-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Daily Verse</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="italic text-foreground/80 border-l-4 border-primary pl-4 py-2">
                "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God."
                <footer className="text-sm font-semibold mt-2 text-primary">— Philippians 4:6</footer>
              </blockquote>
              <Link href="/bible-verses" className="mt-4 block">
                <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-primary/5 group">
                  <span>Explore more verses</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-blocksy animate-fade-in delay-400 overflow-hidden">
             <div className="h-2 bg-primary w-full" />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-4 w-4 text-destructive fill-destructive" />
                Community Spotlight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                "Prayers for Restoration" template by Pastor John is trending in the community.
              </p>
              <Link href="/community">
                <Button variant="outline" size="sm" className="w-full border-primary/20 hover:bg-primary/5">
                  View Template
                </Button>
              </Link>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}

import { Separator } from '@/components/ui/separator';
