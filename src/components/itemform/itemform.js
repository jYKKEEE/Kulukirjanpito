import styles from './itemform.module.scss';
import Button from '../../shared/uibuttons';
import useForm from '../../shared/useform';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ItemForm(props) {
  const { onItemSubmit, data, types, onItemDelete } = props;
  const history = useHistory();

  const submit = () => {
    //kopio oliosta
    let storedvalues = Object.assign({}, values);
    storedvalues.amount = parseFloat(storedvalues.amount);
    storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
    onItemSubmit(storedvalues);
    history.push('/');
  };
  const initialState = data
    ? data
    : {
        type: types ? types[0] : '',
        amount: 0,
        paymentDate: new Date().toISOString().substring(0, 10),
        periodStart: '',
        periodEnd: '',
        receiver: '',
      };

  const { values, handleChange, handleSubmit } = useForm(
    submit,
    initialState,
    false
  );

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onItemDelete(values.id);
    history.push('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div className={styles.form_row}>
            <div>
              <label htmlFor='type'>Kulutyyppi</label>
              <select
                name='type'
                onChange={handleChange}
                value={values.type}
                required
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.form_row}>
            <div>
              <label htmlFor='amount'>Summa</label>
              <input
                type='number'
                name='amount'
                step='0.01'
                onChange={handleChange}
                value={values.amount}
                required
              />
            </div>
            <div>
              <label htmlFor='paymentDate'>Maksupäivä</label>
              <input
                type='date'
                name='paymentDate'
                step='0.01'
                onChange={handleChange}
                value={values.paymentDate}
              />
            </div>
          </div>

          <div className={styles.form_row}>
            <div>
              <label htmlFor='periodStart'>Laskutuskauden alku</label>
              <input
                type='date'
                name='periodStart'
                onChange={handleChange}
                value={values.periodStart}
              />
            </div>
            <div>
              <label htmlFor='periodEnd'>Laskutuskauden loppu</label>
              <input
                type='date'
                name='periodEnd'
                onChange={handleChange}
                value={values.perionEnd}
              />
            </div>
          </div>

          <div className={styles.form_row}>
            <div>
              <label htmlFor='receiver'>Saaja</label>
              <input
                type='text'
                name='receiver'
                onChange={handleChange}
                value={values.receiver}
                required
              />
            </div>
          </div>

          <div className={styles.form_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button primary type='submit'>
                {data ? 'TALLENNA' : 'LISÄÄ'}
              </Button>
            </div>
          </div>
          {onItemDelete ? (
            <div className={styles.form_row}>
              <div>
                <Button onClick={handleDelete}>POISTA</Button>
              </div>
              <div></div>
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
