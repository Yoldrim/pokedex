import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LayoutChangeEvent, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  expanded: boolean;
}

const CollapsableContainer: React.FC<Props> = ({ expanded, children }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
      <View style={{ position: 'absolute', width: '100%' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export default CollapsableContainer;
