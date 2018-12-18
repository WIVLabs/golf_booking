import re
import time
from json import dumps
from pprint import pprint
from random import randint
from gcrawler.utils.downloader import Downloader


def run(debug=False):
    SITE_ID = 2  # X골프

    with open('data/courses.json', 'w') as fo:
        for i, _course_id in enumerate(iter_course_id(debug=debug), start=1):
            print('{} {}'.format (i, '-' * 100))
            print(_course_id)
            course = get_course_info(_course_id)
            pprint(course)
            fo.write('{}\n'.format(dumps(course)))
            time.sleep(randint(10, 30) / 10.0)


def iter_course_id(debug=False):
    R = re.compile("fnv_club_info\('(\d+)'\)")
    url = 'https://www.xgolf.com/booking/booking_normal.asp?area_code=12'
    soup = Downloader(url, 'data/meta.html', debug=debug, encoding='euc-kr').soup
    for _tag in soup.select('table.bookingTable > tbody > tr > td > strong > a'):
        match = R.search(_tag.attrs['onclick'])
        if match:
            yield int(match.group(1))


def get_course_info(course_id, debug=False):
    url = 'https://www.xgolf.com/club_info/club_info.asp?club_code={}'.format(course_id)
    soup = Downloader(url, 'data/course.html', debug=debug, encoding='euc-kr').soup

    tbody = soup.select_one('div.content')
    return {
        'pk_in_site': course_id,
        'disp_name': tbody.select_one('h2').string.strip(),
        'address': tbody.select_one('tr > td').string.strip(),
        'url': (tbody.select_one('tr > td > a') and tbody.select_one('tr > td > a').string) and tbody.select_one('tr > td > a').string.strip() or None,
        'booking_url': 'https://www.xgolf.com/booking/booking_calendar.asp?club_code={}'.format(course_id),
        'info_url': url
    }



if __name__ == '__main__':
    debug = False
    run(debug=debug)
