import { View, Text, Image, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import ErrorBoundary from '@/components/ErrorBoundary'

const { width, height } = Dimensions.get('window')

export default function SplashScreenWrapper() {
  return (
    <ErrorBoundary>
      <SplashScreen />
    </ErrorBoundary>
  )
}

function SplashScreen() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const prepare = async () => {
      try {
        // Preload assets
        await Promise.all([
          Image.prefetch(require('@/assets/images/splash-icon.png')),
          // Add other assets to preload here
          new Promise(resolve => setTimeout(resolve, 1000)) // Minimum display time
        ])
      } catch (e) {
        console.warn('Error loading assets:', e)
      } finally {
        setIsLoading(false)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ]).start()

      const timer = setTimeout(() => {
        router.replace('/')
      }, 2500)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <LinearGradient
      colors={['#4158D0', '#C850C0', '#FFCC70']}
      style={styles.container}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          
          <Image 
            source={require('@/assets/images/splash-icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.appName}>StudyBuddy</Text>
          
          <Text style={styles.tagline}>Your all-in-one academic assistant</Text>
        </Animated.View>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#ffffff',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginVertical: 20,
    tintColor: '#ffffff',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
    fontStyle: 'italic',
  }
})