from json import loads
with open('data/courses.json') as f:
    for line in f:
        data = loads(line.strip())
        print('{0[disp_name]}\t{0[address]}\t{0[url]}\t{0[info_url]}\t{0[pk_in_site]}'.format(data))