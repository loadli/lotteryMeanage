const isDev = process.env.NODE_ENV === 'development';

export default isDev ? 'http://127.0.0.1:3000' : 'https://qcd2vm.app.cloudendpoint.cn';
