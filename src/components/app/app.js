import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import 'firebase/firestore';
import 'firebase/auth';
import styles from './app.module.scss';
import Stats from '../../routes/stats';
import Header from '../header/header';
import Content from '../content/content';
import AddItem from '../../routes/additem';
import EditItem from '../../routes/edititem';
import Items from '../../routes/items';
import Menu from '../menu';
import Settings from '../../routes/settings';
import { ButtonAppContainer } from '../../shared/uibuttons';
//import testdata from '../../testdata.js';

function App() {
  const [data, setData] = useState([]);
  const [typelist, setTypelist] = useState([]);

  const user = useUser();

  const itemCollectionRef = useFirestore()
    .collection('user')
    .doc(user.data.uid)
    .collection('item');

  const { data: itemCollection } = useFirestoreCollectionData(
    itemCollectionRef.orderBy('paymentDate', 'desc'),
    {
      initialData: [],
      idField: 'id',
    }
  );

  const typeCollectionRef = useFirestore()
    .collection('user')
    .doc(user.data.uid)
    .collection('type');
  const { data: typeCollection } = useFirestoreCollectionData(
    typeCollectionRef.orderBy('type'),
    {
      initialData: [],
    }
  );

  useEffect(() => {
    setData(itemCollection);
  }, [itemCollection]);

  useEffect(() => {
    const types = typeCollection.map((obj) => obj.type);
    setTypelist(types);
  }, [typeCollection]);

  const handleItemSubmit = (newItem) => {
    itemCollectionRef.doc(newItem.id).set(newItem);
  };

  const handleItemDelete = (id) => {
    itemCollectionRef.doc(id).delete();
  };

  const handleTypeSubmit = (newType) => {
    typeCollectionRef.doc().set({ type: newType });
  };

  return (
    <ButtonAppContainer>
      <div className={styles.app}>
        <Router>
          <Header />
          <Content>
            <Route exact path='/'>
              <Items data={data} />
            </Route>
            <Route path='/stats'>
              <Stats data={data} />
            </Route>
            <Route path='/settings'>
              <Settings types={typelist} onTypeSubmit={handleTypeSubmit} />
            </Route>
            <Route path='/add'>
              <AddItem onItemSubmit={handleItemSubmit} types={typelist} />
            </Route>
            <Route path='/edit/:id'>
              <EditItem
                onItemSubmit={handleItemSubmit}
                data={data}
                types={typelist}
                onItemDelete={handleItemDelete}
              />
            </Route>
          </Content>
          <Menu />
        </Router>
      </div>
    </ButtonAppContainer>
  );
}

export default App;
