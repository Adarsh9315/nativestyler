# NativeStyler

NativeStyler is an advanced styling toolkit designed for React Native applications, offering dynamic, prop-based styling combined with an efficient caching mechanism. This toolkit enables developers to implement responsive and adaptable styles that enhance the user experience while ensuring optimal performance. With its lightweight architecture, NativeStyler integrates seamlessly into your projects, making it an essential tool for both novice and experienced developers.

## Features

- **Dynamic Prop-Based Styling**: Dynamically adjust styles based on component props, enhancing UI responsiveness and flexibility.
- **Advanced Caching**: Uses a sophisticated caching strategy to minimize re-rendering, significantly boosting performance.
- **Dynamic Theming with ThemeProvider**: Seamlessly switch themes within your app using the integrated `ThemeProvider`.
- **Lightweight and Efficient**: Designed to add minimal overhead, ensuring your project remains lean and fast.

## Installation

Install NativeStyler using npm:

```bash
npm install nativestyler
```

Or using Yarn:

```bash
yarn add nativestyler
```

## Performance Comparison

To understand the performance benefits of NativeStyler, we compared it against three popular styling solutions in React Native: StyleSheet, Styled Components, and Tailwind CSS. Each was evaluated based on the following criteria:

- **Render Time**: Time taken to render components.
- **Memory Usage**: Memory consumed by the app during the execution of styling tasks.
- **Bundle Size Impact**: The effect of each library on the overall size of the application bundle.
- **Ease of Dynamic Styling**: How each library handles dynamic styling changes, which can affect runtime performance.

### Metrics

| Criteria             | StyleSheet | NativeStyler | Styled Components | Tailwind CSS |
|----------------------|------------|--------------|-------------------|--------------|
| Render Time          | Fast       | Very Fast    | Moderate          | Fast         |
| Memory Usage         | Low        | Low          | High              | Moderate     |
| Bundle Size Impact   | None       | Low          | Moderate          | High         |
| Ease of Dynamic Styling | Low      | High         | High              | Moderate     |

### Analysis

- **StyleSheet**: Offers the fastest render times and lowest memory usage as it uses built-in React Native APIs, but lacks built-in capabilities for dynamic styling.
- **NativeStyler**: Provides enhanced performance with advanced caching mechanisms and efficient dynamic styling, making it ideal for complex applications that require responsive and dynamic interfaces.
- **Styled Components**: While offering powerful dynamic styling capabilities, it tends to have a higher memory and performance overhead compared to NativeStyler.
- **Tailwind CSS**: Provides utility-first styling that is quick to write, but can increase the bundle size and has moderate performance when handling dynamic styles.

## Usage

### Basic Styled Component

Create styled components with dynamic properties based on props:

```jsx
import React from 'react';
import { SafeAreaView, StatusBar, Text, View, useColorScheme } from 'react-native';
import { styled } from 'nativestyler';

// Define a dynamically styled component
const MyStyledView = styled(View)((props) => ({
  padding: 10,
  backgroundColor: props.primary ? 'green' : 'gray',
  borderRadius: props.rounded ? 20 : 0,
}));

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'darker' : 'lighter',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MyStyledView primary rounded>
        <Text>Hello, styled components!</Text>
      </MyStyledView>
    </SafeAreaView>
  );
}

export default App;
```

### Dynamic Theming with ThemeProvider

Leverage `ThemeProvider` to apply and switch themes dynamically across your application:

```jsx
import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { ThemeProvider, styled } from 'nativestyler';
import { darkTheme, lightTheme } from './themes';  // Assume themes are defined externally

const ThemedView = styled(View)((props, theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  alignItems: 'center',
  justifyContent: 'center',
}));

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider initialTheme={theme}>
      <ThemedView>
        <Text style={{ color: theme.colors.text }}>Theme: {theme === lightTheme ? 'Light' : 'Dark'}</Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </ThemedView>
    </ThemeProvider>
  );
};

export default App;
```

### Testing Caching Mechanism

Test the caching mechanism by monitoring component re-renders with the React Profiler:

```jsx
import React, { Profiler, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { styled } from 'nativestyler';

const MyStyledView = styled(View)((props) => ({
  padding: props.padding,
  backgroundColor: 'lightblue',
}));

const renderCallback = (id, phase, actualDuration) => {
  console.log(`Render ${id} with phase ${phase} took ${actualDuration}ms`);
};

const App = () => {
  const [padding, setPadding] = useState(10);

  return (
    <Profiler id="StyledComponent" onRender={renderCallback}>
      <MyStyledView padding={padding}>
        <Text>Testing Caching</Text>
      </MyStyledView>
      <Button title="Toggle Padding" onPress={() => setPadding(padding === 10 ? 20 : 10)} />
    </Profiler>
  );
};

export default App;
```

## Contributing

Contributions are welcome! Please feel free to fork the repository, make changes, and submit pull requests. You can also raise issues or provide feedback through the GitHub issue tracker.

## Support

If you encounter any issues or have questions about NativeStyler, please open an issue in the GitHub repository. We are here to help!

## License

NativeStyler is available under the MIT License. See the LICENSE file for more details.
```