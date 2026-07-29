import { ImageResponse } from "next/og";

export const alt =
    "Chandra Pratap Singh Chauhan — SDE-2 @ UrbanPiper. Backend systems × applied AI.";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#191921",
                    position: "relative",
                }}
            >
                {/* hard offset acid shadow behind the panel */}
                <div
                    style={{
                        position: "absolute",
                        width: 1020,
                        height: 470,
                        backgroundColor: "#b8f318",
                        transform: "translate(14px, 14px)",
                    }}
                />
                {/* cream panel */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: 1020,
                        height: 470,
                        backgroundColor: "#f6f1e5",
                        border: "6px solid #191921",
                        padding: "44px 52px",
                    }}
                >
                    {/* top row: CP_ chip */}
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                display: "flex",
                                backgroundColor: "#191921",
                                color: "#b8f318",
                                fontFamily: "monospace",
                                fontSize: 30,
                                fontWeight: 700,
                                padding: "8px 18px",
                                letterSpacing: 2,
                            }}
                        >
                            CP_
                        </div>
                    </div>

                    {/* name + role chip */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                color: "#191921",
                                fontSize: 84,
                                fontWeight: 800,
                                lineHeight: 1.02,
                                letterSpacing: -2,
                                textTransform: "uppercase",
                                maxWidth: 900,
                            }}
                        >
                            CHANDRA PRATAP SINGH CHAUHAN
                        </div>
                        <div
                            style={{
                                display: "flex",
                                marginTop: 28,
                                backgroundColor: "#ff5c38",
                                color: "#191921",
                                border: "4px solid #191921",
                                fontFamily: "monospace",
                                fontSize: 28,
                                fontWeight: 700,
                                padding: "10px 22px",
                                letterSpacing: 1,
                                transform: "rotate(-2deg)",
                            }}
                        >
                            SDE-2 @ URBANPIPER
                        </div>
                    </div>

                    {/* footer */}
                    <div
                        style={{
                            display: "flex",
                            color: "#191921",
                            fontFamily: "monospace",
                            fontSize: 26,
                            letterSpacing: 1,
                        }}
                    >
                        builder · tech × design × product — singhpratap.dev
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
