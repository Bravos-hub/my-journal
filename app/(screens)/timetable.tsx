import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { ThemedText } from '@/components/ThemedText'

type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

interface Event {
  start: string;
  end: string;
  title: string;
  summary?: string;
  date: string; // Add a date field to match events with the selected date
}

export default function TimetableScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [events] = useState<Event[]>([
    {
      start: '09:00',
      end: '10:30',
      title: 'Mathematics',
      summary: 'Calculus lecture',
      date: '2025-04-18',
    },
    {
      start: '11:00',
      end: '12:00',
      title: 'Physics',
      summary: 'Quantum Mechanics',
      date: '2025-04-19',
    },
  ])

  const filteredEvents = events.filter(event => event.date === selectedDate)

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day: Day) => {
          setSelectedDate(day.dateString)
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#4158D0' },
          '2025-04-18': { marked: true, dotColor: '#4158D0' },
          '2025-04-19': { marked: true, dotColor: '#C850C0' },
        }}
      />

      <ScrollView style={styles.timelineContainer}>
        <ThemedText style={styles.dateHeader}>
          {new Date(selectedDate).toLocaleDateString()}
        </ThemedText>

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <ThemedText style={styles.eventTime}>
                {event.start} - {event.end}
              </ThemedText>
              <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
              {event.summary && (
                <ThemedText style={styles.eventSummary}>{event.summary}</ThemedText>
              )}
            </View>
          ))
        ) : (
          <ThemedText style={styles.noEventsText}>No events for this day.</ThemedText>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  timelineContainer: {
    flex: 1,
    padding: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4158D0',
  },
  eventTime: {
    fontSize: 14,
    color: '#4158D0',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },
  eventSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noEventsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
})