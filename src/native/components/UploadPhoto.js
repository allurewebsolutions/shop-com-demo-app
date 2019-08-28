import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import { Firebase } from '../../lib/firebase';
import Spacer from './UI/Spacer';

// https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
export default class UploadProfilePhoto extends Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const { image } = this.state;

    if (image) {
      return (
        <View style={styles.container}>
          <Avatar
            size="xlarge"
            rounded
            source={{ uri: image }}
            onPress={this._renderAlert}
            onEditPress={this._renderAlert}
            activeOpacity={0.7}
            showEditButton
          />

          {this._maybeRenderUploadingOverlay()}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Avatar
            size="xlarge"
            rounded
            icon={{ name: 'person' }}
            onPress={this._renderAlert}
            onEditPress={this._renderAlert}
            activeOpacity={0.7}
            showEditButton
          />
          <Spacer size={15}/>
          <Text>Profile Photo</Text>

          {/*{this._maybeRenderImage()}*/}
          {this._maybeRenderUploadingOverlay()}
        </View>
      );
    }
  }

  _renderAlert = () =>
    Alert.alert(
      'Profile Photo',
      '',
      [
        {
          text: 'Photo from camera roll',
          onPress: this._pickImage,
        },
        {
          text: 'Take Photo',
          onPress: this._takePhoto,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large"/>
        </View>
      );
    }
  };

  _takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });

        const { setProfilePhoto } = this.props;

        if (uploadUrl) setProfilePhoto(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = Firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
});
