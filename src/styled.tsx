import React, { useContext, useMemo } from 'react';
import { StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { ThemeContext } from './ThemeProvider';
import { cache, hashFunction } from './cache';

interface StyleFunctionProps {
  [key: string]: any;
}

// Define a generic type for the styled function props
interface StyledFunctionProps extends ViewProps {
  [key: string]: any;  // Allow any additional properties
}

type StyledProps<P> = P & StyledFunctionProps & { style?: ViewStyle };

const styled = <P extends Record<string, any>>(
  Component: React.ComponentType<P>
) => (styleFunction: (props: StyledProps<P>, theme: StyleFunctionProps) => ViewStyle) => {
  const StyledComponent = (props: StyledProps<P>) => {
    const theme = useContext(ThemeContext);

    const cacheKey = useMemo(() => hashFunction(props, theme), [props, theme]);

    let styles = cache.get(cacheKey);
    if (!styles) {
      const styleObject = styleFunction(props, theme);
      styles = StyleSheet.create({ custom: styleObject });
      cache.set(cacheKey, styles);
    }

    // Use 'as P' to assert the type of props when spreading into the component
    return <Component {...props as P} style={[styles.custom, props.style]} />;
  };

  return StyledComponent;
};

export default styled;
