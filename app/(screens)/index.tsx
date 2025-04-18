import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { ActionButton } from '@/components/ActionButton'

export default function Dashboard() {
  const events = [
    { date: '2025-04-18', title: 'Mathematics', time: '09:00 - 10:30' },
    { date: '2025-04-19', title: 'Physics', time: '11:00 - 12:00' },
  ]

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date())

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.appName}>Hello Brave!</ThemedText>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Calendar Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Schedule</ThemedText>
          <Calendar 
            markedDates={{
              '2025-04-18': {marked: true, dotColor: '#4158D0'},
              '2025-04-19': {marked: true, dotColor: '#C850C0'}
            }}
            theme={{
              todayTextColor: '#4158D0',
              selectedDayBackgroundColor: '#4158D0',
            }}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ActionButton
            href="notes"
            icon="note"
            label="Notes"
            color="#4158D0"
          />
          <ActionButton
            href="journal"
            icon="book"
            label="Journal"
            color="#C850C0"
          />
          <ActionButton
            href="timetable"
            icon="calendar"
            label="Timetable"
            color="#FFCC70"
          />
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Upcoming</ThemedText>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <ThemedText>{event.date}</ThemedText>
                <ThemedText>{event.title}</ThemedText>
                <ThemedText>{event.time}</ThemedText>
              </View>
            ))
          ) : (
            <ThemedText>No upcoming events.</ThemedText>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  eventItem: {
    marginBottom: 10,
  }
})