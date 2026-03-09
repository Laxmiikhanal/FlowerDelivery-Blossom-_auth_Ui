'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: { _id: string; name: string };
    images: string[];
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [params.id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/products/${params.id}`);
            const data = await res.json();
            if (data.success) {
                setProduct(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
        } finally {
            setLoading(false);
        }
    };

   const addToCart = () => {
  if (!product?._id) return;

  const raw = localStorage.getItem("blossom_cart");
  const cart = raw ? JSON.parse(raw) : [];

  const index = cart.findIndex((item: any) => item.productId === product._id);

  if (index >= 0) {
    cart[index].qty = Number(cart[index].qty || 1) + quantity;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: quantity,
      image: product.images?.[0] || "",
    });
  }

  localStorage.setItem("blossom_cart", JSON.stringify(cart));

  alert("Product added to cart!");
  router.push("/cart");
};
    if (loading) return <div className="p-8">Loading...</div>;
    if (!product) return <div className="p-8">Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-8">
                <button
                    onClick={() => router.back()}
                    className="mb-8 text-blue-600 hover:underline"
                >
                    ← Back to Products
                </button>

                <div className="bg-white rounded-lg shadow p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Images */}
                        <div>
                            <div className="mb-4 h-96 bg-gray-200 relative rounded-lg overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}${product.images[selectedImage]}`}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-2">
                                    {product.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`h-20 w-20 bg-gray-200 relative rounded cursor-pointer ${selectedImage === idx ? 'ring-2 ring-blue-600' : ''
                                                }`}
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}${img}`}
                                                alt={product.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <p className="text-sm text-gray-500 mb-4">Category: {product.category?.name}</p>
                            <p className="text-3xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</p>

                            <p className="text-gray-700 mb-8">{product.description}</p>

                            <div className="mb-6">
                                <span className="text-sm text-gray-600">Available Stock: {product.stock}</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                    className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <button
                                onClick={addToCart}
                                disabled={product.stock === 0}
                                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
