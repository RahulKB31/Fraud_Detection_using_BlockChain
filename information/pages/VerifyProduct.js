import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import QRScanner from '../components/QRScanner';
import ProductInfo from '../components/ProductInfo';
import axios from 'axios';

const VerifyProduct = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScan = async (serialNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/product/verify/${serialNumber}`);
            setProductInfo(response.data);
        } catch (error) {
            alert('Failed to verify product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {!productInfo ? (
                <QRScanner onScan={handleScan} />
            ) : (
                <>
                    <ProductInfo product={productInfo} />
                    <TouchableOpacity
                        onPress={() => setProductInfo(null)}
                        style={{ padding: 10, backgroundColor: '#007BFF', margin: 20, borderRadius: 5 }}
                    >
                        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Scan Another Product</Text>
                    </TouchableOpacity>
                </>
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
};

export default VerifyProduct;