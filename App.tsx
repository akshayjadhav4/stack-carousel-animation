import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { SEVEN_WONDERS } from "./data/SevenWonders";
import CarouselSlide from "./components/CarouselSlide";
import {
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeIndex = useDerivedValue(() => withSpring(currentSlide));
  const opacityValue = useDerivedValue(() => withTiming(currentSlide));
  const onHandlerStateChangeLeft = () => {
    "worklet";
    if (currentSlide === SEVEN_WONDERS.length - 1) {
      return;
    }
    setCurrentSlide((prev) => prev + 1);
  };
  const onHandlerStateChangeRight = () => {
    "worklet";
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide((prev) => prev - 1);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key={"left"}
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            onHandlerStateChangeLeft();
          }
        }}
      >
        <FlingGestureHandler
          key={"rigth"}
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              onHandlerStateChangeRight();
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
