export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-4 grid-3 grid-2" style={{ gap: '1rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          background: '#1e1e1e',
          borderRadius: '0.5rem',
          height: '250px',
          animation: 'pulse 1.5s infinite'
        }}></div>
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
