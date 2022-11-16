import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";
import CarouselSlide from "./components/CarouselSlide";
import { SEVEN_WONDERS } from "./data/SevenWonders";

const { width } = Dimensions.get("window");

const SLIDE_WIDTH = width * 0.8;
const SLIDE_HEIGHT = SLIDE_WIDTH * 1.6;
const OFFSET_SPACING = 10;

export default function App() {
  const activeIndex = useSharedValue(0);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key={"left"}
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            if (Math.round(activeIndex.value) === SEVEN_WONDERS.length - 1) {
              return;
            }
            activeIndex.value = withSpring(Math.round(activeIndex.value + 1));
          }
        }}
      >
        <FlingGestureHandler
          key={"rigth"}
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              if (Math.round(activeIndex.value) === 0) {
                return;
              }
              activeIndex.value = withSpring(Math.round(activeIndex.value - 1));
            }
          }}
        >
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
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [
                  style,
                  { zIndex: SEVEN_WONDERS.length - index },
                ];
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
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
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
