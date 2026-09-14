import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { natureAudio, AUDIO_ENGINE_HTML } from '../utils/audioEngine';

export const AudioWebView: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (webViewRef.current) {
      natureAudio.setWebViewRef(webViewRef.current);
    }
    return () => {
      natureAudio.setWebViewRef(null);
    };
  }, [webViewRef]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: AUDIO_ENGINE_HTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        style={styles.hidden}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    position: 'absolute',
    opacity: 0,
  },
  hidden: {
    width: 1,
    height: 1,
  },
});
