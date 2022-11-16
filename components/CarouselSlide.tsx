import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Wonder } from "../data/SevenWonders";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CarouselSlideProps {
  index: number;
  item: Wonder;
  activeIndex: Animated.SharedValue<number>;
  opacityValue: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = height * 0.6;

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  index,
  item,
  activeIndex,
  opacityValue,
}) => {
  const reanimatedCarouselSlideStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = interpolate(
      activeIndex.value,
      inputRange,
      [50, 0, -100]
    );
    const scale = interpolate(activeIndex.value, inputRange, [0.8, 1, 1.3]);
    const opacity = interpolate(opacityValue.value, inputRange, [0.6, 1, 0]);
    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  });
  const reanimatedInformationStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateY = interpolate(
      opacityValue.value,
      inputRange,
      [100, 0, -100]
    );

    return {
      transform: [{ translateY }],
    };
  });
  return (
    <Animated.View
      style={[styles.slideContainer, reanimatedCarouselSlideStyle]}
    >
      <Image source={{ uri: item.image }} style={styles.slideImage} />
      <Animated.View
        style={[styles.informationSection, reanimatedInformationStyle]}
      >
        <Text style={[styles.locationName]}>{item.name}</Text>
        <Text style={[styles.location]}>{item.location}</Text>
        <Text style={[styles.author]}>{item.imageAuthor}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default CarouselSlide;

const styles = StyleSheet.create({
  slideContainer: {
    position: "absolute",
    left: -ITEM_WIDTH / 2,
  },
  slideImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 14,
  },
  informationSection: {
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
  locationName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
  },
  location: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  author: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
  },
});
