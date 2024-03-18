import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const divVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            borderColor: {
                default: 'border-solid border border-border',
                neutral: 'border-solid border border-border',
                error: 'border-solid border border-error-500',
                warning: 'border-solid border border-warning-500',
                success: 'border-solid border border-success-500',
                brand: 'border-solid border border-brand-500',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            font: 'default',
        },
    }
);

const Div = React.forwardRef(({ className, borderColor, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'Div';
    return <Comp className={cn(divVariants({ borderColor, size, className }))} ref={ref} {...props} />;
});
Div.displayName = 'Div';

Div.propTypes = {
    className: PropTypes.string,
    borderColor: PropTypes.string,
    size: PropTypes.string,
    asChild: PropTypes.bool,
};

export { Div, divVariants };
