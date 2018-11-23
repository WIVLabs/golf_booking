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
    R1 = '경기남부'
    R2 = '경기북부'
    R3 = '충청도'
    R4 = '강원도'
    R5 = '경상도'
    R6 = '전라도'
    R7 = '제주도'


if __name__ == '__main__':
    print(Region.choices())
