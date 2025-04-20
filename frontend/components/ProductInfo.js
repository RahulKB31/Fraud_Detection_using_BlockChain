import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductInfo = ({ product }) => {
    if (!product) {
        return <Text>No product information available</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Details</Text>
            <Text style={styles.info}><Text style={styles.label}>Serial Number:</Text> {product.serialNumber}</Text>
            <Text style={styles.info}><Text style={styles.label}>Manufacturer:</Text> {product.manufacturer}</Text>
            <Text style={styles.info}><Text style={styles.label}>Created At:</Text> {new Date(product.createdAt).toLocaleString()}</Text>
            <Text style={styles.title}>Checkpoints</Text>
            {product.checkpoints.length > 0 ? (
                product.checkpoints.map((checkpoint, index) => (
                    <Text key={index} style={styles.info}>
                        <Text style={styles.label}>Checkpoint {index + 1}:</Text> {checkpoint.location} at {new Date(checkpoint.timestamp).toLocaleString()}
                    </Text>
                ))
            ) : (
                <Text>No checkpoints available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
});

export default ProductInfo;