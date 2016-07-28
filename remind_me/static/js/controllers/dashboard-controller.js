'use strict';
angular.module('reminder')
  .controller('dashboardController', function ($scope, Session, reminderService, $mdToast, $location, $anchorScroll, $state) {
    $scope.username = Session.getEmail();
    $scope.reminder = {phone_number: '', message: '', scheduled_datetime: ''};
    //TODO Limit the reminders in upcoming and past by 5 and and use (Load More) option when the user scrolls.
    var toastSucess = function (msg) {
      return {
        template: '<md-toast><span flex>' + msg + '</span></md-toast>',
        position: 'top-left',
        hideDelay: 3000
      };
    };
    var toastError = {
      template: '<md-toast><span flex>Server Error! Try Again</span></md-toast>',
      position: 'top-left',
      hideDelay: 3000
    };
    reminderService.reminders.query(function (res) {
      $scope.upcomingEvents = reminderService.filterData(res).upcomingReminder;
      $scope.pastEvents = reminderService.filterData(res).pastReminder;
    });
    $scope.saveReminder = function (reminder) {
      if (reminder.remindAgain) {
        reminderService.reminders.update({id: reminder.id}, reminder, function (res) {
          $scope.upcomingEvents.push(res);
          $scope.upcomingEvents = reminderService.filterData($scope.upcomingEvents).upcomingReminder;
          $mdToast.show(toastSucess('Reminder Successfully added'));
        }, function (err) {
          $mdToast.show(toastError);
        });
      } else {
        reminderService.reminders.save(reminder, function (res) {
          $scope.upcomingEvents.push(res);
          $scope.upcomingEvents = reminderService.filterData($scope.upcomingEvents).upcomingReminder;
          $mdToast.show(toastSucess('Reminder Successfully added'));
        }, function (err) {
          $mdToast.show(toastError);
        })
      }
      reminder = {phone_number: '', message: '', scheduled_datetime: ''};
    };
    $scope.editReminder = function (reminder) {
      reminder.phone_number = reminder.newData.phone_number;
      reminder.message = reminder.newData.message;
      reminder.scheduled_datetime = reminder.newData.scheduled_datetime;
      reminderService.reminders.update({id: reminder.id}, reminder, function (res) {
        delete reminder.newData;
        reminder.showForm = false;
        $mdToast.show(toastSucess('Reminder Successfully edited'));
      }, function (err) {
        $mdToast.show(toastError);
      })
    };

    $scope.deleteReminder = function (reminder, index, filterText) {
      reminder.showDelete = false;
      if (filterText === 'upcoming') {
        reminderService.reminders.delete({id: reminder.id}, function (res) {
          $scope.upcomingEvents.splice(index + 1, 1);
          $mdToast.show(toastSucess('Reminder Successfully deleted'));
        }, function (err) {
          $mdToast.show(toastError);
        });
      } else {
        reminderService.reminders.delete({id: reminder.id}, function (res) {
          $scope.pastEvents.splice(index + 1, 1);
          $mdToast.show(toastSucess('Reminder Successfully deleted'));
        }, function (err) {
          $mdToast.show(toastError);
        })
      }
    };
    $scope.showForm = function (event) {
      event.newData = {
        phone_number: event.phone_number,
        message: event.message,
        scheduled_datetime: event.scheduled_datetime
      };
      event.showForm = !event.showForm;
    };
    $scope.showDelete = function (event) {
      event.showDelete = !event.showDelete;
    };
    $scope.remindAgain = function (event, index) {
      $scope.pastEvents.splice(index + 1, 1);
      event.remindAgain = true;
      event.scheduled_datetime = new Date(event.scheduled_datetime);
      $scope.reminder = event;
      var newHash = 'msg';
      if ($location.hash() !== newHash) {
        $location.hash(newHash);
      } else {
        $anchorScroll();
      }
    };
    $scope.logout = function () {
      Session.destroy();
      $state.go('login')
    };
  });