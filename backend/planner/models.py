from django.db import models

class Classroom(models.Model):
    room_id = models.CharField(max_length=50, unique=True)
    capacity = models.IntegerField()
    floor_no = models.IntegerField()
    near_washroom = models.BooleanField(default=False)

    def __str__(self):
        return self.room_id
