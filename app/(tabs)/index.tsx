import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { transcribeAudio } from '../../services/openai';

interface AudioFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB in bytes

export default function HomePage() {
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);

  const handleAudioUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/mpeg', 'audio/wav', 'audio/x-m4a'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      if (!file.size) {
        console.warn('File size is undefined');
        return;
      }

      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        Alert.alert(
          '文件过大',
          '请选择小于 25MB 的音频文件',
          [{ text: '确定', style: 'default' }]
        );
        return;
      }

      setAudioFile({
        uri: file.uri,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType || '',
      });
      
      // 重置转录状态
      setTranscription('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error picking audio file:', error);
      Alert.alert(
        '上传失败',
        '选择文件时发生错误，请重试',
        [{ text: '确定', style: 'default' }]
      );
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleTranscribe = async () => {
    if (!audioFile) return;
    
    setIsLoading(true);
    try {
      const result = await transcribeAudio(audioFile.uri);
      setTranscription(result);
    } catch (error) {
      console.error('Transcription error:', error);
      Alert.alert(
        '转录失败',
        '音频转录过程中发生错误，请重试',
        [{ text: '确定', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BlurView intensity={50} tint="light" style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.title}>音频转录</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={handleAudioUpload}
          >
            {audioFile ? (
              <View style={styles.fileInfo}>
                <Ionicons name="document-text-outline" size={24} color="#000000" style={styles.fileIcon} />
                <Text style={styles.fileName} numberOfLines={1}>{audioFile.name}</Text>
                <Text style={styles.fileSize}>{formatFileSize(audioFile.size)}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => {
                    setAudioFile(null);
                    setTranscription('');
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="rgba(0, 0, 0, 0.5)" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.uploadButtonText}>选择音频文件</Text>
                <Text style={styles.uploadSubText}>支持 mp3, wav, m4a 格式</Text>
                <Text style={styles.uploadSubText}>文件大小不超过 25MB</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.transcribeButton, 
              (!audioFile || isLoading) && styles.buttonDisabled
            ]}
            onPress={handleTranscribe}
            disabled={!audioFile || isLoading}
          >
            <Text style={styles.transcribeButtonText}>
              {isLoading ? '转录中...' : '开始转录'}
            </Text>
          </TouchableOpacity>
        </View>

        {transcription ? (
          <View style={styles.resultWrapper}>
            <ScrollView 
              style={styles.resultContainer}
              contentContainerStyle={styles.resultContent}
            >
              <Text style={styles.resultText}>{transcription}</Text>
            </ScrollView>
          </View>
        ) : null}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  mainContent: {
    marginBottom: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  uploadSubText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    marginTop: 8,
  },
  fileInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fileIcon: {
    marginRight: 12,
  },
  fileName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  fileSize: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 8,
    marginRight: 12,
  },
  removeButton: {
    padding: 4,
  },
  transcribeButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  transcribeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  resultContent: {
    padding: 15,
  },
  resultText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
  },
});
