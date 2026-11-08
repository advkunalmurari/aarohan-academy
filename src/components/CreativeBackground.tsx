import React from 'react';

interface HeroCreativeBackdropProps {
  mouseOffset: { x: number; y: number };
}

/**
 * Reusable SVG Doodles so every section & page can display crisp, playful
 * paper planes, calculators, geometric set-squares, protractors, storybooks,
 * science atoms, pencils, and compasses.
 */
export const PaperPlaneWithTrailSvg: React.FC<{
  className?: string;
  flip?: boolean;
  lightMode?: boolean;
}> = ({ className = 'w-64 h-28', flip = false, lightMode = true }) => (
  <svg
    viewBox="0 0 300 120"
    fill="none"
    className={`${className} overflow-visible ${flip ? '-scale-x-100' : ''}`}
  >
    <path
      d="M10 95 C 75 110, 115 25, 180 55 C 215 70, 235 45, 258 28"
      stroke={lightMode ? '#36A9E1' : '#FFC845'}
      strokeWidth="2.2"
      strokeDasharray="6 6"
      strokeLinecap="round"
      className="animate-dash-flow opacity-75"
    />
    <g className="animate-float-slow">
      <path
        d="M252 14 L288 22 L262 46 L260 32 L245 27 Z"
        fill="#FFF8EB"
        stroke={lightMode ? '#24476B' : '#0F172A'}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M288 22 L260 32 L262 46"
        fill="#FFC845"
        stroke={lightMode ? '#24476B' : '#0F172A'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const CalculatorDoodleSvg: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <rect
      x="12"
      y="8"
      width="40"
      height="48"
      rx="9"
      transform="rotate(10 32 32)"
      fill="#FFF8EB"
      stroke="#24476B"
      strokeWidth="2.4"
    />
    <rect
      x="19"
      y="15"
      width="28"
      height="10"
      rx="3"
      transform="rotate(10 32 32)"
      fill="#36A9E1"
      fillOpacity="0.3"
      stroke="#24476B"
      strokeWidth="1.8"
    />
    <circle cx="22" cy="34" r="2.8" fill="#F47B45" />
    <circle cx="31" cy="36" r="2.8" fill="#FFC845" />
    <circle cx="40" cy="37" r="2.8" fill="#4CAF80" />
    <circle cx="20" cy="43" r="2.8" fill="#24476B" />
    <circle cx="29" cy="45" r="2.8" fill="#36A9E1" />
    <circle cx="38" cy="46" r="2.8" fill="#F47B45" />
  </svg>
);

export const SetSquareDoodleSvg: React.FC<{
  className?: string;
  accentColor?: string;
}> = ({ className = 'w-14 h-14', accentColor = '#4CAF80' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path
      d="M8 52 L54 52 L22 10 Z"
      fill={accentColor}
      fillOpacity="0.25"
      stroke="#24476B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M18 44 L38 44 L24 25 Z"
      fill="#FFFDF9"
      stroke="#24476B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const StorybookDoodleSvg: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 72 72" fill="none" className={className}>
    <path
      d="M12 48 C22 44, 30 46, 36 52 C42 46, 50 44, 60 48 L60 24 C50 20, 42 22, 36 28 C30 22, 22 20, 12 24 Z"
      fill="#FFF8EB"
      stroke="#24476B"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M36 28 L36 52" stroke="#F47B45" strokeWidth="2.4" strokeLinecap="round" />
    <path
      d="M20 31 L30 33 M20 38 L29 40 M42 33 L52 31 M43 40 L52 38"
      stroke="#36A9E1"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M36 8 L38.5 14.5 L45 17 L38.5 19.5 L36 26 L33.5 19.5 L27 17 L33.5 14.5 Z"
      fill="#FFC845"
      stroke="#24476B"
      strokeWidth="1.6"
    />
  </svg>
);

export const AtomOrbitDoodleSvg: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 68 68" fill="none" className={className}>
    <ellipse
      cx="34"
      cy="34"
      rx="26"
      ry="11"
      transform="rotate(-28 34 34)"
      stroke="#36A9E1"
      strokeWidth="2.2"
    />
    <ellipse
      cx="34"
      cy="34"
      rx="26"
      ry="11"
      transform="rotate(32 34 34)"
      stroke="#F47B45"
      strokeWidth="2.2"
    />
    <circle cx="34" cy="34" r="5" fill="#FFC845" stroke="#24476B" strokeWidth="2" />
    <circle cx="14" cy="24" r="3" fill="#4CAF80" />
    <circle cx="53" cy="43" r="3" fill="#36A9E1" />
  </svg>
);

export const ProtractorCompassDoodleSvg: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 72 72" fill="none" className={className}>
    {/* Protractor Half-Circle */}
    <path
      d="M10 52 A 26 26 0 0 1 62 52 Z"
      fill="#FFC845"
      fillOpacity="0.28"
      stroke="#24476B"
      strokeWidth="2.3"
      strokeLinejoin="round"
    />
    <path
      d="M22 52 A 14 14 0 0 1 50 52 Z"
      fill="#FFFDF9"
      stroke="#24476B"
      strokeWidth="1.8"
    />
    <line x1="36" y1="26" x2="36" y2="31" stroke="#F47B45" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="33" x2="23" y2="37" stroke="#24476B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="52" y1="33" x2="49" y2="37" stroke="#24476B" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const PencilRulerDoodleSvg: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    {/* Pencil */}
    <g transform="rotate(-22 32 32)">
      <rect
        x="26"
        y="12"
        width="12"
        height="34"
        rx="2"
        fill="#FFC845"
        stroke="#24476B"
        strokeWidth="2.2"
      />
      <path
        d="M26 46 L32 56 L38 46 Z"
        fill="#FFF8EB"
        stroke="#24476B"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M30 52 L32 56 L34 52 Z" fill="#F47B45" />
      <rect
        x="26"
        y="8"
        width="12"
        height="6"
        rx="2"
        fill="#F47B45"
        stroke="#24476B"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export const GeometricCubeStarSvg: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <polygon
      points="32,8 54,20 54,44 32,56 10,44 10,20"
      fill="#36A9E1"
      fillOpacity="0.2"
      stroke="#24476B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M10 20 L32 32 L54 20 M32 32 L32 56"
      stroke="#24476B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="8" r="3.5" fill="#FFC845" stroke="#24476B" strokeWidth="1.6" />
    <circle cx="54" cy="20" r="3" fill="#F47B45" />
    <circle cx="10" cy="44" r="3" fill="#4CAF80" />
  </svg>
);

