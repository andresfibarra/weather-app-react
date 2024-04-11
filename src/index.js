import $ from "jquery";

// $("#main").html("Here we go!");

let count = 0;

const updateCounter = () => {
  $("#main").text(`You've been on this page for ${count} seconds.`);
  count++;
};

setInterval(updateCounter, 1000);
