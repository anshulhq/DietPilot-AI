import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const Button = ({ href, className, children }) => {
    return (
        <Link
            href={href}
            className={`gradient-btn inline-flex items-center gap-x-2 px-8 py-4 text-sm font-semibold group ${className}`}
        >
            <span>{children}</span>
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    );
};

export default Button;
