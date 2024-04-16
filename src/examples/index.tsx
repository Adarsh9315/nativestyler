// Usage in a React Native app
import React from 'react';
import styled from '../styled';
import { View, ViewStyle, Text } from 'react-native';

interface MyStyledViewProps {
    style?: ViewStyle;
    primary?: boolean;
    rounded?: boolean;
    children?: React.ReactNode;
}

const MyStyledView = styled(View)((props: any) => ({
  padding: 10,
  backgroundColor: props.primary ? 'blue' : 'gray',
  borderRadius: props.rounded ? 10 : 0,
}));

const App = () => (
  <MyStyledView primary rounded>
    <Text>Hello, styled components!</Text>
  </MyStyledView>
);

export default App;