import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';

interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  duration: string;
}

// 模拟的历史记录数据
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    fileName: '会议记录.mp3',
    date: '2023-12-02',
    duration: '5:30',
  },
  {
    id: '2',
    fileName: '课程笔记.wav',
    date: '2023-12-01',
    duration: '15:45',
  },
  {
    id: '3',
    fileName: '语音备忘.m4a',
    date: '2023-11-30',
    duration: '2:20',
  },
];

export default function HistoryPage() {
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{item.fileName}</Text>
        <Text style={styles.fileDetails}>
          {item.date} · {item.duration}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BlurView intensity={50} tint="light" style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>转录历史</Text>
        </View>
        
        <FlatList
          data={mockHistory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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
  listContainer: {
    paddingTop: 10,
  },
  historyItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  fileDetails: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
}); 