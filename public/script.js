// Shuffle function to create random order of training items
function shuffle_array(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Create a random user ID
//var user_id = ['A','B','C','D','E','F','G','H'][Math.floor(Math.random() * 8)] + Math.floor(Math.random() * 10000);

// Will the majority item be the button on the left or right?
var majority_left = 0;
if (Math.random() < 0.5) {
  majority_left = 1;
}

// Lists of meaning signal pairs for the two conditions [meaning, [majority signal, minority signal]]
var meaning_signal_pairs_condition_0 = [['small', ['Sy4', 'Sy5'], 6, "3a_6"],
                                        ['small', ['Sy4', 'Sy5'], 6, "3a_6"]                                        
                                       ];

var meaning_signal_pairs_condition_1 = [
                                        ['small', ['Sy4', 'Sy5'], 6, "3a_6"],
                                        ['small', ['Sy4', 'Sy5'], 6, "3a_6"]
                                        
                                       ];

// Choose a random condition
var condition = 'c'+Math.floor(Math.random() * 2);

// Select a meaning signal pair
var meaning_signal_pair;
if (condition == 'c0') {
  meaning_signal_pair = meaning_signal_pairs_condition_0[Math.floor(Math.random() *  meaning_signal_pairs_condition_0.length)];
} else {
  meaning_signal_pair = meaning_signal_pairs_condition_1[Math.floor(Math.random() *  meaning_signal_pairs_condition_1.length)];
}
var meaning = meaning_signal_pair[0];
var majority_signal = meaning_signal_pair[1][0];
var minority_signal = meaning_signal_pair[1][1];

// Choose what the frequency of the majority item will be at random
var majority_frequency = meaning_signal_pair[2];
var condition_count = meaning_signal_pair[3];
    //Math.floor(Math.random() * 6) + 5; // 5 to 10

// Variables keeping track of where we are in the items for the two main blocks
var training_item = 0;
var testing_item = 0;

// Create list of training items
var training_items = [];
for (var i = 0; i < 10; i++) {
  if (i < majority_frequency) {
    training_items.push(majority_signal);
  } else {
    training_items.push(minority_signal);
  }
}

training_items = shuffle_array(training_items);

 // detect browser
var browser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

// Start creating the CSV data
var data_prefix = condition + "," + majority_frequency + "," + meaning + "," + majority_signal + "," + minority_signal + "," + majority_left + "," + condition_count;
var data = "";

// Experiment starts when document is loaded
$(document).ready(function(){

  // set up the two buttons for the testing phase, and the slider screen, and iconicity
  if (majority_left == 1) {
    $("#left_signal_button").html('<img src="assets/' + majority_signal + '.gif" style="width:206px;height:253px">');
    $("#right_signal_button").html('<img src="assets/' + minority_signal + '.gif" style="width:206px;height:253px">');
    $("#sl0").html('<img src="assets/' + majority_signal + '.gif" style="width:103px;height:126px">');
    $("#sl1").html('<img src="assets/' + minority_signal + '.gif" style="width:103px;height:126px">');
    $("#r0").html('<img src="assets/' + majority_signal + '.gif" style="width:290px;height:364px">');
    $("#r1").html('<img src="assets/' + minority_signal + '.gif" style="width:290px;height:364pxpx">');
    
  } else {
    $("#left_signal_button").html('<img src="assets/' + minority_signal + '.gif" class="image" style="width:206px;height:253px">');
    $("#right_signal_button").html('<img src="assets/' + majority_signal + '.gif" class="image" style="width:206px;height:253px">');
    $("#sl0").html('<img src="assets/' + minority_signal + '.gif" style="width:103px;height:126px">');
    $("#sl1").html('<img src="assets/' + majority_signal + '.gif" style="width:103px;height:126px">');
    $("#r0").html('<img src="assets/' + minority_signal + '.gif" style="width:290px;height:364px">');
    $("#r1").html('<img src="assets/' + majority_signal + '.gif" style="width:290px;height:364px">');
  };



  // set up the slider buttons
  //for (var i = 0; i<11; i++) {
  //  $("#slider"+i).text(i+":"+(10-i));
  //}
  
  // start the experiment
detect_browser();

});

// detect browser and start experiment
function detect_browser() {
  if (browser == true) {
    show_consent_form();
  }
  else {
    $("#browser_detection").show();
  }
}


// Show the consent form and button for the training instructions
function show_consent_form() {
  $("#consent").show();
  $("#consent_button").show();
  $("#consent_button").off().on('click', function() {
    $("#consent").hide();
    $("#consent_button").hide();
    participantID();
  });
}

function participantID() {
  $("#participantID").show();
  $("#ID_button").show();
  $(document).ready(function () {
        $('#ID').on('input change', function () {
            if ($(this).val() != '') {
                $('#ID_button').prop('disabled', false);
            }
            else {
                $('#ID_button').prop('disabled', true);
            }
            
        });
    });
  $("#ID_button").off().on('click', function() {
    var prolificID = document.getElementById("ID").value;
    data_prefix = prolificID + "," + data_prefix;
    $("#participantID").hide();
    $("#ID_button").hide();
    experiment_instructions();
  });
}


// Show the experiment instructions and button for next
function experiment_instructions() {
  $("#experiment_instructions").show();
  $("#ready_for_training_instructions").show();
  $("#ready_for_training_instructions").off().on('click', function() {
    $("#experiment_instructions").hide();
    $("#ready_for_training_instructions").hide();
    training_instructions();
  });
}

// Show the training instructions and button to start the experiment
function training_instructions() {
  $("#training_instructions").show();
  $("#ready_for_training").show();
  $("#ready_for_training").off().on('click', function() {
    $("#training_instructions").hide();
    $("#ready_for_training").hide();
    next_training();
  });
}

// Show the meaning, then pause
function next_training() {
	if (training_item >= training_items.length) {
  	testing_instructions(); // if we've run through the training, go on to testing
  }
  else {
    setTimeout(function() {
      //$("#"+meaning).show();
      $("#small2").show();
      setTimeout(show_signal, 1000); // time to wait until signal
    }, 1000); // this is just a small delay applied before each item is shown
  }
}

// Show the signal and pause before next item
function show_signal() {
  $("#small2").hide();
  $("#small").show();
  $("#"+training_items[training_item]).show();
  setTimeout(function() {
    $("#small").hide();
    $("#"+training_items[training_item]).hide();
    data =  data + data_prefix + ", training, " + (training_item+1).toString() + ', ';
    if (training_items[training_item] == majority_signal) {
      data = data + "majority \n";
    } else {
      data = data + "minority \n";
    }
    training_item++;
    next_training()
  }, 2000); // time to wait until next training item
}

// Show testing instructions and button to start testing
function testing_instructions() {
  $("#imag").hide();
  $("#testing_instructions").show();
  $("#ready_for_testing").show();
  $("#ready_for_testing").off().on('click', function() {
    $("#testing_instructions").hide();
    $("#ready_for_testing").hide();
    next_testing();
  });
}

// Show the meaning, and two buttons for the signals
function next_testing() {
  if (testing_item >= 10) {
    $("#testing-button").hide();
    slider();
  }
  else {
    setTimeout(function(){
    $("imag").show();
    $("#small1").show();
    $("#testingset").show();
    $("#left_signal_button").show();
    $("#left_signal_button").off().on('click', function() {
      $("#small").hide();
      $("#testingset").hide();
      $("#left_signal_button").hide();
      $("#right_signal_button").hide();
      data =  data + data_prefix + ",testing," + (testing_item+1).toString() + ',';
      if (majority_left == 1) {
        data = data + 'majority \n';
      } else {
        data = data + 'minority \n';
      }
      testing_item++;
      ok();
    });
    $("#right_signal_button").show();
    $("#right_signal_button").off().on('click', function() {
      $("#small").hide();
      $("#testingset").hide();
      $("#left_signal_button").hide();
      $("#right_signal_button").hide();
      data =  data + data_prefix + ",testing," + (testing_item+1).toString() + ',';
      if (majority_left == 1) {
        data = data + 'minority\n';
      } else {
        data = data + 'majority\n';
      }
      testing_item++;
      ok();
    });
  }, 500);
};
}
  

// Show a "next" button in order to re-center the mouse.
function ok() {
  $("#testing-button").show();
  $("#ok_button").show();
  $("#ok_button").off().on('click', function() {
    $("#testing-button").hide();
    $("#ok_button").hide();
    next_testing();
  });
}

// The "sliders" section of the experimnt.
function slider() {
  $("#slider_instructions").show();
  $("#sl1").show();
  $("#sl0").show();
  for (var i = 0; i < 11; i++) { // Loop through all the slider buttons and set them up
    $("#slider"+i.toString()).off().on('click', [i], function(e) {
      data = data + data_prefix + ",slider,1," + e.data[0].toString() + '\n';
      iconicity_instruc();
    });
  }
}

// The iconicity rating section.
function iconicity_instruc() {
  $("#slider_instructions").hide();
  $("#iconicity_instructions").show();
  $("#ready_for_iconicity").show();
  $("#ready_for_iconicity").off().on('click', function() {
    $("#iconicity_instructions").hide();
    $("#ready_for_iconicity").hide();
    iconicity_rate1();
  });
}

function iconicity_rate1() {
  $("#r0").show();
  $("#iconicity_rating1").show();
  for (var i = 0; i < 7; i++) { // Loop through all the buttons and set them up
    $("#icona"+i.toString()).off().on('click', [i], function(f) {
      data = data + data_prefix + ",iconicity,"; 
      if (majority_left == 1) {
      data = data + "majority,";
    } else {
      data = data + "minority,";
    }        
      data = data + f.data[0].toString() + '\n';
      $("#r0").hide();
      $("#iconicity_rating1").hide();  
      next(); 
    });
  }
}  

function next() {
  $("#iconicity-button").show();
  $("#next_button").show();
  $("#next_button").off().on('click', function() {
    $("#iconicity-button").hide();
    $("#iconicity_button").hide();
    iconicity_rate2();
  });
}


function iconicity_rate2() {
  $("#r1").show();
  $("#iconicity_rating2").show();
  for (var i = 0; i < 7; i++) { // Loop through all the slider buttons and set them up
    $("#iconb"+i.toString()).off().on('click', [i], function(f) {
      data = data + data_prefix + ",iconicity,"; 
      if (majority_left == 1) {
      data = data + "minority,";
    } else {
      data = data + "majority,";
    }        
      data = data + f.data[0].toString() + '\n';
      $("#r1").hide();
      $("#iconicity_rating2").hide();  
      questions(); 
    });
  }
}  

// final questionnaire
function questions() {
  $("#testing-button").hide();
  $("#imag").hide();
  $("#questions").show();
  for (var i = 0; i < 2; i++){
    $("#question"+i.toString()).off().on('click', [i], function(h) {
      data = data + data_prefix + ",question, 1," + h.data[0].toString() + '\n';
      $("#questions").hide();
      thanks();
    });
  }
} 

// Finish the experiment and send data back to the server
function thanks() {
  $.post("/store_data", {data: data}, function(response) {
    $("#thanks").show();
    //$("#userID").show();
  });
}

