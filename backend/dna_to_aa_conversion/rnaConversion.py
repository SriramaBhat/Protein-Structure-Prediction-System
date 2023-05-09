import sys
def toRna():
  dnaString = sys.argv[1]
  rnaString = ""
  for base in dnaString:
    if base == "T":
      rnaString += "U"
    else:
      rnaString += base
  print(rnaString)
  sys.stdout.flush()

if __name__ == "__main__":
  toRna()
