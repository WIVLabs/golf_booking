import json
import re


R = re.compile('\s*')


def process():
    golf_courses = []
    pk = 1

    names = {}
    for i in range(1, 8):
        region = 'R{}'.format(i)
        print(region)
        fname = '{}.json'.format(region)
        with open(fname) as f:
            for line in f:
                data = json.loads(line)

                dis_name = data['name']
                name = R.subn('', dis_name)[0]
                if name in names:
                    print('skip::', name)
                    continue
                names[name] = True

                address = data['info_dict'].get('주소', '')
                url = data['info_dict'].get('URL', '')
                golf_courses.append({
                    "model": "server.golfcourse",
                    "pk": pk,
                    "fields": {
                        "name": name,
                        "disp_name": dis_name,
                        "address": address,
                        "region": region,
                        "url": url,
                        "status": "A",
                    }
                })

                pk += 1

                if address == '' or url == '':
                    print(data['info_dict'])

    print('pk: ', pk)
    with open('golfcourse.json', 'w') as f:
        json.dump(golf_courses, f)


if __name__ == '__main__':
    process()
