import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function Logo({ className, variant = "dark" }: LogoProps) {
  const primaryColor = variant === "dark" ? "#1E3A5F" : "#FFFFFF";
  const secondaryColor = variant === "dark" ? "#3B82F6" : "#93C5FD";

  return (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-12 w-auto", className)}
    >
      {/* Circular Badge with Text */}
      <g transform="translate(40, 40)">
        {/* Circle path for curved text */}
        <defs>
          <path
            id="textCircleTop"
            d="M -28 0 A 28 28 0 0 1 28 0"
            fill="none"
          />
          <path
            id="textCircleBottom"
            d="M 28 0 A 28 28 0 0 1 -28 0"
            fill="none"
          />
        </defs>
        
        {/* Curved text - top */}
        <text fill={primaryColor} fontSize="6" fontWeight="500" letterSpacing="0.5">
          <textPath href="#textCircleTop" startOffset="50%" textAnchor="middle">
            DEN BESTEN VERTRAUEN
          </textPath>
        </text>
        
        {/* Heartbeat Line / EKG Symbol */}
        <path
          d="M -12 0 L -6 0 L -3 -8 L 0 8 L 3 -4 L 6 0 L 12 0"
          stroke={secondaryColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Main Text */}
      <text
        x="90"
        y="38"
        fill={primaryColor}
        fontFamily="'DM Serif Display', Georgia, serif"
        fontSize="28"
        fontWeight="400"
      >
        Praxis Amara
      </text>

      {/* Subtitle */}
      <text
        x="90"
        y="56"
        fill={variant === "dark" ? "#64748B" : "rgba(255,255,255,0.8)"}
        fontFamily="'DM Sans', sans-serif"
        fontSize="9"
        fontWeight="400"
        letterSpacing="1.5"
      >
        INTERNISTISCHE HAUSARZTPRAXIS
      </text>
    </svg>
  );
}

