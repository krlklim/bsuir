using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            Random rnd = new Random();
            Console.WriteLine("\tДобро пожаловать в игру!");
            Console.WriteLine("\tКамень, ножницы, бумага\n");
            Console.WriteLine("sc-Ножницы | paper-Бумага | stone-Камень\n");
            Console.WriteLine("\t!!!Правила игры!!!");
            Console.WriteLine("У вас и у компьютера есть по три попытки. Ножницы режут бумагу.");
            Console.WriteLine("Бумага накрывает камень. Ножницы тупятся об камень.");
            
            string choice;
            int i = 1; 
            int computer_count = 0; 
            int user_count = 0;
            do
            {
                int computer;
                computer = rnd.Next(1, 4);
                Console.WriteLine("\n{0}.Игрок: ", i);
                choice = Console.ReadLine();
                if (choice == "stone" || choice == "paper" || choice == "sc")
                {
                    i++; 
                    string computer1 = "stone";
                    switch (computer)
                    {
                        case 1:
                            computer1 = "stone";
                            Console.WriteLine("Компьютер: Камень"); break;
                        case 2:
                            computer1 = "paper";
                            Console.WriteLine("Компьютер: Бумага"); break;
                        case 3:
                            computer1 = "sc";
                            Console.WriteLine("Компьютер: Ножницы"); break;
                    }
                   
                    if (choice == computer1)
                    {
                        Console.WriteLine("Одинаковый выбор.");
                    }
                    if (computer1 == "sc" && choice == "paper" || computer1 == "stone" && choice == "sc" || computer1 == "paper" && choice == "stone")
                    {
                        computer_count++;
                        Console.WriteLine(" Одно очко компьютеру!");
                    }
                    if (computer1 == "stone" && choice == "paper" || computer1 == "sc" && choice == "stone" || computer1 == "paper" && choice == "sc")
                    {
                        user_count++;
                        Console.WriteLine(" Одно очко Вам!");
                    }
                }
                else
                {
                    Console.WriteLine("Ошибка ввода! Повторите ввод!");
                }
            }
            while (i < 5);
            if (computer_count < user_count) Console.WriteLine("Вы выиграли! Конец игры");
            if (computer_count == 0) Console.WriteLine("Ничья! Конец игры");
            if (computer_count > user_count) Console.WriteLine("Вы проиграли! Конец игры");
            Console.ReadKey();
        }
    }
}
