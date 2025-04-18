import { Stack } from 'expo-router'

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="splash" 
        options={{ 
          headerShown: false,
          presentation: 'fullScreenModal' 
        }} 
      />
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Dashboard'
        }}
      />
      <Stack.Screen 
        name="journal" 
        options={{
          title: 'Journal'
        }}
      />
      <Stack.Screen 
        name="notes" 
        options={{
          title: 'Notes'
        }}
      />
      <Stack.Screen 
        name="timetable" 
        options={{
          title: 'Timetable'
        }}
      />
    </Stack>
  )
}