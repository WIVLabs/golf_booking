import enum


class CustomEnum(enum.Enum):
    @classmethod
    def choices(cls):
        return [(_obj.name, _obj.value) for _obj in cls]


class Status(CustomEnum):
    A = 'active'
    I = 'inactive'


class Region(CustomEnum):
    R0 = '미확인'
    R1 = '한강이남'
    R2 = '한강이북'
    R3 = '충청도'
    R4 = '강원도'
    R5 = '전라도'
    R6 = '경상도'
    R7 = '제주도'


if __name__ == '__main__':
    # print([{'id': _id, 'name': _name} for _id, _name in Region.choices() if _id != 'R0'])
    print(getattr(Region, 'R1').value)
