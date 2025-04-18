import React, { useRef, useState } from 'react'
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import * as ImagePicker from 'expo-image-picker'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function JournalScreen() {
  const richText = useRef<RichEditor>(null)
  const scrollRef = useRef<ScrollView>(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    })

    if (!result.canceled) {
      richText.current?.insertImage(result.assets[0].uri)
    }
  }

  const handleCursorPosition = (scrollY: number) => {
    scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TextInput
            style={styles.titleInput}
            placeholder="Entry Title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {/* Save logic */}}
          >
            <IconSymbol name="bookmark" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.editorContainer}
          keyboardDismissMode="on-drag"
          nestedScrollEnabled={true}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.insertImage,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.undo,
              actions.redo,
            ]}
            onPressAddImage={handleImageUpload}
            style={styles.toolbar}
          />
          <RichEditor
            ref={richText}
            onChange={setContent}
            placeholder="Start writing..."
            style={styles.editor}
            initialHeight={400}
            onCursorPosition={handleCursorPosition}
            initialContentHTML=""
            editorStyle={{
              backgroundColor: '#fff',
              contentCSSText: 'font-family: sans-serif; font-size: 14px;'
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  titleInput: {
    flex: 1,
    fontSize: 18,
    marginRight: 12,
    padding: 8,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#4158D0',
    padding: 10,
    borderRadius: 8,
  },
  editorContainer: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  editor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    minHeight: 200,
  }
})