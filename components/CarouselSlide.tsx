import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";
import { Wonder } from "../data/SevenWonders";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface CarouselSlideProps {
  index: number;
  item: Wonder;
  activeIndex: Animated.SharedValue<number>;
  opacityValue: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

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
    const opacity = interpolate(opacityValue.value, inputRange, [
      1 - 1 / 3,
      1,
      0,
    ]);
    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  });
  return (
    <Animated.View
      style={[styles.slideContainer, reanimatedCarouselSlideStyle]}
    >
      <Image source={{ uri: item.image }} style={styles.slideImage} />
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
});
