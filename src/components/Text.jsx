import { gameFont } from "@/styles/fonts"
import clsx from 'clsx'
import { useEffect, useState } from "react";

const sizeStyles = {
    small: 'text-[16px] leading-[18px]',
    medium: 'text-[32px] leading-[40px]',
    h2:'text-[70px]  leading-[80px]',
    h1:'text-[132px]  leading-[140px]',
}

export function Text({  size = 'medium', title, as: Component = 'div',className, ...props }) {

    className = clsx(
        `${gameFont.className} relative uppercase text countdown-piece-label text-[#5F8449]`,
        sizeStyles[size],
        className
    )
    const [id, setId] = useState('');

    useEffect(() => {
        setId('mask' + Math.floor(Math.random() * 10000));
    }, []);

    return (
        <div className={className} {...props}>
            <Component className={`mx-auto text-original w-max ${size}`}>
                {title}
            </Component>
            <svg height="100%" width="100%" className="pointer-events-none center">
                <defs>
                    <mask height="100%" width="100%" x="0" y="0" id={id}>
                        <rect fill="black" height="100%" width="100%" x="0" y="0">
                        </rect>
                        <text dominantBaseline="middle" fill="white" textAnchor="middle" x="50%" y="50%">
                            {title}
                        </text>
                    </mask>
                </defs>
                <text dominantBaseline="middle" fill="#D4D29B" textAnchor="middle" x="50%" y="47%" mask={`url(#${id})`}>
                     {title}
                </text>
            </svg>
        </div>
    )
}