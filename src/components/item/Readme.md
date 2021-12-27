Item-komponentilla renderöidään yksittäinen merkintä sivulle.
Komponentti saa kutsun yhteydessä tulostettanan merkinnän tiedot
data-ominausuuden kautta.

Malliesimerkki käytöstä:

```js
import { BrowserRouter as Router } from 'react-router-dom';

const data = {
  id: 'asd-1234',
  type: 'Puhelin',
  amount: 26.9,
  paymentDate: '2021-01-16',
  perioidStart: '',
  periodEnd: '',
  receiver: 'Elisa',
};
<Router>
  <Item data={data} />
</Router>;
```

Jos merkinnän tietojen yhteydessä annetaan myös jakson alku- ja
loppupäivämäärät, laskee komponentti keskimääräisen kukautta kohden tulevan kulun.

```js
const data = {
  id: 'asd-1234',
  type: 'Sähkö',
  amount: 359.7,
  paymentDate: '2021-01-16',
  perioidStart: '2020-10-01',
  periodEnd: '2020-12-31',
  receiver: 'Energia Oy',
};
<Router>
  <Item data={data} />
</Router>;
```
