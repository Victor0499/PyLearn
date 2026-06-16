import json

ex_counts = {"1": 3, "2": 7, "3": 3, "4": 7, "5": 4, "6": 3, "7": 4, "92": 3, "8": 3, "9": 4, "10": 4, "11": 4, "12": 4, "13": 3, "14": 4, "15": 3, "16": 3, "17": 4, "18": 3, "19": 3, "20": 3, "21": 4, "22": 3, "23": 3, "24": 3, "25": 3, "26": 3, "27": 3, "28": 3, "29": 3, "30": 4, "31": 3, "32": 3, "33": 3, "34": 3, "35": 3, "36": 3, "37": 3, "38": 3, "39": 3, "40": 3, "41": 3, "42": 3, "43": 3, "44": 3, "45": 3, "46": 3, "47": 3, "48": 3, "49": 3, "50": 3, "51": 3, "52": 3, "53": 3, "54": 3, "55": 3, "56": 3, "57": 3, "58": 3, "59": 3, "60": 3, "61": 3, "62": 3, "63": 3, "64": 3, "65": 5, "66": 4, "67": 4, "68": 4, "69": 3, "70": 4, "71": 3, "72": 4, "73": 4, "74": 4, "75": 4, "76": 4, "80": 5, "81": 4, "82": 4, "83": 4, "84": 4, "85": 5, "86": 4, "87": 4, "88": 4, "89": 4, "90": 4, "91": 5}

# Add all the 49X ones just in case they are actually list lessons. But actually, let's just ignore them if they are too weird.
# Wait, look at the counts. 495, 496, 497 etc. 
# Let's filter only ids from 1 to 92.
m1_ids = [1, 2, 3, 4, 5, 6, 7, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
m2_ids = [92, 8, 9, 10, 11, 12, 13, 16, 17, 31, 32, 33]
m3_ids = list(range(34, 50)) + list(range(50, 68)) # 34 to 49, 50 to 67
m4_ids = [68, 69, 70, 71, 72, 73, 74, 75, 76, 80]
m5_ids = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91]

def get_sum(ids):
    return sum(ex_counts.get(str(i), 0) for i in ids)

print(f"  1: {{ lessonIds: {m1_ids}, totalExercises: {get_sum(m1_ids)} }},")
print(f"  2: {{ lessonIds: {m2_ids}, totalExercises: {get_sum(m2_ids)} }},")
print(f"  3: {{ lessonIds: {m3_ids}, totalExercises: {get_sum(m3_ids)} }},")
print(f"  4: {{ lessonIds: {m4_ids}, totalExercises: {get_sum(m4_ids)} }},")
print(f"  5: {{ lessonIds: {m5_ids}, totalExercises: {get_sum(m5_ids)} }},")
