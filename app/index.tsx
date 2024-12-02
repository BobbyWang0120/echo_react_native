import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';

export default function HomePage() {
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioUpload = () => {
    // TODO: 实现音频上传功能
    console.log('Upload audio');
  };

  const handleTranscribe = () => {
    // TODO: 实现转录功能
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTranscription('这里将显示转录结果...');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BlurView intensity={50} tint="light" style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>音频转录</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleAudioUpload}
        >
          <Text style={styles.uploadButtonText}>选择音频文件</Text>
          <Text style={styles.uploadSubText}>支持 mp3, wav, m4a 格式</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.transcribeButton, isLoading && styles.buttonDisabled]}
          onPress={handleTranscribe}
          disabled={isLoading}
        >
          <Text style={styles.transcribeButtonText}>
            {isLoading ? '转录中...' : '开始转录'}
          </Text>
        </TouchableOpacity>

        {transcription ? (
          <ScrollView style={styles.resultContainer}>
            <Text style={styles.resultText}>{transcription}</Text>
          </ScrollView>
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
  resultContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    padding: 15,
    maxHeight: 300,
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
  resultText: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 24,
  },
}); 