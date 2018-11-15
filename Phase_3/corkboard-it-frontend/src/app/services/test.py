import re


rx_pattern = r'[rx]{2}'
lx_pattern = r'[lx]{2}'

regex_rx = re.compile(rx_pattern)
regex_lx = re.compile(lx_pattern)


if re.match(regex_rx, 'r2') is not None:
    print('here')
else:
    print('not here')
