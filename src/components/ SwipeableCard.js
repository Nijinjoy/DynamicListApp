import React, { useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const SwipeableCard = ({ item, isExpanded, onExpand, onDelete, setSwipeableRef }) => {
    const swipeRef = useRef(null);

    const renderRightActions = () => (
        <View style={styles.rightActionWrapper}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(item.id)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.wrapper}>
            <Swipeable
                ref={swipeRef}
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => {
                    if (setSwipeableRef) setSwipeableRef(swipeRef.current);
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.card, isExpanded && styles.expandedCard]}
                    onPress={() => onExpand(item.id)}
                >
                    <Text style={styles.title}>{item.title}</Text>

                    {isExpanded && (
                        <View style={styles.hiddenContent}>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.dateText}>Created: {item.date}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </Swipeable>
        </View>
    );
};

export default SwipeableCard;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#fdfdfd',
        padding: 16,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    expandedCard: {
        backgroundColor: '#f1fdf3',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    hiddenContent: {
        marginTop: 10,
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginBottom: 5,
    },
    dateText: {
        fontSize: 13,
        color: '#888',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    rightActionWrapper: {
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '95%',
        borderRadius: 10,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
