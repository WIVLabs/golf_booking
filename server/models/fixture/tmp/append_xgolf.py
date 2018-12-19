from ddict import DotAccessDict
from pprint import pprint
import requests
import sys

def add_course(_json):
    url = 'http://127.0.0.1:8000/api/golf-courses'
    resp = requests.post(url, json={
        'name': _json.xgolf_name,
        'disp_name': _json.xgolf_disp_name,
        'region': _json.region,
        'address': _json.xgolf_address,
        'url': _json.xgolf_url,
    })
    if resp:
        return resp.json()
    else:
        print(resp.reason, file=sys.stderr)
        print(resp.text, file=sys.stderr)
        return None


def add_course_mapper(_json, site=2):
    url = 'http://127.0.0.1:8000/api/golf-course-mapper'
    resp = requests.post(url, json={
        'golf_course': _json.golf_course,
        'site': site,
        'pk_in_site': _json.xgolf_pk,
        'info_url': _json.xgolf_info_url,
        'booking_url': 'https://www.xgolf.com/booking/booking_calendar.asp?club_code={}'.format(_json.xgolf_pk),
    })
    if resp:
        return resp.json()
    else:
        print(resp.reason, file=sys.stderr)
        print(resp.text, file=sys.stderr)
        return None

def run():
    keys = [
        'id',    'name',  'disp_name', 'address', 'region',  'url',
        'xgolf_name', 'xgolf_disp_name', 'xgolf_address', 'xgolf_url', 'xgolf_info_url', 'xgolf_pk'
    ]
    with open('xgolf.txt') as f:
        for i, line in enumerate(f, start=1):
            print('{} {}'.format(i, '-'*100))

            data = line.rstrip().split('\t')
            _json = DotAccessDict(dict(zip(keys, data)))
            print(_json)
            if _json.id:
                _json.golf_course = _json.id
            else:
                course = add_course(_json)
                if course:
                    _json.golf_course = course['id']
                else:
                    print('error course:', course)
                    continue

            print(_json)
            print(add_course_mapper(_json))



if __name__ == '__main__':
    run()
