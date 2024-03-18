import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const pVariants = cva('text-sm', {
    variants: {
        variant: {
            default: 'text-sm font-pretendardBold',
        },
        size: {
            default: 'text-xs',
            sm: 'text-sm font-pretendardRegular',
            lg: 'text-lg',
            icon: 'h-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

const P = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'p';
        return (
            <Comp
                className={cn(pVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
P.displayName = 'P';

export { P, pVariants };
