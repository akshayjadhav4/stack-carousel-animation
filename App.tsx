import { FlatList, SafeAreaView, View } from "react-native";

import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { SEVEN_WONDERS } from "./data/SevenWonders";
import CarouselSlide from "./components/CarouselSlide";
import {
  useSharedValue,
  withSpring,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

const App = () => {
  const currentSlide = useSharedValue(0);
  const activeIndex = useDerivedValue(() => withSpring(currentSlide.value));
  const opacityValue = useDerivedValue(() => withTiming(currentSlide.value));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key={"left"}
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            console.log("LEFT", currentSlide.value);

            if (currentSlide.value === 6) {
              return;
            }
            currentSlide.value = currentSlide.value + 1;
          }
        }}
      >
        <FlingGestureHandler
          key={"right"}
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              console.log("RIGHT", currentSlide.value);
              if (currentSlide.value === 0) {
                return;
              }
              currentSlide.value = currentSlide.value - 1;
            }
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={SEVEN_WONDERS}
              keyExtractor={({ key }) => String(key)}
              horizontal
              inverted
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                marginTop: 50,
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
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
                    activeIndex={activeIndex}
                    opacityValue={opacityValue}
                    item={item}
                  />
                );
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