/**
 * Rich, multi-layered animated hero backdrop combining warm aurora gradients,
 * subtle notebook/dot geometry, and interactive mouse-parallax educational
 * vector illustrations inspired by the Edukids & BOO design references.
 */
export const HeroCreativeBackdrop: React.FC<HeroCreativeBackdropProps> = ({
  mouseOffset,
}) => {
  const layer1Style = {
    transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -18}px, 0)`,
    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const layer2Style = {
    transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px, 0)`,
    transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* 1. Multi-stop Sunlit & Sky Aurora Mesh Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(255, 200, 69, 0.28) 0%, transparent 42%), radial-gradient(circle at 88% 22%, rgba(54, 169, 225, 0.22) 0%, transparent 46%), radial-gradient(circle at 76% 84%, rgba(244, 123, 69, 0.18) 0%, transparent 42%), radial-gradient(circle at 24% 82%, rgba(76, 175, 128, 0.16) 0%, transparent 40%), linear-gradient(180deg, #FFF6E0 0%, #F4FAFF 54%, #FFFDF8 100%)',
        }}
      />

      {/* 2. Animated Floating Aurora Color Orbs */}
      <div className="animate-aurora absolute -top-20 left-[8%] w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#FFC845]/35 via-[#F47B45]/20 to-transparent blur-3xl" />
      <div
        className="animate-aurora absolute top-[10%] right-[4%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-[#36A9E1]/30 via-[#4CAF80]/20 to-transparent blur-3xl"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="animate-aurora absolute -bottom-24 left-[38%] w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-[#4CAF80]/22 via-[#FFC845]/25 to-transparent blur-3xl"
        style={{ animationDelay: '-9s' }}
      />

      {/* 3. Architectural Notebook Grid + Dot Matrix Overlay */}
      <div
        className="absolute inset-0 bg-notebook-grid opacity-90"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 45%, black 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 45%, black 55%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 bg-dot-pattern opacity-65"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 95%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 35%, transparent 95%)',
        }}
      />

      {/* 4. Decorative Topographic / Contour Learning Rings */}
      <svg
        className="absolute -top-24 -left-24 w-[420px] h-[420px] text-[#24476B]/[0.055]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="200" cy="200" r="125" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 8" />
      </svg>

      {/* 5. Interactive Parallax Layer 1 */}
      <div style={layer1Style} className="absolute inset-0">
        <div className="hidden md:block absolute top-6 left-[44%] lg:left-[46%]">
          <PaperPlaneWithTrailSvg className="w-72 h-32" />
        </div>

        <div className="hidden lg:block absolute bottom-10 right-[44%] animate-float-reverse">
          <SetSquareDoodleSvg className="w-13 h-13" />
        </div>

        <div className="hidden xl:block absolute top-[38%] left-6 animate-float-slow">
          <StorybookDoodleSvg className="w-17 h-17" />
        </div>
      </div>

      {/* 6. Interactive Parallax Layer 2 */}
      <div style={layer2Style} className="absolute inset-0">
        <div
          className="hidden lg:block absolute bottom-10 left-[3%] animate-float-reverse"
          style={{ animationDelay: '-2.5s' }}
        >
          <AtomOrbitDoodleSvg className="w-15 h-15" />
        </div>

        <div
          className="hidden xl:block absolute top-14 right-6 animate-float-slow"
          style={{ animationDelay: '-3.5s' }}
        >
          <CalculatorDoodleSvg className="w-15 h-15" />
        </div>
      </div>
    </div>
  );
};

