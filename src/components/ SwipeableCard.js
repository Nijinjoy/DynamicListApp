import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const SwipeableCard = ({ item, isExpanded, onExpand, onDelete, setSwipeableRef }) => {
    const swipeRef = useRef(null);

    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isExpanded ? 0.5 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isExpanded]);

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

                    <Animated.View
                        style={[
                            styles.hiddenContent,
                            {
                                height: animation.interpolate({
                                    inputRange: [0, 1], // The animated value from 0 to 1
                                    outputRange: [0, 200], // The height range from 0 (collapsed) to 200 (expanded)
                                }),
                            },
                        ]}
                    >
                        {isExpanded && (
                            <>
                                <Text style={styles.description}>{item.description}</Text>
                                <View style={styles.actions}>
                                    <Text style={styles.actionText}>“Here's a quick breakdown of what needs your attention today. Stay sharp!”</Text>
                                </View>
                            </>
                        )}
                    </Animated.View>
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
        overflow: 'hidden', // Hide any overflow when the card is collapsed
        // marginTop: 10,
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginBottom: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#43cea2',
        textTransform: 'capitalize',
        letterSpacing: 0.8,
        borderBottomWidth: 2,
        borderBottomColor: '#43cea2',
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
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
