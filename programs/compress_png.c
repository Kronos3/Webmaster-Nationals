/*
 * compress_png.c
 * 
 * Copyright 2018 Andrei Tumbar <atuser@Kronos>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */


#include <stdio.h>
#include <stdlib.h>

//void write_pngs (char* fmt, int num, char* outfile, int width, int height) {
void write_pngs (char* fmt, int num, char* outfile) {
	FILE* f = fopen (outfile, "w+");
	FILE* fp_t;
	
	//fwrite (&width, sizeof (width), 1, f);
	//fwrite (&height, sizeof (height), 1, f);
	fwrite (&num, sizeof (num), 1, f);
	char fn[32];
	for (int i = 0; i != num; i++) {
		sprintf (fn, fmt, i);
		printf ("%s ", fn);
		fp_t = fopen (fn, "rb");
		fseek (fp_t, 0, SEEK_END);
		size_t s = ftell (fp_t);
		printf ("%d\n", s);
		rewind (fp_t);
		fwrite (&s, 4, 1, f);
		
		char* k = malloc (s);
		fread (k, 1, s, fp_t);
		fwrite (k, 1, s, f);
		free (k);
		
		fclose (fp_t);
	}
	
	fclose (f);
}

int main(int argc, char **argv)
{
	/*if (argc != 3) {
		printf ("Exactly two arguments must be provided:\nusage:\n./compress_png width height\n");
		return 1;
	}*/
	
	//write_pngs ("%04d.png", 126, "anim1.cpng", atoi (argv[1]), atoi(argv[2]));
	write_pngs ("%04d.png", 126, "anim1.cpng");
	return 0;
}

