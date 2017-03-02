#include <stdio.h>
int roman(int, int, char);
void main(void)
{ 
	while (true){
		int a, z = 0;
		while (z != 1){
			printf_s("ENTER YOUR ARABIC NUMBER: \n>");
			scanf_s(" %d", &a);
			if (a > 32767) { printf_s("THE NUMBER OF INVALID RANGE! \n"); }
			else if (a <= 0) { printf_s("THE NUMBER OF INVALID RANGE! \n"); }
			else
			{
				printf_s("NUMBER IN ROMAN STYLE: ");
				a = roman(a, 1000, 'M');
				a = roman(a, 500, 'D');
				a = roman(a, 100, 'C');
				a = roman(a, 50, 'L');
				a = roman(a, 10, 'X');
				a = roman(a, 5, 'V');
				a = roman(a, 1, 'I');
				z = 1;
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