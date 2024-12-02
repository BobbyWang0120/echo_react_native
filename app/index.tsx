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
      <StatusBar style="light" />
      <BlurView intensity={70} tint="dark" style={styles.contentContainer}>
        <Text style={styles.title}>音频转录</Text>
        
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
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  uploadSubText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 8,
  },
  transcribeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  transcribeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    maxHeight: 300,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
}); 