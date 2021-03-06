/* File: resources.js
 * ------------------
 * Load resources into the CS41 content page.
 *
 * Revision history:
 * @sredmond  2016-??-?? Created
 */

function create_anchor(href, title, backup) {
  // No outgoing link, so just replace it with whatever the backup text is
  if (href === '#') {
    return $('<span>').append(backup);
  }

  // Otherwise, build an anchor tag around the given information
  return $('<a>').attr('href', href).attr('target', '_blank').append(title);
}

function create_lab_tr(lab) {
  /*
  <tr>
    <th scope="row">1</th>
    <td><a href=...>Handout</a></td>
    <td><a href=...>Solutions</a></td>
  </tr>
  */
  if (!lab.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(lab.week)
  ).append(
    $('<td>').append(lab.topic)
  ).append(
    $('<td>').append(
      create_anchor(lab.href, "Handout", "None")
    )
  ).append(
    $('<td>').append(
      create_anchor(lab.solutions, "Solutions", "Unreleased")
    )
  );

  if (lab.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_assignment_tr(assn) {
  /*
  <tr>
    <th scope="row">1</th>
    <td><a href=...>README</a></td>
    <td><a href=...>Starter Code</a></td>
    <td>Released</td>
    <td>Due</td>
  </tr>
  */
  if (!assn.visible) return null;

  var released = moment(assn.released, "YYYY-MM-DD");
  var due = moment(assn.due, "YYYY-MM-DD hh:mm:ss A");
  var releasedf = released.format('ddd MMM Do');
  var duef = due.format('ddd MMM Do [at] h:mm A') + ' (' + due.fromNow() + ')';

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(assn.num)
  ).append(
    $('<td>').append(assn.title)
  ).append(
    $('<td>').append(
      create_anchor(assn.spec, "README", "No Spec")
    )
  ).append(
    $('<td>').append(
      create_anchor(assn.starter_code, "Starter Code", "None")
    )
  ).append(
    $('<td>').append(releasedf)
  ).append(
    $('<td>').append(duef)
  );
  if (assn.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_lecture_tr(lecture) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a></td>
  </tr>
  */
  if (!lecture.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(lecture.title)
  ).append(
    $('<td>').append(
      create_anchor(lecture.condensed, "condensed", "N/A")
    ).append(' + ').append(
      create_anchor(lecture.full, "full", "N/A")
    )
  ).append(
    $('<td>').append(
      create_anchor(lecture.video, "video", "Currently Unavailable")
    )
  );

  if (lecture.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_reading_tr(reading) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a></td>
  </tr>
  */
  if (!reading.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(reading.num)
  ).append(
    $('<td>').append(
      create_anchor(reading.href, reading.title, "None")
    )
  ).append(
    $('<td>').append(reading.credit)
  );

  if (lecture.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_handout_tr(ho) {
  /*
  <tr>
    <th scope="row">Title</th>
    <td><a href=...>Slides</a></td>
    <td><a href=...>Video</a></td>
  </tr>
  */
  if (!ho.visible) return null;

  var $tr = $('<tr>').append(
    $('<th>').attr('scope', 'row').append(ho.num)
  ).append(
    $('<td>').append(
      create_anchor(ho.href, ho.title, "None")
    )
  );

  if (ho.active) {
    $tr.addClass('success');
  }
  return $tr;
}

function create_announcement(announcement) {
  /*
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Panel title</h3>
    </div>
    <div class="panel-body">
      Panel content
    </div>
    <div class="panel-footer">Panel footer</div>
  </div>
  */
  if (!announcement.visible) return null;

  var date = moment(announcement.date);

  var $panel = $('<div>').addClass('panel panel-default').append(
    $('<div>').addClass('panel-heading').append(
      $('<h2>').addClass('panel-title').append(announcement.title)
    ).append(
      $('<small>').append(date.fromNow())
    )
  ).append(
    $('<div>').addClass('panel-body').append(announcement.content)
  );
  return $panel;
}

function create_day_markup(day) {
  /*
  */
  return $('<div>').addClass('day').append(
    $('<div>').append(
      $('<strong>').addClass('text-success').append(day.title + " ")
    ).append(
      $('<small>').addClass('text-muted').append(day.date)
    )
  ).append(
    $('<div>').append(day.description)
  );
}

function create_week_heading_tr(week) {
  /*
  <tr>
    <td colspan=3>title</td>
  </tr>
  */
  if (!week.visible) return null;

  var monday = week.days[0];
  var wednesday = week.days[1];

  var start = new Date(week.dates.start);
  var end = new Date(week.dates.end);
  var startf = (start.getMonth() + 1) + '/' + (start.getDate() + 1);
  var endf = (end.getMonth() + 1) + '/' + (end.getDate() + 1);

  var $tr = $('<tr>').append(
    $('<td>').append(
      $('<strong>').addClass('text-primary').append("Week " + week.num)
    ).append(
      $('<div>').append(startf).append(' to ').append(endf)
    )
  );
  var $monday = $('<td>').append(
    create_day_markup(monday)
  );
  if (monday.active) {
    $monday.addClass('success');
  }
  var $wednesday = $('<td>').append(
    create_day_markup(wednesday)
  );
  if (wednesday.active) {
    $wednesday.addClass('success');
  }
  return $tr.append($monday).append($wednesday);
}

// Actually fetch all the resources
var RESOURCES_DIR = 'http://stanfordpython.com/res'

$.when(
  // Before we can do anything, make sure we have the proper data!
  $.getJSON(RESOURCES_DIR + '/announcements.json', function(data) {
      announcements = data;
  }),
  $.getJSON(RESOURCES_DIR + '/assignments.json', function(data) {
      assignments = data;
  }),
  $.getJSON(RESOURCES_DIR + '/handouts.json', function(data) {
      handouts = data;
  }),
  $.getJSON(RESOURCES_DIR + '/labs.json', function(data) {
      labs = data;
  }),
  $.getJSON(RESOURCES_DIR + '/lectures.json', function(data) {
      lectures = data;
  }),
  $.getJSON(RESOURCES_DIR + '/readings.json', function(data) {
      readings = data;
  }),
  $.getJSON(RESOURCES_DIR + '/schedule.json', function(data) {
      schedule = data;
  })
).then(function() {

  for (var i = 0; i < labs.length; i++) {
    var lab = labs[i];
    var markup = create_lab_tr(lab);
    if (markup !== null) {
      $(".labs tbody").append(markup);  
    }
  }

  for (var i = 0; i < assignments.length; i++) {
    var assn = assignments[i];
    var markup = create_assignment_tr(assn);
    if (markup !== null) {
      $(".assignments tbody").append(markup);  
    }
  }

  for (var i = 0; i < lectures.length; i++) {
    var lec = lectures[i];
    var markup = create_lecture_tr(lec);
    if (markup !== null) {
      $(".lectures tbody").append(markup);  
    }
  }

  for (var i = 0; i < readings.length; i++) {
    var reading = readings[i];
    var markup = create_reading_tr(reading);
    if (markup !== null) {
      $(".readings tbody").append(markup);  
    }
  }

  for (var i = 0; i < handouts.length; i++) {
    var ho = handouts[i];
    var markup = create_handout_tr(ho);
    if (markup !== null) {
      $(".handouts tbody").append(markup);  
    }
  }

  for (var i = 0; i < schedule.length; i++) {
    var week = schedule[i];
    var markup = create_week_heading_tr(week);
    if (markup != null) {
      $(".schedule tbody").append(markup);
    }
  }

  for (var i = 0; i < announcements.length; i++) {
    var announcement = announcements[i];
    var markup = create_announcement(announcement);
    if (markup != null) {
      $("#announcements").append(markup)
    }
    days = week.days
    for (var j = 0; j < days.length; j++) {
      var day = days[j];
    }
  }
});