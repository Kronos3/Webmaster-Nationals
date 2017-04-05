#!/usr/bin/env python2
# -*- coding: utf-8 -*-
#
#  scale.py
#  
#  Copyright 2017 Unknown <atuser@Kronos>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  


import sys, os
from PIL import Image

def isint(s):
    try: 
        int(s)
        return True
    except:
        return False

def main(args):
    __coord = ''
    while __coord not in ['x', 'y']:
        __coord = input ("Scale by Coord (x or y): ")
    
    x, y = None, None
    if __coord == 'x':
        while not isint(x):
            x = input ("X size (px): ")
    elif __coord == 'y':
        while not isint(y):
            y = input ("Y size (px): ")
    
    suf = input ("Filename suffix (enter if none): ")
    out_dir = input ("Output directory: ")
    print ("")
    print ("Performing directory scan")
    _files = os.listdir('.')
    print ("Converting JPEGs to desired size")
    for infile in _files:
        if (os.path.splitext(infile)[1] not in ['.jpeg', '.jpg']):
            continue
        outfile = os.path.dirname(infile) + out_dir + "/" + infile[0:infile.rfind ('.')] + suf + os.path.splitext(infile)[1]
        if infile != outfile:
            try:
                im = Image.open(infile)
                width, height = int(im.size[0]), int(im.size[1])
                ratio = float(width)/float(height)
                _x = None
                _y = None
                if __coord == 'x':
                    _x = int(x)
                    _y = int(_x / ratio)
                elif __coord == "y":
                    _y = int(y)
                    _x = int(_y * ratio)
                im.thumbnail((_x, _y), Image.ANTIALIAS)
                im.save(outfile, "JPEG")
                print ("Converted %s to size (%s, %s) and saves to %s" % (infile, _x, _y, outfile))
            except IOError:
                print ("cannot create thumbnail for '%s'" % infile)
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))
