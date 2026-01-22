"use client";

import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
    animationUrl: string;
    className?: string;
}

export function LottieAnimation({ animationUrl, className }: LottieAnimationProps) {
    const [animationData, setAnimationData] = React.useState<any>(null);

    React.useEffect(() => {
        fetch(animationUrl)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch Lottie: ${res.statusText}`);
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("text/html")) {
                    throw new Error("Expected JSON but got HTML (likely 404 or error page)");
                }
                return res.json();
            })
            .then((data) => setAnimationData(data))
            .catch((err) => {
                console.warn(`Error loading Lottie (${animationUrl}):`, err);
                setAnimationData(null);
            });
    }, [animationUrl]);

    if (!animationData) return null;

    return <Lottie animationData={animationData} loop={true} className={className} />;
}
