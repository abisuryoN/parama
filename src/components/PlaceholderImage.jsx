import React from 'react';

/**
 * PlaceholderImage renders a premium, theme-appropriate SVG graphic representing
 * mattress tarps or material textures. Avoids relying on plain grey boxes or external resources.
 */
export default function PlaceholderImage({ 
  className = '', 
  text = 'Parama Terpal Material', 
  aspect = 'aspect-video' 
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-brand-cream-soft border border-brand-grey-light select-none group w-full ${aspect} ${className}`}>
      {/* Background Texture Grid mimicking canvas weave */}
      <svg className="absolute inset-0 w-full h-full text-brand-grey/15" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 8 0 L 8 16 M 0 8 L 16 8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          </pattern>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E4E7E4" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
      
      {/* Visual decorative lines representing industrial design blueprints */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] border border-dashed border-brand-grey/20 rounded-lg flex items-center justify-center">
          <div className="w-[95%] h-[95%] border border-brand-grey/10 rounded-sm flex items-center justify-center">
            {/* Center target circle */}
            <div className="w-12 h-12 rounded-full border border-brand-grey/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-brand-green/40"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Text label overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col items-start">
        <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-green opacity-80 mb-0.5">
          PARAMA SPEC-V.4
        </span>
        <span className="text-sm font-medium text-brand-dark opacity-90 transition-transform duration-500 group-hover:translate-x-1">
          {text}
        </span>
      </div>
      
      {/* Corner indicators mirroring precision industrial layout */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-brand-grey/60"></div>
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-brand-grey/60"></div>
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-brand-grey/60"></div>
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-brand-grey/60"></div>
    </div>
  );
}
