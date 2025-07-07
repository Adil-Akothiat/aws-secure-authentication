import type { FC, ReactNode } from "react";

interface SectionProps {
    className:string,
    children: ReactNode
}
const Section: FC<SectionProps> = ({ className, children })=> {
    return (
        <section className={`w-11/12 mx-auto ${className}`}>{children}</section>
    );
}

export default Section;