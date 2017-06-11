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

let name;
let destination;
let firstTrain;
let frequency;

let nextArrival = '00:00';//changes dynamically
let minutesAway = 0;//changes dynamically

$('#add').on('click', function (event) {
  event.preventDefault();

  name = $('#train-name').val().trim();
  destination = $('#train-destination').val().trim();
  firstTrain = $('#train-time').val().trim();
  frequency = $('#train-frequency').val().trim();

  $('#train-name').val('');
  $('#train-destination').val('');
  $('#train-time').val('');
  $('#train-frequency').val('');


  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

database.ref().on('child_added', function (childSnapshot) {

  let xName = childSnapshot.val().name;
  let xDestination = childSnapshot.val().destination;
  let xFirstTrain = childSnapshot.val().firstTrain;
  let xFrequency = childSnapshot.val().frequency;

  updateTime(xFirstTrain, xFrequency);

  $('#trains').append(
    '<tr><td>' + xName + '</td>' +
    '<td>' + xDestination + '</td>' +
    '<td>' + xFrequency + '</td>' +
    '<td>' + moment(nextArrival).format('HH:mm') + '</td>' +
    '<td>' + minutesAway + '</td></tr>'
  );

}, function (errorObject) {
  console.log('Error: ' + errorObject.code);
});


//If the next train will arrive before the 'first train' of the day then the
//next arrival will be the time of the first train. This is assuming trains
//run at the same times each day.
let updateTime = function (firstT, freq) {

  let start = moment(firstT, 'HH:mm');
  let end = moment();
  let difference = moment(start).diff(end, 'minutes');

  if (difference < 0) {
    difference = difference * -1;
    minutesAway = freq - (difference % freq);
    nextArrival = moment().add(minutesAway, 'minutes');
  } else {
    if (difference < freq) {
      nextArrival = start;
      minutesAway = difference + 1;
    } else {
      minutesAway = freq - (difference % freq);
      nextArrival = moment().add(minutesAway, 'minutes');
    }

  }
  console.log(moment(start).format('HH:mm'));
  console.log(moment().format('HH:mm'));
  console.log(difference);

};
