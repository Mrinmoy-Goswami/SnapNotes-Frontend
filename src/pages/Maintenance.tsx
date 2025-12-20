import  { useState, useEffect } from 'react';
import { Wrench, Coffee, Zap, Brain, Timer, RefreshCw } from 'lucide-react';

export default function MaintenanceScreen() {
  const [dots, setDots] = useState('');
  const [joke, setJoke] = useState(0);

  const jokes = [
    "We're not procrastinating, we're 'strategically delaying'",
    "Currently teaching our AI the difference between 'their' and 'there'",
    "Debugging in production like absolute legends",
    "Our hamsters need a coffee break",
    "Turning it off and on again (the professional way)",
    "404: Motivation not found. Installing caffeine...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const jokeInterval = setInterval(() => {
      setJoke(prev => (prev + 1) % jokes.length);
    }, 4000);
    return () => clearInterval(jokeInterval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-10 w-[250px] h-[250px] rounded-full bg-primary/5 dark:bg-primary/15 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Main Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Wrench className="w-12 h-12 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-border rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-warning" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
          Under Maintenance<span className="inline-block w-12 text-left">{dots}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Our AI is doing yoga stretches
        </p>

        {/* Sarcastic jokes carousel */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 min-h-[100px] flex items-center justify-center">
          <p className="text-base md:text-lg text-foreground italic transition-all duration-500">
            "{jokes[joke]}"
          </p>
        </div>

        {/* Status indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300">
            <Coffee className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Coffee Status</h3>
            <p className="text-xs text-muted-foreground">Brewing intensely</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300">
            <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Brain Cells</h3>
            <p className="text-xs text-muted-foreground">Regenerating...</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300">
            <Timer className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-foreground mb-1">ETA</h3>
            <p className="text-xs text-muted-foreground">Soon™</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-muted rounded-full h-3 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-primary/80 to-primary h-full rounded-full animate-pulse" style={{ width: '87%' }}></div>
        </div>

        {/* CTA Section */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Refreshing (We Dare You)
          </button>

          <p className="text-sm text-muted-foreground">
            Or go touch some grass while we fix this 🌱
          </p>
        </div>

        {/* Footer messages */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
              <span>Probably our fault</span>
            </div>
            <span>•</span>
            <span>Not yours though 👍</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>Servers are crying</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Pro tip: Ctrl+R won't speed this up, but feel free to try 127 times
          </p>
        </div>

        {/* Easter egg */}
        <div className="mt-8">
          <details className="text-left bg-muted/30 rounded-lg p-4 cursor-pointer">
            <summary className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              🤓 What's actually happening?
            </summary>
            <div className="mt-3 text-xs text-muted-foreground space-y-2">
              <p>• Upgrading our hamster wheels to electric ones</p>
              <p>• Teaching the AI to be less sarcastic (ironically)</p>
              <p>• Removing bugs we definitely didn't create</p>
              <p>• Making everything 10x faster (or at least 1.03x)</p>
              <p>• Bribing the servers with better cooling fans</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}