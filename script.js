// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDpBzFhSwqivUedwBwM0dqwBIMi5z2cijk',
  authDomain: 'train-time-1c1d7.firebaseapp.com',
  databaseURL: 'https://train-time-1c1d7.firebaseio.com',
  projectId: 'train-time-1c1d7',
  storageBucket: 'train-time-1c1d7.appspot.com',
  messagingSenderId: '1015460454162'
};
firebase.initializeApp(config);

let database = firebase.database();
