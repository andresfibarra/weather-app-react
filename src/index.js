import $ from 'jquery';
import './style.scss';

let count = 0;

const updateCounter = () => {
  $('#main').text(`You've been on this page for ${count} seconds.`);
  count += 1;
};

setInterval(updateCounter, 1000);
