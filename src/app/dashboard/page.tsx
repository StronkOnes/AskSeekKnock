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
  Users
} from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || 'User';

  const activityData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 70 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 60 },
    { day: 'Sat', value: 90 },
    { day: 'Sun', value: 50 },
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Content Area - 4 cols */}
        <div className="col-span-4 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Spiritual Calendar
                </CardTitle>
                <CardDescription>View your scheduled spiritual activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border shadow-sm mx-auto" />
              </CardContent>
            </Card>

            <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in delay-250">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Schedule
                </CardTitle>
                <CardDescription>Quick access to your spiritual routine.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/personal-templates" className="block w-full">
                  <Button variant="outline" className="w-full justify-start h-12 text-lg">
                    <UserSquare className="mr-3 h-5 w-5 text-emerald-500" />
                    Prayer Session
                  </Button>
                </Link>
                <Link href="/prayer?tab=fasting" className="block w-full">
                  <Button variant="outline" className="w-full justify-start h-12 text-lg">
                    <CalendarIcon className="mr-3 h-5 w-5 text-orange-500" />
                    Fasting Days
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-blocksy bg-white/50 backdrop-blur-sm animate-fade-in delay-300">
            <CardHeader>
              <CardTitle>Recent Prayer Activity</CardTitle>
              <CardDescription>
                Your spiritual consistency over the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-end justify-between h-[200px] gap-2 pt-4 px-2">
                  {activityData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className="w-full bg-primary/20 rounded-t-blocksy-md transition-all duration-500 group-hover:bg-primary/40 relative overflow-hidden"
                        style={{ height: `${d.value}%` }}
                      >
                        <div className="absolute inset-0 bg-primary opacity-40 group-hover:opacity-60" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards - 3 cols */}
        <div className="col-span-3 space-y-6">
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

          <Card className="border-none shadow-blocksy animate-fade-in delay-500 overflow-hidden">
             <div className="h-2 bg-emerald-500 w-full" />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookMarked className="mr-2 h-4 w-4 text-emerald-500" />
                Biblical Mandate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Biblical insights and wisdom from the author's upcoming book, The Ultimate Revolution(ary)!
              </p>
              <Link href="/blog">
                <Button variant="outline" size="sm" className="w-full border-emerald-500/20 hover:bg-emerald-500/5">
                  Read Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
