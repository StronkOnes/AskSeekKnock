
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Clock,
  PenSquare,
  BookMarked,
  Lightbulb,
  Crown,
  Users,
  UserSquare,
  ClipboardEdit,
  Calendar,
  LogIn,
  Sun,
  Moon,
  Cog,
} from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from './ui/dropdown-menu';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prayer', label: 'Prayer Hub', icon: Clock },

  { href: '/bible-verses', label: 'Bible Verse Locator', icon: BookMarked },
  { href: '/sermons', label: 'Sermons', icon: ClipboardEdit },
  { href: '/personal-templates', label: 'Personal Templates', icon: UserSquare },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/blog', label: "Biblical Mandate", icon: BookMarked },
  { href: '/subscription', label: 'Subscription', icon: Crown },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(' ')[0] || 'User';
  const userEmail = session?.user?.email || 'user@example.com';
  const isLoggedIn = !!session;

  // Hide sidebar for login, signup and landing pages
  if (pathname === '/login' || pathname === '/signup' || pathname === '/landing') {
    return <main className="animate-fade-in">{children}</main>;
  }


  return (
    <SidebarProvider>
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.05] overflow-hidden">
        <img 
          src="/A.S.K. - Sans.png" 
          alt="Watermark" 
          className="w-[120%] max-w-[1200px] object-contain rotate-[-15deg]"
        />
      </div>
      <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar shadow-blocksy z-10">
        <SidebarHeader className="h-20 flex items-center justify-center border-b border-border/50">
          <Logo className="scale-110 transition-transform duration-blocksy hover:scale-115" />
          <SidebarTrigger className="hidden md:flex absolute right-[-12px] top-7 bg-background border shadow-blocksy rounded-full h-6 w-6" />
        </SidebarHeader>
        <SidebarContent className="px-3 py-6">
          <SidebarMenu className="gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href || item.label}>
                  <SidebarMenuButton
                    asChild
                    variant={isActive ? 'outline' : 'default'}
                    className={cn(
                      "w-full justify-start transition-all duration-blocksy rounded-blocksy-md h-10 px-4",
                      isActive 
                        ? "bg-primary/10 text-primary border-primary/20 font-semibold shadow-sm" 
                        : "hover:bg-primary/5 hover:text-primary"
                    )}
                    tooltip={item.label}
                  >
                    <Link href={item.href} prefetch={true} className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <div className="mt-auto pt-6 px-4 space-y-2">
            <Link href="/terms" className="block text-[10px] text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="block text-[10px] text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto hover:bg-primary/5 rounded-blocksy-lg transition-colors group">
                <Avatar className="h-10 w-10 border-2 border-primary/10 group-hover:border-primary/30 transition-all">
                  <AvatarImage src={session?.user?.image || "https://placehold.co/100x100.png"} alt={firstName} />
                  <AvatarFallback className="bg-primary/10 text-primary">{firstName[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3 text-left overflow-hidden">
                    <p className="text-sm font-semibold text-blocksy-heading truncate">{firstName}</p>
                    <p className="text-xs text-muted-foreground truncate">{isLoggedIn ? 'Logged In' : userEmail}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
               <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Cog className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/admin" className="opacity-50 hover:opacity-100 transition-opacity cursor-default">
                        <Cog className="mr-2 h-4 w-4"/>
                        Admin Portal
                    </Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4"/>
                        Log In
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="relative">
        <header className="flex items-center justify-between p-4 border-b md:hidden bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <Logo />
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
