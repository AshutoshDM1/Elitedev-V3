import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string
    children: React.ReactNode
}

const BrandButton: React.FC<Props> = ({ className, children }) => {
    return (
        <button className={cn("gradient-background px-4 py-3 rounded-md", className)} >
            {children}
        </button>
    );
};

export default BrandButton;