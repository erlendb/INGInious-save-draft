href = location.href;
hrefTmp = href.substr(0,href.lastIndexOf('/'));
hrefCourse = hrefTmp.substr(hrefTmp.lastIndexOf('/')).slice(1);
if (hrefCourse == 'TDT4120') {
  inject_inginious();
}
