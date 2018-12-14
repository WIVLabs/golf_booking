import time
from pprint import pprint
from random import randint
from gcrawler.utils.downloader import Downloader


def run(keys, debug=False):
    from json import dumps
    SITE_ID = 1  # SBS골프

    with open('sbs_course.json', 'w') as f:
        for i, _course in enumerate(iter_course(keys, debug=debug), start=1):
            print('{} {}'.format(i, '-'*100))
            f.write('{}\n'.format(dumps(_course)))
            pprint(_course)


def iter_course(keys, debug=False):
    for _key, _region in keys:
        print('-' * 100)
        print(_key, _region)

        for _course in iter_site_data(_key, debug):
            print(_course)
            yield {
                'pk_in_site': _course.GOLF_PLC_NO,
                'disp_name': _course.GOLF_PLC_NM,
                'booking_url': 'http://bk.golf.sbs.co.kr/html/front/booking_2015/mapSearch/regionMapSearchList.jsp?golf_plc_no={}&book_regn_dv_cd={}&regn_cd=#targetId'.format(_course.GOLF_PLC_NO, _key),
                'region': _region,
                'course': get_course_info(_course.GOLF_PLC_NO, debug=debug),
            }
            time.sleep(randint(1, 4))


def iter_site_data(region_code, debug=False):
    url = 'http://bk.golf.sbs.co.kr/html/front/booking_2015/mapSearch/regionMapSearchAjax.jsp?book_regn_dv_cd={0}&regn_cd=&gubun=golfPlace'.format(region_code)
    data = Downloader(url, 'data/courses.json', debug=debug, encoding='euc-kr').json
    if data:
        yield from data.list


def get_course_info(golf_plc_no, debug=False):
    url = 'http://golf.sbs.co.kr/html/front/golfinfo/place2/detail_view_popup.jsp?golf_plc_no={}'.format(golf_plc_no)
    soup = Downloader(url, 'data/course.html', debug=debug, encoding='euc-kr').soup

    def extract_name():
        tag = soup.select_one('div.golf_zone > dl > dt')
        return tag.string

    def extract_addr():
        tag = soup.select_one('div.golf_zone > dl > dd > ul > li > span')
        return tag.string

    def extract_url():
        tag = soup.select_one('div.golf_zone > dl > dd > p > a')
        return tag and tag.attrs.get('href') or None

    return {
        'name': extract_name(),
        'addr': extract_addr(),
        'url': extract_url(),
        'info_url': url,
    }


if __name__ == '__main__':
    debug = False
    keys = [
        (2, 'R1'),
        (1, 'R2'),
        (4, 'R3'),
        (3, 'R4'),
        (5, 'R5'),
        (6, 'R6'),
        (7, 'R7'),
    ]
    run(keys, debug=debug)
