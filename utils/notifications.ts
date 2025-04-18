import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync()
  
  if (status !== 'granted') {
    return false
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    })
  }

  return true
}

export async function scheduleClassReminder(className: string, startTime: Date) {
  const trigger = new Date(startTime)
  trigger.setMinutes(trigger.getMinutes() - 15) // 15 min before class

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Upcoming Class Reminder',
      body: `${className} starts in 15 minutes`,
      data: { className, startTime },
    },
    trigger,
  })
}