import re
import sys
from ddict import DotAccessDict
from gcrawler.utils.downloader import Downloader
from gcrawler.utils.date import date_str_range, convert_str_to_datetime


class ListCrawler:
    base_url = 'http://bk.golf.sbs.co.kr/html/front/booking_2015/bookingMain/mainNormalAjaxList.jsp?week_no=1&site_cd=1'

    def __init__(self, debug=False):
        self.debug = debug
        self.dates = date_str_range(14)
        self.soup_obj = Downloader(self.base_url, 'list.html', debug=self.debug).soup

    def __enter__(self):
        return self.parse()

    def __exit__(self, type, value, traceback):
        pass

    def parse(self):
        if self.soup_obj:
            # TODO 테스트용
            # for _tr in self.soup_obj.find_all('tr'):
            for _tr in self.soup_obj.find_all('tr')[::-1]:
                _tag = _tr.select('th > p.field_name > a.golf_info')[0]
                _meta = {
                    'id': _tag.attrs['name'],
                    'name': _tag.string.strip().split('(', 1)[0],
                }

                _choices = {_date: 0 for _date in self.dates}
                for _tag in _tr.select('td > div.cont > a.reservation'):
                    _date = _tag.attrs['name'].split('|', 1)[0]
                    _count = int(_tag.string.strip())
                    _choices[_date] = _count

                yield DotAccessDict({
                    'meta': _meta,
                    'choices': _choices
                })
        else:
            yield None


class DetailCrawler:
    base_url = 'http://bk.golf.sbs.co.kr/html/front/booking_2015/reservation/reservationTime.jsp?golf_plc_no={}&book_dt={}&week_no=1'
    r_price = re.compile('[^\d]+')

    def __init__(self, course_id, date, debug=False):
        self.course_id = course_id
        self.date = date
        self.url = self.base_url.format(course_id, date)
        self.soup_obj = Downloader(self.url, 'detail.html', debug=debug).soup

    def __enter__(self):
        return self.parse()

    def __exit__(self, type, value, traceback):
        pass

    def parse(self):
        def extract_time(td):
            str = td.get_text().strip()
            return convert_str_to_datetime(str, '%Y.%m.%d %H:%M')

        def extract_price(td):
            str = td.get_text().strip()
            try:
                return int(self.r_price.subn('', str)[0])
            except Exception as e:
                print('extract_price error: {} (input: {})'.format(e, str), sys.stderr)
                return -1

        if self.soup_obj:
            for _tr in self.soup_obj.select('div.table_time_choice > table > tbody > tr'):
                _tds = _tr.select('td')
                yield DotAccessDict({
                    'time': extract_time(_tds[0]),
                    'price': extract_price(_tds[2])
                })
        else:
            yield None


def test():
    from pprint import pprint
    debug = True
    with ListCrawler(debug=debug) as lc:
        for i, _course in enumerate(lc, start=1):
            print('{} {}'.format(i, '-' * 100))
            pprint(_course)

            _dates = [_k for _k, _v in _course.choices.items() if _v > 0]
            if _dates:
                with DetailCrawler(_course.meta.id, _dates[-1], debug=debug) as dc:
                    for j, _choice in enumerate(dc, start=1):
                        pprint(_choice)

                break


if __name__ == '__main__':
    test()
