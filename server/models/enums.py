import enum


class Status(enum.Enum):
    A = 'active'
    I = 'inactive'


def get_choices(obj):
    return [(_obj.name, _obj.value) for _obj in obj]


if __name__ == '__main__':
    print(get_choices(Status))