
from pyspark import SparkContext, SparkConf
conf = SparkConf().setAppName("Assign")
sc = SparkContext(conf=conf)


dataRDD = sc.textFile("/home/zemoso/Downloads/tweets-1.txt")
lineLengths = dataRDD.map(lambda s: len(s))
totalLength = lineLengths.reduce(lambda a, b: a + b)

from operator import add

indStrings = dataRDD.flatMap(lambda doc: doc.split(' '))
startsWithHash = indStrings.filter(lambda x: x.startswith('#'))
hashTagMap = startsWithHash.map(lambda word: (word,1)).reduceByKey(add)

finalList = hashTagMap.takeOrdered(100, lambda (key, value): -1 * value)
print finalList
#wordCount = indString.filter(lambda x: x.startswith('#'))

finalRDD = sc.parallelize(finalList)

#wordCount.take(100)
finalRDD.saveAsTextFile("/home/zemoso/100_HasTags")
