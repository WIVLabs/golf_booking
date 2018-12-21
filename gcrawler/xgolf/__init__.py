import re
import time
import requests
import traceback
from random import randint
from datetime import datetime, timedelta
from gcrawler.utils.downloader import Downloader


class Crawler:
    R_DIGIT = re.compile('[^\d]+')
    R_DATE= re.compile("""fnv_time_list_sub\('\d+','(\d+)',""")
    API_URL = 'http://127.0.0.1:8000/api/bookings'

    def __init__(self, course_id, site_id, pk_in_site, encoding='euc-kr', debug=False):
        self.course_id = course_id
        self.site_id = site_id
        self.pk_in_site = pk_in_site
        self.encoding = encoding
        self.debug = debug
        self.this_time = time.time()

    def iter_bk_date(self):
        url = self.get_monthly_url()

        def extract_bk_date(tag):
            ## <a href="javascript:;" onclick="fnv_time_list_sub('205','20181220','/booking/booking_normal_list.asp');"><img alt="XGOLF 깃발" height="30" src="/images/booking/img_booking_flag_L_Logo.png" width="30"/> <strong>5팀</strong>(목)</a>
            onclick = tag.attrs.get('onclick', '')
            match = self.R_DATE.search(onclick)
            return match and match.group(1) or None

        def get_bk_dates():
            _today = datetime.today()
            return [(_today + timedelta(days=i)).strftime('%Y%m%d') for i in range(15)]

        bk_dates = get_bk_dates()
        soup = Downloader(url, fname='monthly.html', debug=self.debug, encoding=self.encoding).soup
        for _tag in soup.select('#calendar-golflink > tbody > tr > td > p > a'):
            _bk_date = extract_bk_date(_tag)
            if _bk_date in bk_dates:  # 기준 범위를 벗어나는 경우도 있는데, 불필요하겠다.
                bk_dates.remove(_bk_date)
                yield _bk_date, True

        for _bk_date in bk_dates:
            yield _bk_date, False

    def iter_parse_daily(self, bk_date, keys=['date', 'notes', 'kickoff_time', 'price']):
        def extract_price(tag):
            price = -1
            strong = tag.find('strong')
            if strong:
                _value = self.R_DIGIT.subn('', strong.string)[0]
                if _value:
                    price = int(_value)
            return price

        def extract_kickoff_time(tag):
            return tag.string.strip()

        def extract_notes(tag):
            return tag.string.strip()

        time.sleep(randint(0, 20) / 10.0)

        url = self.get_daily_url(bk_date)
        soup = Downloader(url, fname='daily.html', debug=self.debug, encoding=self.encoding).soup
        if soup:
            for _tr in soup.select('table.new_list_tbl > tbody > tr'):
                try:
                    data = dict(zip(keys, _tr.find_all('td')))
                    # 예) ['12/20[목]', 'VALLEY', '09:27', '\n', '\n', '정상가 또는 현장 이벤트 요금 적용', None]
                    if data:
                        price = extract_price(data['price'])
                        kickoff_time = extract_kickoff_time(data['kickoff_time'])
                        notes = extract_notes(data['notes'])
                        yield {
                            'golf_course': self.course_id,
                            'site': self.site_id,
                            'kickoff_date': bk_date,
                            'kickoff_hour': kickoff_time.split(':')[0],
                            'kickoff_time': '{}-{}-{} {}'.format(bk_date[:4], bk_date[4:6], bk_date[6:8], kickoff_time),
                            'price': price,
                            'notes': notes,
                            'url': url,
                        }
                except:
                    traceback.print_exc()

    def insert_bk_info(self, bk_info):
        resp = requests.post(self.API_URL, json=bk_info)
        return resp.ok and resp.content or resp.reason

    def delete_bk_info(self, bk_date):
        url = '{}?golf_course={}&site={}&kickoff_date={}'.format(self.API_URL, self.course_id, self.site_id, bk_date)
        resp = requests.delete(url)
        return resp.ok and resp.content or resp.reason

    def get_monthly_url(self):
        return 'https://www.xgolf.com/booking/booking_calendar.asp?club_code={}'.format(self.pk_in_site)

    def get_daily_url(self, bk_date):
        return 'https://www.xgolf.com/booking/booking_normal_list.asp?club_code={}&book_date={}'.format(self.pk_in_site, bk_date)


def run(course_id, site_id, pk_in_site, debug=False):
    crawler = Crawler(course_id, site_id, pk_in_site, debug=debug)
    for _bk_date, _can_bk in crawler.iter_bk_date():
        print(_bk_date, _can_bk, '-'*100)
        deleted = crawler.delete_bk_info(_bk_date)
        print('deleted: {} >> {}'.format(_bk_date, deleted))
        if _can_bk:
            for _bk_info in crawler.iter_parse_daily(_bk_date):
                print(_bk_info)
                inserted = crawler.insert_bk_info(_bk_info)
                print('inserted: {}'.format(inserted))

def test():
    course_id = 56
    site_id = 2
    pk_in_site = 319
    run(course_id, site_id, pk_in_site)


if __name__ == '__main__':
    url = 'http://127.0.0.1:8000/api/golf-course-mapper?site=2'
    items = Downloader(url).json
    if items:
        for i, _item in enumerate(items, start=1):
            print(i, '^' * 100)
            print('{0[golf_course]}\t{0[site]}\t{0[pk_in_site]}'.format(_item))
            run(_item['golf_course'], _item['site'], _item['pk_in_site'])

    # test()
