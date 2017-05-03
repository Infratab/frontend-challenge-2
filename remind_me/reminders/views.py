import logging
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from reminders.serializers import ReminderSerializer
from reminders.models import Reminder
from generic.utils import get_data_from_request
from generic.decorators import requires_auth

logger = logging.getLogger(__name__)


class Reminders(APIView):

    @method_decorator(requires_auth)
    def post(self, request):
        data = get_data_from_request(request)
        serializer = ReminderSerializer(data=data)
        customer = request.user.customer

        if serializer.is_valid():
            serializer.save(customer=customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        logger.error("Invalid data in request from {0} : {1}".format(customer, serializer.errors))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(requires_auth)
    def get(self, request, id=None):
        if id is None:
            reminders = request.user.customer.reminders.all()
            serializer = ReminderSerializer(reminders, many=True)
            return Response(data=serializer.data)

        else:
            try:
                reminder = Reminder.objects.get(id=int(id))
            except Reminder.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                if request.user.customer == reminder.customer:
                    serializer = ReminderSerializer(reminder)
                    return Response(data=serializer.data)
                return Response(status=status.HTTP_403_FORBIDDEN)

    @method_decorator(requires_auth)
    def delete(self, request, id):
        try:
            reminder = Reminder.objects.get(id=int(id))
        except Reminder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:

            if request.user.customer == reminder.customer:
                reminder.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_403_FORBIDDEN)

    @method_decorator(requires_auth)
    def put(self, request, id):
        try:
            reminder = Reminder.objects.get(id=int(id))
        except Reminder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            if request.user.customer == reminder.customer:
                data = get_data_from_request(request)
                serializer = ReminderSerializer(instance=reminder, data=data)

                if serializer.is_valid():
                    serializer.save()
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_403_FORBIDDEN)
