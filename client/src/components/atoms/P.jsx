import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const pVariants = cva('text-base font-pretendardRegular', {
    variants: {
        color: {
            default: 'text-header-mainHeader',
            mainHeader: 'text-header-mainHeader',
            sectionHeader: 'text-header-sectionHeader',
            subHeader: 'text-header-subHeader',
        },
        size: {
            default: 'text-base',
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            ['2xl']: 'text-2xl',
            ['3xl']: 'text-3xl',
            ['4xl']: 'text-4xl',
            ['5xl']: 'text-5xl',
        },
        font: {
            default: 'font-pretendardRegular',
            regular: 'font-pretendardRegular',
            bold: 'font-pretendardBold',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        font: 'default',
    },
});

const P = React.forwardRef(({ className, color, size, font, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return <Comp className={cn(pVariants({ color, size, font, className }))} ref={ref} {...props} />;
});
P.displayName = 'P';

P.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    asChild: PropTypes.bool,
};

export { P, pVariants };
