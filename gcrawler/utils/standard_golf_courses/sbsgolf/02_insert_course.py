from json import loads
from pprint import pprint
from ddict import DotAccessDict
import requests


def run(fname):
    with open(fname) as f:
        for i, line in enumerate(f, start=1):
            print(i, '-'*100)
            data = DotAccessDict(loads(line.strip()))
            pprint(data)
            course = create_course(data)
            print('course:', course)
            if course:
                pprint(create_course_mapper(course.id, data))

def _trans_url(url):
    if url:
        return url.startswith('http') and url or 'http://{}'.format(url)
    else:
        return ''

def create_course_mapper(course_id, data):
    # {
    #     'booking_url': 'http://bk.golf.sbs.co.kr/html/front/booking_2015/mapSearch/regionMapSearchList.jsp?golf_plc_no=583&book_regn_dv_cd=1&regn_cd=#targetId',
    #     'course': {'addr': '경기도 남양주시 오남읍 오남리 산 171-3',
    #                'info_url': 'http://golf.sbs.co.kr/html/front/golfinfo/place2/detail_view_popup.jsp?golf_plc_no=583',
    #                'name': '남양주(P) 컨트리 클럽',
    #                'url': 'http://www.namyangjucc.co.kr/'},
    #     'disp_name': '남양주P(★4인필수)',
    #     'pk_in_site': '583',
    #     'region': 'R1'}

    url = 'http://127.0.0.1:8000/api/golf-course-mapper'
    json = {
        'golf_course': course_id,
        'site': 1,
        'pk_in_site': data.pk_in_site,
        'info_url': _trans_url(data.course.info_url),
        'booking_url': _trans_url(data.booking_url),
        'status': 'A'
    }
    pprint(json)
    resp = requests.post(url, json=json)
    return DotAccessDict(resp.json()) if resp.ok else None


def create_course(data):
    url = 'http://127.0.0.1:8000/api/golf-courses'
    json = {
        'name': data.course.name == ' 컨트리 클럽' and '{}{}'.format(data.disp_name, data.course.name) or data.course.name,
        'disp_name': data.disp_name,
        'address': data.course.addr and data.course.addr or '',
        'region': data.region,
        'url': _trans_url(data.course.url),
        'status': 'A'
    }
    pprint(json)
    resp = requests.post(url, json=json)
    return DotAccessDict(resp.json()) if resp.ok else None


if __name__ == '__main__':
    fname = 'sbs_course.json'
    run(fname)
