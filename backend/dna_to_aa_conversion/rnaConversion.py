import sys
def toRna():
  """
  Genrates the RNA string based on the given DNA sequence.
  The DNA sequence must be of the 5' to 3' strand or the Coding Strand.
  """
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
