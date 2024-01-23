import axios from 'axios';

axios.defaults.headers.common['Accept-Encoding'] = 'gzip';

axios.defaults.headers.common['User-Agent'] =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

axios.defaults.headers.common['Content-Type'] = 'text/html; charset=UTF-8';

export default axios;
