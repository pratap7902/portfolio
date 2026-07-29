"use client";

import * as React from "react";

function readStored(): boolean {
    try {
        return localStorage.getItem("cp-sound") === "1";
    } catch {
        return false;
    }
}

function store(on: boolean) {
    try {
        localStorage.setItem("cp-sound", on ? "1" : "0");
    } catch {
        /* storage unavailable — state just won't persist */
    }
}

export function Sound() {
    const enabledRef = React.useRef(false);
    const ctxRef = React.useRef<AudioContext | null>(null);

    React.useEffect(() => {
        // Lazy context: created on the first sound while enabled
        const getCtx = (): AudioContext | null => {
            if (!enabledRef.current) return null;
            if (!ctxRef.current) {
                try {
                    ctxRef.current = new AudioContext();
                } catch {
                    return null;
                }
            }
            const ctx = ctxRef.current;
            if (ctx.state === "suspended") void ctx.resume();
            return ctx;
        };

        const tone = (
            ctx: AudioContext,
            type: OscillatorType,
            freq: number,
            gain: number,
            duration: number,
            startAt = 0,
            freqEnd?: number
        ) => {
            const t0 = ctx.currentTime + startAt;
            const osc = ctx.createOscillator();
            const amp = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t0);
            if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, t0 + duration);
            amp.gain.setValueAtTime(gain, t0);
            amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
            osc.connect(amp).connect(ctx.destination);
            osc.start(t0);
            osc.stop(t0 + duration);
        };

        // (a) key click while typing in an INPUT
        const onKeydown = (e: KeyboardEvent) => {
            if ((e.target as Element | null)?.tagName !== "INPUT") return;
            const ctx = getCtx();
            if (!ctx) return;
            tone(ctx, "square", 1200, 0.03, 0.004);
        };

        // (b) two-note power chord on hacker mode
        const onHacker = () => {
            const ctx = getCtx();
            if (!ctx) return;
            tone(ctx, "square", 110, 0.05, 0.12);
            tone(ctx, "square", 165, 0.05, 0.12);
        };

        // (c) rising sweep on party mode
        const onParty = () => {
            const ctx = getCtx();
            if (!ctx) return;
            tone(ctx, "sawtooth", 220, 0.04, 0.12, 0, 1760);
        };

        const announce = () =>
            window.dispatchEvent(
                new CustomEvent("sound-changed", { detail: enabledRef.current })
            );

        const onToggle = () => {
            enabledRef.current = !enabledRef.current;
            store(enabledRef.current);
            announce();
            if (enabledRef.current) {
                // confirm with a tiny blip (also unlocks the AudioContext
                // inside the user gesture that triggered the toggle)
                const ctx = getCtx();
                if (ctx) tone(ctx, "square", 880, 0.03, 0.06);
            }
        };

        // restore persisted state and let listeners (statusbar) know;
        // deferred a tick so listeners mounted elsewhere are registered
        enabledRef.current = readStored();
        const announceTimer = setTimeout(announce, 0);

        document.addEventListener("keydown", onKeydown);
        window.addEventListener("toggle-sound", onToggle);
        window.addEventListener("toggle-hacker", onHacker);
        window.addEventListener("fx-party", onParty);
        return () => {
            clearTimeout(announceTimer);
            document.removeEventListener("keydown", onKeydown);
            window.removeEventListener("toggle-sound", onToggle);
            window.removeEventListener("toggle-hacker", onHacker);
            window.removeEventListener("fx-party", onParty);
            void ctxRef.current?.close();
            ctxRef.current = null;
        };
    }, []);

    return null;
}
