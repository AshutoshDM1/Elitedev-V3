import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    children?: React.ReactNode
    className?: string
}

const LineY: React.FC<Props> = ({ className, children }) => {
    return (
        <div className={cn('border-b border-muted-foreground/50 border-dashed  ', className)}>
            {children}
        </div>
    );
};

export default LineY;