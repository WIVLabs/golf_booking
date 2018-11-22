import enum


class Status(enum.Enum):
    A = 'active'
    I = 'inactive'


def get_choices(obj):
    return [(_obj, _obj.value) for _obj in obj]
