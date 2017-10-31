from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("GDP-Assign").config("spark.some.config.option", "Random-Value").getOrCreate()

df = spark.read.load("/home/zemoso/Downloads/gdp.csv",format="csv",sep=",",inferSchema="true", header="true")
df.createOrReplaceTempView("G1")

copyDF = df
copyDF.createOrReplaceTempView("G2")

growthGDP = spark.sql("SELECT G1.`Country Name`, (G1.Value - G2.Value)/G2.value AS percentGDP, G1.Year AS Year FROM G1 INNER JOIN G2 ON G1.`Country Name`= G2.`Country Name` AND G1.Year = G2.Year + 1")

growthGDP.createOrReplaceTempView("growthGDP")

fastestGDP = spark.sql("SELECT growthGDP.`Country Name`, growthGDP.Year FROM growthGDP JOIN (SELECT MAX(growthGDP.percentGDP)AS percentGDP, growthGDP.Year FROM growthGDP GROUP BY Year) AS t2 ON growthGDP.Year = t2.Year AND growthGDP.percentGDP = t2.percentGDP ORDER BY growthGDP.Year")

fastestGDP.coalesce(1).write.format('com.databricks.spark.csv').options(header='true').save('/home/zemoso/Downloads/growthGDP')

fastestGDP.show(100)
