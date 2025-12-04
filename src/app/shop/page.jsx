import React from 'react';
import Image from 'next/image';

const products = [
    {
        id: 1,
        name: 'Wooden Keychain',
        image: '/shop/wooden_keychain_1764846479584.png',
        description: 'Hand-carved wooden keychain with traditional Luo symbols.'
    },
    {
        id: 2,
        name: 'Beaded Necklace',
        image: '/shop/beaded_necklace_1764846503184.png',
        description: 'Vibrant African beaded necklace with intricate patterns.'
    },
    {
        id: 3,
        name: 'Shirts and Hoodies',
        image: '/shop/apparel_merch_1764846525276.png',
        description: 'Premium quality hoodies and t-shirts with cultural prints.'
    },
    {
        id: 4,
        name: 'Shopping Kiondoo',
        image: '/shop/kiondoo_basket_1764846539614.png',
        description: 'Traditional handwoven sisal basket, durable and stylish.'
    },
    {
        id: 5,
        name: 'Orutu Instrument',
        image: '/shop/orutu_instrument_1764846555476.png',
        description: 'Authentic single-stringed fiddle for traditional music.'
    },
    {
        id: 6,
        name: 'Ajua Game',
        image: '/shop/ajua_board_1764846570957.png',
        description: 'Classic wooden board game (Mancala) for strategy and fun.'
    },
    {
        id: 7,
        name: 'Leather Skin Carpets',
        image: '/shop/leather_carpet_1764846590965.png',
        description: 'High-quality natural cowhide rugs with unique patterns.'
    }
];

export default function ShopPage() {
    // Placeholder phone number - replace with actual number
    const phoneNumber = '254114116011';

    const createWhatsAppLink = (productName) => {
        const message = encodeURIComponent(`Hello, I am interested in buying the ${productName} from the Luo Community Shop.`);
        return `https://wa.me/${phoneNumber}?text=${message}`;
    };

    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-12">
                    <h1 className="section-title">Luo Community Shop</h1>
                    <p className="section-subtitle">
                        Discover authentic cultural artifacts, traditional instruments, and modern merchandise that celebrate our heritage.
                    </p>
                </div>

                <div className="feature-grid">
                    {products.map((product) => (
                        <div key={product.id} className="card">
                            <div style={{ position: 'relative', height: '250px', width: '100%', overflow: 'hidden' }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="card-body flex flex-col h-full">
                                <h3 className="card-title">{product.name}</h3>
                                <p className="card-text mb-4">{product.description}</p>
                                <div className="mt-auto flex items-center justify-end">
                                    <a
                                        href={createWhatsAppLink(product.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary text-sm w-full justify-center"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Buy Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
