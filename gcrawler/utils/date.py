from datetime import datetime, timedelta


def date_range(r, start_date=None):
    if not start_date:
        start_date = datetime.today()

    return [start_date + timedelta(days=i) for i in range(r + 1)]


def date_str_range(r, start_date=None, format='%Y%m%d'):
    return list(map(lambda x: x.strftime(format), date_range(r, start_date)))


def convert_str_to_datetime(str, format='%Y.%m.%d %H:%M'):
    return datetime.strptime(str, format)


if __name__ == '__main__':
    # print(date_str_range(14))
    print(convert_str_to_datetime('2018.11.26 07:59'))
