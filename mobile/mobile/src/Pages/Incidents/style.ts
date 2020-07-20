import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 25,
    color: '#737380'
  },
  headerTextBold: {
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a'
  },
  incidentList: {
    marginTop: 32
  },
  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16
  },
  incidentProperty: {
    fontSize: 14,
    color: '#41411d',
    fontWeight: 'bold'
  },
  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },
  detailsButtonText: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold'
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})