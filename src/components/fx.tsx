"use client";

import * as React from "react";

import { BootSequence } from "@/components/boot-sequence";
import { Sound } from "@/components/sound";
import { Toasts } from "@/components/toasts";

/* ---------- Konami code: ↑↑↓↓←→←→BA → hacker mode ---------- */
const KONAMI = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
];

function useKonami() {
    React.useEffect(() => {
        let progress = 0;
        const onKey = (e: KeyboardEvent) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
            if (progress === KONAMI.length) {
                progress = 0;
                window.dispatchEvent(new Event("toggle-hacker"));
                window.dispatchEvent(new Event("fx-party"));
                window.dispatchEvent(new Event("fx-matrix"));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
}

/* ---------- Hacker mode class toggle ---------- */
function useHackerMode() {
    React.useEffect(() => {
        const toggle = () => {
            document.documentElement.classList.toggle("hacker");
        };
        window.addEventListener("toggle-hacker", toggle);
        return () => window.removeEventListener("toggle-hacker", toggle);
    }, []);
}

/* ---------- Matrix rain overlay ---------- */
function MatrixRain() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        const start = () => setActive(true);
        window.addEventListener("fx-matrix", start);
        return () => window.removeEventListener("fx-matrix", start);
    }, []);

    React.useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);
        const glyphs =
            "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789$#@%&";

        let frame: number;
        const draw = () => {
            ctx.fillStyle = "rgba(10, 14, 10, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#9dff00";
            ctx.font = `${fontSize}px monospace`;
            drops.forEach((y, x) => {
                const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
                ctx.fillText(glyph, x * fontSize, y * fontSize);
                drops[x] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
            });
            frame = requestAnimationFrame(draw);
        };
        ctx.fillStyle = "rgba(10, 14, 10, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw();

        const stop = setTimeout(() => {
            cancelAnimationFrame(frame);
            setActive(false);
        }, 5000);
        return () => {
            clearTimeout(stop);
            cancelAnimationFrame(frame);
        };
    }, [active]);

    if (!active) return null;
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[150] pointer-events-none"
            onClick={() => setActive(false)}
        />
    );
}

/* ---------- Confetti ---------- */
type Piece = {
    id: number;
    left: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
    rotate: number;
};

const COLORS = ["#9dff00", "#ff5c38", "#2e62ff", "#c9a5ff", "#f5efe0"];

function Confetti() {
    const [pieces, setPieces] = React.useState<Piece[]>([]);

    React.useEffect(() => {
        const burst = () => {
            const batch: Piece[] = Array.from({ length: 120 }, (_, i) => ({
                id: Date.now() + i,
                left: Math.random() * 100,
                delay: Math.random() * 0.4,
                duration: 1.6 + Math.random() * 1.6,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 6 + Math.random() * 8,
                rotate: Math.random() * 360,
            }));
            setPieces(batch);
            setTimeout(() => setPieces([]), 4000);
        };
        window.addEventListener("fx-party", burst);
        return () => window.removeEventListener("fx-party", burst);
    }, []);

    if (pieces.length === 0) return null;
    return (
        <div className="fixed inset-0 z-[150] pointer-events-none overflow-hidden">
            {pieces.map((p) => (
                <span
                    key={p.id}
                    className="absolute top-[-4vh] border border-ink animate-confetti"
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        transform: `rotate(${p.rotate}deg)`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ---------- Custom cursor follower (fine pointers only) ---------- */
function CursorFollower() {
    const ref = React.useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = React.useState(false);

    React.useEffect(() => {
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!fine.matches || reduced.matches) return;
        setEnabled(true);

        let mx = -100, my = -100, x = -100, y = -100;
        let hot = false;
        let frame: number;

        const onMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            hot = !!(e.target as Element | null)?.closest?.(
                "a, button, input, [role='button']"
            );
        };

        const tick = () => {
            x += (mx - x) * 0.18;
            y += (my - y) * 0.18;
            const el = ref.current;
            if (el) {
                const size = hot ? 40 : 20;
                el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${hot ? 45 : 0}deg)`;
                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
            }
            frame = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove);
        frame = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    if (!enabled) return null;
    return (
        <div
            ref={ref}
            className="fixed top-0 left-0 z-[300] pointer-events-none border-2 border-white mix-blend-difference transition-[width,height] duration-150"
        />
    );
}

/* ---------- Mount all effects ---------- */
export function Fx() {
    useKonami();
    useHackerMode();
    return (
        <>
            <BootSequence />
            <MatrixRain />
            <Confetti />
            <CursorFollower />
            <Toasts />
            <Sound />
        </>
    );
}
