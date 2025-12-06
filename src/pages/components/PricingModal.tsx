import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Crown } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      icon: <Sparkles className="w-6 h-6" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out Snapnotes',
      features: [
        '3 note generations per day',
        'Max file size: 2 MB',
        'Max pages: 5 per file',
        'Basic AI summaries',
        'Short notes & MCQs',
      ],
      limitations: [
        'No upload history',
        'Cannot retrieve raw files',
        'Standard processing speed',
      ],
      cta: 'Get Started',
      popular: false,
      color: 'bg-card border-border',
    },
    {
      name: 'Student',
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: 99, yearly: 999 },
      description: 'Best for regular students',
      features: [
        '50 note generations per day',
        'Max file size: 10 MB',
        'Max pages: 25 per file',
        'Advanced AI summaries',
        'Deep notes + MCQs + Flashcards',
        'Upload history (30 days)',
        'Download raw files',
        'Priority processing',
        'Email support',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      color: 'bg-primary/5 border-primary',
    },
    {
      name: 'Pro',
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 199, yearly: 1999 },
      description: 'For serious learners',
      features: [
        'Unlimited note generations',
        'Max file size: 50 MB',
        'Max pages: 100 per file',
        'Premium AI with GPT-4',
        'All note types + Custom prompts',
        'Upload history (Forever)',
        'Download raw files anytime',
        'Fastest processing',
        'Priority email support',
        'Custom study schedules',
        'Bulk upload (up to 10 files)',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: false,
      color: 'bg-card border-border',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground">
              Student-friendly pricing designed for Indian learners
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-muted rounded-full transition-colors"
            >
              <div className={`absolute top-1 ${billingCycle === 'yearly' ? 'right-1' : 'left-1'} w-5 h-5 bg-primary rounded-full transition-all duration-300`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border-2 p-6 ${plan.color} transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'shadow-lg scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'} mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{Math.round(plan.price.yearly / 12)}/month billed annually
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                    : 'bg-background border-2 border-border text-foreground hover:border-primary'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/30">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">🎓 All paid plans include a <strong className="text-foreground">7-day free trial</strong></p>
            <p>💳 Secure payment via Razorpay • Cancel anytime • No questions asked</p>
          </div>
        </div>
      </div>
    </div>
  );
}