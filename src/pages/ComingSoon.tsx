import { Rocket, Sparkles, Clock, Bell, ArrowLeft, Code, Paintbrush, Zap } from 'lucide-react';

interface ComingSoonProps {
  featureName?: string;
  description?: string;
  showNotifyButton?: boolean;
  onGoBack?: () => void;
  onGoHome?: () => void;
}

export default function ComingSoon({ 
  featureName = "This Feature",
  description = "We're cooking up something awesome for you",
  showNotifyButton = true,
  onGoBack,
  onGoHome
}: ComingSoonProps) {
  const handleSendSuggestion = () => {
    const subject = encodeURIComponent(`Suggestion for ${featureName}`);
    const body = encodeURIComponent(`Hi Snapnotes team!\n\nI have a suggestion for the "${featureName}" feature:\n\n[Write your suggestion here]\n\nThanks!`);
    window.location.href = `mailto:mrinmoygoswami704@gmail.com?subject=${subject}&body=${body}`;
  };

  const features = [
    { icon: <Code className="w-5 h-5" />, text: "Being coded with love" },
    { icon: <Paintbrush className="w-5 h-5" />, text: "Designed to perfection" },
    { icon: <Zap className="w-5 h-5" />, text: "Optimized for speed" },
  ];

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-[250px] h-[250px] rounded-full bg-primary/5 dark:bg-primary/15 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Back button */}
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="absolute -top-16 left-0 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        )}

        {/* Main Icon with animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Rocket className="w-12 h-12 text-primary animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-warning animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          {featureName}
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Coming Soon</span>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          {description}
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-all duration-300"
            >
              <div className="text-primary mb-2 flex justify-center">
                {feature.icon}
              </div>
              <p className="text-xs text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Suggestion Section */}
        {showNotifyButton && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Have Ideas? We're All Ears!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help us build the perfect feature by sharing your suggestions
            </p>
            
            <button
              onClick={handleSendSuggestion}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 mx-auto"
            >
              <Bell className="w-4 h-4" />
              Send Us Your Ideas
            </button>
          </div>
        )}

        {/* Timeline estimate */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">Soon™</div>
              <div className="text-xs text-muted-foreground">Expected Release</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">Worth It</div>
              <div className="text-xs text-muted-foreground">We Promise</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">100%</div>
              <div className="text-xs text-muted-foreground">Awesomeness</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm"
            >
              Go to Dashboard
            </button>
          )}
          {onGoBack && (
            <button
              onClick={onGoBack}
              className="px-6 py-3 bg-background border-2 border-border text-foreground rounded-lg font-semibold hover:border-primary transition-all duration-300"
            >
              Go Back
            </button>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            💡 Have suggestions? We'd love to hear them while we build this!
          </p>
        </div>
      </div>
    </div>
  );
}