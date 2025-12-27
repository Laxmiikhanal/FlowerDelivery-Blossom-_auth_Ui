export default function AddToCartPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">

        <img src="/tulip.png" className="rounded-xl mb-4" />

        <h2 className="text-xl font-bold">Tulips</h2>
        <p className="text-pink-500 font-semibold mt-2">Rs.2000</p>

        <p className="text-sm mt-3 text-gray-600">
          Pink tulips represent affection, caring, and good wishes.
          They are often associated with happiness, confidence,
          and admiration, making them a popular choice for expressing gentle emotions.
        </p>

        <button className="btn-primary mt-6 w-full">Add to Cart</button>
      </div>
    </div>
  );
}
