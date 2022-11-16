import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SEVEN_WONDERS } from "./data/SevenWonders";

const { width, height } = Dimensions.get("window");
const SLIDE_HEIGHT = height * 0.6;
const SLIDE_WIDTH = width * 0.75;
export default function App() {
  const currentSlideIndex = useSharedValue(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlingGestureHandler
          key={"left"}
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
            }
          }}
        >
          <FlingGestureHandler
            key={"right"}
            direction={Directions.RIGHT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
              }
            }}
          >
            <View style={styles.container}>
              <FlatList
                data={SEVEN_WONDERS}
                keyExtractor={(item) => String(item.key)}
                horizontal
                scrollEnabled={false}
                removeClippedSubviews={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  padding: 20,
                }}
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
                    <View style={styles.slideContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.slideImage}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 20,
  },
  slideContainer: {
    position: "absolute",
    left: -SLIDE_WIDTH / 2,
  },
  slideImage: {
    height: SLIDE_HEIGHT,
    width: SLIDE_WIDTH,
    borderRadius: 15,
  },
});
