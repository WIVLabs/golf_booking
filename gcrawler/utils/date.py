from datetime import datetime, timedelta


def date_range(r, start_date=None):
    if not start_date:
        start_date = datetime.today()

    return [start_date + timedelta(days=i) for i in range(r + 1)]


def date_str_range(r, start_date=None, format='%Y%m%d'):
    return list(map(lambda x: x.strftime(format), date_range(r, start_date)))


def convert_str_to_datetime(str, format='%Y.%m.%d %H:%M'):
    return datetime.strptime(str, format)


WEEKDAY = {
    0: 'MON',
    1: 'TUE',
    2: 'WED',
    3: 'THU',
    4: 'FRI',
    5: 'SAT',
    6: 'SUN',
}
def convert_str_to_weekday(str, format='%Y%m%d'):
    global WEEKDAY
    return WEEKDAY[convert_str_to_datetime(str, format).weekday()]


if __name__ == '__main__':
    # print(date_str_range(14))
    # print(convert_str_to_datetime('2018.11.26 07:59'))
    convert_str_to_weekday('20181207')
