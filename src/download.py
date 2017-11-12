import urllib2
import sys

fonts = [
    '/media/proximanova-light.7a9cd579.eot',
    '/media/proximanova-light.7a9cd579.eot',
    '/media/proximanova-light.f0788007.woff2',
    '/media/proximanova-light.e3097550.woff',
    '/media/proximanova-light.f3da5af0.ttf',
    '/media/proximanova-semibold.ee373146.eot',
    '/media/proximanova-semibold.ee373146.eot',
    '/media/proximanova-semibold.4d6dc7d5.woff2',
    '/media/proximanova-semibold.a0bc60ed.woff',
    '/media/proximanova-semibold.ec46605a.ttf',
    '/media/GothamPro-Light.5679686c.eot',
    '/media/GothamPro-Light.aab7d221.otf',
    '/media/GothamPro-Light.1d125953.woff',
    '/media/GothamPro-Light.1b1d8c9e.ttf',
    '/media/images/GothamPro-Light.svg',
    '/media/GothamPro-Medium.99e6bd94.eot',
    '/media/GothamPro-Medium.dd3d9ca5.otf',
    '/media/GothamPro-Medium.e26f778a.woff',
    '/media/GothamPro-Medium.be1f6965.ttf',
    '/media/images/GothamPro-Medium.svg',
    '/media/GothamPro-Bold.f5f5a498.eot',
    '/media/GothamPro-Bold.3f9c5a2b.otf',
    '/media/GothamPro-Bold.fa49a77f.woff',
    '/media/GothamPro-Bold.a30a1d45.ttf',
    '/media/images/GothamPro-Bold.svg',
    '/media/Stem-Medium.c127b532.eot',
    '/media/Stem-Medium.885b0cf8.woff',
    '/media/Stem-Medium.85968e40.ttf',
    '/media/images/Stem-Medium.svg'
]

written = []

l = len (fonts)

for i, x in enumerate (fonts):
    sys.stdout.write("\rDowloading %s/%s" % (i, l))
    sys.stdout.flush ()
    x = x.replace ('/media/', '')
    if (x in written):
        continue
    try:
        f = urllib2.urlopen("%s/media/%s" % (sys.argv[1], x))
    except urllib2.HTTPError:
        print ("404: %s/media/%s" % (sys.argv[1], x))
        continue
    with open ("resources/fonts/%s" % x, "wb") as output:
        output.write(f.read())
        written.append (x)
        output.close ()
