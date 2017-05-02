from functools import wraps

from rest_framework.response import Response


def requires_auth(f):
    @wraps(f)
    def decorated(request, *args, **kwargs):
        if not hasattr(request, 'user'):
            return Response("Please login to continue")
        else:
            if not hasattr(request.user, 'customer'):
                return Response("Please login to continue")
        return f(request, *args, **kwargs)
    return decorated
