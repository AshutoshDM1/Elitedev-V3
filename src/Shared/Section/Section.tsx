import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string
    children: React.ReactNode
    id: string
}

const Section: React.FC<Props> = ({ id, className, children }) => {
    return (
        <section id={id} className={cn("max-w-3xl mx-auto px-4 md:px-6 ", className)} >
            {children}
        </section>
    );
};

export default Section;