from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.core.context_processors  import csrf


def home(request):
	# c = {}
	# c.update(csrf(request))
	return render_to_response("index.html")

# def signup(request):
	
# 	return render_to_response("signup.html")