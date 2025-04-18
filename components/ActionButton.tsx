import { View, StyleSheet, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText'
import { IconSymbol } from './ui/IconSymbol'

interface ActionButtonProps {
  href: string
  icon: string
  label: string
  color: string
}

export function ActionButton({ href, icon, label, color }: ActionButtonProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <IconSymbol name={icon} size={24} color={color} />
        <ThemedText style={styles.label}>{label}</ThemedText>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  }
})