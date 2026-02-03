from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Classroom
from .serializers import ClassroomSerializer

@api_view(['POST'])
def add_classroom(request):
    serializer = ClassroomSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Classroom added"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def list_classrooms(request):
    rooms = Classroom.objects.all().order_by('floor_no')
    serializer = ClassroomSerializer(rooms, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def allocate_seats(request):
    students = int(request.data.get('students', 0))

    rooms = Classroom.objects.all().order_by('floor_no')
    allocated = []
    total = 0

    for r in rooms:
        if total >= students:
            break
        allocated.append(r)
        total += r.capacity

    if total < students:
        return Response({"error": "Not enough seats available"}, status=400)

    serializer = ClassroomSerializer(allocated, many=True)
    return Response({"allocated": serializer.data})
