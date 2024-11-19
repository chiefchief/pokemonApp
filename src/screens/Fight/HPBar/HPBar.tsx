import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const totalHp = 100;

const TranslationAmount = 8;
const timingConfig = {
  easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
  duration: 80,
};

export type HPBar = {
  dealDamage: (value: number) => void;
};

export const HPBar = memo(
  forwardRef<HPBar, HPBarProps>(({title, onDied}, ref) => {
    const {width} = useWindowDimensions();
    const [hp, setHp] = useState(totalHp);
    const shakeTranslateX = useSharedValue(0);

    const shake = () => {
      shakeTranslateX.value = withSequence(
        withTiming(TranslationAmount, timingConfig),
        withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
        withSpring(0, {mass: 0.5}),
      );
    };

    const shakeStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: shakeTranslateX.value}],
      };
    }, []);

    const exactSize = width / 3;

    const dealDamage = (damage: number) => {
      shake();
      setHp(prev => Math.max(prev - damage, 0));
    };

    useImperativeHandle(ref, () => ({
      dealDamage,
    }));

    useEffect(() => {
      if (!hp) {
        onDied?.();
      }
    }, [hp, onDied]);

    const animatedStyle = useAnimatedStyle(() => ({
      width: withTiming((hp / totalHp) * exactSize),
    }));

    return (
      <View>
        <Text>{title}</Text>
        <Animated.View
          style={[
            {
              height: 10,
              borderRadius: 5,
              backgroundColor: 'grey',
              borderWidth: 1,
              borderColor: 'white',
              overflow: 'hidden',
              width: exactSize,
            },
            shakeStyle,
          ]}
        >
          <Animated.View style={[{height: 10, backgroundColor: 'red'}, animatedStyle]} />
        </Animated.View>
      </View>
    );
  }),
);

type HPBarProps = {
  title: string;
  onDied?: () => void;
};
