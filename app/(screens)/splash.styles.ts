import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

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

export default styles