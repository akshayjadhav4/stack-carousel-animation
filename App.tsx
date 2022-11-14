import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import CarouselSlide from "./components/CarouselSlide";
import { SEVEN_WONDERS } from "./data/SevenWonders";

const { width } = Dimensions.get("window");

const SLIDE_WIDTH = width * 0.8;
const SLIDE_HEIGHT = SLIDE_WIDTH * 1.6;
const OFFSET_SPACING = 10;

export default function App() {
  const activeIndex = useSharedValue(0);
  return (
    <View style={styles.container}>
      <FlatList
        data={SEVEN_WONDERS}
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          padding: OFFSET_SPACING * 2,
        }}
        scrollEnabled={false}
        removeClippedSubviews={false}
        keyExtractor={(item) => String(item.key)}
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle = [style, { zIndex: SEVEN_WONDERS.length - index }];
          return (
            <View style={newStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <CarouselSlide
              index={index}
              item={item}
              activeIndex={activeIndex}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 20,
  },
  slideImage: {
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
  },
  slideContainer: {
    position: "absolute",
    left: -SLIDE_WIDTH / 2,
  },
});
