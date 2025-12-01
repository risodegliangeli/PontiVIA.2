import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

interface PaginationProps {
    dotsLength: number;
    activeDotIndex: number;
    containerStyle?: StyleProp<ViewStyle>;
    dotStyle?: StyleProp<ViewStyle>;
    inactiveDotStyle?: StyleProp<ViewStyle>;
    inactiveDotOpacity?: number;
    inactiveDotScale?: number;
    tappableDots?: boolean;
    carouselRef?: any; // Optional: to scroll to index if tappable
}

const Pagination: React.FC<PaginationProps> = ({
    dotsLength,
    activeDotIndex,
    containerStyle,
    dotStyle,
    inactiveDotStyle,
    inactiveDotOpacity = 0.5,
    inactiveDotScale = 0.5,
    tappableDots = false,
    carouselRef,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {Array.from({ length: dotsLength }).map((_, index) => {
                const isActive = index === activeDotIndex;

                const style = [
                    styles.dot,
                    isActive ? dotStyle : (inactiveDotStyle || dotStyle),
                    !isActive && {
                        opacity: inactiveDotOpacity,
                        transform: [{ scale: inactiveDotScale }],
                    },
                ];

                if (tappableDots && carouselRef) {
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={1}
                            onPress={() => carouselRef.current?.scrollTo({ index, animated: true })}
                        >
                            <View style={style} />
                        </TouchableOpacity>
                    )
                }

                return <View key={index} style={style} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        //paddingVertical: 30,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
    },
});

export default Pagination;
