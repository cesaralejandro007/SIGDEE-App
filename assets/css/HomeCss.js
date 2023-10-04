import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Header1: {
    backgroundColor: '#0D47AD',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 0,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
});