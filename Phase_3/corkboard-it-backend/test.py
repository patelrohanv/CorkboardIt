mem = {}


def get_min_denom(denom, tgt):
    print(tgt)
    if tgt in mem:
        return mem[tgt]
    elif tgt <= 0:
        return float('inf')
    elif tgt in denom:
        return 1
    
    cur_min = float('inf')
    for change in denom:
        cur_min = min(cur_min, get_min_denom(denom, tgt - change) + 1)
    
    mem[tgt] = cur_min
    return cur_min

print(get_min_denom(set([1, 5, 10, 25]), 1234))
 
    