import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva({});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/homePage').default);
app.model(require('./models/topic').default);
app.model(require('./models/info').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
