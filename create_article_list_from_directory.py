import os
from frontmatter import Frontmatter
dir = r'X:\htmlacademy\bm\src\bs\pritchi-iisusa'

list_of_articles = os.listdir(dir)

print(list_of_articles)

print(r"<ul>")

for file in list_of_articles:
    formatter_info = Frontmatter.read_file(dir+ '\\' + file)
    file_title = formatter_info['attributes']['title']

    print(r"<li>")
    print(f"<a>{file_title }</a>")
    print(r"</li>")

print(r"</ul>")
print("\n")