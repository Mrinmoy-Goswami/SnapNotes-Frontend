import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown, X as XIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      icon: <Sparkles className="w-5 h-5" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out',
      features: [
        '3 notes per day',
        'Max 2 MB files',
        'Up to 5 pages',
        'Basic AI summaries',
        'Short notes & MCQs',
      ],
      limitations: [
        'No upload history',
        'No file retrieval',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Student',
      icon: <Zap className="w-5 h-5" />,
      price: { monthly: 99, yearly: 999 },
      description: 'Best for students',
      features: [
        '50 notes per day',
        'Max 10 MB files',
        'Up to 25 pages',
        'Advanced AI',
        'All note types',
        '30-day history',
        'Download files',
        'Priority support',
      ],
      limitations: [],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Pro',
      icon: <Crown className="w-5 h-5" />,
      price: { monthly: 199, yearly: 1999 },
      description: 'For power users',
      features: [
        'Unlimited notes',
        'Max 50 MB files',
        'Up to 100 pages',
        'Premium AI (GPT-4)',
        'Custom prompts',
        'Forever history',
        'Bulk uploads (10x)',
        'Fastest processing',
        'Priority support',
      ],
      limitations: [],
      cta: 'Get Started',
      popular: false,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-7xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-4 py-4 sm:px-6 sm:py-5 border-b border-border">
          <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            Student-friendly pricing designed for Indian learners
          </DialogDescription>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs sm:text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 sm:w-14 sm:h-7 bg-muted rounded-full transition-colors"
              aria-label="Toggle billing cycle"
            >
              <div className={`absolute top-0.5 sm:top-1 ${billingCycle === 'yearly' ? 'right-0.5 sm:right-1' : 'left-0.5 sm:left-1'} w-5 h-5 bg-primary rounded-full transition-all duration-300`} />
            </button>
            <span className={`text-xs sm:text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                Save 17%
              </span>
            )}
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl border-2 p-4 sm:p-5 bg-card transition-all duration-300 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-primary shadow-md' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg mb-3 ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-3xl sm:text-4xl font-bold text-foreground">
                      ₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-sm text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-xs text-muted-foreground">
                      ₹{Math.round(plan.price.yearly / 12)}/mo billed yearly
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-foreground leading-tight">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-muted-foreground leading-tight">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                      : 'bg-background border-2 border-border text-foreground hover:border-primary'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-4 sm:px-6 bg-muted/30">
          <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1">
            <p>💳 Secure payment via Razorpay • Cancel anytime</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}