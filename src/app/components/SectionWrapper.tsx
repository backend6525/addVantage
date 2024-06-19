
interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string; 
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, ...props }) => (
    <section {...props} className={`py-16 lg:py-24 ${props.className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;
