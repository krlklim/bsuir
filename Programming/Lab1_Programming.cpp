#include <stdio.h>
#include <string>


int roman(int, int, char);
int CheckInput(char *x);

void main(void)
{ 
	while (true)
	{
	
			

		int arabicNumber, _forWhile = 0;
		const int ab = 111;
		char x[ab];

		

		while (_forWhile != 1){
			printf_s("ENTER YOUR ARABIC NUMBER: \n>");
			//scanf_s(" %d", &arabicNumber);
			while (true)
		{
			gets_s(x);
			if (CheckInput(x)) { break; }
			else { printf_s("Повторите ввод: \n"); }
		}
               arabicNumber = atoi(x);

			if (arabicNumber > 32767) { printf_s("THE NUMBER OF INVALID RANGE! \n"); }
			else if (arabicNumber <= 0) { printf_s("THE NUMBER OF INVALID RANGE! \n"); }
			else
			{
				printf_s("NUMBER IN ROMAN STYLE: ");
				arabicNumber = roman(arabicNumber, 10000, '+');
				arabicNumber = roman(arabicNumber, 5000, '_');
				arabicNumber = roman(arabicNumber, 1000, 'M');
				arabicNumber = roman(arabicNumber, 500, 'D');
				arabicNumber = roman(arabicNumber, 100, 'C');
				arabicNumber = roman(arabicNumber, 50, 'L');
				arabicNumber = roman(arabicNumber, 10, 'X');
				arabicNumber = roman(arabicNumber, 5, 'V');
				arabicNumber = roman(arabicNumber, 1, 'I');
				_forWhile = 1;
				printf_s("\n");
			}
		}
	}
}
int roman(int i, int j, char c)
{
	while (i >= j) { putchar(c); i = i - j; }
	return(i);
}

int CheckInput(char *x)
{
	int I = 0;
	int boolResult = 0;
	while (x[I] != '\0')
	{
		if (x[I] == '1' || x[I] == '2' || x[I] == '3' || x[I] == '4' || x[I] == '5' || x[I] == '6' || x[I] == '7' || x[I] == '8' || x[I] == '9')
				
		{
			boolResult = 1;
		}
		else { boolResult = 0; break; }
		I++;
	}
	return boolResult;
}