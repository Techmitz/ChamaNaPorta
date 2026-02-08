import React from 'react';
import { Keyboard, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const AndroidBottomBar = ({ children, barColor = '#000', backgroundColor = '#FFF' }) => {
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <SafeAreaInsetsContext.Consumer>
            {(insets) => (
                <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                    {/* Conteúdo da tela */}
                    {children(insets)}

                    {/* Barra inferior que some com o teclado */}
                    {!isKeyboardVisible && insets.bottom > 0 && (
                        <View style={{ height: insets.bottom, backgroundColor: barColor }} />
                    )}
                </View>
            )}
        </SafeAreaInsetsContext.Consumer>
    );
};

export default AndroidBottomBar;