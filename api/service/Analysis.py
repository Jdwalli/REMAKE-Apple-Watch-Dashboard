def determine_trends(nums: list):
    summed_nums = sum(nums)
    multiplied_data = 0
    summed_index = 0
    squared_index = 0

    for index, num in enumerate(nums):
        index += 1
        multiplied_data += index * num
        summed_index += index
        squared_index += index**2

    numerator = (len(nums) * multiplied_data) - (summed_nums * summed_index)
    denominator = (len(nums) * squared_index) - summed_index**2
    return numerator/denominator if denominator != 0 else 0