import { OPENAI_API_KEY } from '@env';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

export async function transcribeAudio(fileUri: string): Promise<string> {
  try {
    // 准备FormData
    const formData = new FormData();
    
    // 获取文件名和扩展名
    const fileName = fileUri.split('/').pop() || 'audio.mp3';
    const fileType = fileName.split('.').pop()?.toLowerCase() || 'mp3';
    
    // 添加文件到FormData
    formData.append('file', {
      uri: fileUri,
      type: `audio/${fileType}`,
      name: fileName,
    } as any);
    
    formData.append('model', 'whisper-1');

    // 直接使用fetch调用API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || '转录失败');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
} 