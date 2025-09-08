import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

function ProductDetails({ route }) {
    const { product } = route.params;
    return (
        <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
            <Image
                source={{ uri: product.image }}
                style={{
                    width: '100%',
                    height: 300,
                    borderRadius: 8,
                    marginBottom: 16,
                }}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
                {product.title}
            </Text>
            <Text style={{ fontSize: 20, color: '#2E86C1', marginBottom: 8 }}>
                ${product.price}
            </Text>
            <Text style={{ fontSize: 16, color: '#888', marginBottom: 8 }}>
                Category: {product.category}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 12 }}>
                {product.rating.rate} ({product.rating.count} reviews)
            </Text>

            <Text style={{ fontSize: 16, lineHeight: 22, color: '#555' }}>
                {product.description}
            </Text>
        </ScrollView>
    );
}

export default ProductDetails;