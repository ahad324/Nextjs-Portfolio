"use client";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export const ElasticLine = () => {
    const path = useRef<SVGPathElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const isInView = useInView(container, { once: false, amount: 0.5 });

    const progress = useRef(0);
    const x = useRef(0.5);
    const velocity = useRef(0);
    const reqId = useRef<number | null>(null);

    useEffect(() => {
        if (isInView) {
            progress.current = 50;
            x.current = 0.5;
            loop();
        }
    }, [isInView]);

    const setPath = (prog: number) => {
        const width = container.current?.getBoundingClientRect().width || window.innerWidth;
        // Line rests at center (60px) of the 120px container
        const center = 60;
        const d = `M0 ${center} Q${width * x.current} ${center + prog} ${width} ${center}`;
        path.current?.setAttributeNS(null, "d", d);
    };

    const loop = () => {
        velocity.current += (0 - progress.current) * 0.1;
        velocity.current *= 0.95; // Increased from 0.8 for more jiggle
        progress.current += velocity.current;

        setPath(progress.current);

        if (Math.abs(progress.current) > 0.01 || Math.abs(velocity.current) > 0.01) {
            reqId.current = requestAnimationFrame(loop);
        } else {
            progress.current = 0;
            setPath(0);
        }
    };

    const manageMouseLeave = () => {
        loop();
    };

    return (
        <div
            ref={container}
            // Height 120px (60px up/down). Z-index 10.
            className="absolute top-0 left-0 w-full h-[120px] -translate-y-1/2 z-10"
            onMouseEnter={() => {
                if (reqId.current) {
                    cancelAnimationFrame(reqId.current);
                    reqId.current = null;
                }
            }}
            onMouseLeave={manageMouseLeave}
        >
            <div
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                onMouseMove={(e) => {
                    const rect = container.current?.getBoundingClientRect();
                    if (rect) {
                        x.current = (e.clientX - rect.left) / rect.width;
                        progress.current = e.clientY - rect.top - 60;
                        setPath(progress.current);
                    }
                }}
            />

            <svg className="w-full h-full absolute top-0 pointer-events-none">
                <path
                    ref={path}
                    className="stroke-white/50 stroke-[2px] fill-none"
                    d="M0 60 Q0 60 0 60"
                />
            </svg>
        </div>
    );
};
