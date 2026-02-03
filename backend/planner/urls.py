from django.urls import path
from .views import add_classroom, list_classrooms, allocate_seats

urlpatterns = [
    path('add-classroom/', add_classroom),
    path('classrooms/', list_classrooms),
    path('allocate/', allocate_seats),
]
