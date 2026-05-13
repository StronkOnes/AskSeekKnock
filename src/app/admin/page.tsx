
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  ShieldAlert, 
  BarChart3, 
  Settings,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-blocksy-heading animate-fade-in">
            Admin Dashboard
          </h2>
          <p className="text-muted-foreground mt-1 animate-fade-in delay-100">
            Welcome back, Administrator. Here's what's happening on your platform.
          </p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-scale-in">
        <Card className="border-none shadow-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Across all devices</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Insights</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Published this week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-blocksy group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">All clear</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-blocksy bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>Engagement and growth metrics for the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed m-6 rounded-blocksy-lg">
             <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto opacity-20 mb-2" />
                <p>Analytics visualization placeholder</p>
             </div>
          </CardContent>
        </Card>

        <div className="col-span-3 space-y-6">
          <Card className="border-none shadow-blocksy">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/admin/insights">
                <Button className="w-full justify-between" variant="outline">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Insights
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/moderation">
                <Button className="w-full justify-between" variant="outline">
                  <div className="flex items-center">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Moderation Hub
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button className="w-full justify-between" variant="outline">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Site Settings
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-blocksy overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">API Status</span>
                  <span className="text-emerald-500 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Database</span>
                  <span className="text-emerald-500 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Backup</span>
                  <span className="text-foreground">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
