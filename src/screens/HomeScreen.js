import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, StatusBar, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SwipeableCard from '../components/ SwipeableCard';
import { initialData } from '../utils/data';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const HomeScreen = () => {
    const [data, setData] = useState(initialData);
    const [expandedId, setExpandedId] = useState(null);
    const swipeableRow = useRef(null);


    const handleDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setData((prev) => prev.filter((item) => item.id !== id));
                        if (expandedId === id) setExpandedId(null);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleToggle = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const setSwipeableRef = (ref) => {
        if (swipeableRow.current && swipeableRow.current !== ref) {
            swipeableRow.current.close(); // Close previous swipeable
        }
        swipeableRow.current = ref; // Set the new swipeable as current
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ExpoStatusBar style="light" backgroundColor="transparent" />
            <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.title}>Welcome to Your Tasks!</Text>
                        <Text style={styles.subtitle}> Organize and track your tasks in style</Text>
                    </View>
                </View>
            </LinearGradient>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <SwipeableCard
                        item={item}
                        isExpanded={item.id === expandedId}
                        onExpand={handleToggle}
                        onDelete={handleDelete}
                        setSwipeableRef={setSwipeableRef}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
        paddingBottom: 25,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        color: '#e0f2f1',
        marginTop: 5,
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '85%',
        borderRadius: 10,
    },
});
