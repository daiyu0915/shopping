import dva from 'dva';
import './index.css';
// import App from './components/App'
import shop1 from './models/shop1'
import cart from './models/cart'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(indexPage);
// app.model(require('./models/products').default);
// app.model(require('./models/shop').default);
// app.model(require('./models/products').default);
// app.model(require('./models/cart2').default);

app.model(shop1);
app.model(cart);

// 4. Router
app.router(require('./router').default);
// app.router(() => <App />);

// 5. Start
app.start('#root');
