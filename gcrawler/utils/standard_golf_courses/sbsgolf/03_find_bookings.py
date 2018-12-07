from pprint import pprint
from random import randint
from ddict import DotAccessDict
from gcrawler.utils.downloader import Downloader
from urllib.parse import urljoin
import re
import time
import requests
from datetime import datetime, timedelta

R = re.compile('^(.*?)\(([\d,]+)\)$')

def run():
    for i, _course in enumerate(iter_course_mapper(), start=1):
        _course = DotAccessDict(_course)
        booking_url = _course.booking_url
        print(i, booking_url)
        booking_summary = iter_booking_summary(booking_url, _course.pk_in_site)

        print('*' * 100)
        pprint(booking_summary)
        for _date in sorted(booking_summary.keys()):
            booking_info = booking_summary[_date]
            create_booking(_course.id, _date, booking_info)


def iter_course_mapper():
    url = 'http://127.0.0.1:8000/api/golf-course-mapper'
    data = Downloader(url).json
    if data:
        yield from data

def iter_booking_summary(url, pk_in_site):
    def extract_booking_date(td):
        tag = td.select_one('ul.timeList')
        return tag and tag.attrs.get('id') or None

    def extract_booking_url(td):
        tag = td.select_one('a.bk_team')
        uri = tag and tag.attrs.get('href') or None
        return uri and urljoin(url, uri) or None

    def get_booking_info(booking_date, booking_url):
        # README
        # http://bk.golf.sbs.co.kr/html/front/booking_2012/xml/golf_course_time_xml.jsp?golf_plc_no=194&book_dt=20181214&_=
        time.sleep(randint(1, 4))
        url = 'http://bk.golf.sbs.co.kr/html/front/booking_2012/xml/golf_course_time_xml.jsp?golf_plc_no={}&book_dt={}&_={}'.format(pk_in_site,  booking_date, int(time.time()*1000))
        data = Downloader(url, fname='booking.xml', debug=False, encoding='euc-kr').xml_to_json

        booking_info = []
        data_list = data.get('golfInfo', {}).get('data', {})
        if data_list:
            for bk in data_list.get('golf'):
                # pprint(bk)
                match = R.search(bk.book_course_nm)
                if match:
                    notes = match.group(1)
                    price = int(match.group(2).replace(',', ''))
                    kickoff_at = bk.book_tm
                    kickoff_hour = kickoff_at.split(':', 1)[0]
                    booking_info.append({
                        'notes': notes,
                        'price': price,
                        'kickoff_hour': kickoff_hour,
                        'kickoff_time': datetime.strptime('{} {}'.format(booking_date, kickoff_at), '%Y%m%d %H:%M'),
                        'url': booking_url
                    })
        return booking_info

    _today = datetime.today()
    bookings = {(_today + timedelta(days=i)).strftime('%Y%m%d'): [] for i in range(30)}

    soup = Downloader(url, fname='booking_summary.html', debug=True, encoding='euc-kr').soup
    for _tr in soup.select('div.result_calendar > table > tbody > tr'):
        for _td in _tr.select('td > div.cont'):
            print('-'*100)
            print(_td)
            booking_date = extract_booking_date(_td)
            booking_url = extract_booking_url(_td)
            booking_info = get_booking_info(booking_date, booking_url)
            bookings[booking_date] = booking_info

    return bookings



def create_booking(golf_course, date, info):
    url = 'http://127.0.0.1:8000/api/bookings'
    def _delete():
        # uri = '{}?golf_course={}&site={}&kickoff_date={}'.format(url, golf_course, 1, date)
        uri = '{}?golf_course={}'.format(url, golf_course)
        resp = requests.delete(url)
        print('_delete:', resp, resp.ok, resp.reason)

    def _insert(_info):
        json = {
            'golf_course': golf_course,
            'site': 1,
            'kickoff_date': date,
            'kickoff_hour': _info.kickoff_hour,
            'kickoff_time': _info.kickoff_time.strftime('%Y-%m-%d %H:%M'),
            'price': _info.price,
            'notes': _info.notes,
            'url': _info.url,
        }
        pprint(json)
        resp = requests.post(url, json=json)
        print('_insert:', resp)

    # _delete()
    for _info in info:
        _insert(DotAccessDict(_info))


if __name__ == '__main__':
    run()