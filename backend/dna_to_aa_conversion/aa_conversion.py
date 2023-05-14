import sys
import aa_mapping as Mapping


def toAA():
    """
    Genrates an Amino Acid String with single letter representation of Amino Acids, from the RNA String.
    The RNA string must start with AUG codon and end with one of stop codons UAA, UAG, UGA. 
    """
    rnaString = sys.argv[1]
    aaString = ""
    codonList = [rnaString[i:i+3] for i in range(0, len(rnaString), 3)]
    codons = Mapping.CodonMapping()
    if codonList[0] != "AUG":
        aaString = "Start Invalid"
    elif codons.get_aa(codonList[-1]) != "Stop":
        aaString = "Stop Invalid"
    else:
        codonList.pop(-1)
        for i in codonList:
            aa = codons.get_aa(i)
            if aa == "Stop":
              break
            aaString += codons.get_aa(i)

    print(aaString)
    sys.stdout.flush()

if __name__ == "__main__":
    toAA()
