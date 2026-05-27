const partners = [
  { name: 'Tech Media', symbol: '◈' },
  { name: 'Tech Media', symbol: '◆' },
  { name: 'Tech Media', symbol: '▣' },
  { name: 'Tech Media', symbol: '◇' },
  { name: 'Tech Media', symbol: '◉' },
];

export function Partners() {
  return (
    <div className="py-8" style={{ backgroundColor: '#2D5BE3' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-0 lg:justify-between">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-white text-xl font-bold opacity-90">{p.symbol}</span>
              <span className="text-white text-base font-bold tracking-wide opacity-90">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
