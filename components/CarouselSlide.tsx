import { Dimensions, Image, StyleSheet } from "react-native";
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
}

const { width } = Dimensions.get("window");

const SLIDE_WIDTH = width * 0.65;
const SLIDE_HEIGHT = SLIDE_WIDTH * 1.7;
const OFFSET_SPACING = 10;

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  index,
  item,
  activeIndex,
}) => {
  const reanimatedCarouselSlideStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = interpolate(
      activeIndex.value,
      inputRange,
      [50, 0, -100],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      activeIndex.value,
      inputRange,
      [0.8, 1, 1.3],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      activeIndex.value,
      inputRange,
      [0.6, 1, 0],
      Extrapolate.CLAMP
    );
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
    left: -SLIDE_WIDTH / 2,
  },
  slideImage: {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    borderRadius: 20,
  },
});