/**
 * Circular rotating SVG seal badge inspired by the BOO reference hero screenshot.
 */
export const RotatingAcademyStamp: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#24476B] text-white shadow-xl border-4 border-white flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full p-1.5 animate-spin-slow"
      >
        <defs>
          <path
            id="aarohan-stamp-circle"
            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text
          fill="#FFC845"
          fontSize="9.2"
          fontWeight="800"
          letterSpacing="1.6px"
        >
          <textPath href="#aarohan-stamp-circle" startOffset="2%">
            AAROHAN • LEARN • GROW • SHINE •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs sm:text-sm font-extrabold text-white leading-none">
          15–20
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#36A9E1] mt-0.5">
          Batch Cap
        </span>
      </div>
    </div>
  );
};

interface SectionDoodleBackdropProps {
  variant?: 'warm' | 'cool' | 'mint' | 'navy' | 'lavender' | 'sunrise';
}

/**
 * Rich, animated background layer for ALL landing page & inner page sections.
 * Includes aurora color orbs, notebook + dot grid textures, topographic rings,
 * and animated floating paper planes, calculators, geometric shapes, storybooks,
 * protractors, pencils, and atoms.
 */
export const SectionDoodleBackdrop: React.FC<SectionDoodleBackdropProps> = ({
  variant = 'warm',
}) => {
  if (variant === 'navy') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      >
        {/* Subtle dark grid & glowing aurora orbs */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 200, 69, 0.35) 1.25px, transparent 1.25px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="animate-aurora absolute -top-24 left-[10%] w-96 h-96 rounded-full bg-[#36A9E1]/20 blur-3xl" />
        <div
          className="animate-aurora absolute -bottom-24 right-[8%] w-96 h-96 rounded-full bg-[#FFC845]/18 blur-3xl"
          style={{ animationDelay: '-6s' }}
        />

        {/* Paper plane gliding across dark section */}
        <div className="hidden md:block absolute top-6 right-[8%] opacity-85">
          <PaperPlaneWithTrailSvg className="w-60 h-24" lightMode={false} />
        </div>

        {/* Floating Atom & Geometric Cube on Navy */}
        <div className="hidden md:block absolute bottom-8 left-6 animate-float-slow opacity-80">
          <AtomOrbitDoodleSvg className="w-14 h-14" />
        </div>
        <div
          className="hidden lg:block absolute bottom-8 right-8 animate-float-reverse opacity-75"
          style={{ animationDelay: '-3s' }}
        >
          <SetSquareDoodleSvg className="w-12 h-12" accentColor="#FFC845" />
        </div>
      </div>
    );
  }

  const meshByVariant: Record<string, string> = {
    warm:
      'radial-gradient(circle at 10% 20%, rgba(255, 200, 69, 0.24) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(244, 123, 69, 0.16) 0%, transparent 45%), radial-gradient(circle at 82% 18%, rgba(54, 169, 225, 0.14) 0%, transparent 40%)',
    cool:
      'radial-gradient(circle at 88% 18%, rgba(54, 169, 225, 0.20) 0%, transparent 46%), radial-gradient(circle at 12% 78%, rgba(255, 200, 69, 0.22) 0%, transparent 44%), radial-gradient(circle at 50% 15%, rgba(76, 175, 128, 0.12) 0%, transparent 40%)',
    mint:
      'radial-gradient(circle at 14% 24%, rgba(76, 175, 128, 0.18) 0%, transparent 45%), radial-gradient(circle at 86% 76%, rgba(54, 169, 225, 0.18) 0%, transparent 45%), radial-gradient(circle at 78% 16%, rgba(255, 200, 69, 0.20) 0%, transparent 38%)',
    lavender:
      'radial-gradient(circle at 16% 22%, rgba(54, 169, 225, 0.18) 0%, transparent 45%), radial-gradient(circle at 84% 78%, rgba(244, 123, 69, 0.16) 0%, transparent 45%), radial-gradient(circle at 50% 85%, rgba(255, 200, 69, 0.20) 0%, transparent 42%)',
    sunrise:
      'radial-gradient(circle at 85% 20%, rgba(255, 200, 69, 0.26) 0%, transparent 46%), radial-gradient(circle at 15% 80%, rgba(54, 169, 225, 0.18) 0%, transparent 46%), radial-gradient(circle at 20% 20%, rgba(244, 123, 69, 0.15) 0%, transparent 40%)',
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* 1. Multi-stop Soft Aurora Radial Mesh */}
      <div
        className="absolute inset-0"
        style={{ background: meshByVariant[variant] || meshByVariant.warm }}
      />

      {/* 2. Architectural Notebook Grid + Dot Pattern */}
      <div
        className="absolute inset-0 bg-notebook-grid opacity-80"
        style={{
          maskImage:
            'radial-gradient(ellipse 92% 85% at 50% 50%, black 45%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 92% 85% at 50% 50%, black 45%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 bg-dot-pattern opacity-55"
        style={{
          maskImage:
            'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 98%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 98%)',
        }}
      />

      {/* 3. Animated Aurora Orbs */}
      <div className="animate-aurora absolute -top-20 -right-12 w-80 h-80 rounded-full bg-[#FFC845]/25 blur-3xl" />
      <div
        className="animate-aurora absolute -bottom-20 -left-12 w-80 h-80 rounded-full bg-[#36A9E1]/20 blur-3xl"
        style={{ animationDelay: '-5s' }}
      />

      {/* 4. Decorative Topographic Rings in Corner */}
      <svg
        className="hidden md:block absolute -bottom-28 -right-28 w-80 h-80 text-[#24476B]/[0.05]"
        viewBox="0 0 320 320"
        fill="none"
      >
        <circle cx="160" cy="160" r="65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="160" cy="160" r="105" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" />
      </svg>

      {/* 5. Variant-Specific Constellation of Animated Educational Illustrations */}
      {variant === 'cool' && (
        <>
          <div className="hidden md:block absolute top-6 right-[28%] lg:right-[32%] opacity-90">
            <PaperPlaneWithTrailSvg className="w-60 h-24" />
          </div>
          <div className="hidden sm:block absolute top-12 right-6 lg:right-10 animate-float-slow">
            <CalculatorDoodleSvg className="w-14 h-14" />
          </div>
          <div
            className="hidden md:block absolute bottom-8 left-6 lg:left-10 animate-float-reverse"
            style={{ animationDelay: '-2s' }}
          >
            <SetSquareDoodleSvg className="w-13 h-13" accentColor="#36A9E1" />
          </div>
          <div
            className="hidden lg:block absolute top-[45%] left-5 animate-float-slow"
            style={{ animationDelay: '-4s' }}
          >
            <ProtractorCompassDoodleSvg className="w-14 h-14" />
          </div>
        </>
      )}

      {variant === 'warm' && (
        <>
          <div className="hidden md:block absolute top-6 right-[8%] opacity-90">
            <PaperPlaneWithTrailSvg className="w-60 h-24" flip />
          </div>
          <div className="hidden sm:block absolute top-14 left-6 lg:left-10 animate-float-slow">
            <StorybookDoodleSvg className="w-15 h-15" />
          </div>
          <div
            className="hidden md:block absolute bottom-10 right-6 lg:right-12 animate-float-reverse"
            style={{ animationDelay: '-3s' }}
          >
            <CalculatorDoodleSvg className="w-14 h-14" />
          </div>
          <div
            className="hidden lg:block absolute bottom-12 left-[6%] animate-float-slow"
            style={{ animationDelay: '-1.5s' }}
          >
            <GeometricCubeStarSvg className="w-13 h-13" />
          </div>
        </>
      )}

      {variant === 'mint' && (
        <>
          <div className="hidden md:block absolute top-5 left-[38%] opacity-85">
            <PaperPlaneWithTrailSvg className="w-56 h-24" />
          </div>
          <div className="hidden sm:block absolute top-12 right-6 lg:right-12 animate-float-reverse">
            <ProtractorCompassDoodleSvg className="w-15 h-15" />
          </div>
          <div
            className="hidden md:block absolute bottom-8 left-6 lg:left-10 animate-float-slow"
            style={{ animationDelay: '-2.5s' }}
          >
            <PencilRulerDoodleSvg className="w-14 h-14" />
          </div>
          <div
            className="hidden lg:block absolute bottom-10 right-8 animate-float-reverse"
            style={{ animationDelay: '-4s' }}
          >
            <SetSquareDoodleSvg className="w-13 h-13" accentColor="#4CAF80" />
          </div>
        </>
      )}

      {variant === 'lavender' && (
        <>
          <div className="hidden md:block absolute top-6 right-[14%] opacity-85">
            <PaperPlaneWithTrailSvg className="w-56 h-24" />
          </div>
          <div className="hidden sm:block absolute top-12 left-6 lg:left-10 animate-float-slow">
            <AtomOrbitDoodleSvg className="w-15 h-15" />
          </div>
          <div
            className="hidden md:block absolute bottom-10 right-6 lg:right-10 animate-float-reverse"
            style={{ animationDelay: '-3s' }}
          >
            <StorybookDoodleSvg className="w-15 h-15" />
          </div>
          <div
            className="hidden lg:block absolute bottom-10 left-[8%] animate-float-slow"
            style={{ animationDelay: '-1.5s' }}
          >
            <CalculatorDoodleSvg className="w-13 h-13" />
          </div>
        </>
      )}

      {variant === 'sunrise' && (
        <>
          <div className="hidden md:block absolute top-6 left-[34%] opacity-90">
            <PaperPlaneWithTrailSvg className="w-60 h-24" />
          </div>
          <div className="hidden sm:block absolute top-10 right-6 lg:right-12 animate-float-slow">
            <GeometricCubeStarSvg className="w-14 h-14" />
          </div>
          <div
            className="hidden md:block absolute bottom-8 left-6 lg:left-12 animate-float-reverse"
            style={{ animationDelay: '-2s' }}
          >
            <CalculatorDoodleSvg className="w-14 h-14" />
          </div>
          <div
            className="hidden lg:block absolute bottom-12 right-10 animate-float-slow"
            style={{ animationDelay: '-4.5s' }}
          >
            <PencilRulerDoodleSvg className="w-14 h-14" />
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Dedicated animated Hero banner backdrop for all interior pages (About, Approach,
 * Programmes, Stage Pages, Subjects, Assessment, Library, Parent Corner, FAQs, Contact).
 */
export const PageHeroBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Multi-stop Aurora Mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 20%, rgba(255, 200, 69, 0.28) 0%, transparent 45%), radial-gradient(circle at 86% 24%, rgba(54, 169, 225, 0.22) 0%, transparent 48%), radial-gradient(circle at 75% 85%, rgba(244, 123, 69, 0.16) 0%, transparent 42%), linear-gradient(180deg, #FFF5DC 0%, #F4FAFF 65%, #FFFDF9 100%)',
        }}
      />

      {/* Notebook + Dot Grid */}
      <div
        className="absolute inset-0 bg-notebook-grid opacity-90"
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 50%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Animated Aurora Orbs */}
      <div className="animate-aurora absolute -top-16 right-[12%] w-80 h-80 rounded-full bg-[#36A9E1]/25 blur-3xl" />
      <div
        className="animate-aurora absolute -bottom-16 left-[10%] w-80 h-80 rounded-full bg-[#FFC845]/30 blur-3xl"
        style={{ animationDelay: '-4s' }}
      />

      {/* Paper Plane + Calculator + Set-Square + Storybook */}
      <div className="hidden md:block absolute top-6 right-[16%] lg:right-[22%]">
        <PaperPlaneWithTrailSvg className="w-64 h-28" />
      </div>
      <div className="hidden sm:block absolute top-10 right-6 lg:right-12 animate-float-slow">
        <CalculatorDoodleSvg className="w-14 h-14" />
      </div>
      <div
        className="hidden md:block absolute bottom-6 right-[8%] lg:right-[12%] animate-float-reverse"
        style={{ animationDelay: '-2.5s' }}
      >
        <SetSquareDoodleSvg className="w-13 h-13" accentColor="#4CAF80" />
      </div>
      <div
        className="hidden lg:block absolute bottom-6 right-[32%] animate-float-slow"
        style={{ animationDelay: '-4s' }}
      >
        <ProtractorCompassDoodleSvg className="w-13 h-13" />
      </div>
    </div>
  );
};
