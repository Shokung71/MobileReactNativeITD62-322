import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

function ProductList({ navigation }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 8 }}>Loading products…</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Product Details', { product: item })}
            style={styles.card}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 14,
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',

        // Shadows for Android & iOS
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardImage: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#222',
    },
    cardPrice: {
        fontSize: 14,
        color: '#2E86C1',
        fontWeight: 'bold',
    },
});

export default ProductList;