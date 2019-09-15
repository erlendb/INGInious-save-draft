//Setter litt globaler
href = location.href;
hrefTmp = href.substr(0,href.lastIndexOf('/'));
hrefCourse = hrefTmp.substr(hrefTmp.lastIndexOf('/')).slice(1);

// Ruller inn content-skriptet
if (hrefCourse == 'TDT4120') {
  inject_inginious();
}
