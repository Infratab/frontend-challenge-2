'use strict';
angular.module('reminder').factory('reminderService', function ($resource) {
  var service = {};
  service.reminders = $resource('/reminders/:id/', {id: '@id'}, {
    update: {method: 'PUT'}
  });
  service.filterData = function (reminders) {
    var date = new Date(), upcomingReminder = [], pastReminder = [];
    reminders.forEach(function (reminder) {
      var diff = date.getTime() - new Date(reminder.scheduled_datetime).getTime();
      if (diff > 0 || diff == 0) {
        pastReminder.push(reminder);
      } else {
        reminder.showForm = false;
        reminder.showDelete = false;
        reminder.scheduled_datetime = new Date(reminder.scheduled_datetime);
        upcomingReminder.push(reminder);
      }
    });
    return {upcomingReminder: upcomingReminder, pastReminder: pastReminder};
  };
  return service;
});