import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, Shield, Zap, PenSquare, Calendar, BookMarked } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Logo className="scale-75 origin-left" />
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="rounded-full shadow-blocksy hover:shadow-blocksy-lg transition-all">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 rounded-bl-[200px] animate-fade-in" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                Spiritually Focused
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-blocksy-heading leading-[1.1]">
                Nurture Your <span className="text-primary italic">Spiritual</span> Growth
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                A personal prayer journal app designed to help you track your journey through an intuitive, user-friendly and centralised experience.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link href="/signup">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-blocksy hover:shadow-blocksy-lg">
                    Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-in-right delay-200">
               <div className="relative rounded-blocksy-xl overflow-hidden shadow-blocksy-xl border-8 border-white group">
                  <img 
                    src="/AppPreview.jpg" 
                    alt="A.S.K. App Preview" 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               {/* Floating elements */}
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-blocksy-lg shadow-blocksy-lg animate-bounce-in delay-500 max-w-[200px]">
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Heart className="h-4 w-4 text-destructive fill-destructive" />
                    Community Driven
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Join 1,000+ believers today.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-blocksy-heading">Everything you need to grow</h2>
              <p className="text-lg text-muted-foreground mt-4">A comprehensive suite of tools designed for the modern prayer warrior.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Personal Journal', desc: 'Log your reflections, realizations and epiphanies for future referencing.', icon: PenSquare },
                { title: 'Fasting Scheduler', desc: 'Track your fasting days with our intuitive calendar integration.', icon: Calendar },
                { title: 'Bible Integration', desc: 'Locate and integrate bible verses directly into your templates.', icon: BookMarked },
                { title: 'Community Sharing', desc: 'Share your prayer templates and connect with other believers.', icon: Heart },
                { title: 'Privacy First', desc: 'Secure features to protect your personal reflections and data.', icon: Shield },
                { title: 'Global Access', desc: 'Access your spiritual journey from any device, anywhere.', icon: Zap }
              ].map((f, i) => (
                <Card key={i} className="border-none shadow-blocksy hover:shadow-blocksy-lg transition-all duration-blocksy hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 bg-primary/10 rounded-blocksy-md flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Member Access Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-secondary/30 rounded-blocksy-xl p-8 md:p-16 border border-border/50 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-blocksy-heading">Member Access</h2>
                <p className="text-muted-foreground">
                  Already a part of the A.S.K. community? Sign in to continue your spiritual journey, access your journal, and engage with the community.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                <Link href="/login" className="block w-full">
                  <Button size="lg" className="w-full h-14 rounded-full text-lg shadow-blocksy hover:shadow-blocksy-lg transition-all">
                    Sign In to Dashboard
                  </Button>
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  Secure access to your personal reflections and data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 overflow-hidden relative">
           <div className="max-w-4xl mx-auto bg-primary rounded-blocksy-xl p-12 text-center text-primary-foreground relative overflow-hidden shadow-blocksy-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-lg mx-auto">
                Join our community of prayer warriors and start nurturing your spiritual growth today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-bold shadow-lg">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-white py-16 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <Logo className="scale-75 origin-left" />
            <p className="mt-6 text-muted-foreground max-w-sm">
              Helping believers organize their prayer life and connect with a community of faith.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-blocksy-heading hover:bg-primary/10 transition-colors cursor-pointer">FB</div>
              <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-blocksy-heading hover:bg-primary/10 transition-colors cursor-pointer">TW</div>
              <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-blocksy-heading hover:bg-primary/10 transition-colors cursor-pointer">IG</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-blocksy-heading mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/prayer" className="hover:text-primary transition-colors">Prayer Hub</Link></li>
              <li><Link href="/bible-verses" className="hover:text-primary transition-colors">Verse Locator</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/subscription" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blocksy-heading mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/50 text-sm text-muted-foreground flex justify-between items-center">
          <p>&copy; 2026 A.S.K. All rights reserved.</p>
          <p>Made with ❤️ for the Kingdom</p>
        </div>
      </footer>
    </div>
  );
}
