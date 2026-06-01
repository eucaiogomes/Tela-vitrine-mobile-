import { motion } from 'motion/react';

const SCALE = 0.76;
const PHONE_W = 390;
const PHONE_H = 844;
const BEZEL = 13;
const CORNER = 50;

const screenW = PHONE_W * SCALE;
const screenH = PHONE_H * SCALE;
const frameW = screenW + BEZEL * 2;
const frameH = screenH + BEZEL * 2;
const screenCorner = CORNER - 4;

export default function ShowcasePage() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(150deg, #020c1e 0%, #041433 45%, #071d4a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Outfit", sans-serif',
      padding: '32px 24px',
      gap: '40px',
    }}>

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Orange glow — bottom */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(255,122,26,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* Blue glow — top right */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-40px',
        width: '480px', height: '480px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,122,26,0.12)',
          border: '1px solid rgba(255,122,26,0.25)',
          borderRadius: '100px',
          padding: '4px 14px',
          marginBottom: '16px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7A1A', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF7A1A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Preview
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: 0,
        }}>
          Vitrine{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF7A1A 0%, #F2680D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Mobile
          </span>
        </h1>

        <p style={{
          marginTop: '10px',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 400,
          letterSpacing: '0.01em',
        }}>
          Plataforma de aprendizado corporativo
        </p>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'relative' }}
        >
          {/* Glow behind phone */}
          <div style={{
            position: 'absolute',
            inset: '-30px',
            background: 'radial-gradient(ellipse, rgba(255,122,26,0.22) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }} />

          {/* Phone frame */}
          <div style={{
            width: frameW,
            height: frameH,
            background: 'linear-gradient(160deg, #1c1c22 0%, #111115 60%, #0d0d10 100%)',
            borderRadius: CORNER,
            padding: BEZEL,
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.08),
              0 40px 80px rgba(0,0,0,0.7),
              0 20px 40px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.12),
              inset 0 -1px 0 rgba(0,0,0,0.5)
            `,
            position: 'relative',
            boxSizing: 'border-box',
          }}>

            {/* Volume up */}
            <div style={{ position: 'absolute', left: -3, top: 90, width: 3, height: 30, background: '#1e1e24', borderRadius: '2px 0 0 2px' }} />
            {/* Volume down */}
            <div style={{ position: 'absolute', left: -3, top: 132, width: 3, height: 30, background: '#1e1e24', borderRadius: '2px 0 0 2px' }} />
            {/* Power */}
            <div style={{ position: 'absolute', right: -3, top: 112, width: 3, height: 56, background: '#1e1e24', borderRadius: '0 2px 2px 0' }} />

            {/* Screen */}
            <div style={{
              width: screenW,
              height: screenH,
              borderRadius: screenCorner,
              overflow: 'hidden',
              background: '#000',
              position: 'relative',
            }}>

              {/* Dynamic Island */}
              <div style={{
                position: 'absolute', top: 12, left: '50%',
                transform: 'translateX(-50%)',
                width: Math.round(120 * SCALE),
                height: Math.round(34 * SCALE),
                background: '#000',
                borderRadius: 20,
                zIndex: 10,
              }} />

              {/* iframe */}
              <iframe
                src="http://localhost:5173"
                title="Vitrine Mobile"
                style={{
                  width: PHONE_W,
                  height: PHONE_H,
                  border: 'none',
                  transform: `scale(${SCALE})`,
                  transformOrigin: 'top left',
                  display: 'block',
                  pointerEvents: 'auto',
                }}
              />

              {/* Bottom home indicator */}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%',
                transform: 'translateX(-50%)',
                width: Math.round(120 * SCALE),
                height: 4,
                background: 'rgba(255,255,255,0.3)',
                borderRadius: 4,
                zIndex: 10,
              }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          zIndex: 1,
          margin: 0,
        }}
      >
        Lector · 2025
      </motion.p>
    </div>
  );
}
