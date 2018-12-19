import re
import time
import requests
import traceback
from random import randint
from datetime import datetime, timedelta
from gcrawler.utils.downloader import Downloader


class Crawler:
    R = re.compile('^(.*?)\(([\d,]+)\)$')
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

        def extract_bk_date(td):
            tag = td.select_one('ul.timeList')
            return tag and tag.attrs.get('id') or None

        def get_bk_dates():
            _today = datetime.today()
            return [(_today + timedelta(days=i)).strftime('%Y%m%d') for i in range(15)]

        bk_dates = get_bk_dates()
        soup = Downloader(url, fname='monthly.html', debug=self.debug, encoding=self.encoding).soup
        for _tr in soup.select('div.result_calendar > table > tbody > tr'):
            for _td in _tr.select('td > div.cont'):
                _bk_date = extract_bk_date(_td)
                if _bk_date in bk_dates:  # 기준 범위를 벗어나는 경우도 있는데, 불필요하겠다.
                    bk_dates.remove(_bk_date)
                    yield _bk_date, True

        for _bk_date in bk_dates:
            yield _bk_date, False

    def iter_parse_daily(self, bk_date):
        def download_bk_list():
            time.sleep(randint(10, 30)/10.0)
            url = self.get_daily_url(bk_date)
            json = Downloader(url, fname='daily.xml', debug=self.debug, encoding=self.encoding).xml_to_json
            return json.get('golfInfo', {}).get('data', {})


        bk_list = download_bk_list()
        if bk_list:
            bks = bk_list.get('golf', [])
            bks = isinstance(bks, list) and bks or [bks]
            for _bk in bks:
                try:
                    match = self.R.search(_bk.book_course_nm)
                    if match:
                        kickoff_at = _bk.book_tm
                        yield {
                            'golf_course': self.course_id,
                            'site': self.site_id,
                            'kickoff_date': bk_date,
                            'kickoff_hour': kickoff_at.split(':', 1)[0],
                            'kickoff_time': '{}-{}-{} {}'.format(bk_date[:4], bk_date[4:6], bk_date[6:8], kickoff_at),
                            'price': int(match.group(2).replace(',', '')),
                            'notes': match.group(1),
                            'url': self.get_bk_url(bk_date),
                        }
                except:
                    traceback.print_exc()

    def insert_bk_info(self, bk_info):
        resp = requests.post(self.API_URL, json=bk_info)
        return resp.ok and resp.content or '{}\n{}'.format(resp.reason, resp.content)

    def delete_bk_info(self, bk_date):
        url = '{}?golf_course={}&site={}&kickoff_date={}'.format(self.API_URL, self.course_id, self.site_id, bk_date)
        resp = requests.delete(url)
        return resp.ok and resp.content or '{}\n{}'.format(resp.reason, resp.content)

    def get_monthly_url(self):
        return 'http://bk.golf.sbs.co.kr/html/front/booking_2015/mapSearch/regionMapSearchList.jsp?golf_plc_no={}&book_regn_dv_cd=1&regn_cd=#targetId'.format(self.pk_in_site)

    def get_daily_url(self, bk_date):
        return 'http://bk.golf.sbs.co.kr/html/front/booking_2012/xml/golf_course_time_xml.jsp?golf_plc_no={}&book_dt={}&_={}'.format(self.pk_in_site, bk_date, int(self.this_time * 1000))

    def get_bk_url(self, bk_date):
        return 'http://bk.golf.sbs.co.kr/html/front/booking_2015/reservation/reservationTime.jsp?book_dt={}&golf_plc_no={}'.format(bk_date, self.pk_in_site)


def run(course_id, site_id, pk_in_site):
    crawler = Crawler(course_id, site_id, pk_in_site)
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
    course_id = 306
    site_id = 1
    pk_in_site = 585
    run(course_id, site_id, pk_in_site)


if __name__ == '__main__':
    url = 'http://127.0.0.1:8000/api/golf-course-mapper?site=1'
    items = Downloader(url).json
    if items:
        for i, _item in enumerate(items, start=1):
            print(i, '^' * 100)
            print('{0[golf_course]}\t{0[site]}\t{0[pk_in_site]}'.format(_item))
            run(_item['golf_course'], _item['site'], _item['pk_in_site'])

    # test()
