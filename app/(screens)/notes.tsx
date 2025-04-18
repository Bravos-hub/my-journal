import { View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'

// Move interfaces to the top
interface Note {
  id: number
  content: string
  tags: string[]
  createdAt: Date
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const richText = useRef<RichEditor>(null)

  const handleSave = useCallback((content: string) => {
    const newNote: Note = {
      id: Date.now(),
      content,
      tags: [],
      createdAt: new Date(),
    }
    setNotes(prev => [newNote, ...prev])
  }, [])

  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.addButton}>
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.editorContainer}>
        <RichToolbar 
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
          style={styles.toolbar}
        />
        <RichEditor
          ref={richText}
          style={styles.editor}
          placeholder="Start typing..."
          onChange={handleSave}
          initialHeight={200}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <ThemedText numberOfLines={2}>{item.content}</ThemedText>
            <ThemedText style={styles.noteDate}>
              {item.createdAt.toLocaleDateString()}
            </ThemedText>
          </View>
        )}
      />
    </View>
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
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#4158D0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editorContainer: {
    height: 250,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#f8f9fa',
  },
  editor: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  }
})
