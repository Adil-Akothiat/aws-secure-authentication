import type { FC } from "react";
import type { SectionProps } from '@types/ui.ts';

const Section: FC<SectionProps> = ({ className, children })=> {
    return (
        <section className={`w-11/12 mx-auto ${className}`}>{children}</section>
    );
}

export default Section;