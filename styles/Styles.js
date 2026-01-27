import { StyleSheet } from 'react-native';

export const colors = {
  PRIMARY: '#000000',
  SECONDARY: '#F28A1A',
  CUSTOMER: '#000000',
  PROFESSIONAL: '#FF8000',
};

export const styleButton = StyleSheet.create({
  textButton: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  contentButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 20,
    color: 'white',
  },
});
