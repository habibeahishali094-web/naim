import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [flash, setFlash] = useState('off');
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container} />; // Loading state
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need to access your camera to scan flashcards.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelPermissionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelPermissionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setCapturedImage(photo.uri);
      } catch (err) {
        console.error("Capture capture failed:", err);
      }
    }
  };

  const retryCapture = () => setCapturedImage(null);

  const useImage = () => {
    // Return to dashboard effectively saving it/simulating processing
    setCapturedImage(null);
    navigation.goBack();
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        <View style={[styles.previewControls, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity style={styles.actionButton} onPress={retryCapture}>
            <Text style={styles.actionText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]} onPress={useImage}>
            <Text style={styles.primaryActionText}>Use Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flash === 'on'}
        ref={cameraRef}
      >
        <View style={[styles.overlay, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 40 }]}>
          {/* Top Controls: Cancel and Icons */}
          <View style={styles.topControls}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.rightIcons}>
              <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
                <MaterialCommunityIcons
                  name={flash === 'on' ? "flash" : "flash-off"}
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="cog" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Capture Button (Double Circle Design) */}
          <View style={styles.captureContainer}>
            <TouchableOpacity style={styles.captureOuterCircle} onPress={takePicture}>
              <View style={styles.captureInnerCircle} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313', // Keep the dark theme constant
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 24,
    fontSize: 18,
    paddingHorizontal: 32,
  },
  permissionButton: {
    backgroundColor: '#536DFE', // Ether Dark Primary
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 16,
  },
  permissionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelPermissionButton: {
    alignSelf: 'center',
  },
  cancelPermissionText: {
    color: '#888',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 12,
    marginLeft: 8,
  },
  captureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  captureOuterCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  previewControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    backgroundColor: 'rgba(19,19,19,0.9)',
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  primaryAction: {
    backgroundColor: '#536DFE',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
