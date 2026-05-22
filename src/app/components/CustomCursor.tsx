"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        const animateOutline = () => {
            const ease = 0.15;
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;

            if (outline) {
                outline.style.left = `${outlineX}px`;
                outline.style.top = `${outlineY}px`;
            }

            requestAnimationFrame(animateOutline);
        };

        const animationFrameId = requestAnimationFrame(animateOutline);
        window.addEventListener("mousemove", onMouseMove);

        const handleMouseEnter = () => {
            document.body.classList.add("hovering-link");
        };

        const handleMouseLeave = () => {
            document.body.classList.remove("hovering-link");
        };

        const setupHoverListeners = () => {
            const clickables = document.querySelectorAll("a, button, [role='button'], .filter-btn, .project-card");
            clickables.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        setupHoverListeners();

        const observer = new MutationObserver(() => {
            setupHoverListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            
            const clickables = document.querySelectorAll("a, button, [role='button'], .filter-btn, .project-card");
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            document.body.classList.remove("hovering-link");
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" id="cursorDot"></div>
            <div ref={outlineRef} className="cursor-outline" id="cursorOutline"></div>
        </>
    );
}
