// Load the module
import { useRef } from "react";
import { StyleSheet } from "react-native";
import Video, { VideoRef } from "react-native-video";

// Inside your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if needed.

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  //   const background = require('./background.mp4');

  return (
    <Video
      // Can be a URL or a local file.
      source={{
        uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      }}
      // Store reference
      ref={videoRef}
      // Callback when remote video is buffering
      //   onBuffer={onBuffer}
      // Callback when the video cannot be loaded
      //   onError={onError}
      style={styles.backgroundVideo}
    />
  );
};

// Later in your styles...
let styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer;
