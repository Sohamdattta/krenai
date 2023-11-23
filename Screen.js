import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from '@expo/vector-icons';


const ProductScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100'
            );

            const fetchedProducts = response.data?.object;

            if (Array.isArray(fetchedProducts)) {
                setProducts(fetchedProducts);
            } else {
                console.error('API did not return an array of products:', fetchedProducts);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.pageName}>Product Page</Text>
                    </View>
                    <View style={styles.iconContainer}>

                        <Ionicons name="md-search" size={24} color="black" style={styles.icon} />
                        <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" style={styles.icon} />
                        <SimpleLineIcons name="handbag" size={24} color="black" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.footer}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.totalProducts}>{products.length}/100 Products</Text>
                    </View>
                    <TouchableOpacity style={styles.footerIconContainer}>
                        <Octicons name="sort-asc" size={24} color="black" style={styles.footerIcon} />
                        <Text style={styles.footerText}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIconContainer}>
                        <AntDesign name="filter" size={24} color="black" style={styles.footerIcon} />
                        <Text style={styles.footerText}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardsContainer}>
                    {products && products.map((product) => (
                        <TouchableOpacity key={product.id} style={styles.card}>
                            <Image style={styles.cardImage} source={{ uri: product.mediaUrl }} />
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>
                            <Text style={styles.cardDescription}>{product.description}</Text>
                            <Text style={styles.cardDescription}>{product.keywords}</Text>
                            <Text style={styles.price}>${product.variants[0].mrp}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    pageName: {

        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',

    },
    icon: {
        marginLeft: 20,
    },
    horizontalLine: {
        height: 0.2,
        backgroundColor: 'grey',
        marginVertical: 10,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    card: {
        width: '49%', 
        marginBottom: 16,
        paddingHorizontal: 3,
        marginLeft: 3
    },
    iconInImage: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardDescription: {
        marginTop: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    footerTextContainer: {
        flex: 1,
    },
    totalProducts: {
        fontWeight: 'bold',
    },
    footerIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    footerIcon: {
        marginRight: 5,
    },
    footerText: {
        fontWeight: 'bold',
    },
});

export default ProductScreen;
