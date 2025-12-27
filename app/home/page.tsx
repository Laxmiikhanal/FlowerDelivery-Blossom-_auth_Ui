export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tulips</h1>

      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8].map((i) => (
          <div key={i} className="bg-white rounded-xl p-2">
            <img src="/flower.jpg" className="rounded-lg" />
            <p className="mt-2 text-sm font-semibold">Bouquet</p>
          </div>
        ))}
      </div>
    </div>
  );
}
