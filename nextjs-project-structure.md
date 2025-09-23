# Next.js Project Structure & Best Practices

## 🏗️ Recommended Project Structure

```
techacademy-nextjs/
├── 📁 app/                    # Next.js 14 App Router
│   ├── 📁 (auth)/            # Route groups
│   │   ├── login/
│   │   └── signup/
│   ├── 📁 (dashboard)/        # Protected routes
│   │   ├── assessment/
│   │   ├── analytics/
│   │   └── profile/
│   ├── 📁 api/               # API routes
│   │   ├── auth/
│   │   ├── assessment/
│   │   └── chatbot/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── 📁 components/            # Reusable components
│   ├── 📁 ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── 📁 forms/             # Form components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AssessmentForm.tsx
│   ├── 📁 layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── 📁 features/          # Feature-specific components
│       ├── 📁 assessment/
│       ├── 📁 chatbot/
│       └── 📁 analytics/
├── 📁 lib/                   # Utilities and configurations
│   ├── utils.ts              # Utility functions
│   ├── auth.ts               # Authentication logic
│   ├── db.ts                 # Database connection
│   └── validations.ts        # Form validations
├── 📁 hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── 📁 types/                 # TypeScript type definitions
│   ├── auth.ts
│   ├── assessment.ts
│   └── api.ts
├── 📁 styles/                # Additional styles
│   ├── components.css
│   └── animations.css
├── 📁 public/                # Static assets
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── 📁 fonts/
├── 📁 docs/                  # Documentation
│   ├── design-system.md
│   └── api-docs.md
├── 📄 next.config.js         # Next.js configuration
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 package.json           # Dependencies
```

## 🎨 Component Architecture

### **1. Base UI Components**
```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = motion.button.attrs<ButtonProps>(({ className, variant, size, ...props }) => ({
  className: buttonVariants({ variant, size, className }),
  ...props,
}));
```

### **2. Feature Components**
```tsx
// components/features/assessment/AssessmentCard.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface AssessmentCardProps {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  score?: number;
  onStart: () => void;
}

export const AssessmentCard = ({ title, description, status, score, onStart }: AssessmentCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          <Badge variant={status === "completed" ? "success" : "warning"}>
            {status}
          </Badge>
        </div>
        
        {score && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Score</span>
              <span>{score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        )}
        
        <Button onClick={onStart} className="w-full">
          {status === "completed" ? "View Results" : "Start Assessment"}
        </Button>
      </Card>
    </motion.div>
  );
};
```

## 🎭 Animation Patterns

### **1. Page Transitions**
```tsx
// lib/animations.ts
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Usage in layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </body>
    </html>
  );
}
```

### **2. Scroll Animations**
```tsx
// hooks/useScrollAnimation.ts
import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    triggerOnce: true 
  });

  return { ref, isInView };
};

// Usage
const { ref, isInView } = useScrollAnimation();

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

## 🎨 Design System Implementation

### **1. Tailwind Configuration**
```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### **2. Global Styles**
```css
/* app/globals.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}

@layer components {
  .glass {
    @apply backdrop-blur-md bg-white/10 border border-white/20;
  }
  
  .gradient-text {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
  }
  
  .card-hover {
    @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
  }
}
```

## 🚀 Performance Optimizations

### **1. Image Optimization**
```tsx
// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        className="transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};
```

### **2. Code Splitting**
```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded-lg" />,
  ssr: false
});

const Chatbot = dynamic(() => import('./Chatbot'), {
  loading: () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full animate-pulse" />,
  ssr: false
});
```

This structure provides a solid foundation for a modern, scalable Next.js application with excellent UX! 🎉
